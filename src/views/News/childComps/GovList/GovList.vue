<template>
  <div class="gov-list">
    <input
      readonly
      class="textInput"
      type="text"
      placeholder="请选择部门"
      @click="isShowGov = !isShowGov"
      v-model="govName"
    />
    <scroll class="gov-scroll" v-show="isShowGov">
      <ul class="gov-select-list" v-if="govData.length > 0" v-show="isShowGov">
        <li class="gov-list-item" @click="setGov">不限</li>
        <gov-list-item
          v-for="(item, index) of govData"
          :gov-list-item="item"
          :key="index"
          @hide-gov="hideGov"
        />
      </ul>
    </scroll>
  </div>
</template>

<script>
import { toRefs, reactive, inject } from "vue";
import Scroll from "components/Scroll/Scroll";
import GovListItem from "./GovListItem";
export default {
  name: "GovList",
  props: {
    govData: Array,
    govName: String,
  },
  components: {
    GovListItem,
    Scroll,
  },
  setup() {
    let data = reactive({
      isShowGov: false,
    });
    const setGovFunc = inject("setGov");
    const hideGov = () => {
      data.isShowGov = false;
    };

    const setGov = () => {
      setGovFunc("");
      data.isShowGov = false;
    };
    return {
      ...toRefs(data),
      hideGov,
      setGov,
    };
  },
};
</script>

<style scoped>
.gov-list {
  position: relative;
  margin: 0 0 10px 0;
}

.gov-scroll {
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  bottom: -200px;
  overflow: hidden;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  border-bottom: 1px solid #bbb;
}

.gov-select-list {
  /* position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px; */
  padding: 5px;
  list-style: none;
  background-color: #fff;
  /* z-index: 1;
  height: 200px;
  overflow: scroll; */
}

.gov-list-item {
  line-height: 30px;
  font-weight: 700;
}
</style>
