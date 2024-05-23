import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import { useProfileStore } from '@/stores/profile';

const REST_USER_API = `http://localhost:8080/user`;

export const useUserStore = defineStore('user', () => {
  const user = reactive({});
  const loginUser = reactive({});
  const accessToken = ref('');
  const userList = ref([]);

  const profileStore = useProfileStore();
  const { fetchProfile } = profileStore;

  // 초기 로그인 정보 세션에서 로드
  if (sessionStorage.getItem('loginUser')) {
    Object.assign(loginUser, JSON.parse(sessionStorage.getItem('loginUser')));
    accessToken.value = loginUser.accessToken;
    // 세션에서 사용자 정보 로드
    if (sessionStorage.getItem('user')) {
      Object.assign(user, JSON.parse(sessionStorage.getItem('user')));
    }
  }

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${REST_USER_API}/${id}`);
      Object.assign(user, response.data);
      sessionStorage.setItem('user', JSON.stringify(user)); // 세션 스토리지에 사용자 정보 저장
    } catch (error) {
      console.error(error);
    }
  };

  const getUserByLoginId = async (loginId) => {
    try {
      const response = await axios.get(`${REST_USER_API}/lid/${loginId}`);
      Object.assign(user, response.data);
      sessionStorage.setItem('user', JSON.stringify(user)); // 세션 스토리지에 사용자 정보 저장
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${REST_USER_API}/`);
      userList.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editProfile = () => {
    if (user.userId) {
      router.push({ name: 'EditProfile', params: { id: user.userId } });
    } else {
      console.error('User ID is not available');
    }
  };

  const login = async (userInfo) => {
    try {
      const res = await axios.post(`${REST_USER_API}/login`, userInfo);
      accessToken.value = res.data.accessToken;
      Object.assign(loginUser, { ...userInfo, accessToken: res.data.accessToken, name: res.data.name });
      sessionStorage.setItem('loginUser', JSON.stringify(loginUser)); // 세션 스토리지에 로그인 사용자 정보 저장
      await getUserByLoginId(loginUser.loginId); // 사용자 정보 조회 및 저장
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Login failed', error);
      router.push('/login');
    }
  };

  const logout = () => {
    accessToken.value = '';
    sessionStorage.removeItem('loginUser'); // 세션 스토리지에서 로그인 정보 제거
    sessionStorage.removeItem('user'); // 세션 스토리지에서 사용자 정보 제거
    Object.keys(user).forEach(key => delete user[key]);
    Object.keys(loginUser).forEach(key => delete loginUser[key]);
  };

  const setUser = (newUser) => {
    Object.assign(user, newUser);
    sessionStorage.setItem('user', JSON.stringify(user)); // 세션 스토리지에 사용자 정보 저장
  };

  return {
    user,
    loginUser,
    accessToken,
    userList,
    getUserById,
    getUserByLoginId,
    getAllUsers,
    editProfile,
    login,
    logout,
    setUser, // setUser 추가
  }
} , {
  persist: true
});
