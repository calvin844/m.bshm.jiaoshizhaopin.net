<template>
  <div class="news-list">
    <ul v-if="newsList.length>0">
      <news-list-item v-for="(item,index) of newsList" :list-item="item" :key="item.id+'-'+index" />
    </ul>
  </div>
</template>

<script>
  import NewsListItem from './NewsListItem'
  export default {
    name: 'NewsList',
    props: {
      newsList: Array
    },
    components: {
      NewsListItem
    }
  }
</script>

<style scoped>
</style>
