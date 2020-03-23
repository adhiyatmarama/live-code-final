<template>
  <div class="home">
    <div class="sign-in">
      <h1>Sign In</h1>
      <form @submit.prevent="signIn">
        <input type="text" placeholder="Username" v-model="username"><br>
        <input type="password" placeholder="Password" v-model="password"><br>
        <button type="submit">Sign In</button>
      </form>
      <p v-if="loginError" style="color: red">{{loginError}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
      loginError: '',
    };
  },
  methods: {
    signIn() {
      console.log(this.username);
      const options = {
        url: `${this.$store.state.baseUrl}/login`,
        method: 'post',
        data: {
          username: this.username,
          password: this.password,
        },
      };
      axios(options)
        .then(({ data }) => {
          // console.log(data);
          this.username = '';
          this.password = '';
          localStorage.setItem('token', data.token);
          this.$store.commit('changeIsLogin', true);
          this.$router.push('/countries');
        })
        .catch(({ response }) => {
          this.loginError = '';
          // console.log(response);
          this.loginError = response.data.message;
        });
    },
  },
};
</script>
