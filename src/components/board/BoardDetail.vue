<template>
    <div>
      <div class="p-10">
        <p class="text-3xl">게시글 상세 정보</p>
      </div>
  
      <div class="bg-white mx-10 mb-20 rounded-lg pt-5">
        <div class="p-5">
          <h1 class="text-2xl">{{ store.board.title }}</h1>
          <!-- <p class="text-sm text-gray-500">{{ formatDate(store.board.createdDate) }}</p> -->
          <p class="mt-5">{{ store.board.detail }}</p>
          <div class="mt-5">
            <span class="color-pink-bg text-white text-sm mx-2 px-3 py-2 rounded-lg">
              {{ getSeatTypeText(store.board.seatType) }}
            </span>
          </div>
          <div class="mt-5">
            <p>가격: {{ store.board.price }}원</p>
            <p>조회수: {{ store.board.viewCnt }}</p>
          </div>
          <div class="mt-5">
            <p>작성자: {{ store.board.loginId }}</p>
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
  
  const boardId = ref(route.params.id)

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