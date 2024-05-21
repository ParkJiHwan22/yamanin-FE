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

            <div class="border rounded-lg shadow-lg p-5 space-y-2 mx-auto">
              <!--section 1-->
              <div class="col-span-1 m-5 text-xl">
                <div class="space-x-5 mb-3">
                  <p class="text-lg">{{ getGameDateTime(store.board.gameId) }}</p>
                  <span class="text-2xl font-bold">{{ getGameTitle(store.board.gameId) }}</span>
                  <p class="text-lg">{{ getGameLocation(store.board.gameId) }}</p>
                  <span class="color-pink-bg text-white text-lg mx-2 px-3 py-2 rounded-lg">
                    {{ getDaysUntilGame(store.board.gameId).text }}
                  </span>
                  <p class="text-lg">{{ store.board.seatInfo }}</p>
                  <p class="text-lg">가격: {{ store.board.price }}원</p>
                  <button class="color-navy-bg text-sm text-white py-2 px-4 rounded-xl hover:bg-blue-800 transition duration-300">
                    티켓 확인하기
                  </button>
                </div>
              </div>
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
import { useGameInfoStore } from '@/stores/gameInfo'

const store = useBoardStore()
const gameStore = useGameInfoStore()
const route = useRoute()

const board = ref({})
const { gameInfos, fetchAllGameInfos } = gameStore

onMounted(() => {
  store.getBoard(route.params.id)
  fetchAllGameInfos()
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

const getGameTitle = (gameId) => {
  const game = gameInfos.find(game => game.gameId === gameId)
  return game ? game.homeTeam + " vs " + game.awayTeam : '게임 정보 없음'
}

const getGameDateTime = (gameId) => {
  const game = gameInfos.find(game => game.gameId === gameId)
  if (game && game.gameDT) {
    const [datePart, timePart] = game.gameDT.split(' ')
    const [year, month, day] = datePart.split('-')

    const formattedMonth = parseInt(month, 10)
    const formattedDay = parseInt(day, 10)

    return `${formattedMonth}월 ${formattedDay}일 ${timePart}`
  }

  return '날짜 정보 없음'
}

const getDaysUntilGame = (gameId) => {
  const game = gameInfos.find(game => game.gameId === gameId)
  if (game && game.gameDT) {
    const gameDate = new Date(game.gameDT)
    const currentDate = new Date()
    const diffTime = gameDate - currentDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    console.log(`D - ${diffDays}`)

    if (diffDays < 0) {
      return { text: '종료', days: diffDays }
    } else if (diffDays === 0) {
      return { text: '오늘', days: diffDays }
    } else {
      return { text: `D - ${diffDays}`, days: diffDays }
    }
  }
  return { text: '날짜 정보 없음', days: null }
}

const getDaysClass = (gameId) => {
  const gameInfo = getDaysUntilGame(gameId)
  if (gameInfo.days < 0) {
    return 'bg-gray-500'
  } else if (gameInfo.days === 0) {
    return 'bg-pink-500'
  } else {
    return 'bg-navy-500'
  }
}


const getGameLocation = (gameId) => {
  const game = gameInfos.find(game => game.gameId === gameId)
  return game ? game.gamePlace : '장소 정보 없음'
}


</script>

<style scoped>
.color-pink-bg {
  background-color: #FF6666;
}
.color-blue-bg {
  background-color: #1e90ff;
}
.color-navy-bg {
  background-color: #000080;
}

</style>
