<template>
    <div class="mypage-view">
      <h1>My Profile</h1>
      <!-- <div v-if="user.userId"> -->
      <div>
        <!-- <p><strong>ID:</strong> {{ user.userId }}</p> -->
        <p><strong>Login ID:</strong> {{ user.loginId }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Nickname:</strong> {{ user.nickName }}</p>
        <p><strong>Age:</strong> {{ user.age }}</p>
        <p><strong>Gender:</strong> {{ user.gender == 1 ? 'Male' : 'Female' }}</p>
        <p><strong>Created On:</strong> {{ user.createdDate }}</p>
        <button @click="editProfile">Edit Profile</button>
      </div>
      <!-- <div v-else>
        <p>No user details available. Please login.</p>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/user';
  import { onMounted } from 'vue';
  
  const { user, editProfile, getUserById } = useUserStore();
  
  // Simulate fetching user data on component mount
  onMounted(() => {
    const userId = 1; // Placeholder; in reality, this would likely be fetched from authentication context or a route parameter
    getUserById(userId);
  });
  </script>
  
  <style scoped>
  .mypage-view {
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
  