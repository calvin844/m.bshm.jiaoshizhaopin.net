<template>
  <div id="app">
    <nav-bar />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
  import NavBar from 'components/NavBar/NavBar'
  export default {
    name: 'App',
    components: {
      NavBar
    }
  }
</script>

<style>
  @import url("assets/css/base.css");
</style>
