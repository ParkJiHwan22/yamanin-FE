<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Introduction Section -->
    <section class="bg-white py-48">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl font-bold text-gray-900 animate-fade-in-up">야만인: 혁신적인 야구 직관 플랫폼</h1>
        <p class="mt-6 text-gray-700 animate-fade-in-up delay-100">야구 경기를 함께 즐길 친구를 찾고 새로운 추억을 쌓아보세요! 표를 구하지 못했거나 혼자 가기 어려운 상황에서도 손쉽게 응원 친구를 찾을 수 있습니다. HOST와 GUEST로 나뉘어 표를 공유하고, 서로의 매너 평가를 통해 신뢰를 쌓는 안전한 서비스입니다. 다양한 직관 경험을 제공하는 야만인에서 더 나은 야구 관람을 경험해보세요!</p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-48 bg-gray-100">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-gray-900 animate-fade-in-up">한국 프로야구는 큰 인기를 얻고 있습니다!</h2>
        <p class="mt-6 text-gray-700 animate-fade-in-up delay-100">야구 경기의 평균 관중 수와 트렌드를 확인하세요.</p>
        <div class="mt-12 animate-fade-in-up delay-200 overflow-x-auto">
          <table class="min-w-full bg-white border-collapse rounded-lg animate-fade-in hover:shadow-lg transition-shadow duration-300">
            <thead>
              <tr>
                <th class="py-4 px-6 border-b text-left">연도</th>
                <th class="py-4 px-6 border-b text-right">경기 수</th>
                <th class="py-4 px-6 border-b text-right">평균 관중 수</th>
                <th class="py-4 px-6 border-b text-right">총 관중 수</th>
              </tr>
            </thead>
            <tbody>
              <tr class="animate-fade-in-up hover:bg-gray-100 transition-colors duration-300">
                <td class="py-4 px-6 border-b text-left">2022년 5월</td>
                <td class="py-4 px-6 border-b text-right">129경기</td>
                <td class="py-4 px-6 border-b text-right">9,779명</td>
                <td class="py-4 px-6 border-b text-right">1,261,532명</td>
              </tr>
              <tr class="animate-fade-in-up delay-100 hover:bg-gray-100 transition-colors duration-300">
                <td class="py-4 px-6 border-b text-left">2023년 5월</td>
                <td class="py-4 px-6 border-b text-right">113경기</td>
                <td class="py-4 px-6 border-b text-right">11,502명</td>
                <td class="py-4 px-6 border-b text-right">1,299,684명</td>
              </tr>
              <tr class="animate-fade-in-up delay-200 hover:bg-gray-100 transition-colors duration-300">
                <td class="py-4 px-6 border-b text-left">2024년 5월</td>
                <td class="py-4 px-6 border-b text-right">64경기</td>
                <td class="py-4 px-6 border-b text-right">14,974명</td>
                <td class="py-4 px-6 border-b text-right">958,366명</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-48 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-900 animate-fade-in-up">야만인 서비스의 특징</h2>
        <div class="mt-12 flex flex-wrap justify-center gap-12">
          <div class="w-full md:w-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-8 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up">
            <h3 class="text-2xl font-semibold text-white">좌석 공유</h3>
            <p class="mt-6 text-gray-100">좌석만 공유할 수 있는 좌석 공유 형태와 서로 같이 응원하는 열정 공유 형태를 선택할 수 있습니다.</p>
          </div>
          <div class="w-full md:w-1/3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg p-8 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up delay-100">
            <h3 class="text-2xl font-semibold text-white">예약 시스템</h3>
            <p class="mt-6 text-gray-100">간편하게 인원을 모집할 수 있는 예약 시스템을 제공합니다.</p>
          </div>
          <div class="w-full md:w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up delay-200">
            <h3 class="text-2xl font-semibold text-white">매너 온도</h3>
            <p class="mt-6 text-gray-100">경기 후 상호 간의 평가 점수를 누적한 매너 온도를 통해 다음 번 관람에 도움이 될 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <div class="md:flex md:items-center">
          <div class="md:w-1/2 animate-fade-in-up">
            <img src="https://via.placeholder.com/500" alt="About Us" class="rounded-lg shadow-lg">
          </div>
          <div class="mt-8 md:mt-0 md:w-1/2 md:pl-12 animate-fade-in-up delay-100">
            <h2 class="text-3xl font-bold text-gray-900">About Us</h2>
            <p class="mt-4 text-gray-700">We are a passionate team dedicated to enhancing your baseball viewing experience by connecting you with fellow fans.</p>
            <p class="mt-2 text-gray-700">Our mission is to make it easier for you to attend games, share the excitement, and create lasting memories.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

table:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
