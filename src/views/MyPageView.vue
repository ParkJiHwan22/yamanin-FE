<template>
  <div class="mypage-view max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">My Profile</h1>
    <div v-if="profile.userId" class="profile-section mb-6">
      <div class="profile-img-container text-center mb-6">
        <p class="font-semibold text-gray-700">Profile Image:</p>
        <img v-if="profile.profileImg" :src="'data:image/jpeg;base64,' + profile.profileImg" alt="Profile Image" class="profile-img w-36 h-36 rounded-full border-2 border-gray-300 mx-auto" />
      </div>
      <p class="font-semibold text-gray-700">Profile Text:</p>
      <p class="mb-4 text-gray-600">{{ profile.profileText }}</p>
      <p class="font-semibold text-gray-700">Support Team:</p>
      <p class="text-gray-600">{{ profile.supportTeam }}</p>
    </div>
    <div v-if="user" class="user-section mb-6">
      <p class="font-semibold text-gray-700">Login ID:</p>
      <p class="mb-4 text-gray-600">{{ user.loginId }}</p>
      <p class="font-semibold text-gray-700">Name:</p>
      <p class="mb-4 text-gray-600">{{ user.name }}</p>
      <p class="font-semibold text-gray-700">Email:</p>
      <p class="mb-4 text-gray-600">{{ user.email }}</p>
      <p class="font-semibold text-gray-700">Phone:</p>
      <p class="mb-4 text-gray-600">{{ user.phone }}</p>
      <p class="font-semibold text-gray-700">Nickname:</p>
      <p class="mb-4 text-gray-600">{{ user.nickName }}</p>
      <p class="font-semibold text-gray-700">Age:</p>
      <p class="mb-4 text-gray-600">{{ user.age }}</p>
      <p class="font-semibold text-gray-700">Gender:</p>
      <p class="mb-4 text-gray-600">{{ user.gender == 1 ? 'Male' : 'Female' }}</p>
      <p class="font-semibold text-gray-700">Created On:</p>
      <p class="text-gray-600">{{ user.createdDate }}</p>
    </div>
    <button @click="editProfile" class="edit-btn w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
      Edit Profile
    </button>
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
/* If needed, add any additional custom styles here */
</style>
