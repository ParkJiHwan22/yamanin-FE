<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="p-8 bg-white shadow-lg rounded-lg w-full max-w-sm">
      <h4 class="mb-6 text-2xl font-semibold text-center text-gray-700">
        로그인
      </h4>
      <input
        type="text"
        placeholder="ID 입력"
        v-model.trim="id"
        class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="password"
        placeholder="PW 입력"
        v-model.trim="password"
        class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div class="mt-4 flex justify-between">
        <button
          @click="login"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          로그인
        </button>
        <button
          @click="register"
          class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700"
        >
          회원가입
        </button>
      </div>
      <div class="mt-4 flex justify-between text-sm text-gray-600">
        <button @click="forgotId" class="hover:underline">ID 찾기</button>
        <button @click="forgotPassword" class="hover:underline">PW 찾기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const id = ref("");
const password = ref("");
const store = useUserStore();
const router = useRouter();

const login = () => {
  store
    .login({ loginId: id.value, password: password.value })
    .then(() => {
      router.push("/").then(() => {
        location.reload(); // 로그인 후 리다이렉트된 페이지에서 새로고침
      });
    })
    .catch((err) => {
      console.error(err); // 로그인 실패 시 에러 처리
    });
};

const register = () => {
  router.push("/signup");
};

const forgotId = () => {
  // ID 찾기 로직 추가
};

const forgotPassword = () => {
  // 비밀번호 찾기 로직 추가
};
</script>
