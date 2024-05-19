import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `http://localhost:8080/api-postItems`

export const useBoardStore = defineStore('board', () => {
  const createBoard = function (board) {
    axios({
      url: REST_BOARD_API,
      method: 'POST',
      data: board
    })
      .then(() => {
        router.push({ name: 'boardList' })      })
      .catch((err) => {
      console.log(err)
    })
  }

  const boardList = ref([])
  const getBoardList = async () => {
    try {
      const response = await axios.get(`${REST_BOARD_API}/`)
      boardList.value = response.data
    } catch (err) {
      console.error(err)
    }
  }

  const board = ref({})
  const getBoard = function (id) {
    axios.get(`${REST_BOARD_API}/${id}`)
      .then((response) => {
      board.value = response.data
    })
  }

  const updateBoard = function () {
    axios.put(REST_BOARD_API, board.value)
      .then(() => {
      router.push({name: 'BoardList'})
    })
  }

  const searchBoardList = function (searchCondition) {
    axios.get(REST_BOARD_API, {
      params: searchCondition
    })
      .then((res) => {
      boardList.value = res.data
    })
  }

  return { createBoard, boardList, getBoardList, board, getBoard, updateBoard, searchBoardList}
})