import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import { useProfileStore } from '@/stores/profile'; // 프로필 스토어 가져오기

const REST_USER_API = `http://localhost:8080/user`;

export const useUserStore = defineStore('user', () => {
  const user = reactive({});
  const loginUser = reactive({});
  const accessToken = ref('');
  const userList = ref([]);

  const profileStore = useProfileStore(); // 프로필 스토어 인스턴스 생성
  const { fetchProfile } = profileStore;

  // 사용자 정보를 로드하는 함수
  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${REST_USER_API}/${id}`);
      Object.assign(user, response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserByLoginId = async (loginId) => {
    try {
      const response = await axios.get(`${REST_USER_API}/lid/${loginId}`);
      Object.assign(user, response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 사용자의 모든 정보를 로드하는 함수
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${REST_USER_API}/`);
      userList.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // 사용자 프로필 수정을 위해 페이지 이동
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
      Object.assign(loginUser, { ...userInfo, name: res.data.name });
      await getUserByLoginId(loginUser.loginId);
      await fetchProfile(user.userId); // 프로필 동기화
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Login failed', error);
      router.push('/login');
    }
  };

  const logout = () => {
    accessToken.value = '';
    Object.keys(user).forEach(key => delete user[key]);
    Object.keys(loginUser).forEach(key => delete loginUser[key]);
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
  };
});
