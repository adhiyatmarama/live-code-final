<template>
  <div id="app">
    <div class="header" v-if="$store.state.isLogin">
      <div class="navbar">
        <router-link to="/countries">Countries</router-link>
        <router-link to="/profiles">Profile</router-link>
        <a href="#" @click="logout">Logout</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>

export default {
  created() {
    if (localStorage.token) {
      this.$store.commit('changeIsLogin', true);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('changeIsLogin', false);
      this.$router.push('/');
    },
  },
};
</script>
