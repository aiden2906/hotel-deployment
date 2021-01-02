<template>
  <div>
    <el-button
      size="mini"
      type="success"
      plain
      @click="handleSelect(attributeId)">Cập Nhật</el-button>
    <el-dialog
      title="Cập Nhật Thuộc Tính"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="attribute" :model="attribute" class="attribute-option__card" @keyup.native.enter="handleConfirm('attribute')">
        <el-form-item 
        label="Tên Thuộc Tính"
        :label-position="'top'"
        prop="name"
        :rules="[
          { required: true, message: 'Name is required'},
        ]">
            <el-input v-model="attribute.name" maxlength="100" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('attribute')">Hủy</el-button>
        <el-button type="primary" @click="handleConfirm('attribute')">Xác Nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['attributeId'],
  data() {
    return {
      dialogVisible: false,
      attribute: {
        name: this.attributeName
      },
      attributeName: ''
    };
  },
  methods: {
    handleCancel(formName) {
      this.$confirm('Sẽ không cập nhật thuộc tính. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
      .then(async() => {
        this.dialogVisible = false;
        this.$refs[formName].resetFields();
      })
      .catch(() => {
        return;
      });
    },
    handleConfirm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('updateAttribute', {id: this.attributeId, attribute: this.attribute});
          this.$store.dispatch('fetchAttributes');
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
        }
        else {
          this.alertFillForm();
        }
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã cập nhật thành công.',
        type: 'success'
      });
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        type: 'error'
      });
    },
    alertFillForm() {
      this.$message({
        showClose: true,
        message: 'Thiếu thông tin. Vui lòng điền đầy đủ!',
        type: 'warning'
      });
    },
    async handleSelect(attributeId){
      this.attributeName = await this.$store.dispatch('fetchAttributeById', attributeId);
      this.attribute.name = this.attributeName.name;
      this.dialogVisible = true;
    }
  },
}
</script>
<style scoped>
.header__icon {
  padding: 10px;
  font-size: 25px;
  color: #1174a6;
}
.header__icon:hover {
  color: #0c5478;
}
.attribute__add {
  display: flex;
  align-items: center;
  padding-top: 15px;
  cursor: pointer;
  font-weight: 700;
  color: #1174a6;
}
.attribute__add:hover {
  color: #0c5478;
}
.attribute-option__card {
  padding: 0 50px;
  padding-bottom: 20px;
}
</style>