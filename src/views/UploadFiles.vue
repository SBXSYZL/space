<template>
  <div>
    <!--头部部分 start-->
    <div style="margin-top: 2%;height: 10%">
      <h4 class="talk_title">课程</h4>
      <div class="divide_1"/>
      <div style="height: 5%">
        <h5 class="msg_title">新建课程</h5>
      </div>
      <hr class="divide_2">
    </div>
    <!--头部部分 end-->

    <div style="margin-top: 3%;height: 90%;">
      <div style="width: 50%;min-height: 500px;margin-right: 5%;margin-left: 5%; position:absolute;">
        <!--标题名称 start-->
        <el-form label-width="80px" ref="form" size="medium">
          <el-form-item label="标题">
            <el-input clearable placeholder="请输入标题" style="width: 250px" v-model="courseName"></el-input>
          </el-form-item>
          <!--标题名称 end-->

          <!--内容描述 start-->
          <el-form-item label="内容描述">
            <el-input
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
              resize="none"
              style="width: 350px"
              type="textarea"
              v-model="courseDescription">
            </el-input>
          </el-form-item>
          <!--课程描述 end-->

          <!--封面图 start-->
          <el-form-item label="封面图">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img :src="dialogImageUrl" alt="" width="100%">
            </el-dialog>
          </el-form-item>
          <!--封面图 end-->

          <!--上传课件 start-->
          <el-form-item label="课件">
            <el-upload

              :before-remove="beforeRemove"
              :file-list="fileList"
              :limit="3"
              :on-exceed="handleExceed"
              :on-remove="handleRemove2"
              action="https://jsonplaceholder.typicode.com/posts/"
              class="upload-demo"
              multiple>
              <el-button size="small" type="primary">点击上传</el-button>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <!--上传课件 end-->

          <!--按钮 start-->
          <el-form-item size="large">
            <el-button @click="onSubmit" style="width: 180px;margin-right: 5%" type="danger">提交</el-button>
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
    name: 'CreateCourse',
    data() {
      return {
        courseName: '',
        courseDescription: '',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [{
          name: '',
          url: ''
        }]
      };
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleChange(value) {
        console.log(value);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove2(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    }
  };
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
