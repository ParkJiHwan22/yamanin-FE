<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 class="text-3xl font-semibold mb-6 text-center">My Page</h1>
      <div v-if="user" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">User ID</label>
          <!-- <p class="text-gray-900">{{ store.user.userId }}</p> -->
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Login ID</label>
          <p class="text-gray-900">{{ store.user.loginId }}</p>
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Name</label>
          <p class="text-gray-900">{{ store.user.name }}</p>
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Phone</label>
          <p class="text-gray-900">{{ store.user.phone }}</p>
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Email</label>
          <p class="text-gray-900">{{ user.email }}</p>
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Created Date</label>
          <p class="text-gray-900">{{ user.createdDate }}</p>
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Age</label>
          <p class="text-gray-900">{{ user.age }}</p>
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Gender</label>
          <p class="text-gray-900">{{ user.gender ? 'Male' : 'Female' }}</p>
        </div>
        <div class="col-span-1 flex flex-col items-start">
          <label class="text-gray-700 font-medium">Nickname</label>
          <p class="text-gray-900">{{ user.nickName }}</p>
        </div>
      </div>
      <button @click="editProfile" class="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
        Edit Profile
      </button>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRoute } from 'vue-router'
  
  const store = useUserStore()
  const route = useRoute()

  const user = ref({})  
  onMounted(() => {
    store.getUserById(route.params.id)
  })
  
  console.log(store)
  const editProfile = store.editProfile;

  </script>
  
  <style scoped>
  </style>