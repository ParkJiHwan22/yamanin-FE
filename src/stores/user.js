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

  return { user, getUserById, editProfile };
});