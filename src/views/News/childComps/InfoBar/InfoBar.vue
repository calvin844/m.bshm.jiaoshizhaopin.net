<template>
  <div class="info-bar">
    <div class="key-info" v-if="searchKey != ''">
      <p>关键字：{{searchKey}}</p>
    </div>
    <div class="gov-info" v-if="govName != ''">
      <p>所属部门：{{govName}}</p>
    </div>
    <div class="date-info" v-if="startDate != ''">
      <p>发布日期：{{calendarText}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InfoBar",
    props: {
      searchKey: String,
      govName: String,
      startDate: String,
      calendarText: String
    }
  }
</script>

<style scoped>
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
</style>
