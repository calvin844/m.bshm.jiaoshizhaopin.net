<template>
  <div class="edit-box">
    <div class="box">
      <div class="name-div">
        <p>部门名称：</p>
        <input class="name-input" type="text" v-model="govName" />
      </div>
      <div class="area-div">
        <p>所属地区：</p>
        <area-list :area-name="areaName" />
      </div>
      <button class="submit-btn" @click="setGov">确定</button>
      <button class="close-btn" @click="closeEditBox">关闭</button>
    </div>
  </div>
</template>

<script>
  import {
    toRefs,
    reactive,
    provide,
    computed,
    watch
  } from 'vue'
  import AreaList from 'components/AreaList/AreaList'
  export default {
    name: 'EditBox',
    props: {
      govItem: Object
    },
    components: {
      AreaList
    },
    setup(props, context) {
      let data = reactive({
        areaName: props.govItem.area_id > 0 ? props.govItem.area.region_name : "全国",
        areaId: 0,
        govName: props.govItem.gov_name
      })
      const closeEditBox = () => {
        context.emit('closeEditBox')
      }
      const setArea = (aValue) => {
        data.areaName = aValue.region_name
        data.areaId = aValue.region_code
      }
      const setGov = () => {
        const setData = {
          govItem: props.govItem,
          govName: data.govName,
          areaId: data.areaId,
          areaName: data.areaName
        }
        context.emit('setGov', setData)
        context.emit('closeEditBox')

      }
      provide('setArea', setArea)
      return {
        ...toRefs(data),
        closeEditBox,
        setGov
      }
    }
  }
</script>

<style scoped>
  .edit-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: hsla(0, 0%, 39.2%, .5);
    display: flex;
    justify-content: center;
    align-items: center
  }

  .box {
    width: 80%;
    height: 50%;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around
  }

  .name-div {
    margin: 10px 0 0 0
  }

  .name-input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #bbb;
    margin: 1px 0 0 0;
    line-height: 20px;
    padding: 5px
  }

  .area-div {
    margin: 10px 0 30px 0
  }

  .button-div {
    display: flex;
    flex-direction: column;
    align-items: center
  }

  .close-btn {
    color: #333;
    background-color: #fff;
    border-color: #d1d1d1
  }

  .close-btn,
  .submit-btn {
    padding: 10px 7px 10px 7px;
    border-radius: 5px;
    font-size: 18px;
    width: 100%
  }

  .submit-btn {
    margin: 0 0 10px 0;
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c
  }
</style>
