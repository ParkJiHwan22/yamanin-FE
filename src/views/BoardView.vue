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

                <div class="grid grid-cols-4 gap-2 p-2 m-5 rounded-lg border-2">
                    <div class="col-span-1">
                        <div class="space-x-5">
                            <span>5월 9일 18시 30분</span>
                            <span class="color-pink-bg text-white mx-2 px-3 py-2 rounded-lg">D - 2</span>
                        </div>
                        <p>LG vs 두산</p>
                        <p>잠실종합야구장</p>
                    </div>
                    <div class="col-span-2">
                        <p>제목</p>
                    </div>
                    <div class="col-span-1">
                        <p>분류</p>
                    </div>
                </div>

                <div class="grid grid-cols-4 gap-2 p-2 m-5 rounded-lg border-2">
                    <div class="col-span-1">
                        <div class="space-x-5">
                            <span>5월 9일 18시 30분</span>
                            <span class="color-pink-bg text-white mx-2 px-3 py-2 rounded-lg">D - 2</span>
                        </div>
                        <p>LG vs 두산</p>
                        <p>잠실종합야구장</p>
                    </div>
                    <div class="col-span-2">
                        <p>제목</p>
                    </div>
                    <div class="col-span-1">
                        <p>분류</p>
                    </div>
                </div>

                <div class="grid grid-cols-4 gap-2 p-2 m-5 rounded-lg border-2">
                    <div class="col-span-1">
                        <div class="space-x-5">
                            <span>5월 9일 18시 30분</span>
                            <span class="color-pink-bg text-white mx-2 px-3 py-2 rounded-lg">D - 2</span>
                        </div>
                        <p>LG vs 두산</p>
                        <p>잠실종합야구장</p>
                    </div>
                    <div class="col-span-2">
                        <p>제목</p>
                    </div>
                    <div class="col-span-1">
                        <p>분류</p>
                    </div>
                </div>
                
                <hr>
            </div>


        </div>
    </div>



  </template>
  
  <script setup>  
    import TheSideBar from '@/components/common/TheSideBar.vue'
  </script>
  
  <style scoped>
  
  </style>
  