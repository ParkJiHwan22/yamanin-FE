<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Game Information</h1>
    <div v-if="allGameDetails.count > 0">
      <p class="mb-2">Total Games: {{ allGameDetails.count }}</p>
      <ul class="list-disc list-inside">
        <li v-for="game in allGameDetails.games" :key="game.id" class="mb-2">
          <strong>{{ game.name }}</strong> - {{ game.description }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No game information available.</p>
    </div>
  </div>
</template>

<script>
import { useGameInfoStore } from '@/stores/gameInfo';
import { onMounted } from 'vue';

export default {
  name: 'GameInfoView',
  setup() {
    const { gameInfos, allGameDetails, fetchAllGameInfos } = useGameInfoStore();

    onMounted(() => {
      fetchAllGameInfos();
    });

    return {
      gameInfos,
      allGameDetails,
      fetchAllGameInfos
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>



<!-- <template>
    <div class="p-4 max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="flex items-center justify-between p-4">
          <button @click="prevMonth" class="text-gray-500 hover:text-gray-900">
            &lt;
          </button>
          <h2 class="text-lg font-semibold">{{ currentMonth }} {{ currentYear }}</h2>
          <button @click="nextMonth" class="text-gray-500 hover:text-gray-900">
            &gt;
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 p-4 relative">
          <div class="text-center font-medium" v-for="day in daysOfWeek" :key="day">
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
            :class="{'bg-blue-500 text-white': isToday(day), 'selected-day': isSelectedDay(day)}"
            @click="selectDate(day)"
          >
            {{ day }}
          </div>
          <div v-if="selectedDate" class="selected-pointer" :style="pointerStyle"></div>
        </div>
        <div v-if="selectedDate" class="p-4 border-t">
          <h3 class="text-lg font-semibold">Selected Date:</h3>
          <p>안녕하세요. 선택된 날짜는 {{ selectedDateFormatted }}입니다.</p>
          <div v-if="gameSchedule && gameSchedule.length > 0">
            <h4 class="mt-2 text-md font-semibold">경기 일정:</h4>
            <ul>
              <li v-for="game in gameSchedule" :key="game.title">
                {{ game.title }} - {{ game.time }}
              </li>
            </ul>
          </div>
          <div v-else>
            <p>해당 날짜에 경기가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      gameSchedule: [],
      pointerPosition: { top: 0, left: 0 }
    };
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonth() {
      return this.currentDate.toLocaleString('default', { month: 'long' });
    },
    daysOfWeek() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    },
    daysInMonth() {
      const days = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
    blankDays() {
      const firstDay = new Date(this.currentYear, this.currentDate.getMonth(), 1).getDay();
      return Array.from({ length: firstDay }, (_, i) => i + 1);
    },
    selectedDateFormatted() {
      if (!this.selectedDate) return '';
      return this.selectedDate.toLocaleDateString();
    },
    pointerStyle() {
      return {
        top: `${this.pointerPosition.top}px`,
        left: `${this.pointerPosition.left}px`,
      };
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.currentDate = new Date(this.currentDate);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate);
    },
    isToday(day) {
      const today = new Date();
      return (
        day === today.getDate() &&
        this.currentDate.getMonth() === today.getMonth() &&
        this.currentDate.getFullYear() === today.getFullYear()
      );
    },
    isSelectedDay(day) {
      return (
        this.selectedDate &&
        day === this.selectedDate.getDate() &&
        this.currentDate.getMonth() === this.selectedDate.getMonth() &&
        this.currentDate.getFullYear() === this.selectedDate.getFullYear()
      );
    },
    selectDate(day) {
      this.selectedDate = new Date(this.currentYear, this.currentDate.getMonth(), day);
      this.fetchGameSchedule();
      this.$nextTick(() => {
        const selectedElement = this.$el.querySelector('.selected-day');
        if (selectedElement) {
          const rect = selectedElement.getBoundingClientRect();
          const parentRect = this.$el.querySelector('.grid').getBoundingClientRect();
          this.pointerPosition = {
            top: rect.top - parentRect.top,
            left: rect.left - parentRect.left,
          };
        }
      });
    },
    fetchGameSchedule() {
      // 샘플 데이터로 교체
      const sampleSchedule = [
        { title: 'Team A vs Team B', time: '18:00' },
        { title: 'Team C vs Team D', time: '19:00' }
      ];
      
      const selectedDateString = this.selectedDate.toISOString().split('T')[0];
      
      // 날짜에 따라 샘플 데이터를 필터링 (여기서는 샘플 데이터를 사용)
      if (selectedDateString === '2024-05-21') {
        this.gameSchedule = sampleSchedule;
      } else {
        this.gameSchedule = [];
      }
    }
  },
};
</script>

<style scoped>
.selected-pointer {
  display: none; /* 파란 줄 숨기기 */
}

.selected-day::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: blue;
}
</style> -->
