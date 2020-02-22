<template>
  <div :style="getScrenHeight">
    <!--头部部分 start-->
    <div style="padding-top: 2%;height:10%">
      <h4 class="talk_title">课程</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">选择课程</h5>
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
            v-loading="loading"
            :data="msgs"
            :height=table_height
            size="medium"
            style="width: 100%;min-width: 100%;"
          >
            <!--序号 start-->
            <el-table-column
              label="序号"
              type="index">
            </el-table-column>
            <!--序号 end-->

            <el-table-column
              label="课程名称"
              min-width="100">
              <template slot-scope="scope">
                <span>
                  {{scope.row.courseName}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="教师"
              min-width="100">
              <template slot-scope="scope">
                <span>
                  {{scope.row.authorName}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="截至时间"
              min-width="150">
              <template slot-scope="scope">
                <span>
                 {{scope.row.courseDeadline}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="课程描述"
              min-width="100"
            >
              <template slot-scope="scope">
                <span>
                 {{scope.row.courseDesc}}
                </span>
              </template>
            </el-table-column>


            <el-table-column>
              <template slot-scope="scope">
                <div style="text-align: right;margin-right: 1%">
                  <el-button
                    size="small"
                    type="danger"
                    @click.stop="enterCourse(scope.row.courseId)">加入课程
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
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
        loading:true
      }
    },
    methods: {
      select() {
        if(this.selectContent.split(" ").join("").length != 0) {
          this.loading = true
          let url = '/api/student/searchOptionalCourseList';
          this.msgs = [];
          this.$axios.get(url, {
            params: {
              pageNo: this.pageNo,
              pageSize: this.pageSize,
              searchKey: this.selectContent
            }
          }).then(res => {
            console.log(res);
            if (res.data.status === 'success') {
              this.msgs = res.data.data.list;
              this.total = res.data.data.pageRows;
              this.getTableHeight()
            } else {
              this.$message.error(res.data.data.errMsg)
            }
            this.loading = false
          }).catch(err => {
            this.$message.error(err.data.data.errMsg)
            this.loading = false
          })
        }
        else
        {
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


        console.log(a)
        console.log(this.table_height)
      },
      enterCourse(courseId) {
        let url = '/api/student/joinCourse';
        this.$axios.get(url, {
          params: {
            courseId: courseId,
          }
        }).then(res => {
          console.log(res);
          if (res.data.status === 'success') {
            this.$message.success('加入课程成功!')
            this.getTableHeight()
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          this.getMsg()
          this.loading = false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
          this.loading = false
        });
      },
      handleSizeChange(val) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getMsg()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pageNo = val;
        this.getMsg()
      },
      getMsg() {
        this.loading=true
        let url = '/api/student/getOptionalCourseList';
        this.msgs = [];

        this.$axios.get(url, {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          console.log(res);
          if (res.data.status === 'success') {
            this.msgs = res.data.data.list;
            this.total = res.data.data.pageRows;

            this.getTableHeight()
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          this.loading=false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg)
          this.loading=false
        })
      },
      changeTab(key) {
        if (sessionStorage.getItem('selectIndex')) {
          if (sessionStorage.getItem('selectIndex') != key) {
            sessionStorage.setItem('selectIndex', key);
            this.selectIndex = key
          }
        } else {
          this.selectIndex = key;
          sessionStorage.setItem('selectIndex', key)
        }
        this.pageNo = 1;

        this.getMsg()
      }

    },
    activated() {
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

  #tab_1, #tab_2:hover {
    cursor: pointer;
  }
</style>
