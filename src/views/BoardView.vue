<template>
    <div class = "grid grid-cols-6 gap-2">
        <div class="col-span-1 color-navy-bg text-white rounded-md">
            <TheSideBar/>
        </div>

        <div class="col-span-5 color-gray-bg rounded-lg">
            <div class="p-10">
                <p class="text-3xl">모집 게시판</p>
            </div>

            <div class="bg-white mx-10 mb-20 rounded-lg pt-5">
                <div class="flex justify-between p-5">
                    <div class="flex justify-between space-x-5">
                        <h1>최신순</h1>
                        <h1>전체</h1>
                    </div>

                    <h1>총 N개의 게시물이 검색되었습니다.</h1>
                </div>
                <hr>
                <div class="h-96 bg-black m-5">
                    <h2 class="text-xl font-medium text-gray-100">보드뷰</h2>
                </div>

                <div class="h-20"></div>

                <div class="h-96 bg-gradient-to-r from-cyan-500 to-blue-500 m-5">
                    <h2 class="text-xl font-medium text-gray-100">보드뷰</h2>
                </div>

                <div class="h-20"></div>

                <div class="h-96 bg-gradient-to-r from-cyan-500 to-blue-500 m-5">
                    <h2 class="text-xl font-medium text-gray-100">보드뷰</h2>
                </div>

                <div class="h-20"></div>
            </div>


        </div>
    </div>



  </template>
  
  <script setup>  
    import TheSideBar from '@/components/common/TheSideBar.vue'
  </script>
  
  <style scoped>
  
  </style>
  