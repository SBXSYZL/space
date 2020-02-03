<template>
  <div class="login-container">
    <el-form
      :model="myForm"
      :rules="myRule"
      status-icon
      ref="myForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <el-form-item prop="title">
        <center>
          <h3 class="title">VR空间感</h3>
        </center>
      </el-form-item>

      <el-form-item prop="select">
        <el-select v-model="myForm.select" placeholder="请选择用户类型" style="width:100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="username">

        <el-input type="text" v-model="myForm.username" auto-complete="off" placeholder="请输入用户名"/>
      </el-form-item>

      <el-form-item prop="firstPassword">
        <el-input
          type="password"
          v-model="myForm.firstPassword"
          auto-complete="off"
          placeholder="请输入密码"
        />
      </el-form-item>

      <el-form-item prop="secondPassword">
        <el-input
          type="password"
          v-model="myForm.secondPassword"
          auto-complete="off"
          placeholder="请再次输入密码"
        />
      </el-form-item>

      <el-form-item prop="contact">
        <el-input
          type="contact"
          v-model="myForm.tel"
          auto-complete="off"
          placeholder="请输入联系方式"
        />
      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button
          type="danger"
          style="width:100%;"
          @click="handleSubmit"
          :loading="logining"
          round
        >注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.myForm.firstPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        myForm: {
          username: '',
          firstPassword: '',
          secondPassword: '',
          select: '',
          tel: ''
        },
        myRule: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          firstPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          secondPassword: [{ validator: validatePass, trigger: 'blur' }],
          select: [{ required: true, message: '请选择用户类型', trigger: 'blur' }],
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
      handleSubmit () {
        const that = this
        let url
        that.$refs.myForm.validate(valid => {
          if (valid) {

            // 判断是否是学生用户注册
            if (this.myForm.select === '学生') {
              url = '/api/student/studentRegistered'
            }
            // 判断是否是教师账户注册
            else if (this.myForm.select === '教师') {
              url = '/api/teacher/teacherRegistered'
            }

            let param = new URLSearchParams()
            param.append('account', this.myForm.username)
            param.append('nickName', this.myForm.tel)
            param.append('password', this.myForm.secondPassword)
            param.append('tel', this.myForm.tel)

            this.$axios.post(url, param)
              .then(function (response) {
                console.log(response)

                if (
                  response.data.status === 'success' &&
                  response.data.data === 'success'
                ) {
                  that.open()
                  that.logining = false
                  sessionStorage.setItem('user', that.myForm.username)
                  that.$router.push({ path: '/About' })
                } else if (response.data.status === 'fail') {
                  that.$alert(response.data.data.errMsg, '温馨提示', {
                    confirmButtonText: '确定'
                  })
                }

              }).bind(this)
              .catch(function (error) {
                console.log(error)
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
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
