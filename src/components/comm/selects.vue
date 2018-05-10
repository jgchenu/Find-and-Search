<template>
<!-- 下拉组件 -->
    <div class="select-detail-container">
        <div class="select-detail">
            <div class="select-detail-place">
                <p><span class="iconfont icon-coordinates"></span>丢失地点</p>
                    <template v-for="(item,index) in placesList">
                <my-checkbox :key="item.id" @click.native="selectPlace(index)" :isSelect="item.isSelect">{{item.wheretag}}</my-checkbox>
                <br :key="item.id" v-if="index==4" />
                 </template>
            </div>
            <div class="select-detail-object">
                <p>
                    <span class="iconfont icon-icon-goods"></span>物品类型</p>
                <template v-for="(item,index) in thingList">
                    <my-checkbox :key="item.id" @click.native="selectThing(index)" :isSelect="item.isSelect">{{item.whattag}}</my-checkbox>
                    <br :key="item.id" v-if="index==3" />
                </template>
            </div>
            <div class="select-button">
                <my-button @click.native="selectSure">确定</my-button>
            </div>
        </div>
    </div>
</template>
<script>
import myCheckbox from "@/components/comm/my-checkbox";
import myButton from "@/components/comm/my-button";
export default {
  data() {
    return {
      placesList: [
        { wheretag: "桂庙", isSelect: false },
        { wheretag: "文科楼", isSelect: false },
        { wheretag: "西南", isSelect: false },
        { wheretag: "南区", isSelect: false },
        { wheretag: "斋区", isSelect: false },
        { wheretag: "元平体育馆", isSelect: false },
        { wheretag: "科技楼", isSelect: false },
        { wheretag: "图书馆", isSelect: false },
        { wheretag: "西丽", isSelect: false },
        { wheretag: "其他", isSelect: false }
      ],
      thingList: [
        { whattag: "校卡", isSelect: false },
        { whattag: "钱包", isSelect: false },
        { whattag: "书包", isSelect: false },
        { whattag: "衣物", isSelect: false },
        { whattag: "文件书籍", isSelect: false },
        { whattag: "数码产品", isSelect: false },
        { whattag: "其他", isSelect: false }
      ]
    };
  },
  components: {
    myCheckbox,
    myButton
  },
  methods: {
    selectPlace(index) {
      this.placesList.forEach((element,num) => {
          index==num?element.isSelect=true:element.isSelect=false;
      });
    //   this.placesList[index].isSelect = !this.placesList[index].isSelect;
    },
    selectThing(index) {
        this.thingList.forEach((element,num) => {
          index==num?element.isSelect=true:element.isSelect=false;
      });
    //   this.thingList[index].isSelect = !this.thingList[index].isSelect;
    },
    selectSure() {
      let selects=[];
      selects.push(this.placesList.filter(x=>{
        return x.isSelect;
      }),this.thingList.filter(y=>{
        return y.isSelect;
      }));
      if (!selects[0][0]) {
        selects[0][0]="";
      }
      if (!selects[1][0]) {
        selects[1][0]="";
      }
      this.$emit("selectSure", selects);
    }
  }
};
</script>
<style lang="scss" scoped>
.select-detail-container {
  width: 100%;
  height: 560px;
  background: #c54844;
  .select-detail {
    width: 95%;
    height: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #c54844;
    p {
      margin: 2px 0;
    }
  }
  span.iconfont,span.icon-coordinates,span.icon-icon-goods {
    font-size: 20px;
  }
  .select-detail-place,
  .select-detail-object {
    border-bottom: 2px dashed #c54844;
    flex-grow: 2;
    padding: 10px 0;
  }
}
</style>


