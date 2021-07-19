<template>
  <div class="gov-item" @click="clickGov">
    <div class="left">
      <p class="name-p">{{govItem.id}}. {{govItem.gov_name}}</p>
      <p class="area-p">所属地区：{{areaName}}</p>
    </div>
    <div class="right">
      <img src="~assets/img/common/enter.png" />
    </div>
  </div>
</template>

<script>
  import {
    computed,
    inject
  } from 'vue'
  export default {
    name: "GovItem",
    props: {
      govItem: Object
    },
    setup(props) {
      const editGov = inject('editGov')
      const areaName = computed(() => {
        return props.govItem.area_id == 0 ? "全国" : props.govItem.area.region_name
      })
      const clickGov = () => {
        editGov(props.govItem)
      }
      return {
        areaName,
        clickGov
      }
    }
  }
</script>

<style scoped>
  .gov-item {
    display: flex;
    justify-content: space-between;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 10px 5px;
    margin: 0 0 10px 0
  }

  .left {
    padding: 0 0 0 5px;
    flex: 1
  }

  .right {
    width: 27px;
    display: flex;
    flex-direction: row;
    align-items: center
  }

  .name-p {
    color: #333;
    margin: 0 0 10px 0;
    line-height: 20px
  }

  .area-p {
    font-size: 12px;
    color: #666
  }
</style>
