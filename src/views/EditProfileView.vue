<template>
  <div class="edit-profile-view container mx-auto py-24">
    <h1 class="text-3xl font-bold text-center mb-6">Edit Profile</h1>
    <div class="form-container flex flex-col items-center gap-6">
      <div class="input-group flex flex-col items-center">
        <label for="file-upload" class="custom-file-upload bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700">
          Choose Profile Picture
        </label>
        <input type="file" id="file-upload" class="hidden" @change="onFileChange" />
      </div>
      <div class="input-group w-full">
        <input type="text" v-model="profileText" placeholder="Profile Text" class="w-full p-2 border border-gray-300 rounded" />
      </div>
      <div class="input-group w-full">
        <input type="text" v-model="supportTeam" placeholder="Support Team" class="w-full p-2 border border-gray-300 rounded" />
      </div>
      <button class="save-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" @click="saveProfile">Save</button>
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
.container {
  max-width: 600px;
}

.custom-file-upload {
  display: inline-block;
}
</style>
