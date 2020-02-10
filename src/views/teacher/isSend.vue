<template>
  <div :style="getScrenHeight">
    <!--头部部分 start-->
    <div style="padding-top: 2%;height:10%">
      <div style="margin-left: 5%">
        <el-button @click="returnMessage" size="medium" type="info">返回</el-button>
      </div>
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
          <div id="tab_1" :class="{active:selectIndex==1}" @click="changeTab(1)">
            <span style="font-size: 20px;" :key="1"><b>已发送</b></span>
            <div :class="{nav:selectIndex==1}"/>
          </div>
          <!--已读 end-->
        </div>
        <!--左边面包屑 end-->
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
            v-loading="loading"
            :height=table_height
            :data="msgs"
            size="medium"
            style="min-width: 100%">
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
              style="width: 80%">
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
    data () {
      return {
        msgs: [],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        selectIndex: 1,
        screen: {
          height: ''
        },
        table_height: '0px',
        loading : true
      }
    },
    methods: {
      returnMessage()
      {
        this.loading = false;
        console.log("返回信息页面");
        this.$router.back();
      },
      getScrenHeight () {
        this.screen.height = window.innerHeight - 100 + 'px'
      },
      getTableHeight () {
        const a = (window.innerHeight - 100) * 2 / 3
        if (a > 500) {
          this.table_height = a + 'px'
        } else {
          this.table_height = '420px'
        }

        console.log(this.table_height)
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getMsg()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.pageNo = val
        this.getMsg()
      },
      getMsg () {
        this.loading=true

        let url = '/api/teacher/getMySendMsg'
        this.msgs = []
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
      changeTab (key) {
        if (sessionStorage.getItem('selectIndex')) {
          if (sessionStorage.getItem('selectIndex') != key) {
            sessionStorage.setItem('selectIndex', key)
            this.selectIndex = key
          }
        } else {
          this.selectIndex = key
          sessionStorage.setItem('selectIndex', key)
        }
        this.pageNo = 1

        this.getMsg()
      }

    },
    activated () {
      this.getScrenHeight()
      this.getMsg()
    },
    created () {
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
    width: 93%;
    margin-right: 5%;
    margin-left: 5%;
  }

  #tab_1, #tab_2:hover {
    cursor: pointer;
  }
</style>
