<template>
    <div class="profile-view">
      <h1>User Profile</h1>
      <div v-if="user">
        <p><strong>Login ID:</strong> {{ user.loginId }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Nickname:</strong> {{ user.nickName }}</p>
        <p><strong>Age:</strong> {{ user.age }}</p>
        <p><strong>Gender:</strong> {{ user.gender == 1 ? 'Male' : 'Female' }}</p>
        <p><strong>Created On:</strong> {{ user.createdDate }}</p>
        <router-link to="/mypage">
          <button>My Page</button>
        </router-link>
      </div>
      <div v-else>
        <p>Loading user details...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/user';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const { user, getUserById } = useUserStore();
  
  onMounted(() => {
    const userId = route.params.userId; // 라우트 파라미터에서 userId 가져오기
    getUserById(userId);
  });
  </script>
  
  <style scoped>
  .profile-view {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  