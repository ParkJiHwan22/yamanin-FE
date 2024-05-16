<template>
    <div>
        <div class="p-10">
                <p class="text-3xl">모집 게시판</p>
            </div>

            <div class="bg-white mx-10 mb-20 rounded-lg pt-5">
                <div class="flex justify-between p-5">
                    <div class="flex justify-between space-x-5">
                        <h1>최신순</h1>
                        <h1>전체</h1>
                    </div>

                    <h1>총 
                        <span class="color-pink-text">
                            {{ store.boardList.length }}
                        </span>
                        개의 게시물이 검색되었습니다.</h1>
                </div>
                <hr>

                <div v-for="board in store.boardList" :key="board.id">
                    <div class="grid grid-cols-6 gap-2 p-2 m-5 rounded-lg border-2">
                        <div class="col-span-2 ps-5 py-5 text-xl">
                            <div>{{ board.postId  }}</div>
                            <div class="space-x-5">
                                <span>5월 9일 18시 30분</span>
                                <span class="color-pink-bg text-white text-sm mx-2 px-3 py-2 rounded-lg">D - 2</span>
                            </div>
                            <p>LG vs 두산</p>
                            <p>잠실종합야구장</p>
                        </div>

                        <div class="col-span-3 py-5">
                            <RouterLink :to="`/board/${board.postId}`">{{ board.title }}</RouterLink>
                            <p class="text-2xl pb-5">{{ board.title }}</p>
                            <p class="text-xl">{{ board.detail }}</p>
                        </div>

                        <div class="col-span-1 py-5">
                            <div class="p-2">
                                <span class="color-pink-bg text-white text=sm mx-2 px-3 py-2 rounded-lg">
                                    {{ getSeatTypeText(board.seatType) }}
                                </span>
                                <span class="color-pink-bg text-white text-sm mx-2 px-3 py-2 rounded-lg">
                                    {{ getSeatTypeText(board.seatType) }}
                                </span>
                            </div>

                            <div class="p-2">
                                <span>
                                    조회수: {{ board.viewCnt }}
                                </span>
                                <span>
                                    <p>{{ board.createdDate }}</p>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                <hr>
            </div>
    </div>
</template>

<script setup>
import { onMounted, computed  } from 'vue'
import { useBoardStore } from '@/stores/board'

const store = useBoardStore()

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

</script>

<style scoped>

</style>