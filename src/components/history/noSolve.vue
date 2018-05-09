<template>
  <div class="noSolve">
    <div>
      <hisItem v-for="list in unoverList" :list="list" :key="list.id" @toEdit="toEdit(list)"></hisItem>
    </div>
    <div class="line"><span>以下信息均已过期</span></div>
    <div v-for="list in overList" :key="list.id">
      <hisItem  :list="list"  :class="{overtime}" @toEdit="toEdit(list)"></hisItem>
       <p class="no-resourse">{{noResourse}}</p>
    </div>
  </div>
</template>
<script>
import hisItem from "@/components/history/hisItem";
export default {
  mounted() {
    let lixun = sessionStorage.getItem("lixun");
    this.$ajax({
      method: "get",
      url: "/info/user"
    })
      .then(res => {
        console.log("noSolve", res.data);
        if (res.data.data.list.length == 0) {
          this.noResourse = "暂无已经发布的记录,快去发布吧！";
          console.log("暂无资源");
        } else {
          this.noResourse = "";
        }
        this.noSolveList = res.data.data.list;
        this.overList = this.noSolveList.filter(el => {
          return el.state == 3;
        });
        this.unoverList = this.noSolveList.filter(el => {
          return el.state == 2;
        });
      })
      .catch(err => {
        console.log(err.response.data.code);
      });
  },
  data() {
    return {
      noSolveList: [],
      overList: [],
      unoverList: [],
      overtime: "overtime",
      noResourse: ""
    };
  },
  components: {
    hisItem
  },
  computed: {},
  methods:{
      toEdit(list) {
      this.$router.push({ path: "/edit", query: { id: list.id ,state:list.state} });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/variable";
.noSolve {
  background-color: #ddd;
  width: 100%;
  height: 100%;
  .no-resourse {
    text-align: center;
    color: #bbbbbb;
    font-size: 26px;
  }
  .line {
    width: 650px;
    height: 2px;
    margin: 40px auto;
    border-bottom: 1px solid $lizhiColor;
    position: relative;
    span {
      position: absolute;
      top: -10px;
      background-color: #ddd;
      width: 280px;
      height: 20px;
      left: 190px;
      text-align: center;
      color: $lizhiColor;
      font-size: 20px;
    }
  }
}
</style>


