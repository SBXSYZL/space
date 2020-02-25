<template>
  <div class="login-container">
    <el-form
      :model="myForm"
      :rules="myRule"
      class="demo-ruleForm login-page"
      label-position="left"

      ref="myForm"
      status-icon
    >
      <el-form-item prop="title">
        <center>
          <h3 class="title">VR空间感</h3>
        </center>
      </el-form-item>

      <el-form-item prop="account">
        <el-input auto-complete="off" placeholder="请输入账号" type="text" v-model="myForm.account"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          auto-complete="off"
          placeholder="请输入密码"
          type="password"
          v-model="myForm.password"
        />
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

      <el-form-item style="width:100%;">
        <el-button
          @click="handleSubmit"
          style="width:100%;"
          type="danger"
        >登录
        </el-button>
      </el-form-item>


      <el-form-item style="width:100%;">
        <el-button type="text" @click="register" style="margin-left: auto; color: #F56C6C">未有账号?前往注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
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
        msgheight:420,
        logining: false,
        myForm: {
          account: '',
          password: '',
          select: ''
        },
        myRule: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          password: [{ validator: validatePass, trigger: 'blur' }],
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
      register(){
        this.$router.push(
          {
            path: '/Register',
          });
      },
      open () {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      },
      getTableHeight() {
        const a = (window.innerHeight - 180) * 2 / 3;
        console.log(a)
        this.msgheight = a - 50
        if(this.msgheight<400)
        {
          this.msgheight=420
        }
        if (a > 500) {
          this.msgheight = a - 30
        }

        console.log(this.msgheight)
      },
      enterCourse(courseId, progress) {
        console.log(courseId);

      },
      handleSubmit: function () {
        this.getTableHeight()
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
            param.append('account', this.myForm.account)
            param.append('password', this.myForm.password)
            this.$axios.post(url, param)
              .then(function (response) {
                console.log(response)
                if (response.data.status === 'success' && response.data.data) {

                  that.logining = false
                  sessionStorage.setItem('userName', response.data.data)
                  sessionStorage.setItem('user', that.myForm.account)
                  sessionStorage.setItem('loginType', that.myForm.select)
                  if(that.myForm.select === '学生')
                  {
                    // that.$message.error('学生端尚未上线,尽情期待')
                    that.$router.replace({path: '/student'})
                    that.open()
                  }
                  else if(that.myForm.select === '教师') {
                    that.$router.replace({path: '/teacher'})
                    that.open()
                  }
                } else {
                  that.logining = false
                  that.$message.error({
                    showClose: true,
                    message: '账号或密码错误',
                    offset:that.msgheight,
                  });

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
    margin: 10% auto;
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
