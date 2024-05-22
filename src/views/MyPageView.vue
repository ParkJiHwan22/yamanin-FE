<template>
  <div class="mypage-view">
    <h1>My Profile</h1>
    <div v-if="profile.userId">
      <p><strong>Profile Image:</strong></p>
      <img v-if="profile.profileImg" :src="'data:image/jpeg;base64,' + profile.profileImg" alt="Profile Image" />
      <p><strong>Profile Text:</strong> {{ profile.profileText }}</p>
      <p><strong>Support Team:</strong> {{ profile.supportTeam }}</p>
    </div>
    <div v-if="user">
      <p><strong>Login ID:</strong> {{ user.loginId }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Nickname:</strong> {{ user.nickName }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Gender:</strong> {{ user.gender == 1 ? 'Male' : 'Female' }}</p>
      <p><strong>Created On:</strong> {{ user.createdDate }}</p>
    </div>
    <button @click="editProfile">Edit Profile</button>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue';
import { useUserStore } from '@/stores/user';
import { useProfileStore } from '@/stores/profile';

const userStore = useUserStore();
const profileStore = useProfileStore();

const { user, getUserById, editProfile } = userStore;
const { profile, fetchProfile } = profileStore;

watchEffect(() => {
  if (user.value && user.value.userId) {
    const userId = user.value.userId;
    getUserById(userId).then(() => {
      fetchProfile(userId);
    });
  }
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
