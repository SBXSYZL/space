<template>
  <div class="wrapper" style="" >
    <div style="min-width: 100%;display: flex;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
      <!--左边 start-->
      <div class="left_div" s>
        <div>
          <h2 style="font-family: 等线;color: #717171">学生</h2>
        </div>
        <div style="padding-top: 1%;margin-left: 2%">
          <a href="#" style="color: #20a0ff">{{userName}}</a>
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
        <div style="margin-left: 50%;cursor:pointer;display: flex;text-align: right;"
             @click="turnOff">
          <img style="height: 25px;width: 27px"
               :src="turn_off_icon"
               alt="">
          <div style="margin-top: 1%;margin-left: 3px;color: #f55d54">退出</div>
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
        turn_off_icon: require('../../assets/turn_off.png'),
        userName: ''
      }
    },
    methods: {
      turnOff () {
        sessionStorage.clear()
        this.$router.replace('/login')
      }
    },
    created () {
      this.userName=sessionStorage.getItem('userName')
    }
  }
</script>

<style scoped>
  .left_div {
    width: 30%;

    margin-left: 10%;
    vertical-align: bottom;
    display: flex;
  }
  .center_div {

    width: 60%;
    margin-right: 10%;
    text-align: center;
  }
  .right_div {
    width: 25%;
    text-align: right;

  }
</style>
