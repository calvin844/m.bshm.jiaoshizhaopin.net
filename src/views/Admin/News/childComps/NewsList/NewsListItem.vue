<template>
  <li v-if="listItem.state == 1" class="news-list-item" :class="{top:listItem.top==1}">
    <a class="news-box" :href="listItem.url">
      <p class="title">【{{listItem.id}}】{{listItem.title}}</p>
      <div class="info-box">
        <p class="date">{{pubDate}}</p>
        <p class="gov">{{listItem.gov.gov_name}}</p>
      </div>
    </a>
    <div class="checkbox">
      <check-box @click.native="setChecked" :check-flag="listItem.checked" />
    </div>
  </li>
</template>

<script>
  import {
    computed
  } from 'vue'
  import {
    useStore
  } from "vuex";
  import {
    formatDate
  } from 'common/util'
  import CheckBox from 'components/CheckBox/CheckBox'
  export default {
    name: 'NewsListItem',
    props: {
      listItem: Object
    },
    components: {
      CheckBox
    },
    setup(props) {
      const store = useStore()
      const pubDate = computed(() => {
        return formatDate(props.listItem.addtime, 'yyyy-MM-dd')
      })
      const setChecked = () => {
        store.commit('setAdminNewsListItem', props.listItem.id)
        sessionStorage['adminNewsList'] = JSON.stringify({
          newsList: store.state.adminNewsList
        })
      }
      return {
        pubDate,
        setChecked
      }
    }
  }
</script>

<style scoped>
  .news-list-item {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 20px 5px
  }

  .checkbox {
    width: 60px
  }

  .news-box {
    flex: 1
  }

  .title {
    color: #333;
    line-height: 25px
  }

  .info-box {
    margin: 20px 0 0 0
  }

  .info-box p {
    color: #999;
    font-size: 12px;
    margin: 0 0 5px 0
  }

  .info-box p+p {
    margin: 0
  }

  .top .title {
    color: red
  }
</style>
