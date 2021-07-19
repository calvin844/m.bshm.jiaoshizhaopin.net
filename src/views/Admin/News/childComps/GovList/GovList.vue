<template>
  <div class="gov-list">
    <input readonly class="textInput" type="text" placeholder="请选择部门" @click="isShowGov = true" v-model="govName" />
    <ul class="gov-select-list" v-if="govData.length>0" v-show="isShowGov">
      <li class="gov-list-item" @click="setGov">不限</li>
      <gov-list-item v-for="(item,index) of govData" :gov-list-item="item" :key="index" @hide-gov="hideGov" />
    </ul>
  </div>
</template>

<script>
  import {
    toRefs,
    reactive,
    inject
  } from 'vue'
  import GovListItem from './GovListItem'
  export default {
    name: 'GovList',
    props: {
      govData: Array,
      govName: String
    },
    components: {
      GovListItem
    },
    setup() {
      let data = reactive({
        isShowGov: false
      })
      const setGovFunc = inject('setGov')
      const hideGov = () => {
        data.isShowGov = false
      }

      const setGov = () => {
        setGovFunc('')
        data.isShowGov = false
      }
      return {
        ...toRefs(data),
        hideGov,
        setGov
      }
    }
  }
</script>

<style scoped>
  .gov-list {
    position: relative;
    margin: 0 0 10px 0;
  }

  .gov-select-list {
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

  .gov-list-item {
    line-height: 30px;
    font-weight: 700;
  }
</style>
