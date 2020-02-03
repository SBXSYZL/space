<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
      <h4 class="talk_title">课程</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">新建课程</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->

    <div style="margin-top: 3%;height: 90%;">
      <div style="width: 50%;min-height: 500px;margin-right: 5%;margin-left: 5%; position:absolute;">
         <!--课程名称 start-->
        <el-form :model="sizeForm" label-width="80px"  ref="form" size="medium">
        <el-form-item label="课程名称">
          <el-input style="width: 250px" v-model="sizeForm.name" placeholder="请输入课程名" clearable></el-input>
        </el-form-item>
        <!--课程名称 end-->
        <!--截止日期 start-->
        <el-form-item label="截止日期">
          <div class="block">
            <el-date-picker
              style="width: 250px"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <!--截止日期 end-->

          <!--课时选择 start-->
          <el-form-item label="课时数量">
          <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="48" style="width:100px"></el-input-number>
          </el-form-item>
          <!--课时选择 end-->

          <!--课程描述 start-->
          <el-form-item label="课程描述">
            <el-input
              show-word-limit
              style="width: 350px"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <!--课程描述 end-->

          <el-form-item size="large">
            <el-button @click="onSubmit" type="danger" style="width: 180px;margin-right: 5%">提交</el-button>
            <el-button style="width: 180px">取消</el-button>
          </el-form-item>
      </el-form>
    </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateCourse',
    data() {
      return {
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        value1: '',
        textarea: '',
        num: 1
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
  };
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
