import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const API_URL = `http://localhost:8080/api/gameinfos`;

export const useGameInfoStore = defineStore('gameInfo', () => {
  const gameInfos = ref([]);
  const allGameDetails = ref({});

  // const fetchAllGameInfos = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/`)
  //     gameInfos.value = response.data
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const fetchAllGameInfos = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      gameInfos.value = response.data;
      allGameDetails.value = { count: response.data.length, games: response.data };
    } catch (err) {
      console.error('Failed to fetch game infos:', err);
    }
  };

  console.log(gameInfos)
  console.log(allGameDetails)

  const fetchGameInfoById = async (gameId) => {
    try {
      const response = await axios.get(`${API_URL}/${gameId}`);
      return response.status === 200 ? response.data : null;
    } catch (err) {
      console.error('Failed to fetch game info:', err);
      return null;
    }
  };

  const addGameInfo = async (gameInfo) => {
    try {
      const response = await axios.post(`${API_URL}/`, gameInfo);
      if (response.status === 200) {
        await fetchAllGameInfos(); // Refresh after adding
        router.push({ name: 'GameList' });
        return response.data;
      }
    } catch (err) {
      console.error('Failed to add game info:', err);
    }
  };

  const deleteGameInfo = async (gameId) => {
    try {
      const response = await axios.delete(`${API_URL}/${gameId}`);
      if (response.status === 200) {
        await fetchAllGameInfos(); // Refresh after deleting
        return response.data;
      }
    } catch (err) {
      console.error('Failed to delete game info:', err);
    }
  };

  return {
    gameInfos,
    allGameDetails,
    fetchAllGameInfos,
    fetchGameInfoById,
    addGameInfo,
    deleteGameInfo
  };
});
