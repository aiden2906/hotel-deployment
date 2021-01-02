<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="4">
        <div class="logo">
          <img style="width:60%; height: 60%;" alt="flipcasa brand identity branding typography logotype identity symbol mark logo" src="https://cdn.dribbble.com/users/24078/screenshots/12001539/media/1e476628c57760aa0666ca0f2ab79ee6.jpg">
        </div>
        <el-menu>
          <el-menu-item @click="handleOverall()" index="1">
            <i class="el-icon-odometer"></i>
            <span>Tổng Quan</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-home"></i>
            <span>Khách Sạn</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <span>Chủ Khách Sạn</span>
          </el-menu-item>
          <el-menu-item index="4" @click="handleAttributes()">
            <i class="el-icon-edit-outline"></i>
            <span>Quản Lý Thuộc Tính</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col class="dashboard__content" :span="20">
        <div class="header">
          <i class="el-icon-chat-dot-square header__icon"></i>
          <i class="el-icon-message-solid header__icon"></i>
          <el-dropdown trigger="click">
            <i class="el-icon-s-custom header__icon"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="el-icon-edit"></i>Sửa Hồ Sơ
              </el-dropdown-item>
              <el-dropdown-item @click.native="signout()">
                <i class="el-icon-switch-button"></i>Đăng Xuất
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleAttributes() {
      this.$router.push(`/admin/dashboard/${this.$route.params.id}/attributes`);
    },
    handleOverall() {
      this.$router.push(`/admin/dashboard/${this.$route.params.id}`);
    },
    signout() {
      this.$store.dispatch('adminSignOut');
      this.$router.push('/admin');
    }
  }
}
</script>
<style scoped>
.logo {
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
}
a:visited {
  color: black;
}
a:active {
  color: #409EFF;
}
.header {
  display: flex;
  justify-content: flex-end;
}
.header__icon {
  padding: 10px;
  font-size: 30px;
  color: #2c3e50;
}
.dashboard__content {
  padding-top: 30px;
  padding-right: 10% !important;
}
</style>