<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
      <h4 class="talk_title">讨论</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">发送消息</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->
    <div style="margin-top: 3%;height: 90%;">
      <div style="width: 50%;min-height: 500px;margin-right: 5%;margin-left: 5%; position:absolute;">

        <!--课时名称 start-->
        <el-form label-width="80px" ref="contactForm" size="medium" :rules="contactRule" :model="contactForm" >

          <!--选择分页 start-->
          <el-form-item label="联系人:" prop="contactID">
            <el-select
              :loading="loading"
              :remote-method="remoteMethod"
              filterable
              placeholder="请输入关键词"
              remote
              reserve-keyword
              v-model="contactForm.contactID">
              <el-option
                :key="item.userId"
                :label="item.nickName"
                :value="item.userId"
                v-for="item in options">
                  <span
                    :title="item.name"
                    style="float: left;width: 120px">
                    {{item.nickName}}
                  </span>
              </el-option>
              <div style="text-align: center">
                <el-button @click.stop="prevePage" class="text" :disabled="selectPage==1" >上一页</el-button>
                <el-button @click.stop="nextPage" class="text" :disabled="selectPage==pageCount">下一页</el-button>
              </div>
            </el-select>
          </el-form-item>
          <!--选择分页 end-->

          <!--作业描述 start-->
          <el-form-item label="内容:" prop="content">
            <el-input
              style="width: 300px"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 5, maxRows: 10}"
              placeholder="请回复内容"
              v-model="contactForm.content">
            </el-input>
          </el-form-item>
          <!--作业描述 end-->

          <!--按钮 start-->
          <el-form-item size="large">
            <el-button @click="onSubmit" type="danger" style="width: 180px;margin-right: 5%">发送</el-button>
            <el-button style="width: 180px">取消</el-button>
          </el-form-item>
          <!--按钮 end-->
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateLesson',
    data() {
      return {
        options: [],
        value: '',
        list: [],
        loading: false,
        states: [],
        total: null,// 获取总数据量
        pageCount: null, // 获取总页数
        selectPage: 1, // 当前页数,
        query:'',

        contactForm:{
          contactID:'',
          content: '',
        },

        contactRule:{
          contactID: [{ required: true, message: '请选择联系人', trigger: 'blur' }],
          content: [{ required: true, message: '请输入发送内容', trigger: 'blur' }],
        }
      };
    },

    methods: {
      remoteMethod(query) {
        console.log(query);
        if(query.split(" ").join("").length !== 0) {
          let url = '/api/student/searchUser';
          this.msgs = [];
          this.query = query
          this.$axios.get(url, {
            params: {
              pageNo: this.selectPage,
              pageSize: 5,
              searchKey: query
            }
          }).then(res => {
            console.log(res);
            this.list = res.data.data.list;
            this.total = res.data.data.pageRows; // 数据总数量
            this.pageCount = res.data.data.pageCount; // 因为我每次只请求20条， 所以算出总页数
            console.log(this.list);
          }).catch(err => {
            this.$message.error(err.data.data.errMsg);
            this.loading = false
          });
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.nickName.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 500);
          } else {
            this.options = [];
          }
        }
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
      },
      /*选择课程 end*/

      onSubmit() {
        const that = this
          console.log(this.contactForm.contactID)
        this.$refs.contactForm.validate(valid => {
          if (valid) {
            let url = '/api/student/writeMessageTo'

            let param = new URLSearchParams()
            param.append('toId', this.contactForm.contactID)
            param.append('content', this.contactForm.content)
            this.$axios.post(url, param)
              .then(function (res) {
              console.log(res)
              if (res.data.status === 'success'&&res.data.data === 'success') {
                console.log(that.contactForm.selectCourseID);
                that.$message.success('发送消息成功')
                that.contactForm.content='';
                that.contactForm.contactID='';
              } else {
                that.$message.error(res.data.data.errMsg)
                console.log(this.createCourseForm.deadline);
              }
            })
          } else {
            console.log('error submit!')
            return false
          }
        })
      },
      handleChange(value) {
        console.log(value);
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
</style>
