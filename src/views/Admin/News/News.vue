<template>
  <div class="news">
    <scroll class="news-scroll" :probe-type="3" :pull-up-load="true" @scroll="newsScroll" @pulling-up="pullingUp"
      ref="scroll">
      <div class="nav-box">
        <h1 class="active">
          <router-link to="/admin/news">政府公告</router-link>
        </h1>
        <h1>
          <router-link to="/admin/gov">政府部门</router-link>
        </h1>
      </div>
      <div class="key-div">
        <p class="div-title">关键字：</p>
        <search-key :search-key="searchKey" @set-key="setKey" />
      </div>
      <div class="area-div">
        <p class="div-title">所属地区：</p>
        <area-list :area-name="areaName" />
      </div>
      <div class="gov-div">
        <p class="div-title">所属部门：</p>
        <gov-list :gov-data="govData" :gov-name="govName" />
      </div>
      <div class="date-div">
        <input class="textInput" type="text" placeholder="选择发布日期" readonly @click="calendarShow = true"
          :value="calendarText" />
        <button class="clearDate" @click="clearDate">重置</button>
      </div>
      <div class="news-div">
        <news-list :news-list="newsList" />
      </div>
    </scroll>
    <bottom-bar />
    <van-calendar v-model:show="calendarShow" type="range" @confirm="onConfirm" :min-date="minDate" />
    <back-top @click.native='backTop' v-show="isShowBackTop" />
  </div>
</template>

<script>
  import {
    ref,
    toRef,
    toRefs,
    reactive,
    provide,
    onMounted,
    computed
  } from 'vue'
  import {
    useStore
  } from "vuex";

  import {
    debounce,
    formatDate
  } from 'common/util'
  import {
    getAllGov
  } from 'network/gov'
  import {
    getNewsList
  } from 'network/news'
  import {
    backTopMixin
  } from 'common/mixin'

  import AreaList from 'components/AreaList/AreaList'
  import Scroll from 'components/Scroll/Scroll'
  import BackTop from 'components/BackTop/BackTop'
  import SearchKey from './childComps/SearchKey/SearchKey'
  import GovList from './childComps/GovList/GovList'
  import NewsList from './childComps/NewsList/NewsList'
  import BottomBar from './childComps/BottomBar/BottomBar'
  export default {
    name: 'News',
    components: {
      SearchKey,
      AreaList,
      GovList,
      NewsList,
      Scroll,
      BackTop,
      BottomBar
    },
    setup() {
      const store = useStore()
      let {
        isShowBackTop,
        showBackTop
      } = backTopMixin()
      let scroll = ref(null)
      let data = reactive({
        searchKey: '',
        areaName: '',
        areaId: 0,
        govName: '',
        govId: 0,
        govData: [],
        startDate: '',
        endDate: '',
        calendarShow: false,
        // newsList: store.state.adminNewsList,
        page: 1,
        isShowInfoBar: false
      })
      const calendarText = computed(() => {
        return data.startDate != "" ? '从 ' + data.startDate + ' 到 ' + data.endDate : "";
      })
      const infoBarFlag = computed(() => {
        return data.isShowInfoBar && (data.searchKey != "" || data.govName != "" || data.startDate != "")
      })
      const newsList = computed(() => {
        return store.state.adminNewsList
      })

      const onConfirm = (values) => {
        const [start, end] = values;
        data.startDate = formatDate(start, 'yyyy-M-d');
        data.endDate = formatDate(end, 'yyyy-M-d');
        data.calendarShow = false;
        getNews(1)
      };

      const setKey = debounce((kValue) => {
        data.searchKey = kValue
        getNews(1)
      })
      const setArea = (aValue) => {
        data.areaName = aValue.region_name
        data.areaId = aValue.region_code
        data.govData = data.govData.filter(item => item.area_id == data.areaId)
      }
      const setGov = (gValue) => {
        data.govName = gValue != "" ? gValue.gov_name : ""
        data.govId = gValue != "" ? gValue.id : 0
        getNews(1)
      }
      const getNews = (init = 0) => {
        if (init == 1) {
          data.page = 1
          store.commit('setAdminNewsList', [])
        }
        getNewsList(data.govId, data.startDate, data.endDate, data.searchKey, data.page).then(res => {
          store.dispatch('getAdminNewsList', res.list)
          // console.log(store.state.adminNewsList)
          // data.newsList.push(...res.list)
          const saveData = {
            govId: data.govId,
            startDate: data.startDate,
            endDate: data.endDate,
            searchKey: data.searchKey,
            page: data.page,
            govName: data.govName,
            areaName: data.areaName
          }
          sessionStorage['adminNewsPageDate'] = JSON.stringify(saveData)
          sessionStorage['adminNewsList'] = JSON.stringify({
            newsList: store.state.adminNewsList
          })
          scroll.value.refresh()
        })
      }
      const newsScroll = (position) => {
        // console.log(-position.y)
        sessionStorage['adminNewsScrollPositionY'] = position.y
        showBackTop(position)
        data.isShowInfoBar = (-position.y > 280)
      }
      const pullingUp = () => {
        data.page++
        getNews()
        scroll.value.finishPullUp()
        scroll.value.refresh()
      }
      const backTop = () => {
        scroll.value.scrollTo(0, 0, 500)
      }


      const Year = formatDate(new Date(), 'yyyy')

      getAllGov().then(res => {
        data.govData = res
      })

      const clearDate = () => {
        data.startDate = ""
        data.endDate = ""
        getNews(1)
      }

      // if (false) {

      if (typeof(sessionStorage['adminNewsPageDate']) != 'undefined' || typeof(sessionStorage['adminNewsList']) !=
        'undefined') {
        if (typeof(sessionStorage['adminNewsPageDate']) != 'undefined') {
          const pData = JSON.parse(sessionStorage['adminNewsPageDate'])
          data.govId = pData.govId
          data.startDate = pData.startDate
          data.endDate = pData.endDate
          data.searchKey = pData.searchKey
          data.page = pData.page
          data.govName = pData.govName
          data.areaName = pData.areaName
        }
        if (typeof(sessionStorage['adminNewsList']) != 'undefined') {
          const lData = JSON.parse(sessionStorage['adminNewsList'])
          store.commit('setAdminNewsList', lData.newsList)
        }
      } else {
        getNews(1)
      }
      // console.log(data.startDate)
      onMounted(() => {
        scroll.value.scrollTo(0, sessionStorage['adminNewsScrollPositionY'], 1)
      })


      provide("setArea", setArea);
      provide("setGov", setGov);
      return {
        ...toRefs(data),
        newsList,
        scroll,
        setKey,
        onConfirm,
        newsScroll,
        pullingUp,
        backTop,
        isShowBackTop,
        showBackTop,
        infoBarFlag,
        calendarText,
        clearDate,
        minDate: new Date(Year - 20, 0, 1),
      }
    }
  }
</script>

<style scoped>
  .news {
    padding: 10px;
    height: calc(100vh - 45px);
    position: relative;
  }

  .div-title {
    font-size: 14px;
    margin: 10px 0px 0px 0px;
  }

  .news-scroll {
    position: absolute;
    top: 5px;
    bottom: 55px;
    left: 10px;
    right: 10px;
    overflow: hidden;
  }

  .info-bar {
    background-color: #fff;
    position: relative;
    z-index: 1;
    top: -10px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #999;
  }

  .info-bar div {
    padding: 5px 0 5px 0;
  }

  .nav-box {
    display: flex;
    justify-content: left;
    margin: 0 0 20px 0
  }

  .nav-box h1 {
    display: inline-block;
    margin: 0 20px 0 0;
    padding: 5px 0 5px 0;
    border-bottom: 2px solid #fff
  }

  .nav-box h1.active {
    color: red;
    border-bottom: 2px solid #d9534f
  }

  .nav-box h1.active a {
    color: #d9534f
  }

  h1 {
    font-size: 18px
  }



  .date-div {
    display: flex;
    justify-content: space-between;
  }

  .date-div .textInput {
    flex: 1;
    width: auto;
  }

  .date-div .clearDate {
    width: 70px;
    border-radius: 5px;
    border: 1px solid #bbb;
    margin: 5px 0 0 5px;
    line-height: 20px;
    padding: 5px;
    background-color: #f5f5f5;
  }
</style>
