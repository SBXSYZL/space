<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
      <h4 class="talk_title">课程</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">选择课程</h5>
      </div>
      <hr class="divide_2">
    </div>

    <!--搜索框 start-->
    <div style="display: flex;width: 50%; height: 5%;padding-left: 5%;padding-top: 1%;padding-bottom: 1%;" >
      <h5>搜索</h5>
      <el-input
        placeholder="输入关键字搜索"
        size="50%"
        v-model="search"
        suffix-icon="el-icon-search"
      />
      <div style="font-size: 40px">
<!--      <i class="el-icon-search"></i>-->
<!--      <el-button type="danger" icon="el-icon-search" style="margin-left: 15px" >搜索</el-button>-->
      </div>
    </div>
    <!--搜索框 end-->

    <div style="height: 5%">
      <h5 class="msg_title">课程列表</h5>
    </div>

    <!--分割线 start-->
    <div class="divide_1"/>
    <!--分割线 end-->

    <!--头部部分 end-->
    <div class="table_area">
    <div style="margin-top: 2%;height: 90%">


        <el-table
          :data="tableData.filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%;min-width: 100%;"
          size="medium"
        >

          <!--序号 start-->
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>
          <!--序号 end-->

          <!--课程名称 start-->
          <el-table-column
            label="课程名称"
            prop="courseName">
          </el-table-column>
          <!--课程名称 end-->

          <!--截至时间 start-->
          <el-table-column
            label="截至时间"
            prop="deadline">
          </el-table-column>
          <!--截至时间 end-->

          <!--课程描述 start-->
          <el-table-column
            label="课程描述"
            prop="courseDescription">
          </el-table-column>
          <!--课程描述 end-->

          <!--课程进度 start-->
          <el-table-column
            label="课程进度"
            >
            <el-progress  :stroke-width="7" :percentage="percentage"></el-progress>
          </el-table-column>
          <!--课程进度 end-->
          <el-table-column
            align="right">
            <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                size="small"
                type="danger"
                round>进入课程
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          courseName: '空间构成-1',
          deadline: '2020年7月14日',
          courseDescription: '空间构成-1的课程描述'
        }, {
          courseName: '空间构成-2',
          deadline: '2020年7月14日',
          courseDescription: '空间构成-2的课程描述'
        }],
        search: '',
        percentage:'30'
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      clearSelect() {
        console.log("aaa");
      },
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
    width: 93%;
    margin-right: 5%;
    margin-left: 5%;
  }

</style>
