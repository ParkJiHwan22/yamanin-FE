<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="p-8 bg-white shadow-lg rounded-lg w-full max-w-sm">
      <h4 class="mb-6 text-2xl font-semibold text-center text-gray-700">로그인</h4>
      <input type="text" placeholder="ID 입력" v-model.trim="id" class="input-text"/>
      <input type="password" placeholder="PW 입력" v-model.trim="password" class="input-text"/>
      <div class="mt-4 flex justify-between">
        <button @click="login" class="btn color-blue-bg hover:bg-blue-700">로그인</button>
        <button @click="register" class="btn color-pink-bg hover:bg-pink-700">회원가입</button>
      </div>
      <div class="mt-4 flex justify-between text-sm text-gray-600">
        <button @click="forgotId" class="hover:underline">ID 찾기</button>
        <button @click="forgotPassword" class="hover:underline">PW 찾기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const id = ref("");
const password = ref("");
const store = useUserStore();
const router = useRouter();

const login = () => {
  store.login({ loginId: id.value, password: password.value });
};

const register = () => {
  router.push('/signup');
};

const forgotId = () => {
  // ID 찾기 로직 추가
};

const forgotPassword = () => {
  // 비밀번호 찾기 로직 추가
};
</script>

<style scoped>
.input-text {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 16px;
  transition: all 0.3s;
}

.input-text:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.btn {
  padding: 12px 20px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.color-blue-bg {
  background-color: #007bff;
}

.color-blue-bg:hover {
  background-color: #0056b3;
}

.color-pink-bg {
  background-color: #FF6666;
}

.color-pink-bg:hover {
  background-color: #c2185b;
}
</style>