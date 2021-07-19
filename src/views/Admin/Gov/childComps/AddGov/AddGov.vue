<template>
  <div class="add-gov">
    <div class="box">
      <input class="name-input" placeholder="请输入部门名称" type="text" v-model="govName">
    </div>
    <div class="box">
      <area-list :area-name="areaName" />
    </div>
    <div class="submit-box">
      <button class="submit-button" @click="submitGov">提交</button>
    </div>
  </div>
</template>

<script>
  import {
    reactive,
    toRefs,
    provide
  } from 'vue'
  import {
    addGov
  } from 'network/gov'
  import AreaList from 'components/AreaList/AreaList'
  export default {
    name: 'AddGov',
    components: {
      AreaList
    },
    setup() {
      let data = reactive({
        areaName: "",
        areaId: "",
        govName: ""
      })
      const setArea = (aValue) => {
        data.areaName = aValue.region_name
        data.areaId = aValue.region_code
      }
      const submitGov = () => {
        addGov(data.areaId, data.govName)
        alert('添加成功！')
      }
      provide('setArea', setArea)
      return {
        ...toRefs(data),
        submitGov
      }
    }
  }
</script>

<style scoped>
  .box {
    margin: 0 0 10px 0
  }

  .name-input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #bbb;
    margin: 5px 0 0 0;
    line-height: 20px;
    padding: 5px
  }

  .submit-box {
    text-align: right
  }

  .submit-button {
    margin: 0 0 0 20px;
    padding: 3px 7px 3px 7px;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c
  }
</style>
