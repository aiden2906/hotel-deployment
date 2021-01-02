<template>
  <div>
    <el-button
      size="mini"
      type="danger"
      @click="handleDelete()">Xóa</el-button>
  </div>
</template>

<script>
export default {
  props: ['attributeId', 'attributeOptionId'],
  methods: {
    handleDelete() {
      this.$confirm('Sẽ xóa tùy chọn viễn vĩnh. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
      .then(async() => {
        await this.$store.dispatch('deleteAttributeOption', {id: this.attributeId, attributeOption: {attributeOpitonId: this.attributeOptionId}});
        this.$store.dispatch('fetchAttributeOptionById', this.attributeId);
        this.dialogVisible = false;
      })
      .catch(() => {
        this.$message({
          showClose: true,
          message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
          type: 'error'
        });
      });
    },
  }
}
</script>