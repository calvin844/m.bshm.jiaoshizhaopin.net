<template>
  <div class="area-list">
    <input class="textInput" type="text" placeholder="请输入地区名" v-model="areaName" @input="getAreaList" />
    <ul class="area-select-list" v-if="areaData.length>0" v-show="isShowArea">
      <area-list-item v-for="(item,index) of areaData" :area-list-item="item" :key="index" @hide-area="hideArea" />
    </ul>
  </div>
</template>

<script>
  import {
    toRefs,
    reactive
  } from 'vue'
  import {
    getAllArea
  } from 'network/area'
  import {
    debounce
  } from 'common/util'
  import AreaListItem from './AreaListItem'
  export default {
    name: 'AreaList',
    props: {
      areaName: {
        type: String,
        default: ""
      }
    },
    components: {
      AreaListItem
    },
    setup(props) {
      let data = reactive({
        areaList: [],
        areaData: [],
        isShowArea: false
      })
      const getAreaList = debounce(() => {
        data.areaData = data.areaData.filter(item => item.region_name.indexOf(props.areaName) > -1)
        data.isShowArea = true
      })
      const hideArea = () => {
        data.isShowArea = false
      }
      getAllArea().then(res => {
        data.areaData = res
      })

      return {
        ...toRefs(data),
        getAreaList,
        hideArea
      }
    }
  }
</script>

<style scoped>
  .area-list {
    position: relative;
  }

  .area-select-list {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    border-left: 1px solid #bbb;
    border-right: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    padding: 5px;
    list-style: none;
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    z-index: 1;
    height: 200px;
    overflow: scroll;
  }
</style>
