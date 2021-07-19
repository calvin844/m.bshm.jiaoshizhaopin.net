<template>
  <div class="nav-bar">
    <div class="top">
      <p class="web-name">彼思瀚默</p>
      <div class="nav-btn">
        <button type="button" class="navbar-toggle" @click="showNav">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
    </div>
    <div class="nav-list" v-show="isShowNav">
      <ul>
        <li @click="showNav">
          <router-link to="/admin">管理后台</router-link>
        </li>
        <li @click="showNav">
          <router-link to="/news">政府公告</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    toRefs,
    reactive
  } from 'vue'
  export default {
    name: "NavBar",
    setup() {
      let data = reactive({
        isShowNav: false
      })

      const showNav = () => {
        data.isShowNav = !data.isShowNav
      }

      return{
        ...toRefs(data),
        showNav
      }
    }
  }
</script>

<style scoped>
  .nav-bar .top {
    height: 44px;
    background-color: #f8f8f8;
    padding: 0 10px 0 10px;
    line-height: 44px;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    justify-content: space-between
  }

  .nav-btn {
    display: flex;
    flex-direction: column;
    justify-content: center
  }

  .navbar-toggle[data-v-0a8404d6]:focus,
  .navbar-toggle[data-v-0a8404d6]:hover {
    background-color: #ddd
  }

  .navbar-toggle {
    position: relative;
    padding: 9px 10px;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 4px
  }

  .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
    background-color: #888
  }

  .icon-bar+.icon-bar {
    margin: 4px 0 0 0
  }

  .nav-list {
    position: absolute;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 2
  }

  .nav-list li {
    padding: 10px 10px;
    border-bottom: 1px solid #e7e7e7;
    text-align: right;
    background-color: #f1f1f1
  }

  router-link {
    width: 100%;
    height: 100%
  }
</style>
