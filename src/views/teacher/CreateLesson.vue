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
        <el-form :model="createLessonForm" :rules="createLessonRule" label-width="80px" ref="createLessonForm"
                 size="medium">

          <!--选择分页 start-->
          <el-form-item label="选择课程" prop="selectCourseID">
            <el-select popper-class="selectJob" size="small" v-model="createLessonForm.selectCourseID">
              <el-option
                :key="index"
                :label="item.courseName"
                :value="item.courseId"
                v-for="(item,index) in restoreTable">
                <span
                  :title="item.name"
                  style="float: left;width: 120px">
                  {{item.courseName}}
                </span>
              </el-option>
              <div style="text-align: center">
                <el-button @click.stop="prevePage" class="text" :disabled="selectPage==1" >上一页</el-button>
                <el-button @click.stop="nextPage" class="text" :disabled="selectPage==pageCount">下一页</el-button>
              </div>
            </el-select>
          </el-form-item>
          <!--选择分页 end-->

          <el-form-item label="课时名称" prop="lessonName">
            <el-input clearable placeholder="请输入作业名称" style="width: 220px"
                      v-model="createLessonForm.lessonName"></el-input>
          </el-form-item>
          <!--课时名称 end-->

          <!--提交日期 start-->
          <el-form-item label="提交日期" prop="submissionDate">
            <div class="block">
              <el-date-picker
                placeholder="选择日期"
                type="date"
                v-model="createLessonForm.submissionDate">
              </el-date-picker>
            </div>
          </el-form-item>
          <!--提交日期 end-->

          <!--作业描述 start-->
          <el-form-item label="作业描述" prop="lessonDescription">
            <el-input
              :autosize="{ minRows: 5, maxRows: 10}"
              placeholder="列如:该课程是以..."
              resize="none"
              style="width: 300px"
              type="textarea"
              v-model="createLessonForm.lessonDescription">
            </el-input>
          </el-form-item>
          <!--作业描述 end-->

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
    name: 'CreateLesson',
    data() {
      return {
        /*选择课程 start*/
        total: null,// 获取总数据量
        pageCount: null, // 获取总页数
        selectPage: 1, // 当前页数
        restoreTable: [], //当前页数数据
        /*选择课程 end*/

        createLessonForm: {
          selectCourseID: '',
          lessonName: '',
          submissionDate: '',
          lessonDescription: '',
        },

        createLessonRule: {
          selectCourseID: [{required: true, message: '请选择课程', trigger: 'blur'}],
          submissionDate: [{required: true, message: '请输入提交日期', trigger: 'blur'}],
          lessonDescription: [{required: true, message: '请输入作业描述', trigger: 'blur'}],
          lessonName: [{required: true, message: '请输入课时名称', trigger: 'blur'}]
        }
      };
    },
    mounted() {
      this.getTableList(); // 初始化
    },
    methods: {
      /*选择课程 start*/
      getTableList(form = {}) {

        let url = '/api/teacher/getCourseList';
        this.msgs = [];

        this.$axios.get(url, {
          params: {
            pageNo: this.selectPage,
            pageSize: 5
          }
        }).then(res => {
          console.log(res);

          if (res.data.status === 'success') {
            this.restoreTable = res.data.data.list;
            this.total = res.data.data.pageRows; // 数据总数量

            this.pageCount = res.data.data.pageCount; // 因为我每次只请求20条， 所以算出总页数
            this.selectCourseID = this.restoreTable[0].id; // 因为每次都选取第一条数据;

          } else {
            this.$message.error(res.data.data.errMsg)
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
          this.loading = false
        })
      },
      prevePage() {
        --this.selectPage;
        if (this.selectPage < 1) { // 判断点击的页数是否小于1
          this.selectPage = 1;
        }

        this.getTableList();
      },
      nextPage() {
        if (this.selectPage < this.pageCount) { // 判断点击的页数是否小于总页数;
          ++this.selectPage;
          this.getTableList();
        }
      },
      /*选择课程 end*/

      onSubmit() {

        this.$refs.createLessonForm.validate(valid => {
          if (valid) {
            let url = '/api/teacher/createWork';
            const date = this.createLessonForm.submissionDate.toString();
            this.$axios.get(url, {
              params: {
                courseId: this.createLessonForm.selectCourseID,
                deadline: date,
                workDesc: this.createLessonForm.lessonDescription,
                workName: this.createLessonForm.lessonName,
              }
            }).then(res => {
              console.log(res);
              if (res.data.status === 'success' && res.data.data === 'success') {
                console.log(this.createLessonForm.selectCourseID);
                this.$message.success('创建课时成功');
                // sessionStorage.setItem('defaultActive', 4);
                // this.$router.replace(
                //   {
                //     path: '/selectLesson',
                //   });

                this.$router.go(0);
                this.createLessonForm.selectCourseID = '';
                this.createLessonForm.lessonName = '';
                this.createLessonForm.submissionDate = '';
                this.createLessonForm.lessonDescription = '';
              } else {
                this.$message.error(res.data.data.errMsg);
                console.log(this.createCourseForm.deadline);
              }

            }).catch(err => {
              this.$message.error(err.data.data.errMsg)
            })

          } else {
            console.log('error submit!');
            return false
          }
        })
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
