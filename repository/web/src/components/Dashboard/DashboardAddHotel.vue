<template>
  <div class="add-hotel">
    <div>
      <div>
        <i class="el-icon-back add-hotel__back" @click="backListing"></i>
        <el-divider><h2 class="add-hotel__title">Đăng Ký Khách Sạn</h2></el-divider>
        <el-steps class="step" :active="active" finish-status="success">
          <el-step title="Tên Khách Sạn" icon="el-icon-edit"></el-step>
          <el-step title="Địa Chỉ" icon="el-icon-location"></el-step>
          <el-step title="Hình Ảnh" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
      <el-row :gutter="24" class="hidden-xs-only hotel__image--center">
        <el-col :span="10">
          <el-image :src="url" :fit="'contain'"></el-image>
        </el-col>
        <el-col :span="14">
          <el-form ref="form" :model="hotel">
            <router-view :hotel="hotel" :active="active" @on-back="onBack"></router-view>
          </el-form>
          <el-button v-if="!isStep3()" class="continue-btn btn" @click="next" type="primary">Tiếp Tục</el-button>
          <el-button v-if="!isStep1and3()" class="goback-btn btn" @click="back">Quay Lại</el-button>
        </el-col>
      </el-row>
      <!-- For small screens -->
      <el-row :gutter="24" class="hidden-sm-and-up">
        <el-col :span="24">
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
      hotel: {
        name: '',
        address: '',
        provinceId: '',
        districtId: '',
        wardId: '',
        description: '',
        images: [],
        ownerId: this.$store.state.curOwner.id,
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      active: 0,
      url: "https://cdn.dribbble.com/users/129991/screenshots/6008315/hotel.png"
    };
  },
  methods: {
    backListing() {
      this.$confirm('Bài đăng vẫn chưa hoàn tất. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      })
        .then(() => {
          this.$router.push(`/dashboard/${this.curOwner.id}/listing`);
        })
        .catch(() => {
          return;
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
      if (this.active === 1) {
        this.$router.push(`/dashboard/${this.curOwner.id}/hotels/location`)
      }
      if (this.active === 2) {
        this.$router.push(`/dashboard/${this.curOwner.id}/hotels/photos`)
      }
    },
    isStep3() {
      return this.$route.path === `/dashboard/${this.curOwner.id}/hotels/photos`
    },
    isStep1and3() {
      return this.$route.path === `/dashboard/${this.curOwner.id}/hotels` || this.$route.path === `/dashboard/${this.curOwner.id}/hotels/photos`;
    },
    back() {
      if (this.active === 2) {
        this.active -= 1;
        this.$router.push(`/dashboard/${this.curOwner.id}/hotels/location`)
      }
      else {
        this.active -= 1;
        this.$router.push(`/dashboard/${this.curOwner.id}/hotels`)
      }
    },
    onBack(active) {
      this.active = active;
      if (active == 1) {
        this.$router.push(`/dashboard/${this.curOwner.id}/hotels/location`)
      }
    }
  },
  computed: {
    provinces() {
      return this.$store.state.provinces;
    },
    districts() {
      return this.$store.state.districts;
    },
    wards() {
      return this.$store.state.wards;
    },
    curOwner() {
      return this.$store.state.curOwner;
    },
  },
  created() {
    this.$store.dispatch('fetchProvince');
  },
};
</script>
<style scoped>
.add-hotel {
  padding: 0 10%;
  /* height: 90vh; */
}
.add-hotel__title {
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
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
  margin-bottom: 0;
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
.step {
  margin-top: 30px;
  margin-bottom: 30px;
}
.hotel__image--center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
