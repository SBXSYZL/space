<template>
  <div>

    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%;display: flex">
      <div style="margin-left: 5%; display: flex">
        <el-button @click="returnMessage" size="medium" type="info">返回</el-button>
      </div>
      <h4 class="talk_title">教学课件</h4>

      <div class="divide_1"/>
    </div>
    <!--头部部分 end-->
    <div class="table_area">
      <div style="margin-top: 2%;height: 90%">
        <!--面包屑 start-->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 5px">
          <el-breadcrumb-item to="#" v-for="item in breadCrumbs" :key="item.fileId" :to="item.path">{{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!--面包屑 end-->
        <hr/>
        <div style="display: flex;margin: 5px">
          <el-button @click="preBread" v-show="breadCrumbs.length>1" icon="el-icon-arrow-left">返回</el-button>
          <el-button @click="refresh">刷新</el-button>
        </div>
        <!--表格 start-->
        <el-table
          :data="fileList"
          :max-height="tableHeight"
          @row-click="rowClick"
          size="medium"

          v-loading="loading">
          <el-table-column
            label="文件名"
            width="420">
            <template slot-scope="scope" style="width: 20%;display: flex">
              <div style="display: flex">
                <img style="height: 30px;width: 30px" :src="scope.row.icon"/>
                <p style="margin-left: 5px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">
                  {{scope.row.fileName}}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间">
            <template slot-scope="scope">
              {{scope.row.createDate}}
            </template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <div style="text-align: right;margin-right: 1%">
                <el-button
                  size="mini"
                  v-show="scope.row.type=='file'"
                  @click.stop="downloadFile(scope.row.fileName)">下载
                </el-button>
              </div>

            </template>
          </el-table-column>

        </el-table>
        <!--表格 end-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DocumentList',
    data () {
      return {
        TeacherData:[],
        tableHeight:window.innerHeight - (window.innerHeight*0.35),
        fileList: [],
        breadCrumbs: [
          {
            fileId: -1,
            name: '根目录',
            folderPath: '',
            path: ''
          }
        ],
        uploadOuter: false,
        uploadInner: false,
        fileTypes: ['folder', 'image', 'txt', 'excel', 'word', 'pdf', 'ppt', 'video', 'radio', 'other'],
        createFolderVisible: false,
        form: {
          newFolderName: ''
        },
        loading: true,
        deleteDialog: false,
      }
    },
    methods: {
      returnMessage()
      {
        this.loading = false;
        console.log("返回信息页面");
        this.$router.back();
        this.$router.back();
      },
      getParams() {
        this.TeacherData = this.$route.query;
        console.log(this.TeacherData)
      },
      //获取当前目录下文件
      getFilesUnderFolder () {
        // console.log(this.breadCrumbs)
        this.loading = true
        this.fileList = []
        let folderId = null
        if (this.breadCrumbs.length > 1) {
          folderId = this.breadCrumbs[this.breadCrumbs.length - 1].fileId
        } else {
          folderId = 0
        }
        this.$axios.get('/api/student/getTeacherFileList', {
          params: {
            folderId: folderId,
            teacherId: this.TeacherData.teacherId
          }
        }).then(res => {
          if (res.data.status == 'success') {
            this.fileList = res.data.data
            for (const i in this.fileList) {
              let type = this.matchType(this.fileList[i].fileName)
              if (type) {
                if (type == 'folder') {
                  this.fileList[i].type = 'folder'
                } else {
                  this.fileList[i].type = 'file'
                }
                this.fileList[i].icon = require('../../assets/' + type + '.png')
                //图标
              } else {
                this.fileList[i].icon = require('../../assets/unknown.png')
              }
            }
            // console.log(this.fileList)
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg)
          this.loading = false
        })
      },
      //匹配文件类型
      matchType (fileName) {
        // 后缀获取
        var suffix = ''
        // 获取类型结果
        var result = ''
        try {
          var flieArr = fileName.split('.')
          if (flieArr.length > 1) {
            suffix = flieArr[flieArr.length - 1]
          } else {
            return 'folder'
          }
        } catch (err) {
          suffix = ''
        }
        // console.log(suffix)
        // fileName无后缀返回 false
        if (!suffix) {
          result = false
          return result
        }
        // 图片格式
        var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
        // 进行图片匹配
        result = imglist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'image'
          return result
        }
        // 匹配txt
        var txtlist = ['txt']
        result = txtlist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'txt'
          return result
        }
        // 匹配 excel
        var excelist = ['xls', 'xlsx']
        result = excelist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'excel'
          return result
        }
        // 匹配 word
        var wordlist = ['doc', 'docx']
        result = wordlist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'word'
          return result
        }
        // 匹配 pdf
        var pdflist = ['pdf']
        result = pdflist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'pdf'
          return result
        }
        // 匹配 ppt
        var pptlist = ['ppt', 'pptx']
        result = pptlist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'ppt'
          return result
        }
        // 匹配 视频
        var videolist = ['mp4', 'm2v', 'mkv']
        result = videolist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'video'
          return result
        }
        // 匹配 音频
        var radiolist = ['mp3', 'wav', 'wmv']
        result = radiolist.some(function (item) {
          return item == suffix
        })
        if (result) {
          result = 'radio'
          return result
        }
        // 其他 文件类型
        result = 'other'
        return result
      },

      //下载文件
      downloadFile (fileName) {
        let path = this.makeBreadPath()
        if (path) {
          path += fileName
        } else {
          path = fileName
        }
        let a = document.createElement('a')
        a.href = '/api/student/downloadFile?path=' + path+'&teacherId='+this.TeacherData.teacherId;
        a.click()
      },
      //根据面包屑拼成路径
      makeBreadPath () {
        let path = ''
        for (const i in this.breadCrumbs) {
          if (i > 0) {
            path = path + this.breadCrumbs[i].folderPath + '/'
          }
        }
        console.log(path)
        return path
      },
      //表格整行的点击事件
      rowClick (val) {
        // console.log(val)
        if (val.type == 'folder') {
          this.breadCrumbs.push({
            authorId: val.authorId,
            fileId: val.fileId,
            name: val.fileName,
            folderPath: val.fileName,
            path: ''
          })
          // console.log(this.makeBreadPath())
          this.getFilesUnderFolder(val.fileId)
        }
      },
      //面包屑上一页
      preBread () {
        this.breadCrumbs.splice(this.breadCrumbs.length - 1, 1)
        sessionStorage.setItem('file_breads', this.breadCrumbs)
        this.getFilesUnderFolder(this.breadCrumbs[this.breadCrumbs.length - 1].fileId)
      },
      refresh () {
        this.getFilesUnderFolder()
      }
    },
    activated () {
      this.getParams()
      // if (sessionStorage.getItem('file_breads')) {
      //   console.log(sessionStorage.getItem('file_breads'))
      //   // this.breadCrumbs = sessionStorage.getItem('file_breads')
      // }
      this.getFilesUnderFolder();
      // this.tableHeight = window.innerHeight - (window.innerHeight*0.35);
      //window.innerHeight:浏览器的可用高度
    }
  }
</script>

<style scoped>
  .talk_title {
    font-family: 微软雅黑, serif;
    margin-left: 2%;
    color: #f55d54;
    text-align: left;
    font-size: 20px;
    width: 20%;
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
    color: #ffffff;
  }
  .table_area {
    min-height: 470px;
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;
  }
</style>
