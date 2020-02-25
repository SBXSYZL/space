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

      <el-form-item prop="account">
        <el-input type="text" v-model="myForm.account"  placeholder="请填写登录的账号"/>
      </el-form-item>

      <el-form-item prop="name">
        <el-input type="text" v-model="myForm.name"  placeholder="请输入昵称"/>
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

      <el-form-item prop="tel">
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
        >注册
        </el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="text" @click="login" style="margin-left: auto;color: #F56C6C">已有账号?前往登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data: function () {
      const validatePass1 = (rule, value, callback) => {
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
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码长度最小6位'));
        } else if (value.length > 12) {
          callback(new Error('密码长度最大12位'));
        }else if (value !== this.myForm.firstPassword) {
          callback(new Error('两次输入密码不一致!'))
        }  else {
          callback();
        }
      };
      return {
        logining: false,
        myForm: {
          account: '',
          name: '',
          firstPassword: '',
          secondPassword: '',
          select: '',
          tel: ''
        },
        myRule: {
          account: [{required: true, message: '请输入登录账号', trigger: 'blur'}],
          name: [{required: true, message: '请输入昵称', trigger: 'blur'}],
          firstPassword: [{validator: validatePass1, trigger: 'blur'}],
          secondPassword: [{validator: validatePass2, trigger: 'blur'}],
          select: [{required: true, message: '请选择用户类型', trigger: 'blur'}],
          tel:[{ required: true,message: '请输入手机号码',trigger: 'blur'},
                  {validator:function(rule,value,callback){
                    if(/^1[34578]\d{9}$/.test(value) == false){
                      callback(new Error("请输入正确的手机号"));
                    }else{
                      callback();
                    }
                  }, trigger: 'blur'}],
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
      login(){
        this.$router.push(
          {
            path: '/login',
          });
      },
      open () {
        this.$message({
          message: '注册成功',
          type: 'success'
        })
      },
      handleSubmit () {
        this.logining = true
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
            param.append('account', this.myForm.account)
            param.append('nickName', this.myForm.name)
            param.append('password', this.myForm.secondPassword)
            param.append('tel', this.myForm.tel)
            this.$axios.post(url, param)
              .then(function (response) {
                // console.log(response)
                if (
                  response.data.status === 'success' &&
                  response.data.data === 'success'
                ) {
                  that.open()
                  that.logining = false
                  // sessionStorage.setItem('user', that.myForm.username)
                  that.$router.push({ path: '/login' })

                } else if (response.data.status === 'fail') {
                  that.$alert(response.data.data.errMsg, '温馨提示', {
                    confirmButtonText: '确定'
                  })
                }
                that.logining = false
              })
              .catch(function (error) {
                // console.log(error)
                that.logining = false
              })
          } else {
            that.logining = false
            // console.log('error submit!')
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
