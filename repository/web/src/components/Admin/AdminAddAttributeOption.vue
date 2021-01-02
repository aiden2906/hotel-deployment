<template>
  <div>
    <div class="attribute__add" @click="dialogVisible = true">
      <i class="el-icon-circle-plus-outline header__icon"></i> Thêm Thuộc Tính
    </div>
    <el-dialog
      title="Thêm Tùy Chọn"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="attribute-option" :model="attributeOption" class="attribute-option__card" @submit.native.prevent>
        <el-form-item 
        label="Tên Thuộc Tính Tùy Chọn"
        :label-position="'top'"
        prop="name"
        :rules="[
          { required: true, message: 'Name is required'},
        ]">
            <el-input v-model="attributeOption.name" maxlength="100" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('attribute-option')">Hủy</el-button>
        <el-button type="primary" @click="handleConfirm('attribute-option')">Xác Nhận</el-button>
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
      attributeOption: {
        name: ''
      },
    };
  },
  methods: {
    handleCancel(formName) {
      this.$confirm('Sẽ không thêm tùy chọn mới. Tiếp tục?', 'Cảnh Báo', {
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
          await this.$store.dispatch('createAttributeOption', {id: this.attributeId, attributeOption: this.attributeOption});
          this.$store.dispatch('fetchAttributeOptionById', this.attributeId);
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
        message: 'Đã thêm thành công.',
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
    }
  }
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