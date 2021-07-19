<template>
  <li @click="clickGov" class="gov-list-item">{{govListItem.gov_name}}</li>
</template>

<script>
  import {
    ref,
    toRefs,
    reactive,
    inject
  } from 'vue'
  export default {
    name: 'GovListItem',
    props: {
      govListItem: Object
    },
    setup(props,context) {
      const setGov = inject('setGov')
      const clickGov = () => {
        setGov(props.govListItem)
        context.emit('hideGov')
      }

      return {
        clickGov
      }
    }
  }
</script>

<style scoped>
  .gov-list-item {
    line-height: 30px;
    font-weight: 700;
  }
</style>
