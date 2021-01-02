<template>
  <div>
    <div class="add-hotel">
      <div>
        <i class="el-icon-back add-hotel__back" @click="backRoomListing"></i>
        <el-divider><h2 class="add-hotel__title">Cập Nhật Khách Sạn</h2></el-divider>
        <el-steps class="step" :active="active" finish-status="success">
          <el-step title="Tên Khách Sạn" icon="el-icon-edit"></el-step>
          <el-step title="Địa Chỉ" icon="el-icon-location"></el-step>
          <el-step title="Hình Ảnh" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
      <el-row :gutter="24" class="hidden-xs-only hotel__image--center">
        <el-col :span="12">
          <el-image :src="url" :fit="'contain'"></el-image>
        </el-col>
        <el-col :span="12" >
          <el-form ref="form" :model="hotel">
            <router-view :hotel="hotel" :active="active" @on-back="onBack"></router-view>
          </el-form>
          <el-button v-if="!isStep3()" class="continue-btn btn" @click="next" type="primary">Tiếp Tục</el-button>
          <el-button v-if="!isStep1and3()" class="goback-btn btn" @click="back">Quay Lại</el-button>
        </el-col>
      </el-row>
      <!-- For small screens -->
      <el-row :gutter="24" class="hidden-sm-and-up">
        <el-col :span="24" >
          <el-form ref="form" :model="hotel">
            <router-view :hotel="hotel" :active="active" @on-back="onBack"></router-view>
          </el-form>
          <el-button v-if="!isStep3()" class="continue-btn btn" @click="next" type="primary">Tiếp Tục</el-button>
          <el-button v-if="!isStep1and3()" class="goback-btn btn" @click="back">Quay Lại</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      url: "https://cdn.dribbble.com/users/1647667/screenshots/10760064/media/47c23c5d4335f38553ca5bb671495455.jpg"
    };
  },
  methods: {
    backRoomListing() {
      this.$confirm('Bài đăng vẫn chưa hoàn tất. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      })
        .then(() => {
          this.$router.push(`/dashboard/${this.$route.params.id}/listing/hotel/${this.hotel.id}`);
        })
        .catch(() => {
          return;
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
      if (this.active === 1) {
        this.$router.push(`/hotel/${this.$route.params.id}/update/location`)
      }
      if (this.active === 2) {
        this.$router.push(`/hotel/${this.$route.params.id}/update/photos`)
      }
    },
    isStep3() {
      return this.$route.path === `/hotel/${this.$route.params.id}/update/photos`
    },
    isStep1and3() {
      return this.$route.path === `/hotel/${this.$route.params.id}/update` || this.$route.path === `/hotel/${this.$route.params.id}/update/photos`;
    },
    back() {
      if (this.active === 2) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/update/location`)
      }
      else {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/update`)
      }
    },
    onBack(active) {
      this.active = active;
      if (active == 1) {
        this.$router.push(`/hotel/${this.$route.params.id}/update/location`)
      }
    }
  },
  computed: {
    hotel() {
      return this.$store.state.hotelById;
    },
  },
  async created() {
    await this.$store.dispatch('fetchHotelById', this.$route.params.id);
  },
};
</script>
<style scoped>
.add-hotel {
  padding: 0 10%;
}
.add-hotel__title {
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
}
.add-hotel__select-info {
  width: 100%;
}
.add-hotel__back {
  font-size: 25px;
  padding-top: 20px;
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
.goback-btn{
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
.btn {
  margin-left: 5px;
  margin-top: 10px;
  float: right;
  min-height: 42px;
  min-width: 180px;
  text-transform: uppercase;
  margin-bottom: 15px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hotel__image--center {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Responsive */
@media (min-width: 1480px) {
  .add-hotel {
    height: 85vh;
  }
}
@media (max-width: 767px) {
  .add-hotel {
    height: 90vh;
  }
}
</style>
