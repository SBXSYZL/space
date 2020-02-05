<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
      <h4 class="talk_title">教学课件</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">文件列表</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->
    <div class="table_area">
      <div style="margin-top: 2%;height: 90%">

      <el-table
        :data="tableData"
        style="width: 100%"
        size="medium">
        <el-table-column
          prop="fileName"
          label="文件名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="authority"
          label="权限者">
        </el-table-column>

      </el-table>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'DocumentList',
    data() {
      return {
        tableData: [{
          fileName: 'File',
          size: '100kb',
          updateTime: '2016-05-02',
          authority:'张三'
        }, {
          fileName: 'File',
          size: '100kb',
          updateTime: '2016-05-02',
          authority:'李四'
        }]
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
    color: #ffffff;
  }
  .table_area {
    min-height: 470px;
    width: 93%;
    margin-right: 5%;
    margin-left: 5%;
  }

</style>
