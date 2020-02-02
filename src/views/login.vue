<template>
  <div class="login-container">
    <el-form
      :model="myForm"
      :rules="myRule"
      class="demo-ruleForm login-page"
      label-position="left"
      label-width="0px"
      ref="myForm"
      status-icon
    >
      <el-form-item prop="title">
        <center>
          <h3 class="title">VR空间感</h3>
        </center>
      </el-form-item>

      <el-form-item prop="select">
        <el-select placeholder="请选择用户类型" style="width:100%" v-model="myForm.select">
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-for="item in options"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="username">
        <el-input auto-complete="off" placeholder="请输入用户名" type="text" v-model="myForm.username"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          auto-complete="off"
          placeholder="请输入密码"
          type="password"
          v-model="myForm.password"
        />
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="logining"
          @click="handleSubmit"
          round
          style="width:100%;"
          type="primary"
        >登录

        </el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        logining: false,
        myForm: {
          username: '',
          password: '',
          select: ''
        },
        myRule: {
          username: [{required: true, message: '请输入账号', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          select: [{required: true, message: '请选择用户类型', trigger: 'blur'}]
        },
        checked: false,
        options: [
          {
            value: '学生',
            label: '学生'
          },
          {
            value: '教师',
            label: '教师'
          }
        ],
        value: ''
      }
    },
    methods: {
      handleSubmit: function () {
        this.$refs.myForm.validate(valid => {
          if (valid) {
            this.logining = true;

            // 判断是否是学生用户登录
            if (this.myForm.select === '学生') {

              this.$axios.post("/student/studentLogin", {
                  params: {
                    account: this.myForm.username,
                    password: this.myForm.password
                  }
                })
                .then(res => {
                  console.log(res);
                  // if (result.code === 200) {
                  //   alert("登录成功！");
                  //   this.logining = false;
                  //   sessionStorage.setItem('user', this.myForm.username);
                    this.$router.push({path: '/About'})
                  // } else {
                  //   // 失败了
                  //   alert("登录失败！");
                  //}
                });


              // if (
              //   this.myForm.username === 'admin' &&
              //   this.myForm.password === '123'
              // ) {
              //   this.logining = false;
              //   sessionStorage.setItem('user', this.myForm.username);
              //   this.$router.push({path: '/About'})
              // } else {
              //   this.logining = false;
              //   this.$alert('账号或密码错误', '温馨提示', {
              //     confirmButtonText: '确定'
              //   })
              //}
            }
            // 判断是否是教师账户登录
            else if (this.myForm.select === '教师') {
              if (
                this.myForm.username === 'admin2' &&
                this.myForm.password === '123'
              ) {
                this.logining = false;
                sessionStorage.setItem('user', this.myForm.username);
                this.$router.push({path: '/About'})
              } else {
                this.logining = false;
                this.$alert('账号或密码错误', '温馨提示', {
                  confirmButtonText: '确定'
                })
              }
            }
          }else {
            console.log('error submit!');
            return false
          }
        })
      }
    }

  }
</script>

<style>
  .login-container {
    width: 100%;
    height: 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
