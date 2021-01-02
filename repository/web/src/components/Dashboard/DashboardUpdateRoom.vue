<template>
  <div class="room-form">
    <i class="el-icon-back add-room__back" @click="backRoomListing"></i>
    <el-divider><h3 class="form__title">Cập Nhật Thông Tin</h3></el-divider>
    <el-steps class="step" :active="active" finish-status="success" align-center>
      <el-step title="Tên Loại Phòng" icon="el-icon-edit"></el-step>
      <el-step title="Số Lượng Phòng" icon="el-icon-s-order"></el-step>
      <el-step title="Giá cả" icon="el-icon-bank-card"></el-step>
      <el-step title="Hình Ảnh" icon="el-icon-picture"></el-step>
    </el-steps>
    <el-row :gutter="24" class="hidden-xs-only hotel__image--center">
      <el-col :span="12">
        <el-image :src="url" :fit="'contain'" class="hotel__image--border"></el-image>
      </el-col>
      <el-col :span="12">
        <el-form ref="form-room" :model="room">
          <router-view :room="room" :active="active" @on-back="onBack"/>
          <el-button v-if="!isStep4()" class="form__btn--submit form__btn" @click="next" type="primary">Tiếp Tục</el-button>
          <el-button v-if="!isStep1and4()" class="form__btn--goback form__btn" @click="back">Quay Lại</el-button>
        </el-form>
      </el-col>
    </el-row>
    <!-- For small screens -->
    <el-row :gutter="24" class="hidden-sm-and-up hotel__image--center">
      <el-col :span="24">
        <el-form ref="form-room" :model="room">
          <router-view :room="room" :active="active" @on-back="onBack"/>
          <el-button v-if="!isStep4()" class="form__btn--submit form__btn" @click="next" type="primary">Tiếp Tục</el-button>
          <el-button v-if="!isStep1and4()" class="form__btn--goback form__btn" @click="back">Quay Lại</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "https://cdn.dribbble.com/users/1302132/screenshots/13930733/media/34565e0b9c5247081cc0a54c69169e3a.png",
      active: 0
    };
  },
  methods: {
    backRoomListing() {
      this.$router.push(`/hotel/${this.$route.params.id}/room`);
    },
    next() {
      if (this.active++ > 4) this.active = 0;
      if (this.active === 1) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/quantity`)
      }
      if (this.active === 2) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/pricing`)
      }
      if (this.active === 3) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/photos`)
      }
    },
    isStep4() {
      return this.$route.path === `/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/photos`
    },
    isStep1and4() {
      return this.$route.path === `/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}` || this.$route.path === `/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/photos`;
    },
    back() {
      if (this.active === 1) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}`)
      }
      if (this.active === 2) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/quantity`)
      }
      if (this.active === 3) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/pricing`)
      }
    },
    onBack(active) {
      this.active = active;
      if (active == 2) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}/pricing`)
      }
    }
  },
  computed: {
    room() {
      return this.$store.state.roomById;
    },
  },
  async created() {
    await this.$store.dispatch('fetchRoomById', this.$route.params.roomId);
  }
};
</script>
<style scoped>
.room-form {
  border-left: 1px solid #dddfe2;
  padding: 30px 10%;
  height: 100vh;
}
.form__title {
  font-size: 24px;
  margin: 8px 0;
  text-align: center;
}
.form__btn {
  margin-left: 5px;
  float: right;
  min-height: 42px;
  min-width: 180px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
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
.form__btn--submit {
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
}
.form__btn--goback {
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
.form__submit:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.add-room__back {
  font-size: 25px;
  cursor: pointer;
}
.step {
  padding-bottom: 30px;
}
.hotel__image--border {
  border-radius: 25px;
  margin-right: 10px;
}
.hotel__image--center {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Responsive */
@media (max-width: 767px) {
  .room-form {
    height: unset;
  }
}
</style>
