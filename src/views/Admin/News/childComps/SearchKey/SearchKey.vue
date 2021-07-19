<template>
  <div class="search-key">
    <input ref="keyInput" class="textInput" type="search" v-model="Key" placeholder="请输入关键字" @input="setKey" />
  </div>
</template>

<script>
  import {
    ref,
    toRefs,
    reactive
  } from 'vue'
  export default {
    name: 'SearchKey',
    props: {
      searchKey: String
    },
    setup(props, context) {
      let data =reactive({
        Key:props.searchKey
      })
      const setKey = () => {
        context.emit('setKey',data.Key)
      }
      return {
        ...toRefs(data),
        setKey
      }
    }
  }
</script>

<style scoped>
</style>
