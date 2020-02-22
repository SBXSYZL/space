<template>
  <div :style="getScrenHeight">
    <!--头部部分 start-->
    <div style="padding-top: 2%;height:10%">
      <h4 class="talk_title">讨论</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">信息</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->
    <div style="margin-top: 2%;height: 90%">
      <!--面包屑 start-->
      <div style="display: flex;height:20%">
        <!--左边面包屑 start-->
        <div style="display: flex;width: 30%;padding-left: 5%">
          <!--已读 start-->
          <div :class="{active:selectIndex==1}" @click="changeTab(1)" id="tab_1">
            <span :key="1" style="font-size: 20px;"><b>已读</b></span>
            <div :class="{nav:selectIndex==1}"/>
          </div>
          <!--已读 end-->
          <div style="margin-left:2px;margin-right: 2px">
            <span style="font-size: 26px"><b>/</b></span>
            <div/>
          </div>
          <!--未读 start-->
          <div :class="{active:selectIndex==2}" @click="changeTab(2)" id="tab_2">
            <el-badge :value="badge" v-if="badge>0">
            <span :key="2" style="font-size: 20px;"><b>未读</b></span>
            </el-badge>
            <span :key="2" style="font-size: 20px;" v-if="badge==0"><b>未读</b></span>
            <div :class="{nav:selectIndex==2}"/>
          </div>
          <!--未读 end-->
        </div>
        <!--左边面包屑 end-->
        <!--右边按钮 start-->
        <div style="width: 70%;text-align: right;padding-right: 5%">
          <el-button @click="Send" type="danger">已发送</el-button>
        </div>
        <!--右边按钮 end-->
      </div>
      <!--面包屑 end-->
      <!--分割线 start-->
      <div class="divide_1"/>
      <!--分割线 end-->
      <!--表格区域 start-->
      <div class="table_area">

        <!--表格 start-->
        <div style="width: 100%">
          <el-table
            @row-click="rowClick"
            :data="msgs"
            :height=table_height
            size="medium"
            style="min-width: 100%"
            v-loading="loading">
            <el-table-column
              label="序号"
              width="80"
              type="index">
            </el-table-column>

            <el-table-column
              label="姓名"
              width="180">
              <template slot-scope="scope">
                <span>
                  {{scope.row.authorName}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="内容"
              style="width: 50%"
              >
              <template slot-scope="scope">
                <span>
                 {{scope.row.content| ellipsis}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="时间"
              style="width: 50%">
              <template slot-scope="scope">
                <span>
                 {{scope.row.postDate}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              style="text-align: right;"
              width="80">
              <template slot-scope="scope" style="text-align: center">
                <el-button
                  @click.stop="replyButton(scope.row.authorName,scope.row.content,scope.row.authorId,scope.row.msgId)"
                  size="small">回复
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
    <!--回复消息弹窗 start-->
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="回复消息"
      width="30%">
      <el-form :model="replyForm" label-width="15%" ref="form" size="mini">
        <el-form-item label="发送人">
          <el-input auto-complete="on" disabled style="width: 30%" v-model="replyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="信息">
          <el-input
            :autosize="{ minRows: 4, maxRows: 8}"
            auto-complete="on"
            disabled
            placeholder="请输入内容"
            resize="none"
            style="width: 75%"
            type="textarea"
            v-model="replyForm.receivedMessage">
          </el-input>
        </el-form-item>
        <el-form-item label="回复内容">
          <el-input
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="请输入内容"
            resize="none"
            style="width: 75%"
            type="textarea"
            v-model="replyForm.replyMessage"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button @click="replySubmit()" type="primary">回 复</el-button>
    </span>
    </el-dialog>
    <!--  回复消息弹窗 end-->

    <!--详情页弹窗 start-->
    <el-dialog
      :visible.sync="Detailsdialog"
      title="消息详情"
      width="30%">
      <el-form :model="Details" label-width="15%" ref="form" size="mini">
        <el-form-item label="发送人:" class="Details">
          <span>
            {{Details.authorName}}
          </span>
        </el-form-item>
        <el-form-item label="信息:" class="Details">
          <span>
            {{Details.content}}
          </span>
        </el-form-item>
        <el-form-item label="发送时间:" class="Details">
          <span>
            {{Details.postDate}}
          </span>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
    <el-button @click.stop="Detailsdialog = false" type="primary">确 定</el-button>
    </span>
    </el-dialog>
    <!--  详情页弹窗 end-->

  </div>


</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        badge:0,
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
        Detailsdialog:false,
        dialogVisible: false,
        replyForm: {
          name: '',
          replyMessage: '',
          receivedMessage: '',
          parentId: '',
          toId: ''
        },
        Details:{
          authorName:'',
          content:'',
          postDate:''
        }
      }
    },
    filters: {
      ellipsis(value) {
        if (!value) return "";
        if (value.length > 50) {
          return value.slice(0, 50) + "...";
        }
        return value;
      }
    },
    methods: {
      //表格整行的点击事件
      rowClick (val) {
        console.log(val.authorName)
        this.Detailsdialog = true
        this.Details.authorName=val.authorName,
        this.Details.content=val.content,
        this.Details.postDate=val.postDate

      },
      replyButton(name, receivedMessage, toId, parentId) {
        this.dialogVisible = true;
        this.replyForm.name = name;
        this.replyForm.receivedMessage = receivedMessage;
        this.replyForm.toId = toId;
        this.replyForm.parentId = parentId;
        console.log(this.replyForm);
      },
      replySubmit() {
        if (this.replyForm.replyMessage == '') {
          this.$message.error('请填写回复内容')
        } else {
          const that = this;
          let url = '/api/teacher/replyMessage';
          let param = new URLSearchParams();
          param.append('content', this.replyForm.replyMessage);
          param.append('parentId', this.replyForm.parentId);
          param.append('toId', this.replyForm.toId);
          this.$axios.post(url, param)
            .then(function (response) {
              console.log(response);
              if (response.data.status === 'success' && response.data.data) {
                that.$message.success('回复成功');
                that.dialogVisible = false;
                that.replyForm.replyMessage='';
                that.firstGetMsgs();
              } else {
                that.$message.error('请填写回复内容')
              }
            })
        }

        console.log(this.replyForm);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      Send() {
        this.$router.push({path: '/isSend',})
      },
      getScrenHeight() {
        this.screen.height = window.innerHeight - 100 + 'px'
      },
      getTableHeight() {
        const a = (window.innerHeight - 100) * 2 / 3;
        this.table_height = a - 15 + 'px'
        if(a>450) {
          this.table_height = a + 'px'
        }
        else if(a<200)
        {
          this.table_height = 150 + 'px'
        }

        console.log(this.table_height)
      },
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      handleSizeChange(val) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getMsg()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNo = val;
        this.getMsg()
      },
      getMsg() {

        console.log('index'+this.selectIndex)
        this.loading = true;
        let url_1 = '/api/teacher/getHaveReadMessageList';
        let url_2 = '/api/teacher/getUnreadMessageList';
        let url = null;
        this.msgs = [];
        if (this.selectIndex == 1) {
          url = url_1
        } else {
          url = url_2
        }
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
      firstGetMsgs()
      {
        let url = '/api/teacher/getUnreadMessageList';
        this.$axios.get(url, {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          if (res.data.status === 'success') {
            if(res.data.data.list.length>0)
            {
              this.selectIndex = 2;
              this.badge=res.data.data.list.length
              console.log('index'+this.selectIndex)
              console.log('badge'+this.badge)
            }
            else {
              this.selectIndex = 1;
              this.badge=0;
            }
            sessionStorage.setItem('selectIndex', this.selectIndex)
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          this.getMsg()
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
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
      this.firstGetMsgs();
      this.getScrenHeight();

    },
    created() {
      if (sessionStorage.getItem('selectIndex')) {
        this.selectIndex = sessionStorage.getItem('selectIndex')
      }
    }
  }
</script>

<style>
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
    width: 93%;
    margin-right: 5%;
    margin-left: 5%;
  }

  #tab_1, #tab_2:hover {
    cursor: pointer;
  }
  .Details .el-form-item__label{
    font-size: 15px;
  }
  .el-tooltip__popper.is-dark{display:none !important;}

</style>
