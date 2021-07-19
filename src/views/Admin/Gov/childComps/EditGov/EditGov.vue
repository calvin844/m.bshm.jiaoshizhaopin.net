<template>
  <div class="edit-gov">
    <gov-item v-for="(item,index) of govData" :key="index" :gov-item="item" />
  </div>
</template>

<script>
  import GovItem from './GovItem'
  export default {
    name: 'EditGov',
    props: {
      govData: Array
    },
    components: {
      GovItem
    }
  }
</script>

<style scoped>
</style>
