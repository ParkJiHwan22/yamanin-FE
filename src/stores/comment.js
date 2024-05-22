import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = `http://localhost:8080/api/comments`;

export const useCommentStore = defineStore('comment', () => {
  const comments = ref([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      comments.value = response.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const fetchCommentById = async (commentId) => {
    try {
      const response = await axios.get(`${API_URL}/${commentId}`);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error('Failed to fetch comment:', error);
      return null;
    }
  };

  const addComment = async (comment) => {
    try {
      const response = await axios.post(`${API_URL}/`, comment);
      if (response.status === 201) {
        await fetchComments(); // 추가 후 댓글 목록 갱신
        return response.data;
      }
    } catch (error) {
      console.error('Failed to add comment:', error.response ? error.response.data : error.message);
    }
  };

  const updateComment = async (commentId, comment) => {
    try {
      const response = await axios.put(`${API_URL}/${commentId}`, comment);
      if (response.status === 200) {
        await fetchComments(); // 수정 후 댓글 목록 갱신
        return response.data;
      }
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`${API_URL}/${commentId}`);
      if (response.status === 204) {
        await fetchComments(); // 삭제 후 댓글 목록 갱신
        return true;
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
      return false;
    }
  };

  return {
    comments,
    fetchComments,
    fetchCommentById,
    addComment,
    updateComment,
    deleteComment
  };
}, {
  persist: true
});
