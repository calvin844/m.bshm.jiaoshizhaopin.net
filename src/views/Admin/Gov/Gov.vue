<template>
  <div class="gov">
    <scroll class="gov-scroll">
      <div class="nav-box">
        <h1 class="active">
          <router-link class="active" to="/admin/gov">政府部门</router-link>
        </h1>
        <h1>
          <router-link to="/admin/news">政府公告</router-link>
        </h1>
      </div>
      <div class="add-gov-box">
        <p class="box-title">添加部门</p>
        <add-gov />
      </div>
      <div class="edit-gov-box">
        <p class="box-title">编辑部门</p>
        <edit-gov :gov-data="govData" />
      </div>
    </scroll>
    <edit-box :gov-item="govItem" v-if="isShowEditBox" @closeEditBox="closeEditBox" @setGov="setGov" />
  </div>
</template>

<script>
  import {
    reactive,
    toRefs,
    provide
  } from 'vue'
  import {
    getAreaGov,
    setGovData
  } from 'network/gov'
  import Scroll from 'components/Scroll/Scroll'
  import AddGov from './childComps/AddGov/AddGov'
  import EditGov from './childComps/EditGov/EditGov'
  import EditBox from './childComps/EditBox/EditBox'
  export default {
    name: 'Gov',
    components: {
      AddGov,
      EditGov,
      EditBox,
      Scroll
    },
    setup() {
      let data = reactive({
        govData: [],
        govItem: {},
        isShowEditBox: false
      })
      getAreaGov().then(res => {
        data.govData = res
      })
      const editGov = (govItem) => {
        // console.log(govItem)
        data.isShowEditBox = true
        data.govItem = govItem
      }
      const closeEditBox = () => {
        data.isShowEditBox = false
      }
      const setGov = (setData) => {
        setGovData(setData.govItem.id, setData.areaId, setData.govName)
        // console.log(setData)
        const govItemData = data.govData.find(item=>item.id === setData.govItem.id)
        govItemData.gov_name =  setData.govName
        govItemData.area_id =  setData.areaId
        govItemData.area.region_name =  setData.areaName
        alert('修改成功！')
      }
      provide('editGov', editGov)
      return {
        ...toRefs(data),
        closeEditBox,
        setGov
      }
    }
  }
</script>

<style scoped>
  .gov {
    padding: 10px;
    height: calc(100vh - 45px);
    position: relative
  }

  h1 {
    font-size: 18px
  }

  .gov-scroll {
    height: calc(100vh - 55px);
    overflow: hidden
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

  .add-gov-box {
    border: 1px solid #999;
    border-radius: 10px;
    padding: 15px;
    background: #f1f1f1
  }

  .edit-gov-box {
    margin: 20px 0 0 0
  }

  .box-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333
  }
</style>
