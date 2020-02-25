<template>
  <div :style="getScrenHeight">
    <!--头部部分 start-->
    <div style="padding-top: 2%;height:10%">
      <h4 class="talk_title">课程</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">课程列表</h5>
      </div>
      <hr class="divide_2">
    </div>

    <!--搜索框 start-->
    <div style="display: flex;width: 20%; height: 5%;padding-left: 5%;padding-top: 1%;padding-bottom: 1%;">

      <el-input
        clearable
        placeholder="输入关键字搜索"
        size="50%"
        v-model="selectContent"
      />
      <!--      <div style="font-size: 40px">-->
      <!--      <i class="el-icon-search"></i>-->
      <el-button @click="select()" icon="el-icon-search" style="margin-left: 15px" type="danger">搜索</el-button>
      <!--      </div>-->
    </div>
    <!--搜索框 end-->
    <!--课程列表 start-->
    <div style="height: 5%">
      <h5 class="msg_title">课时列表</h5>
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

            <!--序号 start-->
            <el-table-column
              label="课程名称"
              min-width="150">
              <template slot-scope="scope">
                <span>
                  {{scope.row.courseName}}
                </span>
              </template>
            </el-table-column>
            <!--序号 end-->

            <el-table-column
              label="教师"
              min-width="150">
              <template slot-scope="scope">
                <a href="#" @click="enterCourseware(scope.row.authorId)" style="color: blue">
                  {{scope.row.authorName}}
                </a>
              </template>
            </el-table-column>

            <el-table-column
              label="截至日期"
              min-width="200">
              <template slot-scope="scope">
                <span>
                 {{scope.row.courseDeadline}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="课程描述"
              min-width="150"
            >
              <template slot-scope="scope">
                <span>
                 {{scope.row.courseDesc}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="课程得分"
              min-width="150"
            >

              <template slot-scope="scope" >
                <el-popover
                  placement="top"
                  trigger="click"
                  width="200"
                >
                  <el-table :data="scoreMsgs" ref="scoreMsgs" >

                      <el-table-column label="作业得分"  width="50"  >
                          <span>
                            {{scoreMsgs.workScore}}
                          </span>
                      </el-table-column>

                      <el-table-column label="课堂表现"  width="50" >
                          <span>
                            {{scoreMsgs.performanceScore}}
                          </span>
                      </el-table-column>

                      <el-table-column label="测试得分"  width="50" >
                          <span>
                            {{scoreMsgs.examScore}}
                          </span>
                      </el-table-column>

                      <el-table-column label="课程得分"  width="50" >
                          <span>
                            {{scoreMsgs.totalScore}}
                          </span>
                      </el-table-column>

                  </el-table>

                  <el-button  slot="reference" type="danger" @click="getScore(scope.row.courseId) ">查看成绩</el-button>
                </el-popover>
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
    name: 'Message',
    data() {
      return {
        visible: false,
        selectContent: '',
        scoreMsgs: [{}],
        msgs: [],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        selectIndex: 1,
        screen: {
          height: ''
        },
        table_height: '0px',
        loading: true
      }
    },
    methods: {
      enterCourseware(teacherId){
        this.$router.push(
          {
            path: '/StuDocumentList',
            query: {
              teacherId: teacherId
            }
          });
      },
      getScore(courseId) {
        this.scoreMsgs=[{}]
        let url_1 = '/api/student/getCourseScore';
        this.$axios.get(url_1, {
          params: {
            courseId: courseId
          }
        }).then(res => {
          // console.log(res);
          if (res.data.status === 'success') {
              this.$set(this.scoreMsgs, 'workScore', res.data.data.workScore)
              this.$set(this.scoreMsgs, 'performanceScore', res.data.data.performanceScore)
              this.$set(this.scoreMsgs, 'examScore', res.data.data.examScore)
              this.$set(this.scoreMsgs, 'totalScore', res.data.data.totalScore)

            // console.log(this.scoreMsgs)
          } else {
            this.$message.error(res.data.data.errMsg)
          }
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
        })
      },
      select() {
        if (this.selectContent.split(" ").join("").length !== 0) {
          this.loading = true;
          let url = '/api/student/searchSelectedCourse';
          this.msgs = [];
          this.$axios.get(url, {
            params: {
              pageNo: this.pageNo,
              pageSize: this.pageSize,
              searchKey: this.selectContent
            }
          }).then(res => {
            // console.log(res);
            if (res.data.status === 'success') {
              this.msgs = res.data.data.list;
              this.total = res.data.data.pageRows;
              // console.log(this.msgs);
              this.getTableHeight()
            } else {
              this.$message.error(res.data.data.errMsg)
            }
            this.loading = false
          }).catch(err => {
            this.$message.error(err.data.data.errMsg);
            this.loading = false
          })
        } else {
          this.$message.error('请输入搜索内容')
        }
      },
      getScrenHeight() {
        this.screen.height = window.innerHeight
      },
      getTableHeight() {
        const a = (window.innerHeight - 180) * 2 / 3;
        this.table_height = a - 15 + 'px'
        if(a>450) {
          this.table_height = a + 'px'
        }
        else if(a<200)
        {
          this.table_height = 150 + 'px'
        }


        // console.log(a)
        // console.log(this.table_height)
      },
      enterLesson(workId, progress, workName) {
        if (progress == null) {
          progress = 0
        }
        // console.log(workId);
        // console.log(progress);
        // console.log(workName);
        this.$router.push(
          {
            path: '/submissionsList',
            query: {
              workId: workId,
              progress: progress * 100,
              workName: workName
            }

          });
      },
      handleSizeChange(val) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getMsg()
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getMsg();
        // console.log(`当前页: ${val}`)
      },
      getMsg() {
        this.loading = true;
        let url_1 = '/api/student/getSelectedCourseList';
        this.msgs = [];

        this.$axios.get(url_1, {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          // console.log(res);
          if (res.data.status === 'success') {
            this.msgs = res.data.data.list;
            this.total = res.data.data.pageRows;

            this.getTableHeight()
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
          this.loading = false
        })
      },
    },

    activated() {
      this.getScrenHeight();
      this.getMsg();
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

  #tab_1, #tab_2:hover {
    cursor: pointer;
  }
</style>
