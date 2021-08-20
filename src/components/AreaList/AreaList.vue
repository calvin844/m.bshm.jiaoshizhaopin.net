<template>
  <div class="area-list">
    <input
      class="textInput"
      type="text"
      placeholder="请输入地区名"
      v-model="areaName"
      @click="isShowArea = !isShowArea"
      @input="getAreaList"
    />

    <scroll class="area-scroll" ref="areaScroll" v-show="isShowArea">
      <ul
        class="area-select-list"
        v-if="areaData.length > 0"
        v-show="isShowArea"
      >
        <area-list-item
          v-for="(item, index) of areaData"
          :area-list-item="item"
          :key="index"
          @hide-area="hideArea"
        />
      </ul>
    </scroll>
  </div>
</template>

<script>
import { toRefs, reactive, ref } from "vue";
import { getAllArea } from "network/area";
import { debounce } from "common/util";
import Scroll from "components/Scroll/Scroll";
import AreaListItem from "./AreaListItem";
export default {
  name: "AreaList",
  props: {
    areaName: {
      type: String,
      default: "",
    },
  },
  components: {
    AreaListItem,
    Scroll,
  },
  setup(props) {
    let areaScroll = ref(null);
    console.log(areaScroll);
    let data = reactive({
      areaList: [],
      areaData: [],
      isShowArea: false,
    });
    const getAreaList = debounce(() => {
      data.areaData = data.areaData.filter(
        (item) => item.region_name.indexOf(props.areaName) > -1
      );
      data.isShowArea = true;
      // console.log(scroll);
      areaScroll.value.refresh();
    });
    const hideArea = () => {
      data.isShowArea = false;
    };
    getAllArea().then((res) => {
      data.areaData = res;
    });

    return {
      ...toRefs(data),
      getAreaList,
      hideArea,
      areaScroll,
    };
  },
};
</script>

<style scoped>
.area-list {
  position: relative;
}

.area-scroll {
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
  z-index: 1;
}

.area-select-list {
  /* position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb; */
  padding: 5px;
  list-style: none;
  background-color: #fff;
  /* border-radius: 0 0 5px 5px;
  background-color: #fff;
  z-index: 1;
  height: 200px;
  overflow: scroll; */
}
</style>
