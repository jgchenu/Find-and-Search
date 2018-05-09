<template>
  <div class="hasSolve">
    <div v-for="list in hasSolveList" :key="list.sid">
      <hisItem  :list="list"  :class="{overtime}"></hisItem>
    </div>
    <p class="no-resourse">{{noResourse}}</p>
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
        console.log("hasSolve", res);
        this.hasSolveList = res.data.data.list.filter(el => {
          return el.state == 4;
        });
        if (this.hasSolveList == 0) {
          this.noResourse = "暂无已解决的记录,快去发布吧！";
          console.log("暂无资源");
        } else {
          this.noResourse = "";
        }
      })
      .catch(err => {
        this.$auth(err.response.data.code, err.response.data.message);
        console.log(err.response.data.code);
      });
  },
  data() {
    return {
      hasSolveList: [],
      overtime: "overtime",
      solved: true,
      noResourse: ""
    };
  },
  components: {
    hisItem
  }
};
</script>
<style lang="scss" scoped>
.hasSolve {
  background-color: #ddd;
  width: 100%;
  height: 100%;
  .no-resourse {
    text-align: center;
    color: #aaaaaa;
    font-size: 30px;
  }
}
</style>


