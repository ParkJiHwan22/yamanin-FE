<template>
  <footer class="bg-navy text-white">
    <div class=" flex justify-center max-w-screen-xl mx-auto p-5">
      <div class="space-x-8">
        <RouterLink to="/guide" class="hover:underline">서비스 소개</RouterLink>
        <RouterLink to="/board" class="hover:underline">모집 게시판</RouterLink>
        <RouterLink to="/" class="hover:underline">경기 일정</RouterLink>
        <RouterLink to="/contact" class="hover:underline">Contact Us</RouterLink>
      </div>
      <div class="space-x-4">
        <a href="https://facebook.com" class="hover:text-gray-400"><i class="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com" class="hover:text-gray-400"><i class="fab fa-twitter"></i></a>
        <a href="https://instagram.com" class="hover:text-gray-400"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
    <!-- Lower Footer with Copyright -->
    <div class="bg-navy text-white pb-8">
      <div class="max-w-screen-xl mx-auto px-6 text-center">
        <p class="mt-4">&copy; 2024 Find Your Perfect Game Buddy. All rights reserved.</p>
        <div class="mt-2 space-x-4">
          <RouterLink to="/terms" class="hover:underline">Terms of Service</RouterLink>
          <RouterLink to="/privacy" class="hover:underline">Privacy Policy</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.bg-navy {
  background-color: #001f3f;
}

i {
  font-size: 1.5rem;
}
</style>
