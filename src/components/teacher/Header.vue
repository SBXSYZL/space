<template>
  <div class="wrapper" style="">
    <div style="min-width: 100%;display: flex;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
      <!--左边 start-->
      <div class="left_div" s>
        <div>
          <h2 style="font-family: 等线;color: #717171">教师</h2>
        </div>
        <div style="padding-top: 1%;margin-left: 3%">

          <el-popover

            placement="bottom-start"
            trigger="click"
            width="300"
          >
            <el-form :model="Info" :rules="myRule" label-width="30%" ref="Info" size="mini">
              <el-form-item label="账号:">
                <el-input auto-complete="on" readonly style="width: 80%" v-model="Info.account"></el-input>
              </el-form-item>
              <el-form-item label="昵称:">
                <el-input auto-complete="on" readonly style="width: 80%" v-model="Info.nickName"></el-input>
              </el-form-item>
              <el-form-item label="联系方式:">
                <el-input auto-complete="on" readonly style="width: 80%" v-model="Info.tel"></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-button @click="showChangePassword">修改密码</el-button>
              </el-form-item>
              <el-form-item label="原先密码:" prop="oldPassword" v-if="psd">
                <el-input auto-complete="on" style="width: 80%" type="password" v-model="Info.oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="新的密码:" prop="newPassword" v-if="psd">
                <el-input auto-complete="on" style="width: 80%" type="password" v-model="Info.newPassword"></el-input>
              </el-form-item>
              <el-form-item v-if="psd">
                <el-button @click="psd=false">取消</el-button>
                <el-button @click="changePassword" style="margin-left: 15%" type="primary">确认</el-button>
              </el-form-item>
            </el-form>
            <a @click="Personal" href="#" slot="reference" style="color: #20a0ff" >{{userName}}</a>
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
        <div @click="turnOff"
             style="margin-left: 50%;cursor:pointer;display: flex;text-align: right;">
          <img :src="turn_off_icon"
               alt=""
               style="height: 25px;width: 27px">
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
    data() {
      const validatePass = (rule, value, callback) => {
        // console.log(value)
        if (value === '') {
          callback(new Error('请输入密码'))
        }  else if (value.length < 6) {
          callback(new Error('密码长度最小6位'));
        } else if (value.length > 12) {
          callback(new Error('密码长度最大12位'));
        } else {
          callback();
        }
      };
      return {
        psd: false,
        turn_off_icon: require('../../assets/turn_off.png'),
        userName: '',
        Info: {
          account: '',
          nickName: '',
          tel: '',
          oldPassword:'',
          newPassword:''
        },
        myRule: {
          oldPassword: [{validator: validatePass, trigger: 'blur'}],
          newPassword: [{validator: validatePass, trigger: 'blur'}],
        },
      }
    },
    methods: {

      close() {
        this.psd = false;
        console.log(this.psd)
      },
      showChangePassword() {
        if (this.psd == true) {
          this.psd = false;
        } else {
          this.psd = true
        }
      },
      changePassword() {
        this.$refs.Info.validate(valid => {
          if (valid) {

            if (this.Info.oldPassword == '' || this.Info.newPassword == '') {
              this.$message.error('请输入密码')
            } else {
              const that = this;
              let url = '/api/teacher/modifyPassword';
              let param = new URLSearchParams();
              param.append('oldPass', this.Info.oldPassword);
              param.append('newPass', this.Info.newPassword);
              this.$axios.post(url, param)
                .then(function (response) {
                  // console.log(response);
                  if (response.data.status === 'success' && response.data.data === 'success') {
                    that.$message.success('修改成功');
                    that.Info.oldPassword = '';
                    that.Info.newPassword = '';
                    that.psd=false
                  } else {
                    that.$message.error(response.data.data.errMsg)
                  }
                })
            }
          } else {
            //console.log('error submit!')
            return false
          }
        })
      },
      Personal() {
        let url = '/api/teacher/getInfo';
        this.$axios.get(url).then(res => {
          // console.log(res);
          if (res.data.status === 'success') {
            this.Info.account = res.data.data.account
            this.Info.nickName = res.data.data.nickName
            this.Info.tel = res.data.data.tel

            // console.log(res.data.data)
          } else {
            this.$message.error(res.data.data.errMsg)
          }
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
        })
      },
      turnOff() {
        sessionStorage.clear();
        this.$router.replace('/login')
      }
    },
    created() {
      this.userName = sessionStorage.getItem('userName')
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
