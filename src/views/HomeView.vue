<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Hero Section with Text Overlay -->
    <div class="hero-section bg-cover bg-center w-full h-screen">
      <div class="text-center animate-fade-in-up pt-60">
        <h1 class="text-5xl font-bold text-white">Find Your Perfect Game Buddy</h1>
        <p class="mt-4 text-xl text-white">Create new memories at the ballpark</p>
        <button class="mt-8 px-6 py-3 bg-white text-gray-900 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
    
    <!-- Features Section -->
    <section class="py-16 bg-[url('@/assets/baseballpark.png')] bg-cover bg-center text-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center">Features</h2>
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="w-full md:w-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up">
            <h3 class="text-2xl font-semibold">Flexible Viewing Options</h3>
            <p class="mt-4">Share your seat or interact with fellow fans.</p>
          </div>
          <div class="w-full md:w-1/3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up delay-100">
            <h3 class="text-2xl font-semibold">Host and Guest System</h3>
            <p class="mt-4">Easily post and find game buddies as a host or guest.</p>
          </div>
          <div class="w-full md:w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up delay-200">
            <h3 class="text-2xl font-semibold">Safety and Trust</h3>
            <p class="mt-4">Report and review system to ensure a positive experience.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Testimonials Section -->
    <section class="py-16 bg-gray-200 text-gray-800">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center">What Our Users Say</h2>
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="w-full md:w-1/3 bg-white rounded-lg p-6 text-center shadow-lg">
            <p class="mt-4">"This platform has completely changed the way I enjoy games. It's amazing!"</p>
            <h4 class="mt-4 text-lg font-semibold">- John Doe</h4>
          </div>
          <div class="w-full md:w-1/3 bg-white rounded-lg p-6 text-center shadow-lg">
            <p class="mt-4">"Finding a game buddy has never been easier. Highly recommended!"</p>
            <h4 class="mt-4 text-lg font-semibold">- Jane Smith</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-blue-600 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold">Ready to Find Your Game Buddy?</h2>
        <p class="mt-4 text-xl">Join our community today and never watch a game alone again.</p>
        <button class="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300 transform hover:scale-105">
          Sign Up Now
        </button>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white text-gray-800">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="w-full md:w-1/2">
            <h3 class="text-xl font-semibold">How do I find a game buddy?</h3>
            <p class="mt-4">Simply sign up, create a profile, and start browsing available game buddies or post your own request.</p>
          </div>
          <div class="w-full md:w-1/2">
            <h3 class="text-xl font-semibold">Is the platform safe?</h3>
            <p class="mt-4">Yes, we have a robust reporting and review system to ensure a safe and positive experience for all users.</p>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<style scoped>
.hero-section {
  background-image: url('https://files.oaiusercontent.com/file-2gQhXABGik82gtKW6REx5YoI?se=2024-05-18T09%3A25%3A32Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D0226831d-fbcf-4e18-95cf-ad8cd5b05b70.webp&sig=DyTJO0r9ltXImDd0vbh1HwsAt2yLZeeZ1uiUqOq0ZPE%3D');
}

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

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>
