<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
      <h4 class="talk_title">课时作业</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">新建课程</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->
    <div style="margin-top: 3%;height: 90%;">
      <div style="width: 50%;min-height: 500px;margin-right: 5%;margin-left: 5%; position:absolute;">
        <!--课时名称 start-->
        <el-form  label-width="80px" ref="form" size="medium">
          <el-form-item label="课时名称">
            <el-input style="width: 250px" v-model="lessonName" placeholder="请输入作业名称" clearable></el-input>
          </el-form-item>
          <!--课时名称 end-->
          <!--提交日期 start-->
          <el-form-item label="提交日期">
            <div class="block">
              <el-date-picker
                v-model="submissionDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <!--提交日期 end-->

          <!--作业描述 start-->
          <el-form-item label="作业描述">
            <el-input
              style="width: 300px"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 5, maxRows: 10}"
              placeholder="列如:该课程是以..."
              v-model="lessonDescription">
            </el-input>
          </el-form-item>
          <!--作业描述 end-->

          <!--按钮 start-->
          <el-form-item size="large">
            <el-button @click="onSubmit" type="danger" style="width: 180px;margin-right: 5%">提交</el-button>
            <el-button style="width: 180px">取消</el-button>
          </el-form-item>
          <!--按钮 end-->
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateLesson',
    data() {
      return {
        lessonName: '',
        submissionDate: '',
        lessonDescription: '',
      };
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style scoped>
  .talk_title {
    font-family: 微软雅黑, serif;
    margin-left: 5%;
    color: #f55d54;
    text-align: left;
    font-size: 20px;
  }

  .divide_1 {
    margin-top: 10px;
    height: 5px;
    margin-left: 10px;
    margin-right: 10px;
    background: #f3f3f3;
  }

  .msg_title {
    margin-top: 1%;
    margin-left: 5%;
    text-align: left;
    font-size: 15px;
  }

  .divide_2 {
    margin-top: 1%;
    color: #f3f3f3;
  }
</style>
