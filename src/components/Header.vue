<template>
  <div class="wrapper">
    <div style="min-height: 100%;min-width: 100%;display: flex">
      <!--左边 start-->
      <div class="left_div">
        <div>
          <h2 style="font-family: 等线;color: #717171">教师</h2>
        </div>
        <div style="padding-top: 2px;margin-left: 30px">
          <a href="#" style="color: #20a0ff">王祖贤</a>
        </div>
      </div>
      <!--左边 end-->
      <!--中间 start-->
      <div class="center_div">
        <h3>V R 空 间 感</h3>
      </div>
      <!--中间 end-->

      <!--右边 start-->
      <div class="right_div">
        <div style="display: flex;text-align: right;">
          <img style="height: 30px;width: 32px"
               @click="turnOff"
               :src="turn_off_icon"
               alt="">
          <div style="margin-top: 1%;margin-left: 3px;color: #20a0ff">退出</div>
        </div>

      </div>
      <!--右边 end-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        turn_off_icon: require('../assets/turn_off.png')
      }
    },
    methods: {
      turnOff () {
        console.log('退出')
      }
    }
  }
</script>

<style scoped>
  .left_div {
    width: 30%;
    padding-top: 1%;
    margin-left: 10%;
    vertical-align: bottom;
    display: flex;
  }

  .center_div {
    margin-top: 1%;
    width: 60%;
    text-align: center;
  }

  .right_div {
    width: 30%;
    text-align: center;
    margin-top: 1%;

  }

</style>
