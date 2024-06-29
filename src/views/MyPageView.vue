<template>
  <div
    class="mypage-view max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
  >
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">My 프로필</h1>
    <div v-if="profile.userId" class="profile-section mb-6">
      <div class="profile-img-container text-center mb-6">
        <img
          v-if="profile.profileImg"
          :src="'data:image/jpeg;base64,' + profile.profileImg"
          alt="Profile Image"
          class="profile-img w-36 h-36 rounded-full border-2 border-gray-300 mx-auto"
        />
      </div>
      <p class="font-semibold text-gray-700 text-sm">프로필 메시지:</p>
      <p class="mb-4 text-gray-600 text-2xl">{{ profile.profileText }}</p>
      <p class="font-semibold text-gray-700">응원 구단:</p>
      <p class="text-gray-600">{{ profile.supportTeam }}</p>
    </div>
    <div v-if="user" class="user-section mb-6">
      <p class="font-semibold text-gray-700">로그인 ID:</p>
      <p class="mb-4 text-gray-600">{{ user.loginId }}</p>
      <p class="font-semibold text-gray-700">이름:</p>
      <p class="mb-4 text-gray-600">{{ user.name }}</p>
      <p class="font-semibold text-gray-700">Email:</p>
      <p class="mb-4 text-gray-600">{{ user.email }}</p>
      <p class="font-semibold text-gray-700">핸드폰 번호:</p>
      <p class="mb-4 text-gray-600">{{ user.phone }}</p>
      <p class="font-semibold text-gray-700">닉네임:</p>
      <p class="mb-4 text-gray-600">{{ user.nickName }}</p>
      <p class="font-semibold text-gray-700">나이:</p>
      <p class="mb-4 text-gray-600">{{ user.age }}</p>
      <p class="font-semibold text-gray-700">성별:</p>
      <p class="mb-4 text-gray-600">
        {{ user.gender == 1 ? "Male" : "Female" }}
      </p>
      <p class="font-semibold text-gray-700">Created On:</p>
      <p class="text-gray-600">{{ user.createdDate }}</p>
    </div>
    <button
      @click="editProfile"
      class="edit-btn w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
    >
      프로필 변경
    </button>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import { useUserStore } from "@/stores/user";
import { useProfileStore } from "@/stores/profile";

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

<style scoped></style>
