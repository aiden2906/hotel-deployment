<template>
  <el-container class="carousel-info">
    <el-carousel class="hidden-xs-only" indicator-position="outside" height="350px" style="width: 100%">
      <el-carousel-item class="carousel-info-item" v-for="item in info" :key="item.content">
        <el-row :gutter="18" class="info-item">
          <el-col :span="6">
            <el-image style="background-color: #fff" :src="item.url"></el-image>
          </el-col>
          <el-col :span="14">
              <h3 class="info-title">{{ item.title }}</h3>
              <h4 class="info-content">{{ item.content }}</h4>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <!-- For small screen -->
    <el-carousel class="hidden-sm-and-up" indicator-position="outside" height="650px" style="width: 100%">
      <el-carousel-item class="carousel-info-item--small" v-for="item in info" :key="item.content">
        <div class="info__content">
          <el-image class="info__image" :src="item.url"></el-image>
          <h3 class="info__title--small">{{ item.title }}</h3>
          <h4 class="info__content--small">{{ item.content }}</h4>
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      
      info: [
        {
          url: "https://cdn5.agoda.net/ycs/dist/images/carousel-1-__Sw-.png",
          title:
            "Điền vào chỗ trống trong lịch đặt phòng của quý đối tác - nhanh chóng.",
          content:
            "Agoda tiếp cận 2,3 triệu du khách từ 65 quốc gia. Chúng tôi có khả năng tiếp cận mà các nền tảng khác không có, và mang lại các đặt phòng mà các nền tảng khác không thể mang lại."
        },
        {
          url: "https://cdn5.agoda.net/ycs/dist/images/carousel-2-3Nlre.png",
          title:
            "Quý đối tác thích tiền không? Chúng tôi sẽ không lấy tiền của quý đối tác.",
          content:
            "Đăng ký miễn phí, ghi danh chỗ nghỉ miễn phí, và tất cả các công cụ để giúp bạn quản lý chỗ nghỉ của mình đều miễn phí. Đơn giản là ghi danh chỗ nghỉ của bạn, định giá hằng đêm bạn muốn thu, sau đó ngồi xuống, thư giãn và xem lượng đặt phòng chảy về!"
        },
        {
          url: "https://cdn5.agoda.net/ycs/dist/images/carousel-3-1V-vN.png",
          title:
            "Tất cả những điều tuyệt vời quý đối tác muốn có từ một nền tảng.",
          content:
            "Chúng tôi để quý đối tác liên lạc với khách, quản lý đặt phòng từ thiết bị di động, và đồng bộ hóa lịch trên các nền tảng. Cộng với hỗ trợ trực tuyến bằng nhiều ngôn ngữ."
        }
      ]
    };
  },
}
</script>

<style scoped>
/* Carousel Info*/
.carousel-info {
  background: linear-gradient(90deg, #ffc7d4, #ffddd8);
  padding: 0 20%;
  padding-top: 3%;
  padding-bottom: 1%;
}
.carousel-info .carousel-info-item {
  display: flex;
}

.carousel-info .carousel-info-item .info-item{
  display: flex;
  align-items: center;
}

.el-carousel__item {
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin: 0 20px;
  border-radius: 3px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  white-space: normal;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 40px;
}

.info-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.25;
}

.info-content {
  font-size: 20px;
  line-height: 32px;
  font-weight: 600;
}

.info__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info__image {
  background-color: #fff; 
  width: 80%; 
  height: 80%;
}
.info__title--small {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
}
.info__content--small {
  font-size: 20px;
  line-height: 25px;
  font-weight: 600;
}
.carousel-info-item--small {
  width: unset !important;
}
/* Responsive */
@media (min-width: 768px) and (max-width: 992px) {
  .info-title {
    font-size: 22px;
  }
  .info-content {
    font-size: 14px;
    line-height: 25px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .info-title {
    font-size: 24px;
  }
  .info-content {
    font-size: 15px;
    line-height: 28px;
  }
}
@media (min-width: 1200px) and (max-width: 1480px) {
  .info-title {
    font-size: 25px;
  }
  .info-content {
    font-size: 16px;
    line-height: 28px;
  }
}
@media (min-width: 1320px) and (max-width: 1480px) {
  .info-title {
    font-size: 28px;
    line-height: 1.25;
  }
  .info-content {
    font-size: 18px;
    line-height: 30px;
  }
}
</style>