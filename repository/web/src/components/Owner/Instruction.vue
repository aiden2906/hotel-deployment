<template>
  <div class="instruct">
    <h1 class="instruct-title">Tất cả những gì bạn cần làm là</h1>
    <el-row :gutter="20" >
      <el-col class="instruct-info" :span="6" v-for="instruct in instructions" :key="instruct.content">
        <el-image
          style="width: 120px; height: 120px; background-color: #fff"
          :src="instruct.url"
        ></el-image>
        <div class="instruct-content">{{instruct.content}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      instructions: [
        {
          url:
            "https://img.agoda.net/images/nha_host_marketing/sign-in-sign-up@2x.png",
          content: "Đăng nhập hoặc đăng ký tài khoản Agoda"
        },
        {
          url:
            "https://img.agoda.net/images/nha_host_marketing/upload-details.png",
          content: "Đăng tải hình ảnh và thông tin về nơi ở"
        },
        {
          url:
            "https://img.agoda.net/images/nha_host_marketing/set-prices@2x.png",
          content: "Cài đặt mức giá và chọn ngày có phòng trống"
        },
        {
          url: "https://img.agoda.net/images/nha_host_marketing/go-live@2x.png",
          content: "Xem căn hộ của bạn được quảng bá đến hàng triệu du khách"
        }
      ],
    }
  }
}
</script>

<style scoped>
/* Instructions */
.instruct {
  text-align: center;
  padding: 50px 20%;
}
.instruct .instruct-content {
  font-size: 16px;
  font-weight: 700;
}

.instruct .instruct-title {
  color: #2a2a2e;
  margin-top: 0;
  margin-bottom: 20px;
}
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

@media (max-width: 1000px) {
  .instruct-info {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .instruct-content {
    width: max-content;
  }
}
</style>