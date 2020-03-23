<template>
  <div id="app">
    <div id="nav" v-if="$store.state.isLogin">
      <router-link to="/countries">Countries</router-link> |
      <router-link to="/report">Profile</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>

export default {
  
}
</script>