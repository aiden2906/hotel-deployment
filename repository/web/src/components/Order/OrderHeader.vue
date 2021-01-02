<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <el-menu-item index="1">
        <router-link :to="'/'">
        <img
          src="https://cdn6.agoda.net/images/MVC/default/agoda-logo-booking-page.png"
          srcset="https://cdn6.agoda.net/images/MVC/default/agoda-logo-booking-page.png 1x, https://cdn6.agoda.net/images/MVC/default/agoda-logo-booking-page@2x.png 2x"
          data-element-name="desktop-agoda-header-nolink"
          class="Imagestyled__ImageStyled-nh0bpz-0 kYUYnb HeaderLogostyled__LogoImage-sc-1aet91z-0 cXVDqe"
        />
        </router-link>
      </el-menu-item>
      <el-menu-item class="navbar__steps" index="2">
        <!-- Intend to leave it blank -->
      </el-menu-item>
      <el-menu-item index="3" v-if="!myCustomer.fullname">
        <cus-login />
      </el-menu-item>
      <el-menu-item index="3" v-else>
        <el-dropdown style="cursor: pointer" trigger="click">
          <span class="el-dropdown-link">
            {{myCustomer.lastname}} {{myCustomer.firstname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="customerUpdate" icon="el-icon-user">Hồ sơ của {{myCustomer.firstname}}</el-dropdown-item>
            <el-dropdown-item icon="el-icon-time">Lịch sử đặt phòng</el-dropdown-item>
            <el-dropdown-item @click.native="signOut" icon="el-icon-switch-button">Đăng xuất</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import CusLogin from '../CusLogin'
export default {
  components: {
    CusLogin
  },
  computed: {
    myCustomer(){
      return this.$store.state.myCustomer
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('customerSignOut');
      this.$router.go(-1);
    },
    customerUpdate() {
      this.$router.push('/customer-update')
    }
  }
}
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}
.navbar__steps {
  width: 100%;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
    color: transparent;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: transparent;
}

@media (min-width: 992px) {
  .navbar__steps {
    flex-basis: 66.6667%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 66.6667%;
  }
}
@media (min-width: 768px) {
  .navbar__steps {
    flex-basis: 50%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 50%;
  }
}


</style>