<template>

  <!--选择分页 start-->
  <el-select v-model="taskId" popper-class="selectJob" size="small">
    <el-option v-for="(item,index) in restoreTable" :key="index" :label="item.courseName" :value="item.courseId">
      <span style="float: left;width: 120px" :title="item.name">{{item.courseName}}</span>
    </el-option>
    <div style="text-align: center">
      <el-button class="text" @click.stop="prevePage"  v-show="selectPage!==1"  >上一页</el-button>
      <el-button class="text" @click.stop="prevePage"  v-show="selectPage===1"  disabled>上一页</el-button>
      <el-button class="text" @click.stop="nextPage" v-show="selectPage!==pageCount">下一页</el-button>
      <el-button class="text" @click.stop="nextPage" v-show="selectPage===pageCount" disabled>下一页</el-button>
    </div>
  </el-select>
  <!--选择分页 end-->

</template>

<script>
  export default {
    data() {
      return {
        total: null ,// 获取总数据量
        pageCount: null, // 获取总页数
        selectPage: 1, // 当前页数
        restoreTable: [], //当前页数数据
        taskId:''
      };
    },
    mounted() {
      this.getTableList(); // 初始化
    },
    methods: {
      getTableList(form = {}) {

        let url = '/api/teacher/getCourseList';
        this.msgs = [];

        this.$axios.get(url, {
          params: {
            pageNo: this.selectPage,
            pageSize: 5
          }
        }).then(res => {
          console.log(res);
          if (res.data.status === 'success') {
            this.restoreTable = res.data.data.list;
            this.total = res.data.data.pageRows; // 数据总数量

            this.pageCount = res.data.data.pageCount; // 因为我每次只请求20条， 所以算出总页数
            this.taskId = this.restoreTable[0].id; // 因为每次都选取第一条数据;
          } else {
            this.$message.error(res.data.data.errMsg)
          }
          this.loading=false
        }).catch(err => {
          this.$message.error(err.data.data.errMsg)
          this.loading=false
        })


      },
      prevePage() {
        --this.selectPage;
        if (this.selectPage < 1) { // 判断点击的页数是否小于1
          this.selectPage = 1;
        }

        this.getTableList();
      },
      nextPage() {
        if (this.selectPage < this.pageCount) { // 判断点击的页数是否小于总页数;
          ++this.selectPage;
          this.getTableList();
        }
      }
    }
  };
</script>

<style scoped>

  </style>
