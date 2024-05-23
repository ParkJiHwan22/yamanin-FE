import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `http://localhost:8080/api-postItems`
const REST_REQUEST_API = `http://localhost:8080/reservation_requests`

export const useBoardStore = defineStore('board', () => {
  const createBoard = function (board) {
    axios({
      url: REST_BOARD_API,
      method: 'POST',
      data: board
    })
      .then(() => {
        router.push({ name: 'boardList' })
      })
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
  const getBoard = async (id) => {
    try {
      const response = await axios.get(`${REST_BOARD_API}/${id}`)
      board.value = response.data
    } catch (err) {
      console.error(err)
    }
  }

  const updateBoard = function () {
    axios.put(REST_BOARD_API, board.value)
      .then(() => {
        router.push({ name: 'BoardList' })
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

  const requests = ref([])
  const fetchRequests = async (postId) => {
    try {
      const response = await axios.get(`${REST_REQUEST_API}/${postId}`)
      requests.value = response.data
      sessionStorage.setItem('reservation_requests', JSON.stringify(response.data))
    } catch (error) {
      console.error('Failed to fetch reservation requests:', error)
    }
  }

  return {
    createBoard,
    boardList,
    getBoardList,
    board,
    getBoard,
    updateBoard,
    searchBoardList,
    requests,
    fetchRequests
  }
}, {
  persist: true
})
