<template>
  <div class="bottom-bar">
    <div class="left">
      <span for="allchecked">已选 {{checkedLength}} 个</span>
    </div>
    <div class="right">
      <button class="set-top" @click="setNewsTopFunc">置顶</button>
      <button class="del-item" @click="delNewsFunc">删除</button>
    </div>
  </div>
</template>

<script>
  import {
    computed
  } from "vue"
  import {
    useStore
  } from "vuex";
  import {
    setNewsTop,
    delNews
  } from 'network/news'
  export default {
    name: 'BottomBar',
    setup() {
      const store = useStore()
      let {
        adminNewsList,
      } = store.state
      let setTypeFlag = ''
      const checkedLength = computed(() => {
        return adminNewsList.filter(item => item.checked).length
      })
      const setNewsTopFunc = () => {
        store.dispatch('getAdminNewsChecked').then(res => {
          let checkArr = []
          res.map(r => {
            checkArr.push(r.id)
          })
          return setNewsTop(checkArr)
        }).then(setRes => {
          let successArr = []
          setRes.map(item => {
            if (item.result) {
              successArr.push(item.id)
              store.commit('setAdminNewsTop', item.id)
            }
          })
          // alert('id：' + successArr.join(',') + '设置成功！')
          alert('设置成功！')
        })

        sessionStorage['adminNewsList'] = JSON.stringify({
          newsList: store.state.adminNewsList
        })
      }

      const delNewsFunc = () => {
        store.dispatch('getAdminNewsChecked').then(res => {
          let checkArr = []
          res.map(r => {
            checkArr.push(r.id)
          })
          return delNews(checkArr)
        }).then(setRes => {
          let successArr = []
          setRes.map(item => {
            if (item.result) {
              successArr.push(item.id)
              store.commit('delAdminNews', item.id)
            }
          })
          // alert('id：' + successArr.join(',') + '删除成功！')
          alert('删除成功！')
        })
        sessionStorage['adminNewsList'] = JSON.stringify({
          newsList: store.state.adminNewsList
        })
      }

      return {
        checkedLength,
        setNewsTopFunc,
        delNewsFunc
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    background: #f5f5f5;
    border-top: 1px solid #e9e9e9;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 10px;
    justify-content: space-between
  }

  .left {
    line-height: 27px
  }

  .right {
    margin: 0 20px 0 0
  }

  .right button {
    margin: 0 0 0 20px;
    padding: 3px 7px 3px 7px;
    border-radius: 5px;
    font-size: 18px
  }

  .set-top {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c
  }

  .del-item {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a
  }
</style>
