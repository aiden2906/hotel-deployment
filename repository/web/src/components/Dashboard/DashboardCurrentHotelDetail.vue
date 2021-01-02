<template>
  <div>
    <!-- Hotel Dettails -->
    <div class="hotel__name">
      <span class="name__title">{{hotel.name}}</span>
      <div class="hotel__actions">
        <el-button type="primary" icon="el-icon-edit" class="name__edit" circle plain @click="editHotel"></el-button>
        <el-button type="danger" icon="el-icon-delete" class="name__edit" circle plain @click="deleteRoom(hotel.id)"></el-button>
      </div>
    </div>
    <template>
      <el-tabs v-model="activeName" stretch class="hotel__detail">
        <el-tab-pane label="Thông Tin" name="first">
          <div class="hotel__info">
            <div>
              <span class="hotel-card__content-title">Địa Chỉ: </span>
              <span class="text-justify">{{hotel.address}}, {{wardById.name}}, {{districtById.name}}, {{provinceById.name}}</span>
            </div>
            <div class="hotel-card__content-description">
              <span class="hotel-card__content-title">Mô tả: </span>
              <p class="text-justify">{{hotel.description}}</p>
            </div>
            <el-row :gutter="24" class="hotel__stock hidden-xs-only">
              <el-col :span="12">
                <span class="hotel-card__content-title">Số Lượng Loại Phòng: </span>
                <span class="text-justify">{{roomQuantity}}</span>
              </el-col>
              <el-col :span="12">
                <span class="hotel-card__content-title">Đánh Giá: </span>
                <span class="text-justify">{{hotel.rating | formatRating}}</span>
              </el-col>
            </el-row>
            <div class="hotel-card__content-description">
              <span class="detail-room-btn" @click="openRoomDetail(hotel.id)">Chi Tiết Các Loại Phòng</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Hình Ảnh" name="second">
          <div class="image__description-helper">
            <h4>* Mẹo: Click vào từng hình để phòng to.</h4>
          </div>
          <div v-if="isImageEmpty(hotel.images)" class="handle-empty-image">
            <el-image style="width: 50%; height: 50%" :src="'https://cdn.dribbble.com/users/992274/screenshots/7392790/media/95483df50a0a3324c4cf9ccb1094b825.jpg'" :fit="'contain'"></el-image>
          </div>
          <div class="hotel-card__images">
            <el-image class="hotel-card__image" v-for="image in hotel.images" :key="image" :src="image" :preview-src-list="hotel.images" :fit="'contain'"></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Đơn Hàng" name="third">
          <dashboard-hotel-order/>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
import DashboardHotelOrder from './DashboardHotelOrder' 
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    DashboardHotelOrder
  },
  computed: {
    hotel() {
      return (Array.from(this.$store.state.ownerHotels).filter(hotel => hotel.id == this.$route.params.hotelId))[0];
    },
    wardById(){
      return this.$store.state.wardById;
    },
    districtById(){
      return this.$store.state.districtById;
    },
    provinceById(){
      return this.$store.state.provinceById;
    },
    roomQuantity() {
      return this.$store.state.roomQuantity;
    }
  },
  methods: {
    editHotel() {
      this.$router.push(`/hotel/${this.$route.params.hotelId}/update`);
    },
    isImageEmpty(images) {
      if (images == null) return true;
      else if (images.length == 0) return true;
      else return false;
    },
    openRoomDetail(hotelId) {
      this.$router.push(`/hotel/${hotelId}/room`);
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchWardById', this.hotel.wardId); 
    await this.$store.dispatch('fetchDistrictById', this.hotel.districtId); 
    await this.$store.dispatch('fetchProvinceById', this.hotel.provinceId); 
  },
}
</script>
<style scoped>
.info{ 
  padding: 0 0 0 3%;
}
.hotel-card__content-title {
  font-weight: 700;
  color: #a6a7ac;
}
.text-justify {
  text-align: justify;
  line-height: 1.2;
  font-weight: 700;
  color: #31343c;
}
.hotel__info {
  background-color: #f4f7f9;
  padding: 40px;
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.hotel__stock {
  padding-top: 20px;
}
.name__title {
  color: #252831;
  font-weight: 700;
  font-size: 40px;
}
.name__edit {
  font-size: 20px;
}
.hotel__name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hotel__detail {
  padding-top: 30px;
}
.hotel-card__image {
  width: 30%;
  height: 30%;
  padding: 1%;
}
.info__hotel{
  padding-top: 10px;
}
.hotel__actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hotel-card__content-description {
  padding-top: 25px;
}
.detail-room-btn {
  text-transform: uppercase;
  color: #1174a6;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  float: right;
  font-size: 15px;
}
</style>