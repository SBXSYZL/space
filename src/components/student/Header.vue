<template>
  <div class="wrapper" style="" >
    <div style="min-width: 100%;display: flex;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
      <!--左边 start-->
      <div class="left_div" s>
        <div>
          <h2 style="font-family: 等线;color: #717171">学生</h2>
        </div>
        <div style="padding-top: 1%;margin-left: 3%">

          <el-popover
            placement="bottom-start"
            trigger="click"
            width="300"
          >
            <el-form :model="Info" label-width="30%" ref="form" size="mini">
              <el-form-item label="账号:">
                <el-input  auto-complete="on"  style="width: 80%" v-model="Info.account" readonly></el-input>
              </el-form-item>
              <el-form-item label="昵称:">
                <el-input auto-complete="on"  style="width: 80%" v-model="Info.nickName" readonly></el-input>
              </el-form-item>
              <el-form-item label="联系方式:">
                <el-input auto-complete="on"  style="width: 80%" v-model="Info.tel" readonly></el-input>
              </el-form-item>
            </el-form>
            <a href="#" style="color: #20a0ff" @click="Personal()" slot="reference">{{userName}}</a>
          </el-popover>

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
        userName: '',
        Info:{}
      }
    },
    methods: {
      Personal()
      {
        let url= '/api/student/getInfo';
        this.$axios.get(url).then(res => {
          // console.log(res);
          if (res.data.status === 'success') {
            this.Info=res.data.data
             // console.log(res.data.data)
          } else {
            this.$message.error(res.data.data.errMsg)
          }
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
        })
      },
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
