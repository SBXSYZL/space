<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
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
          <div id="tab_1" :class="{active:selectIndex===1}" @click="changeTab(1)">
            <span style="font-size: 20px;" :key="1"><b>已读</b></span>
            <div :class="{nav:selectIndex===1}"/>
          </div>
          <!--已读 end-->
          <div style="margin-left:2px;margin-right: 2px">
            <span style="font-size: 26px"><b>/</b></span>
            <div/>
          </div>
          <!--未读 start-->
          <div id="tab_2" :class="{active:selectIndex===2}" @click="changeTab(2)">
            <span style="font-size: 20px;" :key="2"><b>未读</b></span>
            <div :class="{nav:selectIndex===2}"/>
          </div>
          <!--未读 end-->
        </div>
        <!--左边面包屑 end-->
        <!--右边按钮 start-->
        <div style="width: 70%;text-align: right;padding-right: 5%">
          <el-button type="danger" round>已发送</el-button>
        </div>
        <!--右边按钮 end-->
      </div>
      <!--面包屑 end-->
      <!--分割线 start-->
      <div class="divide_1"/>
      <!--分割线 end-->
      <!--表格区域 start-->
      <div style="width: 80%;min-height: 500px;margin-right: 5%;margin-left: 5%;position:absolute">

        <!--表格 start-->
        <div style="height: 80%">
          <el-table
            :data="msgs"
            size="medium"
            style="width: 100%">
            <el-table-column
              label="序号"
              width="80">
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span style="margin-left: 10px">
                  {{ scope.row.msgId }}
                </span>
              </template>
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
              style="min-width: 80%">
              <template slot-scope="scope">
                <span>
                 {{scope.row.content}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              style="text-align: right;"
              width="80">
              <template style="text-align: right" slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">回复
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--表格 end-->
        <!--分页 start-->
        <div class="block" style="height: 20%;position: absolute;bottom: 0">
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
    data () {
      return {
        msgs: [],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        selectIndex: 1

      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      getMsg () {
        let url_1 = '/api/teacher/getHaveReadMessageList'
        let url_2 = '/api/teacher/getUnreadMessageList'
        let url = null;
        this.msgs=[]
        if (this.selectIndex === 1) {
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
          console.log(res)
          if (res.data.status === 'success') {
            this.msgs = res.data.data.list
            this.total = res.data.data.pageRows
          } else {
            this.$message.error(res.data.data.errMsg)
          }

        }).catch(err => {
          this.$message.error(err.data.data.errMsg)
        })
      },
      changeTab (key) {
        this.selectIndex = key;
        this.getMsg();
      }

    },
    activated () {
      this.getMsg()
    },
    created () {
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

  #tab_1, #tab_2:hover {
    cursor: pointer;
  }
</style>
