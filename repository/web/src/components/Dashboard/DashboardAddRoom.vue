<template>
  <div class="room-form">
    <i class="el-icon-back add-room__back" @click="backRoomListing"></i>
    <el-divider><h3 class="form__title">Thông tin cơ bản</h3></el-divider>
    <el-steps class="step" :active="active" finish-status="success" align-center>
      <el-step title="Tên Phòng" icon="el-icon-edit"></el-step>
      <el-step title="Số Lượng" icon="el-icon-s-order"></el-step>
      <el-step title="Giá Cả" icon="el-icon-bank-card"></el-step>
      <el-step title="Đặc Trưng Phòng" icon="el-icon-edit-outline"></el-step>
      <el-step title="Hình Ảnh" icon="el-icon-picture"></el-step>
    </el-steps>
    <el-row :gutter="24" class="hidden-md-and-down form__align--center">
      <el-col :span="12">
        <el-image :src="url" :fit="'contain'"></el-image>
      </el-col>
      <el-col :span="12">
        <el-form ref="form-room" :model="room">
          <router-view :room="room" :active="active" @on-back="onBack"/>
        </el-form>
        <div class="form__btn--reversed">
          <el-button v-if="!isStep5()" class="form__btn--submit form__btn" @click="next" type="primary">Tiếp Tục</el-button>
          <el-button v-if="!isStep1and5()" class="form__btn--goback form__btn" @click="back">Quay Lại</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- For small screens -->
    <el-row :gutter="20" class="hidden-lg-and-up">
      <el-col :span="24">
        <el-form ref="form-room" :model="room">
          <router-view :room="room" :active="active" @on-back="onBack"/>
        </el-form>
        <!-- Form Submission -->
        <el-button v-if="!isStep5()" class="form__btn--submit form__btn" @click="next" type="primary">Tiếp Tục</el-button>
        <el-button v-if="!isStep1and5()" class="form__btn--goback form__btn" @click="back">Quay Lại</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      room: {
        hotelId: this.$route.params.id,
        name: '',
        description: '',
        stock: 0,
        regularPrice: 0,
        salePrice: 0,
        capacity: 0,
        attributes: [
          {
            attributeId: '',
            attributeOptionId: '',
            attributeOptions: [],
          },
        ],
        images: [],
      },
      url: "https://cdn.dribbble.com/users/1365253/screenshots/7895099/media/4347106b9ba52ad4dcdd2fdabbc465f7.png",
      active: 0
    };
  },
  methods: {
    backRoomListing() {
      this.$confirm('Bài viết chưa được lưu. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      })
      .then(() => {
        this.$router.push(`/hotel/${this.$route.params.id}/room`);
      })
      .catch(() => {
        return;
      });
    },
    next() {
      if (this.active++ > 4) this.active = 0;
      if (this.active === 1) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/quantity`)
      }
      if (this.active === 2) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/pricing`)
      }
      if (this.active === 3) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/attributes`)
      }
      if (this.active === 4) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/photos`)
      }
    },
    isStep5() {
      return this.$route.path === `/hotel/${this.$route.params.id}/room/new/photos`
    },
    isStep1and5() {
      return this.$route.path === `/hotel/${this.$route.params.id}/room/new` || this.$route.path === `/hotel/${this.$route.params.id}/room/new/photos`;
    },
    back() {
      if (this.active === 1) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/room/new`)
      }
      if (this.active === 2) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/quantity`)
      }
      if (this.active === 3) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/pricing`)
      }
      if (this.active === 4) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/attributes`)
      }
    },
    onBack(active) {
      this.active = active;
      if (active == 3) {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new/attributes`)
      }
    }
  },
};
</script>
<style scoped>
.room-form {
  border-left: 1px solid #dddfe2;
  padding: 30px 10%;
  /* height: 80vh; */
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
.form__btn--submit:active {
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
}
.form__btn--submit:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}

.form__add-attribute {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.form__add-attribute-select {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.form__add-attribute-btn {
  cursor: pointer;
  color: #999;
  font-size: 14px;
  margin: 0 0 10px;
}
.add-room__back {
  font-size: 25px;
  cursor: pointer;
}
.form__align--center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form__btn--reversed {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
</style>
