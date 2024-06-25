<template>
  <div class="py-10">
    <p class="text-3xl mt-10 ms-20">{{ selectedDateFormatted }}</p>
  </div>
  <div class="grid grid-cols-2 gap-4 my-5 pb-16">
    <!-- Trendy Calendar -->
    <div class="mx-auto col-span-1 w-full ps-20 pe-5 py-10">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="flex items-center justify-between p-4">
          <button @click="prevMonth" class="text-gray-500 hover:text-gray-900">
            &lt;
          </button>
          <h2 class="text-lg font-semibold">
            {{ currentYear }}년 {{ currentMonth }}
          </h2>
          <button @click="nextMonth" class="text-gray-500 hover:text-gray-900">
            &gt;
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 p-4 relative">
          <div
            class="text-center font-medium"
            v-for="day in daysOfWeek"
            :key="day"
          >
            {{ day }}
          </div>
          <div
            class="text-center p-2 rounded-lg hover:bg-blue-100"
            v-for="blank in blankDays"
            :key="'blank-' + blank"
          ></div>
          <div
            class="text-center p-2 rounded-lg hover:bg-blue-100 cursor-pointer relative"
            v-for="day in daysInMonth"
            :key="day"
            :class="{
              'bg-blue-500 text-white': isToday(day),
              'selected-day': isSelectedDay(day),
            }"
            @click="selectDate(day)"
          >
            {{ day }}
          </div>
          <div
            v-if="selectedDate"
            class="selected-pointer"
            :style="pointerStyle"
          ></div>
        </div>
      </div>
    </div>

    <div class="p-4 mx-auto col-span-1 w-full">
      <!-- Game Information -->
      <div v-if="filteredGames.length > 0">
        <div class="ms-5 me-20 mt-6 mb-10">
          <div
            v-for="game in filteredGames"
            :key="game.gameId"
            class="flex items-center justify-between p-4 border-b"
          >
            <div class="text-center min-w-[50px]">
              <p class="text-gray-700">{{ game.gameDT.split(" ")[1] }}</p>
            </div>
            <div class="text-center min-w-[70px]">
              <p class="text-gray-700">{{ game.gamePlace }}</p>
            </div>
            <div class="flex items-center min-w-[80px]">
              <img
                :src="getTeamImage(game.homeTeam)"
                alt="Home Team Logo"
                class="h-8 w-8 mr-2"
              />
              <p class="text-gray-700 font-semibold">{{ game.homeTeam }}</p>
            </div>
            <div
              class="flex justify-center items-center space-x-5 min-w-[160px]"
            >
              <p
                v-if="game.gameStatus !== '예정' && game.gameStatus !== '취소'"
                class="text-gray-700 font-semibold"
              >
                {{ game.homeScore }}
              </p>
              <p v-else class="text-gray-700">&nbsp;</p>
              <p class="text-blue-500">{{ game.gameStatus }}</p>
              <p
                v-if="game.gameStatus !== '예정' && game.gameStatus !== '취소'"
                class="text-gray-700 font-semibold"
              >
                {{ game.awayScore }}
              </p>
              <p v-else class="text-gray-700">&nbsp;</p>
            </div>
            <div class="flex items-center min-w-[80px]">
              <img
                :src="getTeamImage(game.awayTeam)"
                alt="Away Team Logo"
                class="h-8 w-8 mr-2"
              />
              <p class="text-gray-700 font-semibold">{{ game.awayTeam }}</p>
            </div>
            <span
              @click="navigateToBoardSearch(game.gameId)"
              class="color-pink-bg text-white text-sm mx-2 px-3 py-2 rounded-lg cursor-pointer"
              >바로가기</span
            >
          </div>
        </div>
      </div>
      <div v-else class="mt-40 text-center">
        <p>해당 날짜는 경기가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useGameInfoStore } from "@/stores/gameInfo";
import { useRouter } from "vue-router";

const store = useGameInfoStore();
const router = useRouter();

const { gameInfos, fetchAllGameInfos } = useGameInfoStore();

onMounted(() => {
  fetchAllGameInfos();
  // 초기값으로 오늘 날짜를 설정합니다.
  selectDate(new Date().getUTCDate());
});

const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const pointerPosition = ref({ top: 0, left: 0 });

watch(selectedDate, () => {
  selectedDateFormatted.value = selectedDate.value
    ? formatDate(selectedDate.value)
    : "";
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});
const currentMonth = computed(() => {
  return currentDate.value.toLocaleString("default", { month: "long" });
});
const daysOfWeek = computed(() => {
  return ["일", "월", "화", "수", "목", "금", "토"];
});
const daysInMonth = computed(() => {
  const days = new Date(
    currentYear.value,
    currentDate.value.getMonth() + 1,
    0
  ).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
});
const blankDays = computed(() => {
  const firstDay = new Date(
    currentYear.value,
    currentDate.value.getMonth(),
    1
  ).getDay();
  return Array.from({ length: firstDay }, (_, i) => i + 1);
});
const selectedDateFormatted = ref("");
const pointerStyle = computed(() => {
  return {
    top: `${pointerPosition.value.top}px`,
    left: `${pointerPosition.value.left}px`,
  };
});

const prevMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() - 1);
  currentDate.value = new Date(currentDate.value);
};
const nextMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() + 1);
  currentDate.value = new Date(currentDate.value);
};
const isToday = (day) => {
  const today = new Date();
  return (
    day === today.getUTCDate() &&
    currentDate.value.getMonth() === today.getMonth() &&
    currentDate.value.getFullYear() === today.getFullYear()
  );
};
const isSelectedDay = (day) => {
  return (
    selectedDate.value &&
    day === selectedDate.value.getUTCDate() &&
    currentDate.value.getMonth() === selectedDate.value.getMonth() &&
    currentDate.value.getFullYear() === selectedDate.value.getFullYear()
  );
};
const selectDate = (day) => {
  selectedDate.value = new Date(
    Date.UTC(currentYear.value, currentDate.value.getMonth(), day)
  );
  pointerPosition.value = { top: 0, left: 0 }; // hide pointer
};

const filteredGames = computed(() => {
  if (!selectedDate.value) return [];
  const selectedDateString = selectedDate.value.toISOString().split("T")[0];
  return store.gameInfos.filter(
    (game) => game.gameDT.split(" ")[0] === selectedDateString
  );
});

const getTeamImage = (teamName) => {
  const teamImages = {
    롯데: "src/assets/team_logo/LT.png",
    KIA: "src/assets/team_logo/HT.png",
    삼성: "src/assets/team_logo/SS.png",
    NC: "src/assets/team_logo/NC.png",
    두산: "src/assets/team_logo/OB.png",
    LG: "src/assets/team_logo/LG.png",
    키움: "src/assets/team_logo/WO.png",
    SSG: "src/assets/team_logo/SK.png",
    한화: "src/assets/team_logo/HH.png",
    KT: "src/assets/team_logo/KT.png",
  };

  return teamImages[teamName] || "";
};

// 날짜 형식 변경 함수
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return date.toLocaleDateString("ko-KR", options);
};

const navigateToBoardSearch = (gameId) => {
  router.push({ path: "/board", query: { gameId } });
};
</script>
