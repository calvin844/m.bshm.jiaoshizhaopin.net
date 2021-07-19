<template>
  <li class="news-list-item" :class="{top:listItem.top==1}">
    <a :href="listItem.url">
      <p class="title">{{listItem.title}}</p>
      <div class="info-box">
        <span class="gov">{{listItem.gov.gov_name}}</span>
        <span class="date">{{pubDate}}</span>
      </div>
    </a>
  </li>
</template>

<script>
  import {computed} from 'vue'
  import {
    formatDate
  } from 'common/util'
  export default {
    name: 'NewsListItem',
    props: {
      listItem: Object
    },
    setup(props) {
      const pubDate = computed(() => {
        return formatDate(props.listItem.addtime, 'yyyy-MM-dd')
      })
      return {
        pubDate
      }
    }
  }
</script>

<style scoped>
  .news-list-item {
    border-bottom: 1px solid #eee;
    padding: 20px 5px
  }

  .title {
    color: #333;
    line-height: 25px
  }

  .info-box {
    margin: 20px 0 0 0;
    display: flex;
    justify-content: space-between
  }

  .info-box span {
    color: #999;
    font-size: 12px
  }

  .date {
    min-width: 80px;
    text-align: right
  }

  .top .title {
    color: red
  }
</style>
