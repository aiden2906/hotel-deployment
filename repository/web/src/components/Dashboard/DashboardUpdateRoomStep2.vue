<template>
  <div>
    <!-- Room Capacity -->
    <el-form-item>
      <div>
        <h4 class="form__description-title">Sức chứa</h4>
        <h4 class="form__description-content">
          Số lượng người tối đa có thể ngủ thoải mái theo số lượng giường và sofa cung cấp.
        </h4>
      </div>
      <el-card shadow="hover">
        <el-input-number v-model="room.capacity" :min="0" autosize></el-input-number>
      </el-card>
    </el-form-item>
    <!-- Room Stock -->
    <el-form-item>
      <div>
        <h4 class="form__description-title">Số lượng phòng</h4>
        <h4 class="form__description-content">
          Nếu chỗ ở của bạn là phòng gác mái hoặc studio, số lượng phòng ngủ là 0.
        </h4>
      </div>
      <el-card shadow="hover">
        <el-input-number v-model="room.stock" :min="0"></el-input-number>
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