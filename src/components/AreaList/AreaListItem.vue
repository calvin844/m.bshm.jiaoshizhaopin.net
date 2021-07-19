<template>
  <li @click="clickArea" class="area-list-item">{{areaListItem.region_name}}</li>
</template>

<script>
  import {
    ref,
    toRefs,
    reactive,
    inject
  } from 'vue'
  export default {
    name: 'AreaListItem',
    props: {
      areaListItem: Object
    },
    setup(props,context) {
      const setArea = inject('setArea')
      const clickArea = () => {
        setArea(props.areaListItem)
        context.emit('hideArea')
      }

      return {
        clickArea
      }
    }
  }
</script>

<style scoped>
  .area-list-item {
    line-height: 30px;
    font-weight: 700;
  }
</style>
