<template>
  <div :style="getScrenHeight">
    <!--头部部分 start-->
    <div style="padding-top: 2%;height:10%">
      <div style="margin-left: 5%">
        <el-button @click="returnSelectCourse" size="medium" type="info">返回</el-button>
      </div>
      <div class="divide_1"/>
      <div style="height: 10%">
        <div style="text-align: center;  display:flex;">
          <span style="height:40px;line-height:40px;"><b class="msg_title" style="margin-left: 80px; font-size: 25px">{{lessonData.workName}}</b></span>
          <span style="height:40px;line-height:40px;"><b class="msg_title" style="margin-left: 40px;font-size: 15px">课程进度</b></span>
          <el-progress :percentage=lessonData.progress :stroke-width="10"
                       style="width: 10%;height:40px;line-height:40px; margin-left: 40px"></el-progress>
        </div>
      </div>
      <hr class="divide_2">
    </div>

    <!--课程列表 start-->
    <div style="height: 5%">
      <h5 class="msg_title">课程列表</h5>
    </div>
    <!--课程列表 end-->
    <!--头部部分 end-->
    <div style="margin-top: 2%;height: 90%">
      <!--分割线 start-->
      <div class="divide_1"/>
      <!--分割线 end-->
      <!--表格区域 start-->
      <div class="table_area">

        <!--表格 start-->
        <div style="width: 100%">
          <el-table
            :data="msgs"
            :height=table_height
            size="medium"
            style="width: 100%;min-width: 100%;"
            v-loading="loading"
          >
            <!--序号 start-->
            <el-table-column
              label="序号"
              type="index">
            </el-table-column>
            <!--序号 end-->

            <el-table-column
              label="姓名"
              min-width="100">
              <template slot-scope="scope">
                <span>
                  {{scope.row.userName}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="作业"
              min-width="100">
              <template slot-scope="scope">
                <el-button
                  @click.stop="downloadWorkFile(scope.row.content,scope.row.submitId)"
                  size="mini"
                  type="primary"
                >下载
                </el-button>

              </template>
            </el-table-column>

            <el-table-column
              label="是否提交"
              min-width="150">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.submitStatus" >
                  <el-radio :label="1">提交</el-radio>
                  <el-radio :label="0">未提交</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>

            <el-table-column
              label="评分"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  placeholder="请输入内容"
                  v-model="scope.row.score">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column>
              <template slot-scope="scope">
                <div style="text-align: right;margin-right: 1%">
                  <el-button
                    @click.stop="submit(scope.row.score,scope.row.submitStatus,scope.row.submitId)"
                    size="mini"
                    type="danger">提交
                  </el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <!--表格 end-->
        <!--分页 start-->
        <div class="block" style="text-align: right">
          <el-pagination
            :current-page="pageNo"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
        <!--分页 start-->
      </div>
      <!--表格区域 end-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElectiveList',
    data() {
      return {
        Homework: '',
        radio: 1,
        selectContent: '',
        msgs: [],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        selectIndex: 1,
        screen: {
          height: ''
        },
        table_height: '0px',
        lessonData: [],
        loading: true,
      }
    },
    methods: {
      submit(Homework, radio, submitId) {
        console.log(Homework, radio);
        if (Homework == null) {
          this.$message.error('请填写评分')
        } else if (radio == null) {
          this.$message.error('请选择学生是否提交作业')
        } else {
          this.loading = true;
          let url = '/api/teacher/gradeAssignment';

          this.$axios.get(url, {
            params: {
              score: Homework,
              status: radio,
              submitId: submitId
            }
          }).then(res => {
            console.log(res);
            if (res.data.status === 'success') {
              this.$message.success('提交成功')
            } else {
              console.log(this.lessonData.workId);
              this.$message.error(res.data.data.errMsg)
            }
            this.loading = false
          }).catch(err => {
            this.$message.error(err.data.data.errMsg);
            this.loading = false
          })
        }
      },
      downloadWorkFile(content, submitId) {

          let a = document.createElement('a')
          a.href = '/api/teacher/downloadSubmitWork?content=' + content+'&submitId='+submitId
          a.click()
          // this.$message.error('该学生尚未上传作业文件');

        // this.$router.back()
        // this.$message.error('该学生尚未上传作业文件');

        // let url = '/api/teacher/downloadSubmitWork';
        // this.$axios.get(url, {
        //   params: {
        //     content: content,
        //     submitId: submitId,
        //   }
        // }).then(res => {
        //   console.log(res);
        //   if (res.data.status === 'success') {
        //
        //   } else {
        //     console.log(this.courseData.courseId);
        //     this.$message.error(res.data.data.errMsg)
        //   }
        //   this.loading = false
        // }).catch(err => {
        //   this.$message.error('该学生尚未上传作业文件');
        //   this.loading = false
        // })
      },
      returnSelectCourse() {
        this.loading = false;
        console.log("返回");
        this.$router.back();

      },
      getParams() {
        this.lessonData = this.$route.query;
        this.lessonData.progress = Number(this.lessonData.progress);
        console.log(this.lessonData.progress + 'test')
      },
      getScrenHeight() {
        this.screen.height = window.innerHeight
      },
      getTableHeight() {
        const a = (window.innerHeight - 180) * 2 / 3;
        if (a > 500) {
          this.table_height = a - 15 + 'px'
        } else {
          this.table_height = '420px'
        }
        console.log(this.table_height)
      },
      enterCourse(courseId, progress) {
        console.log(courseId);

      },
      handleSizeChange(val) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getMsg()
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        console.log(`当前页: ${val}`)
        this.getMsg()
      },
      getMsg() {
        this.loading = true;
        let url = '/api/teacher/getListOfStudentSubmissionsForTheClass';
        this.msgs = [];

        this.$axios.get(url, {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            workId: this.lessonData.workId
          }
        }).then(res => {
          console.log(res);
          if (res.data.status === 'success') {
            this.msgs = res.data.data.list;
            this.total = res.data.data.pageRows;

            this.getTableHeight()
          } else {
            console.log(this.lessonData.workId);
            this.$message.error(res.data.data.errMsg)
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
          this.loading = false
        })
      }
    },
    activated() {
      this.getParams();
      this.getScrenHeight();
      this.getMsg()
    },
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

  .active {
    color: #f55d54;
  }

  .nav {
    bottom: 0;
    display: block;
    height: 2px;
    margin-top: 2px;
    background-color: #f55d54;
    transition: all .2s ease-out;
  }

  .table_area {
    min-height: 470px;
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;
  }

  .el-progress {
    width: 100%;
  }

  #tab_1, #tab_2:hover {
    cursor: pointer;
  }

  .el-progress {
    width: 100%;
  }
</style>
