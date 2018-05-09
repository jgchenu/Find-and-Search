<template>
       <div id="appLoading" v-show="show">
        <img src="/static/images/loading.gif" alt="loading" />
        </div>
</template>
<script>
export default {
      data(){
          return{
              show:true
          }
      }
}
</script>
<style media="screen" type="text/css">
#appLoading {
  width: 100%;
  height: 100%;
}
#appLoading img {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
}
</style>