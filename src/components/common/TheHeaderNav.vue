<template>
    <div class="">
        <div class="flex justify-between p-5">
            <RouterLink to="/">
                <img src="@\assets\yamanin-logo.png" alt="야만인 로고" class="w-40 h-12">
            </RouterLink>

            <div class="flex justify-between space-x-8 pt-3">
                <RouterLink to="/guide">이용 안내</RouterLink>
                <RouterLink to="/board">모집 게시판</RouterLink>
                <p>경기 일정</p>
                
            </div>

            <div class="flex justify-between pt-2 pe-4">
                <RouterLink to="/login" class="text-lg pt-1 pe-4 hover:underline">로그인</RouterLink>

                <img src="@\assets\yamanin-hamburger.png" alt="야만인 로고" class="w-8 h-8">
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>
