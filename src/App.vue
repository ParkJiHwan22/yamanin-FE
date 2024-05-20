<template>
  <div>
  <!-- <div class="flex justify-center min-h-screen"> -->
    <!-- <div class="w-3/4"> -->
    <div>
      <div class="pb-24">
        <TheHeaderNav />
      </div>
      <RouterView />
      <TheFooterNav />
    </div>
  </div>
</template>

<script setup>
  import TheHeaderNav from '@/components/common/TheHeaderNav.vue'
  import TheFooterNav from '@/components/common/TheFooterNav.vue'
</script>

<style scoped>
</style>