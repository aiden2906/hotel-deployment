<template>
  <div>
    <!-- Room Name -->
    <el-form-item>
      <div>
        <h4 class="form__description-title">Đặt tên cho phòng</h4>
        <h4 class="form__description-content">
          Hãy tận dụng, và làm cho nó nghe có vẻ hấp dẫn. Đừng lo lắng, chúng tôi sẽ tạo các ngôn
          ngữ khác bằng mẫu dịch chuẩn.
        </h4>
      </div>
      <el-card shadow="hover">
        <el-input v-model="room.name" maxlength="100" show-word-limit></el-input>
      </el-card>
    </el-form-item>
    <!-- Room Description -->
    <el-form-item>
      <div>
        <h4 class="form__description-title">Mô tả phòng của bạn</h4>
        <h4 class="form__description-content">
          Những đặc điểm nổi bật của khách sạn để thu hút du khách.
        </h4>
      </div>
      <el-card shadow="hover">
        <el-input
          v-model="room.description"
          type="textarea"
          rows="4"
          maxlength="5000"
          show-word-limit
        ></el-input>
      </el-card>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: ['room']
}
</script>
<style scoped>
.form__description-title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
}
.form__description-content {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
</style>