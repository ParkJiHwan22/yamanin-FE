<template>
  <div>
    <div class="flex justify-between p-10">
      <p class="text-4xl p-3">모집 게시판</p>
      <div class="flex space-x-4">
        <button @click="navigateToCreate" class="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-pink-500 transition duration-300 ease-in-out text-xl">글 작성하기</button>
      </div>
    </div>

    <div class="bg-white mx-10 mb-20 rounded-lg pt-5 shadow-lg">
      <div class="flex justify-between p-5">
        <div class="relative flex space-x-5">
          <div class="relative">
            <h1 @click="toggleSortDropdown" class="cursor-pointer hover:text-blue-500 flex items-center">
              {{ selectedSortText }}
              <i class="fas fa-caret-down ml-2"></i>
            </h1>
            <div v-if="isSortDropdownOpen" class="absolute bg-white shadow-md border mt-8 rounded-lg py-2 z-10">
              <h1 @click="selectSort('DAYS_LEFT')" class="cursor-pointer hover:bg-gray-100 px-4 py-2">전체 경기 보기</h1>
              <h1 @click="selectSort('LATEST')" class="cursor-pointer hover:bg-gray-100 px-4 py-2">오래된 순</h1>
              <h1 @click="selectSort('OLDEST')" class="cursor-pointer hover:bg-gray-100 px-4 py-2">최신순</h1>
            </div>
          </div>
          <div class="relative">
            <h1 @click="toggleFilterDropdown" class="cursor-pointer hover:text-blue-500 flex items-center">
              {{ selectedFilterText }}
              <i class="fas fa-caret-down ml-2"></i>
            </h1>
            <div v-if="isFilterDropdownOpen" class="absolute bg-white shadow-md border mt-8 rounded-lg py-2 z-10">
              <h1 @click="selectFilter('ALL')" class="cursor-pointer hover:bg-gray-100 px-4 py-2">전체 경기 보기</h1>
              <h1 @click="selectFilter('LEFT')" class="cursor-pointer hover:bg-gray-100 px-4 py-2">열정 공유</h1>
              <h1 @click="selectFilter('RIGHT')" class="cursor-pointer hover:bg-gray-100 px-4 py-2">좌석 공유</h1>
            </div>
          </div>
        </div>

        <h1>총 
          <span class="text-pink-500">
            {{ filteredBoardList.length }}
          </span>
          개의 게시물이 검색되었습니다.
        </h1>
      </div>
      <hr>

      <div v-for="board in sortedBoardList" :key="board.id" class="m-5 rounded-lg border-2 shadow-md">
        <div @click="navigateToDetail(board.postId)" class="grid grid-cols-3 gap-2 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <!--section 1-->
          <div class="col-span-1 m-5 ps-5 py-5 text-xl">
            <div class="space-x-5 mb-3">
              <span class="text-2xl font-bold">{{ getGameTitle(board.gameId) }}</span>
              <span :class="[getDaysClass(board.gameId), 'text-white text-lg mx-2 px-3 py-2 rounded-lg']">
                {{ getDaysUntilGame(board.gameId).text }}
              </span>
            </div>
            <p class="text-lg">{{ getGameDateTime(board.gameId) }}</p>
            <p class="text-lg">{{ getGameLocation(board.gameId) }}</p>
          </div>

          <!--section 2-->
          <div class="col-span-1 m-5 py-5">
            <p class="text-2xl pb-5 truncate">{{ board.title }}</p>
            <p class="text-xl truncate">{{ board.detail }}</p>
          </div>

          <!--section 3-->
          <div class="col-span-1 m-5 py-5 ps-10">
            <div>
              <span :class="[getSeatTypeClass(board.seatType), 'text-white text-xl mx-2 px-4 py-3 rounded-lg']">
                {{ getSeatTypeText(board.seatType) }}
              </span>
              <span class="color-pink-bg text-white text-xl mx-2 px-4 py-3 rounded-lg">1자리 남음</span>
            </div>

            <div class="flex justify-end pt-10 pe-12">
              <img src="https://sports-phinf.pstatic.net/team/kbo/default/LG.png?type=f108_108" alt="" width="40" height="40">
              <p class="p-2 pe-20">{{ getLoginId(board.userId) }}</p>
            </div>
          </div>

        </div>
      </div>

      <hr>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBoardStore } from '@/stores/board'
import { useRouter } from 'vue-router'
import { useGameInfoStore } from '@/stores/gameInfo'
import { useUserStore } from '@/stores/user'

const store = useBoardStore()
const gameStore = useGameInfoStore()
const userStore = useUserStore()
const router = useRouter()

const { boardList, getBoardList } = store
const { gameInfos, fetchAllGameInfos } = gameStore
const { userList, getAllUsers } = userStore

onMounted(() => {
  getBoardList()
  fetchAllGameInfos()
  getAllUsers()
})

const isSortDropdownOpen = ref(false)
const isFilterDropdownOpen = ref(false)
const selectedSort = ref('DAYS_LEFT')
const selectedFilter = ref('ALL')

const toggleSortDropdown = () => {
  isSortDropdownOpen.value = !isSortDropdownOpen.value
  if (isFilterDropdownOpen.value) {
    isFilterDropdownOpen.value = false
  }
}

const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value
  if (isSortDropdownOpen.value) {
    isSortDropdownOpen.value = false
  }
}

const selectSort = (sort) => {
  selectedSort.value = sort
  isSortDropdownOpen.value = false
}

const selectFilter = (filter) => {
  selectedFilter.value = filter
  isFilterDropdownOpen.value = false
}

const filteredBoardList = computed(() => {
  if (selectedFilter.value === 'ALL') {
    return boardList
  }
  return boardList.filter(board => board.seatType === selectedFilter.value)
})

const sortedBoardList = computed(() => {
  const sortedList = filteredBoardList.value.sort((a, b) => {
    const aDaysUntilGame = getDaysUntilGame(a.gameId).days
    const bDaysUntilGame = getDaysUntilGame(b.gameId).days

    if (aDaysUntilGame < 0 && bDaysUntilGame >= 0) return 1
    if (bDaysUntilGame < 0 && aDaysUntilGame >= 0) return -1
    if (selectedSort.value === 'LATEST') {
      return b.gameId - a.gameId
    } else if (selectedSort.value === 'OLDEST') {
      return a.gameId - b.gameId
    } else {
      return aDaysUntilGame - bDaysUntilGame
    }
  })

  return sortedList
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
  console.log(postId);
  store.fetchRequests(postId)
  router.push(`/board/${postId}`)
}

const navigateToCreate = () => {
  router.push('/board/create')
}

const navigateToMyPage = (userId) => {
  router.push(`/mypage/${userId}`)
}

const selectedSortText = computed(() => {
  if (selectedSort.value === 'OLDEST') {
    return '최신순'
  } else if (selectedSort.value === 'LATEST') {
    return '오래된 순'
  } else {
    return '전체 경기 보기'
  }
})

const selectedFilterText = computed(() => {
  if (selectedFilter.value === 'ALL') {
    return '전체 경기 보기'
  } else if (selectedFilter.value === 'LEFT') {
    return '열정 공유'
  } else {
    return '좌석 공유'
  }
})

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
    return 'color-pink-bg'
  }
}

const getGameLocation = (gameId) => {
  const game = gameInfos.find(game => game.gameId === gameId)
  return game ? game.gamePlace : '장소 정보 없음'
}

const getLoginId = (userId) => {
  const user = userList.find(user => user.userId === userId)
  return user ? user.nickName : '아이디 없음'
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
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>