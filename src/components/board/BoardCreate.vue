<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Form Section -->
    <section class="py-24 bg-gray-100">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-gray-900">게시글 작성</h2>
        <p class="mt-6 text-gray-700">아래 양식을 작성하여 게시글을 등록하세요.</p>
        <form @submit.prevent="createBoard" class="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <fieldset>
            <legend class="text-xl font-semibold mb-4">등록</legend>
            <div class="mb-6">
              <label for="title" class="block text-left mb-2">제목 :</label>
              <input type="text" id="title" v-model="board.title" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400">
            </div>
            <div class="mb-6">
              <label for="userId" class="block text-left mb-2">사용자 ID :</label>
              <input type="number" id="userId" v-model="board.userId" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400">
            </div>
            <div class="mb-6">
              <label for="gameId" class="block text-left mb-2">게임 ID :</label>
              <input type="number" id="gameId" v-model="board.gameId" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400">
            </div>
            <div class="mb-6">
              <label for="seatInfo" class="block text-left mb-2">좌석 정보 :</label>
              <input type="text" id="seatInfo" v-model="board.seatInfo" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400">
            </div>
            <div class="mb-6">
              <label for="seatType" class="block text-left mb-2">좌석 유형 :</label>
              <select id="seatType" v-model="board.seatType" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400">
                <option value="LEFT">열정 공유</option>
                <option value="RIGHT">자리 공유</option>
              </select>
            </div>
            <div class="mb-6">
              <label for="detail" class="block text-left mb-2">내용 :</label>
              <textarea id="detail" cols="30" rows="10" v-model="board.detail" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400"></textarea>
            </div>
            <div class="mb-6">
              <label for="price" class="block text-left mb-2">가격 :</label>
              <input type="number" id="price" v-model="board.price" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400">
            </div>
            <div class="mb-6">
              <label for="ticketImg" class="block text-left mb-2">티켓 이미지 :</label>
              <input type="file" id="ticketImg" @change="onFileChange" class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400">
            </div>
            <div>
              <button type="submit" class="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 transition duration-300 transform hover:scale-105">
                등록
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBoardStore } from '@/stores/board'
import { useRouter } from 'vue-router'

const store = useBoardStore()
const router = useRouter()

const board = ref({
  userId: '',
  gameId: '',
  seatInfo: '',
  seatType: '',
  title: '',
  detail: '',
  price: '',
  ticketImg: null,
  viewCnt: 0
})

const createBoard = async () => {
  const formData = new FormData();
  for (const key in board.value) {
    formData.append(key, board.value[key]);
  }
  try {
    await store.createBoard(formData);
    router.push({ name: 'boardList' });
  } catch (error) {
    console.error("Failed to create board:", error);
  }
}

const onFileChange = (event) => {
  board.value.ticketImg = event.target.files[0];
}
</script>

<style scoped>
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

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>