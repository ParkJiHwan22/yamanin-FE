<template>
  <div class="profile-view">
    <h1>User Profile</h1>
    <div v-if="profile.userId">
      <p><strong>Profile Image:</strong></p>
      <img v-if="profile.profileImg" :src="'data:image/jpeg;base64,' + profile.profileImg" alt="Profile Image" />
      <p><strong>Profile Text:</strong> {{ profile.profileText }}</p>
      <p><strong>Support Team:</strong> {{ profile.supportTeam }}</p>
    </div>
    <div v-else>
      <p>Loading user details...</p>
    </div>
    <div v-if="user.userId">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Nickname:</strong> {{ user.nickName }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Gender:</strong> {{ user.gender == 1 ? 'Male' : 'Female' }}</p>
      <router-link to="/mypage">
        <button>My Page</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useProfileStore } from '@/stores/profile';

const userStore = useUserStore();
const profileStore = useProfileStore();

const { user, getUserById } = userStore;
const { profile, fetchProfile } = profileStore;

onMounted(() => {
  if (user.userId) {
    const userId = user.userId;
    getUserById(userId).then(() => {
      fetchProfile(userId);
    });
  }
});

watch(() => user.userId, async (newUserId) => {
  if (newUserId) {
    await fetchProfile(newUserId);
  }
}, { immediate: true });
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
