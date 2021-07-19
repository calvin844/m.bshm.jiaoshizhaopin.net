import {
  ref
} from 'vue'


export const backTopMixin = function() {
  let isShowBackTop = ref(false)
  const showBackTop = (position) => {
    isShowBackTop.value = (-position.y > 1000)
  }
  return {
    isShowBackTop,
    showBackTop
  }
  // data() {
  //   return {
  //     isShowBackTop: false
  //   }
  // },
  // methods: {
  //   backTop() {
  //     this.$refs.scroll.scrollTo(0, 0, 500)
  //   },
  //   showBackTop(position) {
  //     this.isShowBackTop = (-position.y > 1000)
  //   }
  // }
}
