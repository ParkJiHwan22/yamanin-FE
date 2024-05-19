<template>
  <div>
    <div class="p-10">
      <p class="text-3xl">게시글 상세 정보</p>
    </div>

    <div class="bg-white mx-10 mb-20 rounded-lg pt-5 shadow-lg">
      <div>
        <div class="flex justify-between items-center space-x-4 mb-4 ps-4">
          <div class="flex space-x-3">
            <img src="https://via.placeholder.com/40" alt="logo2" class="w-10 h-10 rounded-full">
            <p class="text-2xl mt-1">jh0522</p>
          </div>
          <div class="pe-5">
            <p>매너점수: 4.57/5</p>
          </div>
        </div>
        <hr class="border-t-4">
        <div class="grid grid-cols-3">
          <div class="col-span-2 border-r-4">
            <div class="p-10">
              <div class="flex justify-between">
                <div class="flex text-justify space-x-5">
                  <p class="text-2xl">{{ store.board.title }}</p>
                  <span class="color-pink-bg text-white text-md px-3 mt-2 rounded-lg whitespace-nowrap">
                    D - 2
                  </span>
                </div>
                <div class="flex space-x-3">
                  <div class="flex space-x-2 mt-1">
                    <span>
                      <img src="@/assets/icon-love.png" alt="icon-love">
                    </span>
                    <p>0</p>
                  </div>
                  <div class="mt-1">
                    <p>조회 {{ store.board.viewCnt }}</p>
                  </div>
                </div>
              </div>
              <div class="space-x-3 pb-20 pt-5">
                <span class="color-pink-bg text-white text-sm px-3 py-2 rounded-lg">
                  {{ getSeatTypeText(store.board.seatType) }}
                </span>
                <span class="color-pink-bg text-white text-sm px-3 py-2 rounded-lg">
                  1자리 남음
                </span>
              </div>
              <p class="mt-5">{{ store.board.detail }}</p>
            </div>

            <div class="border-t-4">
              <p class="p-5">댓글 3 개</p>
            </div>
            <div class="border-t-4 py-5 px-5">
              <p>댓글입니다.</p>
            </div>
            <div class="border-t-4 py-5 px-5">
              <p>댓글입니다.</p>
            </div>
            <div class="border-t-4 py-5 px-5">
              <p>댓글입니다.</p>
            </div>
            <div class="border-t-4 py-5 px-5">
              <p>댓글입니다.</p>
            </div>
            <div class="border-t-4 py-5 px-5">
              <p>댓글입니다.</p>
            </div>
            <div class="border-t-4 py-5 px-5">
              <p>댓글입니다.</p>
            </div>
          </div>

          <!-- 예약 -->
          <div class="col-span-1 text-center p-5">
            <div class="border rounded-lg shadow-lg p-5 space-y-2">
              <p class="text-lg mb-2">5월 9일 18시 30분</p>
              <p class="text-2xl font-bold mb-2">LG vs 두산</p>
              <p class="mb-4">잠실종합야구장</p>
              <p class="text-lg text-navy-800">네이비석 312블록 5열</p>
              <p class="text-lg">가격: {{ store.board.price }}원</p>
              <button class="color-navy-bg text-sm text-white py-2 px-4 rounded-xl hover:bg-blue-800 transition duration-300">
                티켓 확인하기
              </button>
            </div>
            <div class="mt-5">
              <div class="border rounded-lg shadow-lg p-5">
                <div class="flex items-center space-x-4 mb-4">
                  <img src="https://via.placeholder.com/40" alt="logo1" class="w-10 h-10 rounded-full">
                  <p>Jihwan</p>
                </div>
                <div class="flex items-center space-x-4 mb-4">
                  <img src="https://via.placeholder.com/40" alt="logo2" class="w-10 h-10 rounded-full">
                  <p>jh0522</p>
                </div>
                <div class="flex items-center space-x-4 mb-4">
                  <img src="https://via.placeholder.com/40" alt="logo3" class="w-10 h-10 rounded-full">
                  <p>bat522</p>
                </div>
                <div class="border-t pt-4">
                  <button class="w-full border border-dashed rounded-full py-2 text-gray-400 hover:text-gray-600 transition duration-300">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBoardStore } from '@/stores/board'

const store = useBoardStore()
const route = useRoute()

// const boardId = ref(route.params.id)

const board = ref({})  
onMounted(() => {
  store.getBoard(route.params.id)
})


const getSeatTypeText = (seatType) => {
  if (seatType === 'LEFT') {
    return '열정 공유'
  } else if (seatType === 'RIGHT') {
    return '좌석 공유'
  } else {
    return seatType
  }
}


</script>

<style scoped>

</style>
