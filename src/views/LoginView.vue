<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="loginId">Login ID</label>
        <input type="text" v-model="loginId" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginId: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('/user/login', null, {
        params: {
          loginId: this.loginId,
          password: this.password
        }
      })
      .then(response => {
        console.log('Login successful', response);
        this.$router.push({ name: 'home' }); // 로그인 성공 시 HomeView로 이동
      })
      .catch(error => {
        console.error('Login failed', error);
        alert("Login failed: " + error.response.data);
      });
    }
  }
};
</script>
