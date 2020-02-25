<template>
  <div>
  <el-button
    @click="uploadOuter=true"
    size="small"
    type="danger">提交作业
  </el-button>


  <el-dialog title="上传文件" :visible.sync="uploadOuter">
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :file-list="fileList"
      :auto-upload="false"
      :on-change="beforeUpload"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>

    <div slot="footer" class="dialog-footer">
      <el-button @click="uploadOuter = false">取 消</el-button>
      <el-button type="primary" @click="upload">上传</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        fileList: [],
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
        workId:'',
      }
    },
    methods: {
      beforeUpload (file) {
        this.file=file;
        console.log(file)
      },
      //上传文件
      upload () {
        this.submitUrl = '/api/student/submitWork'
        let file = this.file
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
