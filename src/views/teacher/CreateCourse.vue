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
        <el-form label-width="90px"
                 ref="createCourseForm"
                 size="medium"
                 :model="createCourseForm"
                 :rules="createCourseRule"

        >
          <el-form-item label="课程名称:" prop="courseName">
            <el-input clearable placeholder="请输入课程名" style="width: 250px" v-model="createCourseForm.courseName"></el-input>
          </el-form-item>
          <!--课程名称 end-->
          <!--截止日期 start-->
          <el-form-item label="截至日期:" prop="deadline">
            <div class="block">
              <el-date-picker
                placeholder="选择日期"
                type="date"
                v-model="createCourseForm.deadline">
              </el-date-picker>
            </div>
          </el-form-item>
          <!--截止日期 end-->

          <!--课时选择 start-->
          <el-form-item label="课时数量:" prop="num">
            <el-input-number :max="48" :min="1" @change="handleChange" controls-position="right" style="width:100px"
                             v-model="createCourseForm.num"></el-input-number>
          </el-form-item>
          <!--课时选择 end-->

          <!--课程描述 start-->
          <el-form-item label="课程描述:" prop="courseDescription">
            <el-input
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
              resize="none"
              style="width: 350px"
              type="textarea"
              v-model="createCourseForm.courseDescription">
            </el-input>
          </el-form-item>
          <!--课程描述 end-->
          <!--按钮 start-->
          <el-form-item size="large">
            <el-button @click="onSubmit" style="width: 180px;margin-right: 5%" type="danger">提交</el-button>
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
    name: 'CreateCourse',
    data() {
      return {
        createCourseForm: {
          courseName: '',
          deadline: '',
          courseDescription: '',
          num: 1
        },
        createCourseRule:{
          courseName: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
          deadline: [{ required: true, message: '请输入截至日期', trigger: 'blur' }],
          num: [{ required: true, message: '请选择课时数量', trigger: 'blur' }],
          courseDescription: [{ required: true, message: '请输入课程描述', trigger: 'blur' }]

        }
      }
    },

    methods: {
      onSubmit() {
        this.$refs.createCourseForm.validate(valid => {
          if (valid) {

            let url = '/api/teacher/createCourse'
            const date = this.createCourseForm.deadline.toString();
            this.$axios.get(url, {
              params: {
                courseDescription: this.createCourseForm.courseDescription,
                courseName: this.createCourseForm.courseName,
                deadline:  date,
                schedule: this.createCourseForm.num,
              }
            }).then(res => {
              console.log(res)
              if (res.data.status === 'success'&&res.data.data === 'success') {
               this.$message.success('创建课程成功');
                // sessionStorage.setItem('defaultActive', 2);
                // this.$router.replace(
                //   {
                //     path: '/selectCourse',
                //   });
                this.$router.go(0)
                this.createCourseForm.courseName='';
                this.createCourseForm.deadline='';
                this.createCourseForm.courseDescription= '';
                this.createCourseForm.num= 1;
               console.log(sessionStorage.getItem('defaultActive'))
              } else {
                this.$message.error(res.data.data.errMsg)
                console.log(this.createCourseForm.deadline);
              }

            }).catch(err => {
              this.$message.error(err.data.data.errMsg)
            })

          } else {
            console.log('error submit!')
            return false
          }
        })
        // console.log('submit!');
        //
      },
      handleChange(value){
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
