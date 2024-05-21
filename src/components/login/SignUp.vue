<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h4 class="mb-6 text-2xl font-semibold text-center text-gray-700">회원가입</h4>

        <div class="mb-6">
          <h5 class="text-xl font-semibold text-center text-gray-700">User List</h5>
          <ul class="user-list">
            <li v-for="user in store.userList" :key="user.id" class="mb-2 p-2 border-b border-gray-300">
              <p><strong>ID:</strong> {{ user.loginId }}</p>
            </li>
          </ul>
        </div>

        <div class="mb-4 flex items-center">
          <input type="text" placeholder="ID 입력" v-model.trim="loginId" class="input-text flex-grow"/>
          <button @click="checkLoginId" class="btn-small color-blue-bg hover:bg-blue-700 ml-2">ID 중복확인</button>
        </div>
        <div :class="passwordInputClass" class="mb-4">
          <input type="password" placeholder="PW 입력" v-model.trim="password" class="input-text"/>
        </div>
        <input type="password" placeholder="PW 확인" v-model.trim="confirmPassword" class="input-text"/>
        <p class="text-gray-500 text-xs mb-4">비밀번호는 8글자 이상, 특수 문자 사용입니다.</p>
        <input type="text" placeholder="이름 입력" v-model.trim="name" class="input-text"/>
        <input type="text" placeholder="전화번호 입력" v-model.trim="phone" class="input-text"/>
        <p class="text-gray-500 text-xs mb-4">-를 생략하고 넣어주세요. 예시: 01046992625</p>
        <div class="flex items-center mb-4">
          <input type="text" placeholder="이메일 입력" v-model.trim="emailLocalPart" class="input-text flex-grow"/>
          <span class="mx-2">@</span>
          <select v-model="emailDomain" class="input-text flex-grow">
            <option value="">직접 입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
          </select>
        </div>
        <input type="number" placeholder="나이 입력" v-model.trim="age" class="input-text"/>
        <select v-model="gender" class="input-text">
          <option disabled value="">성별 선택</option>
          <option value="1">남성</option>
          <option value="2">여성</option>
        </select>
        <div class="mb-4 flex items-center">
          <input type="text" placeholder="닉네임 입력" v-model.trim="nickName" class="input-text flex-grow"/>
          <button @click="checkNickName" class="btn-small color-pink-bg hover:bg-pink-700 text-sm ml-2">닉네임 중복확인</button>
        </div>
        <div class="mt-4 flex justify-between">
          <button @click="goBack" class="btn color-gray-bg hover:bg-gray-700">뒤로가기</button>
          <button @click="register" class="btn color-blue-bg hover:bg-blue-700">회원가입</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  
  const loginId = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const name = ref("");
  const phone = ref("");
  const emailLocalPart = ref("");
  const emailDomain = ref("");
  const age = ref("");
  const gender = ref("");
  const nickName = ref("");
  const store = useUserStore();
  const router = useRouter();
  
  const isLoginIdValid = ref(false);
  const isNickNameValid = ref(false);
  
  const passwordValid = computed(() => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password.value);
  });
  
  const passwordInputClass = computed(() => {
    return passwordValid.value ? 'border-green-500' : 'border-red-500';
  });
  
  const { userList, getAllUsers } = store;
  
  onMounted(() => {
    getAllUsers()
  });

  const checkLoginId = () => {
    const exists = userList.value.some(user => user.loginId === loginId.value);
    if (exists) {
      alert("이미 사용 중인 ID입니다.");
      isLoginIdValid.value = false;
    } else {
      alert("사용 가능한 ID입니다.");
      isLoginIdValid.value = true;
    }
  };
  
  const checkNickName = () => {
    const exists = userList.value.some(user => user.nickName === nickName.value);
    if (exists) {
      alert("이미 사용 중인 닉네임입니다.");
      isNickNameValid.value = false;
    } else {
      alert("사용 가능한 닉네임입니다.");
      isNickNameValid.value = true;
    }
  };
  
  const register = async () => {
    if (!isLoginIdValid.value) {
      alert('ID 중복 확인을 해주세요.');
      return;
    }
  
    if (!isNickNameValid.value) {
      alert('닉네임 중복 확인을 해주세요.');
      return;
    }
  
    if (!passwordValid.value) {
      alert('비밀번호는 8글자 이상, 특수문자를 포함해야 합니다.');
      return;
    }
  
    if (password.value !== confirmPassword.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    const userInfo = {
      loginId: loginId.value,
      password: password.value,
      name: name.value,
      phone: phone.value,
      email: `${emailLocalPart.value}@${emailDomain.value}`,
      age: age.value,
      gender: gender.value,
      nickName: nickName.value
    };
  
    try {
      await store.register(userInfo);
      alert('회원가입 성공');
      router.push('/login');
    } catch (err) {
      alert('회원가입 실패: ' + err.message);
    }
  };
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  .input-text {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-size: 16px;
    transition: all 0.3s;
  }
  
  .input-text:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
  
  .border-red-500 {
    border-color: #f56565;
  }
  
  .border-green-500 {
    border-color: #48bb78;
  }
  
  .btn, .btn-small {
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn {
    padding: 12px 20px;
  }
  
  .btn-small {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .color-blue-bg {
    background-color: #007bff;
  }
  
  .color-blue-bg:hover {
    background-color: #0056b3;
  }
  
  .color-pink-bg {
    background-color: #FF6666;
  }
  
  .color-pink-bg:hover {
    background-color: #c2185b;
  }
  
  .color-gray-bg {
    background-color: #6c757d;
  }
  
  .color-gray-bg:hover {
    background-color: #5a6268;
  }
  
  .user-list {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 0;
    list-style: none;
  }
  
  .user-list li {
    background-color: #f1f1f1;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  