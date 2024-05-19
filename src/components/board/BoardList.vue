<template>
    <div>
        <div class="flex justify-between p-10">
            <p class="text-4xl p-3">모집 게시판</p>
            <div class="flex space-x-4">
                <button @click="navigateToCreate" class="color-pink-bg text-white px-4 py-2 rounded-xl hover:bg-pink-500 transition duration-300 ease-in-out text-xl">글 작성하기</button>
                <button @click="navigateToMyPage(1)" class="color-blue-bg text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition duration-300 ease-in-out text-xl">마이 페이지</button>
            </div>
        </div>
  
        <div class="bg-white mx-10 mb-20 rounded-lg pt-5 shadow-lg">
            <div class="flex justify-between p-5">
                <div class="flex space-x-5">
                    <h1 class="cursor-pointer hover:text-blue-500">최신순</h1>
                    <h1 class="cursor-pointer hover:text-blue-500">전체</h1>
                </div>
  
                <h1>총 
                    <span class="text-pink-500">
                        {{ store.boardList.length }}
                    </span>
                    개의 게시물이 검색되었습니다.
                </h1>
            </div>
            <hr>
  
            <div v-for="board in store.boardList" :key="board.id" class="m-5 rounded-lg border-2 shadow-md">
                <div @click="navigateToDetail(board.postId)" class="grid grid-cols-3 gap-2 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1">
                    
                    <!--section 1-->
                    <div class="col-span-1 ps-5 py-5 text-xl">
                        <div class="space-x-5 mb-3">
                            <span class="text-2xl font-bold">LG vs 두산</span>
                            <span class="color-pink-bg text-white text-lg mx-2 px-3 py-2 rounded-lg">D - 2</span>
                        </div>
                        <p class="text-lg">5월 9일 18시 30분</p>
                        <p class="text-lg">잠실종합야구장</p>
                    </div>
  
                    <!--section 2-->
                    <div class="col-span-1 py-5">
                        <p class="text-2xl pb-5">{{ board.title }}</p>
                        <p class="text-xl">{{ board.detail }}</p>
                    </div>
  
                    <!--section 3-->
                    <div class="col-span-1 py-5 ps-10">
                        <div>
                            <span :class="[getSeatTypeClass(board.seatType), 'text-white text-xl mx-2 px-4 py-3 rounded-lg']">
                                {{ getSeatTypeText(board.seatType) }}
                            </span>
                            <span class="color-pink-bg text-white text-xl mx-2 px-4 py-3 rounded-lg">1자리 남음</span>
                        </div>
  
                        <div class="p-2">
                            <span>조회수: {{ board.viewCnt }}</span>
                            <span><p>{{ board.createdDate }}</p></span>
                        </div>
                    </div>
  
                </div>
            </div>
  
            <hr>
        </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useBoardStore } from '@/stores/board'
  import { useRouter } from 'vue-router'
  
  const store = useBoardStore()
  const router = useRouter()
  
  const { boardList, getBoardList } = store
  
  onMounted(() => {
      getBoardList()
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
  
  const getSeatTypeClass = (seatType) => {
      if (seatType === 'LEFT') {
          return 'color-pink-bg'
      } else if (seatType === 'RIGHT') {
          return 'color-navy-bg'
      } else {
          return ''
      }
  }
  
  const navigateToDetail = (postId) => {
      router.push(`/board/${postId}`)
  }
  
  const navigateToCreate = () => {
      router.push('/board/create')
  }
  
  const navigateToMyPage = (userId) => {
      router.push(`/mypage/${userId}`)
  }
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  