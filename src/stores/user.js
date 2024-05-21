import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const REST_USER_API = `http://localhost:8080/user`;

export const useUserStore = defineStore('user', () => {

    const user = ref({});
    // 사용자 정보를 로드하는 함수
    const getUserById = function (id) {
      axios.get(`${REST_USER_API}/${id}`)
        .then((response) => {
        user.value = response.data
      })
    }

    // 사용자 프로필 수정을 위해 페이지 이동
  const editProfile = () => {
    router.push({ name: 'EditProfile', params: { id: user.value.userId } }); // userId에 맞게 수정
  };

  const accessToken = ref('')
    const loginUser = ref({})
    // refreshToken => 백엔드에서 응답 헤더(Cookie)에 넣어서 응답
    // -> 자동으로 브라우저에 저장이 되고, 다음 요청에 자동으로 쿠키를 가지고 요청
    // accessToken => 백엔드에서 응답 본문에 넣어서 보냄.
    // -> pinia의 상태에 저장하든, sessionStorage, localStorage에 저장.

    // POST 요청
    // userInfo: { "id": "user", "password": "user"}
    // const login = (userInfo) => {

    //     axios.post(`${REST_USER_API}/login`, userInfo)
    //     .then((res)=>{
    //         console.log(res);
    //         // axios가 res의 data 속성에 응답 본문을 넣어줌.

    //         accessToken.value = res.data.accessToken;
    //         loginUser.value = {...userInfo, name: res.data.name};
    //         router.push('/')
    //     })
    //     .catch((e)=>{
    //         console.log('로그인 실패')
    //         console.log(e)
    //         router.push('/login')
    //     })
    // }

    const login = (userInfo) => {
      axios.post(`${REST_USER_API}/login`, userInfo)
      .then((res) => {
          accessToken.value = res.data.accessToken;
          loginUser.value = {...userInfo, name: res.data.name};
          // Fetch the user details immediately after login
          getUserById(res.data.userId); // Assuming the server returns userId
          router.push('/')
      })
      .catch((e) => {
          console.error('Login failed', e);
          router.push('/login');
      });
  }

    const logout = ()=>{
        accessToken.value = ''
        user.value = {};
        loginUser.value = {}
    }

    // const getMyPage = ()=>{
    //     axios.get('http://localhost:8080/user/mypage', {
    //         headers: {
    //             Authorization: accessToken.value
    //         }
    //     })
    //     .then((res)=>{
    //         console.log(res)
    //     })
    // }

  return { user, getUserById, editProfile, accessToken, loginUser, login , logout };
});