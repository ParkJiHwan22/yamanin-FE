<template>
  <div class="top-0 left-0 right-0 bg-white shadow-md z-50">
    <div class="grid grid-cols-3 items-center p-5">
      <div class="col-span-1">
        <RouterLink to="/">
          <img src="@/assets/yamanin-logo.png" alt="야만인 로고" class="w-40 h-12" />
        </RouterLink>
      </div>

      <div class="col-span-1 flex justify-center space-x-8">
        <RouterLink to="/guide" class="hover:text-blue-600">서비스 소개</RouterLink>
        <RouterLink to="/board" class="hover:text-blue-600">모집 게시판</RouterLink>
        <RouterLink to="/gameinfo" class="hover:text-blue-600">경기 일정</RouterLink>
      </div>

      <div class="col-span-1 flex justify-end me-10">
        <template v-if="!isLoggedIn">
          <RouterLink to="/login" class="text-lg hover:underline">로그인</RouterLink>
        </template>
        <template v-else>
          <div class="flex items-center space-x-5">
            <RouterLink :to="{ name: 'profile', params: { userId: userStore.user.userId }}" class="text-lg hover:underline">프로필</RouterLink>
            <button @click="logout" class="text-lg hover:underline">로그아웃</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useProfileStore } from '@/stores/profile';
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();

const { user, getUserById } = userStore;
const { profile, fetchProfile } = profileStore;

const isLoggedIn = computed(() => !!userStore.accessToken);

const fetchUserProfile = async () => {
  if (userStore.user.userId) {
    await profileStore.fetchProfile(userStore.user.userId);
  }
}

onMounted(() => {
  if (isLoggedIn.value) {
    fetchUserProfile();
  }
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

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>

<style scoped>
.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.right-0 {
  right: 0;
}

.bg-white {
  background-color: white;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.z-50 {
  z-index: 50;
}

.grid {
  display: grid;
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.items-center {
  align-items: center;
}

.p-5 {
  padding: 1.25rem;
}

.w-40 {
  width: 10rem;
}

.h-12 {
  height: 3rem;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.space-x-8 > :not([hidden]) ~ :not([hidden]) {
  margin-left: 2rem;
}

.justify-end {
  justify-content: flex-end;
}

.me-10 {
  margin-inline-end: 2.5rem;
}

.text-lg {
  font-size: 1.125rem;
}

.hover\:text-blue-600:hover {
  color: #2563eb;
}

.hover\:underline:hover {
  text-decoration: underline;
}
</style>
