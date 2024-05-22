import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive } from 'vue';

export const useProfileStore = defineStore('profile', () => {
  const profile = reactive({
    userId: null,
    profileImg: '',
    profileText: '',
    supportTeam: ''
  });

  const uploadProfile = async (userId, file, profileText, supportTeam) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);
    formData.append('profileText', profileText);
    formData.append('supportTeam', supportTeam);

    try {
      const response = await axios.post('/api/profiles/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading profile:', error);
    }
  };

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/profiles/${userId}`);
      Object.assign(profile, response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async (userId, file, profileText, supportTeam) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);
    formData.append('profileText', profileText);
    formData.append('supportTeam', supportTeam);

    try {
      const response = await axios.put(`/api/profiles/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    await fetchProfile(user.userId); // 프로필 동기화
  };

  return {
    profile,
    uploadProfile,
    fetchProfile,
    updateProfile
  };
});
