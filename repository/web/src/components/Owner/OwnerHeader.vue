<template>
  <div>
    <!-- Header -->
    <el-header class="navbar">
      <el-image class="navbar-brand" :src="url" />
      <el-button-group class="navbar__action">
        <el-button id="signin" type="danger" @click="openSignIn()">Đăng Nhập</el-button>
        <owner-sign-in/>
        <el-button id="signup" type="danger" @click="openSignUp()">Tạo Tài Khoản</el-button>
        <owner-sign-up/>
      </el-button-group>
    </el-header>
    <!-- End of Header -->
    <el-container class="register-hotel">
      <el-card class="box-card">
        <div class="text-section-title">Ghi danh khách sạn của bạn trên Agoda</div>
        <div
          class="text-section-description"
        >Độc giả toàn cầu, trọng điểm châu Á. Nhận các đặt phòng bạn đã bỏ lỡ bằng cách ghi danh miễn phí trên Agoda, ngay hôm nay!</div>
        <!-- Register Hotel -->
        <el-button
          id="startHostingBtn"
          type="danger"
          class="start-hosting-btn btn btn-lg btn-info"
          @click="openSignUp()"
        >Đăng nhà ngay</el-button>
        <owner-sign-up/>
        <div class="sign-in-caption hidden-xs hidden-sm">
          <span class="m-r-1">Bạn đã bắt đầu thủ tục đăng ký rồi à?</span>
          <!-- Continue to Sign In -->
          <span
            class="continue-here-text"
            data-element-name="agoda-homes-continue-here-button"
            @click="openSignIn()"
          >Tiếp tục</span>
          <owner-sign-in/>
        </div>
      </el-card>
    </el-container>
   </div> 
</template>

<script>
import OwnerSignIn from '@/components/Owner/OwnerSignIn'
import OwnerSignUp from '@/components/Owner/OwnerSignUp'
export default {
  data() {
    return {
      url: "https://cdn5.agoda.net/ycs/dist/images/agoda-logo-2OYtJ.png",
    }
  },
  components: {
    OwnerSignIn,
    OwnerSignUp,
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
  },
  methods: {
    openSignIn() {
      this.$store.commit('CHANGE_DIALOG_SIGN_IN', true);
    },
    openSignUp() {
      this.$store.commit('CHANGE_DIALOG_SIGN_UP', true);
    },
  }
}
</script>
<style scoped>
/* Sign In */
#signin {
  min-height: 42px;
  min-width: 120px;
  padding: 10px;
  color: #ff567d !important;
  background-color: #fff !important;
  border-color: #ff567d !important;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 3px;
}
.el-button--danger {
  background-color: #ff567d !important;
  border-color: #ff567d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}
.continue-here-text {
  cursor: pointer;
  border-bottom: 2px solid gray;
}
/* Navbar */
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  background-color: hsla(0, 0%, 100%, 0.1) !important;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.54),
    rgba(0, 0, 0, 0.3)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  
}
.navbar .header-menu {
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  padding: 0 20%;
}

.navbar .header-menu::before {
  content: none;
}
.navbar .header-menu::after {
  content: none;
}
.navbar .header-menu {
  background-color: transparent;
  padding: 0px;
  
}
.el-menu.el-menu--horizontal {
  border-bottom: transparent !important;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: transparent !important;
}

/* Register Hotel */
.register-hotel {
  padding: 0 20%;
}
.m-r-1 {
  margin-right: 4px !important;
}

.register-hotel {
  background-image: linear-gradient(
      270deg,
      rgba(51, 51, 51, 0),
      rgba(0, 0, 0, 0.6)
    ),
    url(//img.agoda.net/images/agoda-homes/aquisition/agoda_homes_marketing_image.jpg);
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: cover;
  background-position-y: 30%;
  height: 534px;
}

.box-card {
  width: max-content;
  padding: 40px;
  border-radius: 3px;
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  margin: 100px 0;
}

.box-card .text-section-title {
  font-size: 40px;
  margin: 0 0 10px;
  font-weight: 700;
}

.box-card .text-section-description {
  width: 520px;
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 20px;
}

.box-card .sign-in-caption {
  font-size: 16px;
  font-weight: 700;
  padding-top: 15px;
}
.navbar__action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive */
@media (max-width: 767px) {
  .navbar-brand {
    width: 80%;
    height: 60%;
  }
  .box-card {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    padding: 18px;
    border-radius: 3px;
    background-color: hsla(0,0%,100%,.9);
    
  }
  .box-card .text-section-title {
    font-size: 24px;
  }
  .box-card .text-section-description {
    font-size: 15px;
    width: 80%;
  }
}
@media (min-width: 992px){
  .register-hotel{
    height: 534px;
  }
}
@media (min-width: 1200px) {
  .navbar-brand {
    padding-top: 8px;
  }
}
@media (min-width: 768px) and (max-width: 991px){
  .box-card {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    padding: 20px;
    border-radius: 3px;
    background-color: hsla(0,0%,100%,.9);
    
  }
  .box-card .text-section-title {
    font-size: 28px;
  }
  .box-card .text-section-description {
    font-size: 18px;
    width: 90%;
  }
  .signup-dialog {
    width: 90%;
    padding: 0 5%;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .navbar-brand {
    width: 80%;
    height: 60%;
    vertical-align: middle;
  }
  .box-card {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    padding: 20px;
    border-radius: 3px;
    background-color: hsla(0,0%,100%,.9);
  }

  .box-card .text-section-title {
    font-size: 35px;
    margin: 0 0 10px;
  }
  .box-card .text-section-description {
    width: 520px;
    font-size: 18px;
    line-height: 1.4;
    margin-bottom: 20px;
  }
}

@media (min-width: 1200px) and (max-width: 1319px) {
  .box-card .text-section-title {
    font-size: 32px;
  }
  .box-card .text-section-description {
    font-size: 20px;
  }
}

@media (min-width: 1320px) and (max-width: 1480px) {
  .box-card .text-section-title {
    font-size: 35px;
  }
}
</style>