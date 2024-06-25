<template>
  <div class="text-white rounded-lg shadow-md my-5">
    <div
      class="text-center m-5 rounded-xl"
      v-if="
        profileStore.profile.userId === userStore.user.userId &&
        profileStore.profile.supportTeam
      "
    >
      <p>MyTeam</p>
      <div class="flex justify-center py-5">
        <p class="pt-2 pe-2 text-xl">{{ profileStore.profile.supportTeam }}</p>
        <div class="flex justify-center space-x-20">
          <img
            v-if="profileStore.profile.supportTeam === '롯데'"
            src="@/assets/team_logo/LT.png"
            alt="롯데 자이언츠"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === '기아'"
            src="@/assets/team_logo/HT.png"
            alt="KIA 타이거즈"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === '삼성'"
            src="@/assets/team_logo/SS.png"
            alt="삼성 라이온즈"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === 'NC'"
            src="@/assets/team_logo/NC.png"
            alt="NC 다이노스"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === '두산'"
            src="@/assets/team_logo/OB.png"
            alt="두산 베어스"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === 'LG'"
            src="@/assets/team_logo/LG.png"
            alt="LG 트윈스"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === '키움'"
            src="@/assets/team_logo/WO.png"
            alt="키움 히어로즈"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === 'SSG'"
            src="@/assets/team_logo/SK.png"
            alt="SSG 랜더스"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === '한화'"
            src="@/assets/team_logo/HH.png"
            alt="한화 이글스"
            width="40"
            height="40"
          />
          <img
            v-if="profileStore.profile.supportTeam === 'KT'"
            src="@/assets/team_logo/KT.png"
            alt="KT 위즈"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!isLoggedIn">
        <router-link to="/login" class="block">
          <div
            class="text-white rounded-t-lg p-5 grid place-content-center cursor-pointer"
          >
            <p class="text-2xl font-bold">My Team 을</p>
            <p class="text-2xl font-bold">설정하세요.</p>
          </div>
        </router-link>
      </div>
      <div v-else>
        <router-link to="/Myteam" class="block">
          <div
            class="text-white rounded-t-lg p-5 grid place-content-center cursor-pointer"
          >
            <p class="text-2xl font-bold">My Team 을</p>
            <p class="text-2xl font-bold">설정하세요.</p>
          </div>
        </router-link>
      </div>
    </div>

    <hr class="border-b" />

    <!-- 서울 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">서울</p>
      <div class="cursor-pointer" @click="setTeam('LG 트윈스', '잠실')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/LG.png"
            alt="LG 트윈스"
            width="40"
            height="40"
          />
          <p>LG 트윈스</p>
        </div>
      </div>
      <div class="cursor-pointer" @click="setTeam('두산 베어스', '잠실')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/OB.png"
            alt="두산 베어스"
            width="40"
            height="40"
          />
          <p>두산 베어스</p>
        </div>
      </div>
      <div class="cursor-pointer" @click="setTeam('키움 히어로즈', '고척')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/WO.png"
            alt="키움 히어로즈"
            width="40"
            height="40"
          />
          <p>키움 히어로즈</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 인천 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">인천</p>
      <div
        class="cursor-pointer"
        @click="setTeam('SSG 랜더스', '인천SSG랜더스필드')"
      >
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/SK.png"
            alt="SSG 랜더스"
            width="40"
            height="40"
          />
          <p>SSG 랜더스</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 수원 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">수원</p>
      <div
        class="cursor-pointer"
        @click="setTeam('KT 위즈', '수원 케이티 위즈 파크')"
      >
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/KT.png"
            alt="KT 위즈"
            width="40"
            height="40"
          />
          <p>KT 위즈</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 대구 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">대구</p>
      <div class="cursor-pointer" @click="setTeam('삼성 라이온즈', '대구')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/SS.png"
            alt="삼성 라이온즈"
            width="40"
            height="40"
          />
          <p>삼성 라이온즈</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 대전 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">대전</p>
      <div class="cursor-pointer" @click="setTeam('한화 이글스', '대전')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/HH.png"
            alt="한화 이글스"
            width="40"
            height="40"
          />
          <p>한화 이글스</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 광주 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">광주</p>
      <div class="cursor-pointer" @click="setTeam('KIA 타이거즈', '광주')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/HT.png"
            alt="KIA 타이거즈"
            width="40"
            height="40"
          />
          <p>KIA 타이거즈</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 부산 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">부산</p>
      <div class="cursor-pointer" @click="setTeam('롯데 자이언츠', '부산')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/LT.png"
            alt="롯데 자이언츠"
            width="40"
            height="40"
          />
          <p>롯데 자이언츠</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 창원 -->
    <div class="space-y-3 p-5">
      <p class="text-xl py-3">창원</p>
      <div class="cursor-pointer" @click="setTeam('NC 다이노스', '창원')">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/NC.png"
            alt="NC 다이노스"
            width="40"
            height="40"
          />
          <p>NC 다이노스</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />

    <!-- 기타 드롭다운 -->
    <div class="space-y-3 p-5">
      <div>
        <p
          @click="toggleDropdown('others', true)"
          @mouseleave="toggleDropdown('others', false)"
          class="text-xl font-bold cursor-pointer"
        >
          기타
        </p>
      </div>
      <div v-if="isDropdownOpen.others" class="ml-5 space-y-3">
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/SS.png"
            alt="삼성 라이온즈"
            width="40"
            height="40"
          />
          <p>삼성 라이온즈 - 포항</p>
        </div>
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/HH.png"
            alt="한화 이글스"
            width="40"
            height="40"
          />
          <p>한화 이글스 - 청주</p>
        </div>
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/team_logo/LT.png"
            alt="롯데 자이언츠"
            width="40"
            height="40"
          />
          <p>롯데 자이언츠 - 울산</p>
        </div>
      </div>
    </div>
    <hr class="border-b" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "vue-router";

const profileStore = useProfileStore();
const userStore = useUserStore();
const router = useRouter();

const isDropdownOpen = ref({
  others: false,
});

const toggleDropdown = (city, state) => {
  isDropdownOpen.value[city] = state;
};

const setTeam = (team, location) => {
  if (!isLoggedIn.value) {
    router.push("/login");
  } else {
    alert(`Selected Team: ${team} at ${location}`);
  }
};

// 프로필을 불러오는 함수
const loadProfile = async () => {
  const userId = userStore.user.userId; // 로그인한 사용자의 ID를 사용
  await profileStore.fetchProfile(userId);
};

const isLoggedIn = computed(() => !!userStore.accessToken);

onMounted(() => {
  if (isLoggedIn.value) {
    loadProfile();
  }
});
</script>

<style scoped></style>
