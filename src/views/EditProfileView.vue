<template>
  <div class="edit-profile-view">
    <h1>Edit Profile</h1>
    <div>
      <input type="file" @change="onFileChange" />
      <input type="text" v-model="profileText" placeholder="Profile Text" />
      <input type="text" v-model="supportTeam" placeholder="Support Team" />
      <button @click="saveProfile">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const profileStore = useProfileStore();
const userStore = useUserStore();

const { updateProfile, fetchProfile } = profileStore;
const { user } = userStore;

const file = ref(null);
const profileText = ref('');
const supportTeam = ref('');

const onFileChange = (event) => {
  file.value = event.target.files[0];
};

const saveProfile = async () => {
  if (user && user.userId) {
    const userId = user.userId;
    await updateProfile(userId, file.value, profileText.value, supportTeam.value);
    router.push('/profile'); // Navigate back to profile page after saving
  } else {
    console.error('User ID is not available');
  }
};

// Fetch existing profile if it exists
watch(() => user.userId, async (newUserId) => {
  if (newUserId) {
    await fetchProfile(newUserId);
    if (profileStore.profile) {
      profileText.value = profileStore.profile.profileText;
      supportTeam.value = profileStore.profile.supportTeam;
    }
  }
}, { immediate: true });
</script>

<style scoped>
.edit-profile-view {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
