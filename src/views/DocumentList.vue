<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
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
          <el-button @click="preBread" :disabled="breadCrumbs.length==1" icon="el-icon-arrow-left">返回</el-button>
          <el-button @click="uploadVisible">上传文件</el-button>
          <el-button @click="createFolderVisible=true">创建文件夹</el-button>
          <el-button @click="refresh">刷新</el-button>
        </div>
        <!--表格 start-->
        <el-table
          height="500"
          v-loading="loading"
          :data="fileList"
          @row-click="rowClick"
          style="width: 100%"
          size="medium">
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
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </div>

            </template>
          </el-table-column>

        </el-table>
        <!--表格 end-->
      </div>
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
    <!--创建文件夹弹窗 start-->
    <el-dialog title="新建文件夹" :visible.sync="createFolderVisible">
      <el-form :model="form">
        <el-form-item label="文件夹名称" label-width=120>
          <el-input v-model="form.newFolderName" auto-complete="on"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createFolderVisible = false">取 消</el-button>
        <el-button type="primary" @click="createFolder">确 定</el-button>
      </div>
    </el-dialog>
    <!--创建文件夹弹窗 end-->
    <!--删除弹窗 start-->
    <el-dialog
      title="提示"
      :visible.sync="deleteDialog"
      width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog = false">取 消</el-button>
    <el-button type="primary" @click="deleteDialog = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--删除弹窗 end-->
  </div>
</template>

<script>
  export default {
    name: 'DocumentList',
    data () {
      return {
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
        deleteDialog: false
      }
    },
    methods: {
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
        this.$axios.get('/api/teacher/getFilesUnderFolderId', {
          params: {
            folderId: folderId
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
                this.fileList[i].icon = require('../assets/' + type + '.png')
                //图标
              } else {
                this.fileList[i].icon = require('../assets/unknown.png')
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
      //上传窗口打开
      uploadVisible () {
        this.uploadOuter = true
      },
      //上传文件
      upload () {
        this.submitUrl = '/api/teacher/uploadFile'
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
        let dir = this.makeBreadPath()
        dataFile.append('dir', dir)
        let folderId = this.breadCrumbs[this.breadCrumbs.length - 1].fileId
        if (folderId == -1) folderId = 0
        dataFile.append('folderId', folderId)
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
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          // console.log(res)
        }).catch(err => {
          this.$message.error(err.data.data.errMsg)
          return false
        })
      },
      //创建文件夹
      createFolder () {
        let path = this.makeBreadPath() + this.form.newFolderName
        let parentFolderId = this.breadCrumbs[this.breadCrumbs.length - 1].fileId
        if (parentFolderId == -1) parentFolderId = 0
        this.$axios.get('/api/teacher/createDirs', {
          params: {
            folderName: this.form.newFolderName,
            parentFolderId: parentFolderId,
            path: path
          }
        }).then(res => {
          if (res.data.status == 'success') {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.createFolderVisible = false
            this.getFilesUnderFolder()
          } else {
            this.$message.error(res.data.data.errMsg)
          }
        }).catch(err => {
          this.$message.error(err.data.data.errMsg)
        })
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
        a.href = '/api/teacher/downloadFile?path=' + path
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
      handleDelete (index, row) {
        let path = this.makeBreadPath()
        let url = ''
        let params = null
        if (row.type == 'file') {
          url = '/api/teacher/deleteFile'
          params = {
            dir: path,
            fileId: row.fileId,
            fileName: row.fileName
          }
        } else {
          path = path + row.fileName
          url = '/api/teacher/deleteDir'
          if (path == null) {
            path = ''
          }
          params = {
            folderId: row.fileId,
            path: path
          }
        }

        this.$axios.get(url, { params: params })
          .then(res => {
            console.log(res)
          }).catch(err => {
          console.log(err)
        })
        this.deleteDialog = false
      },
      refresh () {
        this.getFilesUnderFolder()
      }
    },
    activated () {
      // if (sessionStorage.getItem('file_breads')) {
      //   console.log(sessionStorage.getItem('file_breads'))
      //   // this.breadCrumbs = sessionStorage.getItem('file_breads')
      // }
      this.getFilesUnderFolder()
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
    color: #ffffff;
  }

  .table_area {
    min-height: 470px;
    width: 80%;
    margin-right: 8%;
    margin-left: 8%;
  }

</style>
