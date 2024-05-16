<template>
    <div>
      <h4>게시글 작성</h4>
      <fieldset>
        <legend>등록</legend>
        <div>
          <label for="title">제목 : </label>
          <input type="text" id="title" v-model="board.title">
        </div>
        <div>
          <label for="userId">사용자 ID : </label>
          <input type="number" id="userId" v-model="board.userId">
        </div>
        <div>
          <label for="gameId">게임 ID : </label>
          <input type="number" id="gameId" v-model="board.gameId">
        </div>
        <div>
          <label for="seatInfo">좌석 정보 : </label>
          <input type="text" id="seatInfo" v-model="board.seatInfo">
        </div>
        <div>
          <label for="seatType">좌석 유형 : </label>
          <select id="seatType" v-model="board.seatType">
            <option value="LEFT">열정 공유</option>
            <option value="RIGHT">자리 공유</option>
          </select>
        </div>
        <div>
          <label for="detail">내용 : </label>
          <textarea id="detail" cols="30" rows="10" v-model="board.detail"></textarea>
        </div>
        <div>
          <label for="price">가격 : </label>
          <input type="number" id="price" v-model="board.price">
        </div>
        <div>
          <label for="ticketImg">티켓 이미지 : </label>
          <input type="file" id="ticketImg" @change="onFileChange">
        </div>
        <div>
          <label for="viewCnt">조회수 : </label>
          <input type="number" id="viewCnt" v-model="board.viewCnt">
        </div>
        <div>
          <button @click="createBoard">등록</button>
        </div>
      </fieldset>
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
      router.push({ name: 'BoardList' });
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  }
  
  const onFileChange = (event) => {
    board.value.ticketImg = event.target.files[0];
  }
  </script>
  
  <style scoped></style>