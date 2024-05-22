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

  // 세션 스토리지에서 프로필 정보 로드
  if (sessionStorage.getItem('profile')) {
    const savedProfile = JSON.parse(sessionStorage.getItem('profile'));
    Object.assign(profile, savedProfile);
  }

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
      // 세션 스토리지에 프로필 저장
      sessionStorage.setItem('profile', JSON.stringify({...profile, ...response.data}));
      return response.data;
    } catch (error) {
      console.error('Error uploading profile:', error);
    }
  };

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/profiles/${userId}`);
      Object.assign(profile, response.data);
      // 세션 스토리지에 프로필 저장
      sessionStorage.setItem('profile', JSON.stringify(profile));
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
      // 프로필 정보 업데이트 후 세션에 저장
      sessionStorage.setItem('profile', JSON.stringify({...profile, ...response.data}));
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    await fetchProfile(userId); // 프로필 동기화
  };

  return {
    profile,
    uploadProfile,
    fetchProfile,
    updateProfile
  };
});
