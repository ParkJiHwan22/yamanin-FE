<template>
    <footer class="bg-gray-800 text-white">
      <!-- Footer with Social Media Links -->
      <footer class="py-8 bg-gray-800 text-white">
        <div class="mx-auto px-6 text-center">
          <p class="mt-4">&copy; 2024 Find Your Perfect Game Buddy. All rights reserved.</p>
        </div>
    </footer>
      <div class="container mx-auto flex justify-between items-center p-5">
        <div class="flex space-x-8">
          <RouterLink to="/guide" class="hover:underline">이용 안내</RouterLink>
          <RouterLink to="/board" class="hover:underline">모집 게시판</RouterLink>
          <RouterLink to="/schedule" class="hover:underline">경기 일정</RouterLink>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  