<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;">
      <h4 class="talk_title">讨论</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">信息</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->
    <div style="margin-top: 2%">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message'
  }
</script>

<style scoped>
  .talk_title {
    font-family: 黑体,serif;
    margin-left: 5%;
    color: #f55d54;
    text-align: left;
  }

  .divide_1 {
    margin-top: 10px;
    height: 3px;
    margin-left: 10px;
    margin-right: 10px;
    background: #f3f3f3;
  }

  .msg_title {
    margin-top: 1%;
    margin-left: 5%;
    text-align: left;
  }

  .divide_2 {
    margin-top: 1%;
    color: #f3f3f3;
  }

</style>
