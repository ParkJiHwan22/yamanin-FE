<template>
  <div class="container mx-auto py-24 max-w-xl">
    <h1 class="text-3xl font-bold text-center mb-6">프로필 변경</h1>
    <div class="flex flex-col items-center gap-6">
      <div class="flex flex-col items-center">
        <label
          for="file-upload"
          class="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
        >
          프로필 사진 변경
        </label>
        <input
          type="file"
          id="file-upload"
          class="hidden"
          @change="onFileChange"
        />
      </div>
      <div class="w-full">
        <input
          type="text"
          v-model="profileText"
          placeholder="Profile Text"
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="w-full">
        <input
          type="text"
          v-model="supportTeam"
          placeholder="Support Team"
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        @click="saveProfile"
      >
        저장
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const profileStore = useProfileStore();
const userStore = useUserStore();

const { updateProfile, fetchProfile } = profileStore;
const { user } = userStore;

const file = ref(null);
const profileText = ref("");
const supportTeam = ref("");

const onFileChange = (event) => {
  file.value = event.target.files[0];
};

const saveProfile = async () => {
  if (user && user.userId) {
    const userId = user.userId;
    await updateProfile(
      userId,
      file.value,
      profileText.value,
      supportTeam.value
    );
    router.push("/profile"); // Navigate back to profile page after saving
  } else {
    console.error("User ID is not available");
  }
};

// Fetch existing profile if it exists
watch(
  () => user.userId,
  async (newUserId) => {
    if (newUserId) {
      await fetchProfile(newUserId);
      if (profileStore.profile) {
        profileText.value = profileStore.profile.profileText;
        supportTeam.value = profileStore.profile.supportTeam;
      }
    }
  },
  { immediate: true }
);
</script>
