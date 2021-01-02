<template>
  <div class="body__listing">
    <el-row :gutter="12" class="hotel-listing">
      <el-col :span="6">
        <i class="el-icon-back add-hotel__back" @click="backDashboard"></i>
      </el-col>
      <el-col :span="6" class="add-hotel">
        <span class="add-hotel-btn hidden-sm-and-down" @click="addHotel"><i class="el-icon-plus"></i> Thêm Khách Sạn</span>
        <span class="add-hotel-btn hidden-md-and-up" @click="addHotel"><i class="el-icon-plus"></i> Khách Sạn</span>
      </el-col>
    </el-row>
    <div class="manage-listings">
      <div v-if="isHotelEmpty()" class="handle-empty-hotel">
        <el-image style="width: 50%; height: 50%" :src="'https://cdn.dribbble.com/users/129991/screenshots/7332543/media/d956bb4bcd209e4fc6dc2b82573a38f6.png'" :fit="'contain'"></el-image>
        <h1 class="room-card__title">Wow...Thật Trống Trải.</h1>
        <el-button type="primary" class="continue-btn btn" icon="el-icon-plus" @click="addHotel">Đăng Ký Khách Sạn Mới</el-button>
      </div>
      <el-row v-else :gutter="24">
        <el-col :span="6" class="room-listing">
          <span class="horizontal-line-text-middle m-b-4"><strong>Khách Sạn</strong></span>
          <el-input
            placeholder="Tìm Theo Tên Khách Sạn"
            suffix-icon="el-icon-search"
            class="search-room"
            v-model="search">
          </el-input>
          <div class="hotel-card" v-for="hotel in filteredHotels" :key="hotel.id">
            <div slot="header" class="clearfix">
              <i class="el-icon-location-outline hotel__icon"></i>
              <span class="room-card__title" @click="openDetail(hotel.id)">{{hotel.name}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div v-if="loading()" class="loading">
            <el-image class="loading__image" :src="'https://cdn.dribbble.com/users/4392899/screenshots/8518195/media/a868cf49b2ee6ea60efdc3d3e89a0df0.jpg'" :fit="'contain'"></el-image>
            <span class="hotel-card__content-title hotel-card__content-description">Chọn Khách Sạn Để Xem Chi Tiêt</span>
          </div>
          <router-view v-else :key="$route.fullPath"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      search: '',
    }
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    hotels() {
      return this.$store.state.ownerHotels;
    },
    filteredHotels() {
      return this.hotels.filter(hotel => {
        return hotel.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  methods: {
    addHotel() {
      try {
        this.$router.push(`/dashboard/${this.curOwner.id}/hotels`);
      }
      catch(err) {
        this.alertErr();
      }
    },
    deleteHotel(hotelId) {
      this.$confirm('Xóa vĩnh viễn khách sạn. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
      .then(async() => {
        await this.$store.dispatch('deleteHotel', hotelId);
        this.$store.dispatch('fetchHotels', this.curOwner.id);
        this.alertSuccess();
      })
      .catch(() => {
        this.alertErr();
      });
    }, 
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã xóa khách sạn thành công.',
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
    isHotelEmpty() {
      if (this.$store.state.ownerHotels.length == 0) return true;
      else return false;
    },
    checkPath() {
      return this.$route.path == `/dashboard/${this.curOwner.id}/listing`
    },
    loading() {
      return this.$route.path === `/dashboard/${this.$route.params.id}/listing`
    },
    openDetail(hotelId) {
      this.$router.push(`/dashboard/${this.$route.params.id}/listing/hotel/${hotelId}`);
    },
    backDashboard() {
      this.$router.push(`/dashboard/${this.$route.params.id}`);
    }
  },
  created() {
    this.$route.path;
      
  },
  async mounted() {
    await this.$store.dispatch('fetchHotels', this.curOwner.id);
  },
}
</script>

<style scoped>
.hotel-listing {
  padding: 30px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-hotel {
  display: flex;
  justify-content: flex-end;
}
.add-hotel-btn {
  text-transform: uppercase;
  color: #1174a6;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}
.add-hotel:hover {
  color: #0a4461;
  text-decoration: underline;
}
.manage-listings {
  padding: 0 10%;
}
.manage-listings .horizontal-line-text-middle {
  color: #777;
}
.horizontal-line-text-middle {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  padding-bottom: 30px;
}
.horizontal-line-text-middle:after, .horizontal-line-text-middle:before {
  content: "";
  -ms-flex: 1 1;
  flex: 1 1;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: inherit;
  margin: auto;
}
.horizontal-line-text-middle:after {
  margin-left: 20px;
}
.horizontal-line-text-middle:before {
  margin-right: 20px;
}
.el-progress-bar__inner::after, .el-row::after, .el-row::before, .el-slider::after, .el-slider::before, .el-slider__button-wrapper::after, .el-upload-cover::after {
  content: none;
}
.hotel-card {
  padding-bottom: 30px;
}
.edit-hotel {
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
.hotel-card__content {
  padding-left: 0px !important;
  padding-right: 20px !important;
}
.handle-empty-hotel {
  display: flex; 
  justify-content: center;
  align-items: center;
}
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.search-room {
  margin-bottom: 30px;
}
.hotel__icon {
  font-size: 20px;
  margin-right: 10px;
  font-weight: 700;
}
.hotel-card__content-title {
  font-weight: 700;
}
.hotel-card__content-description {
  padding-top: 20px;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  margin-top: 30px;
}
.loading__image {
  width: 70%; 
  height: 70%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.room-card__title {
  font-size: 20px;
  font-weight: 700;
}
.body__listing {
  height: 80vh;
}
/* Responsive */
@media (max-width: 992px) {
  .hotel-card__content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .hotel-card__content-title {
    font-size: 20px;
  } 
}
</style>