<template>
  <div class="room-lisiting">
    <el-row :gutter="24" class="hotel-listing">
      <el-col :span="12">
        <i class="el-icon-back add-hotel__back" @click="backHotelListing"></i>
      </el-col>
      <el-col :span="12" class="add-room">
        <span class="add-room-btn" @click="addRoom">
          <i class="el-icon-plus"></i> Thêm Phòng Mới
        </span>
      </el-col>
    </el-row>
    
    <div class="manage-listings">
      <el-row :gutter="24">
        <div v-if="isEmptyRoom()" class="empty-room">
          <el-image :src="url" :fit="'contain'"></el-image>
          <h1 class="room-card__title">Wow...Thật Trống Trải.</h1>
          <h1 class="room-card__title">Chưa Có Loại Phòng Nào Được Tạo!</h1>
          <el-button type="primary" class="continue-btn btn" icon="el-icon-plus" @click="addRoom">Tạo Loại Phòng Mới</el-button>
        </div>
        <el-row v-else :gutter="24">
          <el-col :span="6">
            <div class="room-listing room-listing-title--padding">
              <el-image class="hidden-xs-only" style="width: 35%; height: 35%" :src="'https://cdn.dribbble.com/users/2235251/screenshots/14401198/media/7efbcf94d9270a09a1ec41297ce6df05.jpg'" :fit="'contain'"></el-image>
              <el-divider><strong class="room-listing-title">Danh Sách</strong></el-divider>
            </div>
            <el-input
              placeholder="Tìm Theo Tên Phòng"
              suffix-icon="el-icon-search"
              class="search-room"
              v-model="search"
            ></el-input>
            <div class="room-card" v-for="room in filteredRooms" :key="room.id">
              <div slot="header" class="clearfix">
                <i class="el-icon-school hotel__icon"></i>
                <span class="room-card__title" @click="openDetail(room.id)">{{room.name}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div v-if="loading()" class="loading">
              <el-image style="width: 80%; height: 80%; border-radius: 20px;" :src="'https://cdn.dribbble.com/users/35810/screenshots/11470605/media/fc6061355926bf8363220642409ff05a.jpg'" :fit="'contain'"></el-image>
              <span class="room-card__content-title room-card__content-description">Chọn Loại Phòng Để Xem Chi Tiêt</span>
            </div>
            <router-view v-else :key="$route.fullPath"/>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      url: "https://cdn.dribbble.com/users/1174720/screenshots/4966906/dribbble-livingroom.jpg"
    };
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    rooms() {
      return this.$store.state.roomsByHotelId;
    },
    hotel() {
      return this.$store.state.hotelById;
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
    filteredRooms() {
      return (Array.from(this.rooms) || []).filter(room => {
        return room.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    roomQuantity() {
      return this.$store.state.roomQuantity;
    }
  },
  methods: {
    addRoom() {
      try {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new`);
      } catch (err) {
        this.alertErr();
      }
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: "Đã có lỗi xảy ra, vui lòng thử lại.",
        type: "error"
      });
    },
    backHotelListing() {
      this.$router.push(`/dashboard/${this.curOwner.id}/listing`);
    },
    isEmptyRoom() {
      return this.rooms.length == 0;
    },
    openDetail(roomId) {
      this.$router.push(`/hotel/${this.$route.params.id}/room/${roomId}/detail`);
    },
    loading() {
      return this.$route.path === `/hotel/${this.$route.params.id}/room`
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchHotelById", this.$route.params.id);
    await this.$store.dispatch("fetchRoomsByHotelId", this.$route.params.id);
    await this.$store.dispatch('fetchWardById', this.hotel.wardId); 
    await this.$store.dispatch('fetchDistrictById', this.hotel.districtId); 
    await this.$store.dispatch('fetchProvinceById', this.hotel.provinceId); 
  },
};
</script>

<style scoped>
.room-lisiting {
  padding: 0px 10%;
  height: 90vh;
}
.hotel-listing {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-room {
  display: flex;
  justify-content: flex-end;
}
.add-room-btn {
  text-transform: uppercase;
  color: #1174a6;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}
.add-room:hover {
  color: #0a4461;
  text-decoration: underline;
}
.room-card {
  padding-bottom: 30px;
}
.edit-room {
  color: #1174a6;
  font-weight: 600;
  position: relative;
  margin: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  padding: 20px 0;
  margin: 0 12px;
  text-decoration: none;
  font-size: 16px;
  float: right;
}
.room-card__title {
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  color: inherit;
  word-break: break-all;
  margin-top: 0;
  font-size: 20px;
}
.text-justify {
  text-align: justify;
  line-height: 1.2;
  margin: 10px 10px 0;
  font-weight: 700;
}
.room-card__content {
  padding-left: 0px !important;
  padding-right: 20px !important;
}
.room-card__content-title {
  font-weight: 700;
}
.room-card__content-description {
  padding-top: 30px;
}
.add-hotel__back {
  font-size: 25px;
}
.hotel-card__body {
  padding: 20px 20px 0;
}
.hotel-card__images {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.add-hotel__back {
  cursor: pointer;
}
.room-card__content-image {
  margin-top: 50px;
}
.empty-room {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
}
.continue-btn {
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
  margin-top: 12px;
}
.continue-btn:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.btn {
  margin-left: 5px;
  margin-top: 10px;
  float: right;
  min-height: 40px;
  min-width: 180px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  padding: 10px 15px;
  font-size: 18px;
  line-height: 1.42857;
  border-radius: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  margin-top: 30px;
}
.hotel__icon {
  font-size: 25px;
  margin-right: 10px;
}
.room-listing {
  /* padding: 75px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-room {
  margin-bottom: 30px;
}
.room-listing-title--padding {
  padding-bottom: 15px;
}
.room-listing-title {
  font-size: 20px;
}
/* Responsive */
@media (max-width: 992px) {
  .room-card__content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .room-card__title {
    font-size: 14px;
  }
  .room-listing-title {
    font-size: 14px;
  }
}
@media (max-width: 767px) {
  .room-card__content-title {
    font-size: 18px;
  }
}
</style>