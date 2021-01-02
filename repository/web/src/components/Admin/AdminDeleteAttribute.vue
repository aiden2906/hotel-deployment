<template>
  <div>
    <el-button
      size="mini"
      type="danger"
      @click="handleDelete(attributeId)">Xóa</el-button>
  </div>
</template>

<script>
export default {
  props: ['attributeId'],
  methods: {
    handleDelete(attributeId) {
      this.$confirm('Sẽ xóa thuộc tính viễn vĩnh. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
      .then(async() => {
        await this.$store.dispatch('deleteAttribute', attributeId);
        await this.$store.dispatch('fetchAttributes');
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