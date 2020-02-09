<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

    <el-form ref="form" :model="replyForm" label-width="80px" size="mini">
      <el-form-item label="发送人">
        <el-input v-model="replyForm.name" style="width: 30%" disabled></el-input>
      </el-form-item>
      <el-form-item label="信息" >
        <el-input
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入内容"
          resize="none"
          style="width: 350px"
          type="textarea"
          v-model="replyForm.receivedMessage"

          disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="回复内容" label-width=20>
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

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: true,
        replyForm: {
          name: '',
          replyMessage:'',
          receivedMessage:''
        },
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>


