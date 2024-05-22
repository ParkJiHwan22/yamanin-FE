<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- 프론트 섹션 -->
    <div class="hero-section bg-cover bg-center w-full h-screen">
      <div class="text-center animate-fade-in-up pt-60">
        <h1 class="text-5xl font-bold text-white">야구로 만나는 인연</h1>
        <p class="my-5 text-xl text-white">야구장에서 새로운 추억을 만드세요</p>
        <RouterLink
          to="/board" 
          class="mt-8 px-8 py-4 bg-white text-gray-900 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300 transform hover:scale-105">
          둘러보기
        </RouterLink>
      </div>
    </div>

    <!-- 기능 섹션 -->
    <section class="py-16 bg-[url('@/assets/baseballpark.png')] bg-cover bg-center text-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-black text-center">기능</h2>
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="w-full md:w-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up">
            <h3 class="text-2xl font-semibold">유연한 시청 옵션</h3>
            <p class="mt-4">좌석을 공유하거나 다른 팬들과 상호작용하세요.</p>
          </div>
          <div class="w-full md:w-1/3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up delay-100">
            <h3 class="text-2xl font-semibold">호스트와 게스트 시스템</h3>
            <p class="mt-4">호스트나 게스트로 게임 친구를 쉽게 찾고 게시하세요.</p>
          </div>
          <div class="w-full md:w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up delay-200">
            <h3 class="text-2xl font-semibold">안전과 신뢰</h3>
            <p class="mt-4">긍정적인 경험을 보장하는 신고 및 리뷰 시스템.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 사용자 후기 섹션 -->
    <section class="py-16 bg-gray-200 text-gray-800">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center">사용자 후기</h2>
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="w-full md:w-1/3 bg-white rounded-lg p-6 text-center shadow-lg">
            <p class="mt-4">"이 플랫폼은 제가 게임을 즐기는 방식을 완전히 바꿔놓았어요. 정말 놀랍습니다!"</p>
            <h4 class="mt-4 text-lg font-semibold">- John Doe</h4>
          </div>
          <div class="w-full md:w-1/3 bg-white rounded-lg p-6 text-center shadow-lg">
            <p class="mt-4">"게임 친구를 찾는 것이 이보다 더 쉬울 수는 없어요. 강력 추천합니다!"</p>
            <h4 class="mt-4 text-lg font-semibold">- Jane Smith</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- 행동 촉구 섹션 -->
    <section class="py-16 bg-blue-600 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold">게임 친구를 찾을 준비가 되셨나요?</h2>
        <p class="mt-4 text-xl">오늘 우리 커뮤니티에 가입하고 혼자 게임을 보지 마세요.</p>
        <button class="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300 transform hover:scale-105">
          지금 가입하기
        </button>
      </div>
    </section>

    <!-- 자주 묻는 질문 섹션 -->
    <section class="py-16 bg-white text-gray-800">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center">자주 묻는 질문</h2>
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="w-full md:w-1/2">
            <h3 class="text-xl font-semibold">게임 친구를 어떻게 찾나요?</h3>
            <p class="mt-4">간단히 가입하고 프로필을 만들고 사용 가능한 게임 친구를 찾아보거나 직접 요청을 게시하세요.</p>
          </div>
          <div class="w-full md:w-1/2">
            <h3 class="text-xl font-semibold">플랫폼은 안전한가요?</h3>
            <p class="mt-4">네, 우리는 모든 사용자가 안전하고 긍정적인 경험을 할 수 있도록 강력한 신고 및 리뷰 시스템을 갖추고 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useProfileStore } from '@/stores/profile';

const userStore = useUserStore();
const profileStore = useProfileStore();

const { user, getUserById } = userStore;
const { profile, fetchProfile } = profileStore;

// 기존 데이터 가져오기
onMounted(async () => {
  if (user.value && user.value.userId) {
    const userId = user.value.userId;
    await getUserById(userId);
    await fetchProfile(userId);
  }
});

// 로그인 후 userId 변경 감지하여 동기화
watch(() => user.value?.userId, async (newUserId) => {
  if (newUserId) {
    await getUserById(newUserId);
    await fetchProfile(newUserId);
  }
});
</script>

<style scoped>
.hero-section {
  background-image: url('@/assets/bbImg.jpg');
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>
