<template>
  <div class="grid grid-cols-7 gap-2 p-2">
    <div class="col-span-1 color-navy-bg text-white rounded-md">
      <TheSideBar />
    </div>

    <div class="col-span-6 color-gray-bg rounded-lg">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import TheSideBar from "@/components/common/TheSideBar.vue";
</script>

<style scoped></style>
