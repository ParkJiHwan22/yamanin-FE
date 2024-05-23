<template>
    <div v-if="showModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 w-1/2">
        <button @click="closeModal" class="absolute top-0 right-0 mt-4 mr-4 text-gray-700">&times;</button>
        <h2 v-if="isReservationList" class="text-2xl mb-4">예약 신청 리스트</h2>
        <h2 v-else class="text-2xl mb-4">예약 신청하기</h2>
        <div v-if="isReservationList">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자 이름</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">신청 날짜</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">행동</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="request in requests" :key="request.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ request.userName }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ new Date(request.requestDate).toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="acceptRequest(request.id)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    수락
                  </button>
                  <button @click="rejectRequest(request.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                    반려
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" @click="closeModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            취소
          </button>
        </div>
        <div v-else>
          <form @submit.prevent="submitRequest">
            <div class="mb-4">
              <label for="userName" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름:</label>
              <input type="text" v-model="userName" id="userName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled>
            </div>
            <div class="flex items-center justify-between">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                신청하기
              </button>
              <button type="button" @click="closeModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBoardStore } from '@/stores/board'
  import axios from 'axios'
  import { useUserStore } from '@/stores/user'
  
  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true
      },
      isReservationList: {
        type: Boolean,
        required: true
      }
    },
    setup(props, { emit }) {
      const store = useBoardStore()
      const showModal = ref(props.showModal)
      const isReservationList = ref(props.isReservationList)
      const userName = ref('')
      const requests = ref(JSON.parse(sessionStorage.getItem('reservation_requests')) || [])
      const route = useRoute()
      const userStore = useUserStore()
  
      const loginUser = JSON.parse(sessionStorage.getItem('loginUser'))
      const { getReservationsByGameId } = userStore
  
      // Null 체크 추가
      if (loginUser && loginUser.name) {
        userName.value = loginUser.name
      } else {
        console.error('loginUser is null or name property is missing')
      }
  
      const postId = route.params.id
  
      const closeModal = () => {
        showModal.value = false
        emit('close')
      }
  
      const submitRequest = async () => {
        console.log('submitRequest called'); // 함수 호출 확인
        try {
          const response = await axios.post('http://localhost:8080/reservation_requests/', {
            postId,
            userId: loginUser.userId,
            userName: loginUser.name
          })
          console.log('submitRequest response:', response.data); // 응답 데이터 콘솔 출력
          alert('예약 신청이 완료되었습니다.')
          await getReservationsByGameId(store.board.gameId)
          closeModal()
        } catch (error) {
          console.error('Failed to submit reservation request:', error)
          alert('예약 신청에 실패했습니다.')
        }
      }
  
      watch(() => props.showModal, async (newVal) => {
        showModal.value = newVal
        console.log(postId);
        if (newVal && isReservationList.value) {
          console.log(postId);
          await store.fetchRequests(postId)
          requests.value = JSON.parse(sessionStorage.getItem('reservation_requests')) || []
          console.log(requests.value);
        }
      })
  
      watch(() => props.isReservationList, (newVal) => {
        isReservationList.value = newVal
        console.log(isReservationList.value = newVal);
        getReservationsByGameId(store.board.gameId)
      })
  
      const acceptRequest = async (requestId) => {
        try {
          const gameId = store.board.gameId; // gameId 가져오기
          const response = await axios.post(`http://localhost:8080/reservation_requests/accept/${requestId}`, null, {
            params: { gameId: gameId }  // gameId 추가
          })
          console.log('acceptRequest response:', response.data)
          alert('예약이 수락되었습니다.')
          await store.fetchRequests(postId)
          await getReservationsByGameId(store.board.gameId)
          requests.value = JSON.parse(sessionStorage.getItem('reservation_requests')) || []
          closeModal()  // 모달 닫기
          window.location.reload()  // 페이지 새로고침
        } catch (error) {
          console.error('Failed to accept reservation request:', error)
          await getReservationsByGameId(store.board.gameId)
          alert('예약 수락에 실패했습니다.')
        }
      }
  
      const rejectRequest = async (requestId) => {
        try {
          const response = await axios.post(`http://localhost:8080/reservation_requests/reject/${requestId}`)
          console.log('rejectRequest response:', response.data)
          alert('예약이 반려되었습니다.')
          await store.fetchRequests(postId)
          await getReservationsByGameId(store.board.gameId)
          requests.value = JSON.parse(sessionStorage.getItem('reservation_requests')) || []
          closeModal()  // 모달 닫기
          window.location.reload()  // 페이지 새로고침
        } catch (error) {
          console.error('Failed to reject reservation request:', error)
          await getReservationsByGameId(store.board.gameId)
          alert('예약 반려에 실패했습니다.')
        }
      }
  
      return {
        showModal,
        isReservationList,
        userName,
        requests,
        closeModal,
        submitRequest,
        acceptRequest,
        rejectRequest
      }
    }
  }
  </script>
  
  <style scoped>
  .fixed {
    position: fixed;
  }
  </style>
  