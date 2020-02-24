<template>
  <div :style="getScrenHeight">
    <!--头部部分 start-->
    <div style="padding-top: 2%;height:10%">
      <h4 class="talk_title">课时作业</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">选择课时</h5>
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

            <el-table-column
              label="课程名称"
              min-width="150">
              <template slot-scope="scope">
                <span>
                  {{scope.row.courseName}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="课时名称"
              min-width="150">
              <template slot-scope="scope">
                <span>
                  {{scope.row.workName}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="提交时间"
              min-width="200">
              <template slot-scope="scope">
                <span>
                 {{scope.row.deadline}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="作业描述"
              min-width="150"
            >
              <template slot-scope="scope">
                <span>
                 {{scope.row.workDesc}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              style="text-align: right;">
              <template slot-scope="scope" style="text-align: right">
                <el-button
                  @click="uploadVisible(scope.row.courseId,scope.row.workId)"
                  size="small"
                  type="danger">提交作业
                </el-button>
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
    <!--上传文件弹窗 start-->
    <el-dialog title="上传文件" :visible.sync="uploadOuter">
      <!--      <el-dialog-->
      <!--        width="30%"-->
      <!--        title="内层 Dialog"-->
      <!--        :visible.sync="uploadInner"-->
      <!--        append-to-body>-->
      <!--      </el-dialog>-->
      <input type="file" ref="file" style="width: 200px;height: 25px"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadOuter = false">取 消</el-button>
        <el-button type="primary" @click="upload">上传</el-button>
      </div>
    </el-dialog>
    <!--上传文件弹窗 end-->



  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        uploadOuter:false,
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
        loading: true,
        courseId:'',
        workId:''
      }
    },
    methods: {
      //上传窗口打开
      uploadVisible (courseId,workId) {
        this.uploadOuter = true
        this.workId=workId;
        this.courseId=courseId
      },
      //上传文件
      upload () {
        this.submitUrl = '/api/student/submitWork'
        let file = this.$refs.file.files[0]
        if (!file) {
          this.$message({
            message: '文件未选取',
            type: 'warning'
          })
          return
        }
        let dataFile = new FormData()
        dataFile.append('file', file)
        dataFile.append('workId ', this.workId)
        dataFile.append('courseId', this.courseId)
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        const instance = this.$axios.create({ withCredentials: true })
        instance.post(this.submitUrl, dataFile, config).then(res => {
          // console.log(res)
          if (res.data.status == 'success' && res.data.data == 'success') {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.$refs.file.value =''
            this.uploadOuter=false
            this.getFilesUnderFolder()
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          // console.log(res)
        }).catch(err => {
          this.$message.error(err.data.data.errMsg)
          return false
        })
      },
      select() {
        if (this.selectContent.split(" ").join("").length !== 0) {
          this.loading = true;
          let url = '/api/student/searchMyWork';
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


        console.log(a)
        console.log(this.table_height)
      },
      handleSizeChange(val) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getMsg()
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getMsg();
        console.log(`当前页: ${val}`)
      },
      getMsg() {
        this.loading = true;
        let url = '/api/student/getWorkOfCourse';
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
          this.loading = false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
          this.loading = false
        })
      },

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
