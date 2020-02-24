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
          <span style="height:40px;line-height:40px;"><b class="msg_title" style="margin-left: 80px; font-size: 25px">{{courseData.courseName}}</b></span>
          <span style="height:40px;line-height:40px;"><b class="msg_title" style="margin-left: 40px;font-size: 15px">课程进度</b></span>
          <el-progress :percentage=courseData.progress :stroke-width="10"
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
                  {{scope.row.nickName}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="个人进度"
              min-width="100">
              <template slot-scope="scope">
                <el-progress :percentage=scope.row.progress*100 :stroke-width="7"></el-progress>
              </template>
            </el-table-column>

            <el-table-column
              label="作业"
              min-width="150">
              <template slot-scope="scope">
                <span>
                 {{scope.row.workScore}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="课堂表现"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  placeholder="请输入测试分"
                  v-model="scope.row.performanceScore">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="测试分"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  placeholder="请输入测试分"
                  v-model="scope.row.examScore">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="总分"
              min-width="150"
            >
              <template slot-scope="scope">
                <span>
                 {{parseFloat(((scope.row.examScore/3)+(scope.row.performanceScore/3)+(scope.row.workScore/3))).toFixed(2)}}
                </span>
              </template>
            </el-table-column>

            <el-table-column>
              <template slot-scope="scope">
                <div style="text-align: right;margin-right: 1%">
                  <el-button
                    @click.stop="submit(scope.row.examScore,scope.row.performanceScore,scope.row.userId)"
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
        courseData: [],
        loading: true,
      }
    },
    methods: {
      submit(examScore, performanceScore, userId) {
        console.log(examScore, performanceScore);
        if (examScore == null) {
          this.$message.error('请填写测试分')
        } else if (performanceScore == null) {
          this.$message.error('请填写课堂表现分')
        } else if (examScore > 100 || performanceScore > 100) {
          this.$message.error('每项的最高分应为100分')
        } else {
          this.loading = true;
          let url = '/api/teacher/courseGrading';

          this.$axios.get(url, {
            params: {
              courseId: this.courseData.courseId,
              examScore: examScore,
              performanceScore: performanceScore,
              userId: userId
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
      returnSelectCourse() {
        this.loading = false;
        console.log("返回搜索课程页面");
        this.$router.back();

      },
      getParams() {
        this.courseData = this.$route.query;
        this.courseData.progress = Number(this.courseData.progress);
        console.log(this.courseData)
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

        this.$router.back();
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
        let url = '/api/teacher/getElectiveList';
        this.msgs = [];

        this.$axios.get(url, {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            courseId: this.courseData.courseId
          }
        }).then(res => {
          console.log(res);
          if (res.data.status === 'success') {
            this.msgs = res.data.data.list;
            this.total = res.data.data.pageRows;

            this.getTableHeight()
          } else {
            console.log(this.courseData.courseId);
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
    created() {
      if (sessionStorage.getItem('selectIndex')) {
        this.selectIndex = sessionStorage.getItem('selectIndex')
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
