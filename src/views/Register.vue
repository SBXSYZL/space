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
          <h3 class="title" >VR空间感</h3>
        </center>
      </el-form-item>

      <el-form-item prop="select">
        <el-select v-model="myForm.select" placeholder="请选择用户类型" style="width:100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item  prop="username" >

         <el-input type="text" v-model="myForm.username" auto-complete="off" placeholder="请输入用户名" />
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
          v-model="myForm.contact"
          auto-complete="off"
          placeholder="请输入联系方式"
        />
      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click="handleSubmit"
          :loading="logining"
          round
        >注册</el-button>
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
        username: "",
        firstPassword: "",
        secondPassword: "",
        select:"",
        contact:""
      },
      myRule: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        firstPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
        secondPassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
        select:   [{ required: true, message: "请选择用户类型", trigger: "blur" }],
      },
      checked: false,
      options: [
        {
          value: "选项1",
          label: "学生"
        },
        {
          value: "选项2",
          label: "教师"
        }
      ],
      value: ""
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          this.logining = true;
          if (
            this.myForm.username === "admin" &&
            this.myForm.password === "123"
          ) {
            this.logining = false;
            sessionStorage.setItem("user", this.myForm.username);
            this.$router.push({ path: "/" });
          } else {
            this.logining = false;
            this.$alert("账号或密码错误", "温馨提示", {
              confirmButtonText: "确定"
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
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