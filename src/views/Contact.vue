<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
      <h4 class="talk_title">讨论</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">联系人</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->
    <div style="margin-top: 2%;height: 90%">


    </div>
  </div>
</template>

<script>
  export default {
    name: 'Contact'
  }
</script>

<style scoped>
  .talk_title {
    font-family: 微软雅黑, serif;
    margin-left: 5%;
    color: #f55d54;
    text-align: left;
    font-size: 20px;
  }

  .divide_1 {
    margin-top: 10px;
    height: 5px;
    margin-left: 10px;
    margin-right: 10px;
    background: #f3f3f3;
  }

  .msg_title {
    margin-top: 1%;
    margin-left: 5%;
    text-align: left;
    font-size: 15px;
  }

  .divide_2 {
    margin-top: 1%;
    color: #f3f3f3;
  }
</style>
