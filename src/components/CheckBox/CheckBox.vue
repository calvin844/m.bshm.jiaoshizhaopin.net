<template>
  <div class="check-box">
    <img v-if="checkFlag" src="~assets/img/common/checked.png" />
    <img v-else src="~assets/img/common/check.png" />
  </div>
</template>

<script>
  export default {
    name: 'CheckBox',
    props: {
      checkFlag: Boolean
    }
  }
</script>

<style scoped>
  .check-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%
  }

  img {
    width: 20px;
    height: 20px
  }
</style>
