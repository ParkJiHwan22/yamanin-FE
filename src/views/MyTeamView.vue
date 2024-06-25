<template>
  <div class="py-10">
    <p class="text-center text-3xl font-bold">마이 팀 설정하기</p>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 py-1 px-10"
    >
      <div
        v-for="team in teams"
        :key="team.name"
        :class="{
          'border-4 border-blue-500 p-4 rounded-lg': selectedTeam === team.name,
          'p-4 rounded-lg': selectedTeam !== team.name,
        }"
        class="flex flex-col items-center cursor-pointer"
        @click="selectTeam(team.name)"
      >
        <img
          :src="team.logo"
          alt=""
          class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
        />
        <label class="text-lg md:text-xl lg:text-2xl font-semibold mt-2">
          <input
            type="radio"
            v-model="selectedTeam"
            :value="team.name"
            class="hidden"
          />
          {{ team.name }}
        </label>
      </div>
    </div>
    <div class="flex justify-center py-10 space-x-4">
      <RouterLink to="/board">
        <button class="px-6 py-3 bg-gray-400 text-white rounded-lg text-xl">
          뒤로가기
        </button>
      </RouterLink>
      <button
        @click="submitTeam"
        :class="{
          'bg-blue-500 text-white': selectedTeam,
          'bg-gray-300 text-gray-500 cursor-not-allowed': !selectedTeam,
        }"
        class="px-6 py-3 rounded-lg text-xl"
        :disabled="!selectedTeam"
      >
        마이 팀 설정
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();

const { profile, updateProfile } = profileStore;

const teams = ref([
  { name: "롯데 자이언츠", logo: "src/assets/team_logo/LT.png" },
  { name: "기아 타이거즈", logo: "src/assets/team_logo/HT.png" },
  { name: "삼성 라이온즈", logo: "src/assets/team_logo/SS.png" },
  { name: "NC 다이노스", logo: "src/assets/team_logo/NC.png" },
  { name: "두산 베어스", logo: "src/assets/team_logo/OB.png" },
  { name: "LG 트윈스", logo: "src/assets/team_logo/LG.png" },
  { name: "키움 히어로즈", logo: "src/assets/team_logo/WO.png" },
  { name: "SSG 랜더스", logo: "src/assets/team_logo/SK.png" },
  { name: "한화 이글스", logo: "src/assets/team_logo/HH.png" },
  { name: "KT 위즈", logo: "src/assets/team_logo/KT.png" },
]);

const selectedTeam = ref("");

const selectTeam = (team) => {
  selectedTeam.value = team;
};

const submitTeam = async () => {
  if (!selectedTeam.value) return;

  const userId = profileStore.profile.userId;
  const file = profileStore.profile.profileImg;
  const profileText = profileStore.profile.profileText;
  const supportTeam = selectedTeam.value.split(" ")[0];

  try {
    await updateProfile(userId, file, profileText, supportTeam);
    console.log("Selected Team:", supportTeam);
  } catch (error) {
    console.error("Error submitting team:", error);
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
</style>
