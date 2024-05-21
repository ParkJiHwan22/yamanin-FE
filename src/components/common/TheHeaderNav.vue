<template>
    <div class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div class="flex justify-between p-5">
        <RouterLink to="/">
          <img src="@/assets/yamanin-logo.png" alt="야만인 로고" class="w-40 h-12">
        </RouterLink>
  
        <div class="flex justify-between space-x-8 pt-3">
          <RouterLink to="/guide">서비스 소개</RouterLink>
          <RouterLink :to="{ name: 'boardList' }">모집 게시판</RouterLink>
          <RouterLink to="/gameinfo">경기 일정</RouterLink>
        </div>
  
        <div class="flex justify-between pt-2 pe-4">
          <template v-if="!isLoggedIn">
            <RouterLink to="/login" class="text-lg pt-1 pe-4 hover:underline">로그인</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/mypage" class="text-lg pt-1 pe-4 hover:underline">마이페이지</RouterLink>
            <button @click="logout" class="text-lg pt-1 pe-4 hover:underline">로그아웃</button>
          </template>
          <img src="@/assets/yamanin-hamburger.png" alt="야만인 로고" class="w-8 h-8">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/user'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const userStore = useUserStore()
  
  const isLoggedIn = computed(() => !!userStore.accessToken)
  
  const logout = () => {
    userStore.logout()
    // Redirect to the home page after logging out
    router.push('/')
  }
  </script>
  
  <style scoped>
  </style>
  