<template>
  <div>
    <!-- Room Pricing -->
    <el-form-item
      prop="regularPrice"
      :rules="[
        { required: true, message: 'Price is required' },
        { type: 'number', message: 'Money must be a number' },
      ]"
    >
      <div>
        <h4 class="form__description-title">Giá thông thường</h4>
        <h4 class="form__description-content">
          Vui lòng nhập giá mỗi đêm của quý đối tác cho chỗ nghỉ này. Nếu quý đối tác đang dùng
          người quản lý kênh thì chúng tôi sẽ đồng bộ các giá này giữa các nền tảng một khi đã
          khớp giá.
        </h4>
      </div>
      <el-card shadow="hover">
        <el-input type="regularPrice" v-model.number="room.regularPrice" clearable>
          <template slot="append">VND</template>
        </el-input>
      </el-card>
    </el-form-item>
    <!-- Room Sale Price -->
    <el-form-item
      prop="regularPrice"
      :rules="[
        { required: true, message: 'Price is required' },
        { type: 'number', message: 'Money must be a number' },
      ]"
    >
      <div>
        <h4 class="form__description-title">Giá giảm</h4>
        <h4 class="form__description-content">
          Vui lòng nhập giá giảm mỗi đêm của quý đối tác cho chỗ nghỉ này. Nếu quý đối tác đang
          dùng người quản lý kênh thì chúng tôi sẽ đồng bộ các giá này giữa các nền tảng một khi
          đã khớp giá.
        </h4>
      </div>
      <el-card shadow="hover">
        <el-input type="regularPrice" v-model.number="room.salePrice" clearable>
          <template slot="append">VND</template>
        </el-input>
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