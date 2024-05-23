<template>
  <div class="profile-view">
    <h1 class="text-4xl font-bold mb-6 text-center text-gray-800">사용자 프로필</h1>
    <div v-if="profile.userId" class="bg-white p-8 rounded-3xl shadow-2xl transition-transform transform hover:scale-105">
      <div class="text-center">
        <p class="text-2xl font-semibold mb-4 text-gray-700">프로필 이미지</p>
        <img v-if="profile.profileImg" :src="'data:image/jpeg;base64,' + profile.profileImg" alt="Profile Image" class="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 border-gradient-to-r from-blue-400 to-purple-500" />
      </div>
      <p class="text-xl text-center mb-4 text-gray-600">{{ profile.profileText }}</p>
      <p class="text-xl mb-4 text-gray-700"><strong>응원 팀:</strong> {{ profile.supportTeam }}</p>
    </div>
    <div v-else class="text-center text-gray-500 py-6">
      <p>사용자 세부 정보를 불러오는 중...</p>
    </div>
    <div v-if="user.userId" class="bg-white p-8 rounded-3xl shadow-2xl mt-6 transition-transform transform hover:scale-105">
      <p class="text-xl mb-4 text-gray-700"><strong>이름:</strong> {{ user.name }}</p>
      <p class="text-xl mb-4 text-gray-700"><strong>닉네임:</strong> {{ user.nickName }}</p>
      <p class="text-xl mb-4 text-gray-700"><strong>나이:</strong> {{ user.age }}</p>
      <p class="text-xl mb-4 text-gray-700"><strong>성별:</strong> {{ user.gender == 1 ? '남성' : '여성' }}</p>
      <router-link v-if="user.loginId === loginUser.loginId" to="/mypage">
        <button class="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-full hover:from-blue-600 hover:to-indigo-600 transition duration-300 shadow-md hover:shadow-lg">마이 페이지</button>
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

const { user, loginUser, getUserById } = userStore;
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
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9fafb;
}
img {
  max-width: 100%;
}
button {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}
button:hover {
  background-color: #2563eb;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5), 0 4px 6px -4px rgba(59, 130, 246, 0.5);
}
</style>
