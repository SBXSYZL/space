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
          type="danger"
        >登录

        </el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        logining: false,
        myForm: {
          username: '',
          password: '',
          select: ''
        },
        myRule: {
          username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          select: [{ required: true, message: '请选择用户类型', trigger: 'blur' }]
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
      openFullScreen () {
        this.fullscreenLoading = true
        setTimeout(() => {
          this.fullscreenLoading = false
        }, 2000)
      },
      open () {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      },
      handleSubmit: function () {
        const that = this
        let url
        that.$refs.myForm.validate(valid => {
          if (valid) {
            this.logining = true
            // 判断是否是学生用户登录
            if (this.myForm.select === '学生') {
              url = '/api/student/studentLogin'
            }
            // 判断是否是教师账户登录
            else if (this.myForm.select === '教师') {
              url = '/api/teacher/teacherLogin'
            }
            let param = new URLSearchParams()
            param.append('account', this.myForm.username)
            param.append('password', this.myForm.password)
            this.$axios.post(url, param)
              .then(function (response) {
                console.log(response)
                if (response.data.status === 'success' && response.data.data) {
                  that.open()
                  that.logining = false
                  sessionStorage.setItem('userName', response.data.data)
                  sessionStorage.setItem('user', that.myForm.username)
                  that.$router.replace({ path: '/' })
                } else {
                  that.logining = false
                  that.$alert('账号或密码错误', '温馨提示', {
                    confirmButtonText: '确定'
                  })
                }
              })
          } else {
            console.log('error submit!')
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
    box-shadow: 0 0 10px #cac6c6;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
