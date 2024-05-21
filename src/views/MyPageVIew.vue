<template>
  <div class="mypage-view">
    <h1>My Profile</h1>
    <div>
      <p><strong>Login ID:</strong> {{ user.loginId }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Nickname:</strong> {{ user.nickName }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Gender:</strong> {{ user.gender == 1 ? 'Male' : 'Female' }}</p>
      <p><strong>Created On:</strong> {{ user.createdDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const { user, loginUser, getUserById } = useUserStore();

onMounted(() => {
  const userId = loginUser.userId; // 스토어에서 userId 사용
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
</style>
