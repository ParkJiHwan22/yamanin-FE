<template>
  <div class="bg-white shadow-md z-50">
    <div class="grid grid-cols-3 items-center p-5">
      <div class="col-span-1">
        <RouterLink to="/">
          <img
            src="@/assets/yamanin-logo.png"
            alt="야만인 로고"
            class="w-40 h-12"
          />
        </RouterLink>
      </div>

      <div class="col-span-1 flex justify-center space-x-8">
        <RouterLink to="/guide" class="hover:text-blue-600"
          >서비스 소개</RouterLink
        >
        <RouterLink to="/board" class="hover:text-blue-600"
          >모집 게시판</RouterLink
        >
        <RouterLink to="/gameinfo" class="hover:text-blue-600"
          >경기 일정</RouterLink
        >
      </div>

      <div class="col-span-1 flex justify-end mr-10">
        <template v-if="!isLoggedIn">
          <RouterLink to="/login" class="text-lg hover:underline"
            >로그인</RouterLink
          >
        </template>
        <template v-else>
          <div class="flex items-center space-x-5">
            <RouterLink
              :to="{ name: 'profile', params: { userId: loginUser.userId } }"
              class="text-lg hover:underline"
              >프로필</RouterLink
            >
            <button @click="logout" class="text-lg hover:underline">
              로그아웃
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginUser = ref(null);

const isLoggedIn = computed(() => !!loginUser.value);

const fetchLoginUser = () => {
  const user = sessionStorage.getItem("loginUser");
  if (user) {
    loginUser.value = JSON.parse(user);
  }
};

onMounted(() => {
  fetchLoginUser();
});

const logout = () => {
  sessionStorage.removeItem("loginUser");
  loginUser.value = null;
  router.push("/");
};
</script>
