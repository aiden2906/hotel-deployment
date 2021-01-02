<template>
  <div>
    <el-button
      size="mini"
      type="success"
      @click="handleSelect(attributeOptionId)">Cập Nhật</el-button>
    <el-dialog
      title="Cập Nhật Thuộc Tính"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="attribute-option" :model="attributeOption" class="attribute-option__card" @keyup.native.enter="handleConfirm('attribute-option')">
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
  props: ['attributeId','attributeOptionId'],
  data() {
    return {
      dialogVisible: false,
      attributeOption: {
        name: ''
      },
      attributeOptionName: ''
    };
  },
  computed: {
    attributeOptions() {
      return Array.from(this.$store.state.attributeOptions);
    },
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
          await this.$store.dispatch('updateAttributeOption', {id: this.attributeOptionId, attributeOption: this.attributeOption});
          await this.$store.dispatch('fetchAttributeOptionById', this.attributeId);
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
    async handleSelect(attributeOptionId){
      this.attributeOptionName = this.attributeOptions.filter(attrOption => {
        return attrOption.id === attributeOptionId;
      });
      this.attributeOption.name = this.attributeOptionName[0].name;
      this.dialogVisible = true;
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