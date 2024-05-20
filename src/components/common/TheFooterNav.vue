<template>
  <footer class="color-navy-bg text-white">
    <div class="mx-full mx-auto flex items-center p-5">
      <div class="space-x-8">
        <RouterLink to="/guide" class="hover:underline">서비스 소개</RouterLink>
        <RouterLink to="/board" class="hover:underline">모집 게시판</RouterLink>
        <RouterLink to="/" class="hover:underline">경기 일정</RouterLink>
      </div>
    </div>
    <!-- Lower Footer with Copyright -->
    <div class="pb-8 color-navy-bg text-white">
      <div class="mx-auto px-6 text-center">
        <p class="mt-4">&copy; 2024 Find Your Perfect Game Buddy. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
i {
  font-size: 1.5rem;
}
</style>