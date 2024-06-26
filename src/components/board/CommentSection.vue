<template>
  <div>
    <div class="border-t-4">
      <p class="p-5">댓글 {{ filteredComments.length }} 개</p>
    </div>
    <div class="border-t-4 py-5 px-5 flex items-center space-x-2">
      <input
        v-model="newComment"
        placeholder="댓글을 입력하세요"
        class="border rounded p-2 flex-grow"
      />
      <button
        @click="addNewComment"
        class="color-pink-bg text-white py-2 px-4 rounded-lg"
      >
        댓글 추가
      </button>
    </div>

    <div
      v-for="(comment, index) in displayedComments"
      :key="comment.id"
      class="border-t-4 py-5 px-5 flex flex-col space-y-4"
    >
      <div class="flex">
        <img
          :src="getUserProfileImage(comment.userId2)"
          alt="Profile Image"
          class="w-10 h-10 rounded-full me-2 transition-transform transform hover:scale-125"
          @click="goToUserProfile(comment.userId2)"
        />
        <div class="px-3">
          <p
            class="text-md cursor-pointer"
            @click="goToUserProfile(comment.userId2)"
          >
            {{ getNickName(comment.userId2) }}
          </p>
          <p class="text-xs">{{ comment.updatedDate }}</p>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-2">
          <p class="ps-2 py-5" v-if="!comment.editing">
            {{ comment.commentDetail }}
          </p>
          <input
            v-else
            v-model="comment.commentDetail"
            class="border rounded p-2 w-full"
          />
        </div>
        <div class="col-span-1">
          <div
            class="flex flex-row-reverse space-x-4 space-x-reverse"
            v-if="comment.userId2 === user.userId"
          >
            <button
              @click="deleteComment(comment.id)"
              class="color-pink-bg text-white py-1 px-2 rounded-md"
            >
              삭제
            </button>
            <button
              v-if="!comment.editing"
              @click="editComment(comment)"
              class="color-blue-bg text-white py-1 px-2 rounded-md"
            >
              수정
            </button>
            <button
              v-else
              @click="saveComment(comment)"
              class="color-blue-bg text-white py-1 px-2 rounded-md"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="filteredComments.length > commentsToShow"
      class="flex justify-center py-4 border-t-4"
    >
      <button
        @click="showMoreComments"
        class="color-gray-bg text-white py-2 px-4 rounded-lg"
      >
        더보기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCommentStore } from "@/stores/comment";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
});

const commentStore = useCommentStore();
const userStore = useUserStore();
const router = useRouter();

const { comments, fetchComments, addComment, updateComment, deleteComment } =
  commentStore;
const { user, userList, getAllUsers, setUser } = userStore;

const newComment = ref("");
const commentsToShow = ref(5); // 처음에 5개의 댓글을 보여줍니다.

onMounted(() => {
  fetchComments();
  getAllUsers();
});

const filteredComments = computed(() => {
  return comments.filter((comment) => comment.postId === props.postId);
});

const sortedComments = computed(() => {
  return [...filteredComments.value].sort(
    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
  );
});

const displayedComments = computed(() => {
  return sortedComments.value.slice(0, commentsToShow.value);
});

const addNewComment = async () => {
  if (newComment.value.trim() !== "") {
    const newCommentData = {
      postId: props.postId,
      userId2: user.userId,
      gameId2: props.gameId,
      commentDetail: newComment.value,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    await addComment(newCommentData);
    newComment.value = "";
  }
};

const editComment = (comment) => {
  comment.editing = true;
};

const saveComment = async (comment) => {
  if (comment.commentDetail.trim() !== "") {
    await updateComment(comment.id, { commentDetail: comment.commentDetail });
    comment.editing = false;
  }
};

const getNickName = (userId2) => {
  const user = userList.find((user) => user.userId === userId2);
  return user ? user.nickName : "아이디 없음";
};

const showMoreComments = () => {
  commentsToShow.value += 5;
};

const goToUserProfile = (userId2) => {
  const selectedUser = userList.find((user) => user.userId === userId2);
  if (selectedUser) {
    setUser(selectedUser);
    router.push(`/profile/${userId2}`);
  }
};

const getUserProfileImage = (userId2) => {
  const user = userList.find((user) => user.userId === userId2);
  return user ? `data:image/jpeg;base64,${user.profileImg}` : null;
};
</script>

<style scoped>
.color-blue-bg {
  background-color: #1e90ff;
}

.color-gray-bg {
  background-color: #9b9b9b;
}

.color-pink-bg {
  background-color: #ff6666;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
