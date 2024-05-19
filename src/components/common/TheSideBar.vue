<template>
    <div class="text-white rounded-lg shadow-md my-5">
      <div class="text-white rounded-t-lg p-5 grid place-content-center">
        <p class="text-2xl font-bold">My Team 을</p>
        <p class="text-2xl font-bold">설정하세요.</p>
      </div>
      <hr class="border-b">
      
      <!-- 서울 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('seoul')" class="text-xl font-bold cursor-pointer">서울</p>
        </div>
        <div v-if="isDropdownOpen.seoul" class="ml-5 space-y-3">
          <div>
            <p>서울종합운동장 야구장</p>
            <p>LG 트윈스</p>
          </div>
          <div>
            <p>서울종합운동장 야구장</p>
            <p>두산 베어스</p>
          </div>
          <div>
            <p>고척스카이돔</p>
            <p>키움 히어로즈</p>
          </div>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 인천 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('incheon')" class="text-xl font-bold cursor-pointer">인천</p>
        </div>
        <div v-if="isDropdownOpen.incheon" class="ml-5 space-y-3">
          <p>인천SSG랜더스필드</p>
          <p>SSG 랜더스</p>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 수원 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('suwon')" class="text-xl font-bold cursor-pointer">수원</p>
        </div>
        <div v-if="isDropdownOpen.suwon" class="ml-5 space-y-3">
          <p>수원 케이티 위즈 파크</p>
          <p>KT 위즈</p>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 대구 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('daegu')" class="text-xl font-bold cursor-pointer">대구</p>
        </div>
        <div v-if="isDropdownOpen.daegu" class="ml-5 space-y-3">
          <p>대구 삼성 라이온즈 파크</p>
          <p>삼성 라이온즈</p>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 대전 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('daejeon')" class="text-xl font-bold cursor-pointer">대전</p>
        </div>
        <div v-if="isDropdownOpen.daejeon" class="ml-5 space-y-3">
          <p>대전 한화생명이글스파크</p>
          <p>한화 이글스</p>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 광주 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('gwangju')" class="text-xl font-bold cursor-pointer">광주</p>
        </div>
        <div v-if="isDropdownOpen.gwangju" class="ml-5 space-y-3">
          <p>광주기아챔피언스필드</p>
          <p>KIA 타이거즈</p>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 부산 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('busan')" class="text-xl font-bold cursor-pointer">부산</p>
        </div>
        <div v-if="isDropdownOpen.busan" class="ml-5 space-y-3">
          <p>사직 야구장</p>
          <p>롯데 자이언츠</p>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 창원 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('changwon')" class="text-xl font-bold cursor-pointer">창원</p>
        </div>
        <div v-if="isDropdownOpen.changwon" class="ml-5 space-y-3">
          <p>창원 NC 파크</p>
          <p>NC 다이노스</p>
        </div>
      </div>
      <hr class="border-b">
      
      <!-- 기타 드롭다운 -->
      <div class="space-y-3 p-5">
        <div>
          <p @click="toggleDropdown('others')" class="text-xl font-bold cursor-pointer">기타</p>
        </div>
        <div v-if="isDropdownOpen.others" class="ml-5 space-y-3">
          <p>포항야구장</p>
          <p>삼성 라이온즈</p>
          <p>청주야구장</p>
          <p>한화 이글스</p>
          <p>울산문수야구장</p>
          <p>롯데 자이언츠</p>
        </div>
      </div>
      <hr class="border-b">
      
      <div class="text-white rounded-b-lg p-5">
        <p class="text-lg font-bold">날짜 선택</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isDropdownOpen = ref({
    seoul: false,
    incheon: false,
    suwon: false,
    daegu: false,
    daejeon: false,
    gwangju: false,
    busan: false,
    changwon: false,
    others: false,
  });
  
  const toggleDropdown = (city) => {
    isDropdownOpen.value[city] = !isDropdownOpen.value[city];
  };
  </script>
  
  <style scoped>
  </style>
  