<template>
  <div class="dashboard">
    <el-header class="dashboard__header">
      <div class="dashboard__operations">
        <div class="logo dashboard__operations hidden-md-and-down">
          <router-link :to="`/dashboard/${curOwner.id}`" class="dashboard__operations-icon">
            <img
              class="agoda-logo"
              srcset="
                //img.agoda.net/images/agoda-homes/logo/ah-logo-white-2.png    1x,
                //img.agoda.net/images/agoda-homes/logo/ah-logo-white-2@2x.png 2x
              "
              src="//img.agoda.net/images/agoda-homes/logo/ah-logo-white-2.png"
              width="97"
              height="32"
              alt="Agoda"
            />
          </router-link>
        </div>
        <div class="hidden-sm-and-up">
          <el-dropdown trigger="click" class="owner-name">
            <span class="el-dropdown-link">
              <i class="el-icon-s-operation navbar-toggle"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link class="dashboard__operations-icon--black" :to="`/dashboard/${curOwner.id}`"><i class="el-icon-odometer" ></i> Tổng Quan</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link class="dashboard__operations-icon--black" :to="`/dashboard/${curOwner.id}/listing`"
                  ><i class="el-icon-s-home"></i> Chỗ Ở</router-link
                >
              </el-dropdown-item>
              <!-- <el-dropdown-item>
                <router-link class="dashboard__operations-icon--black" :to="`/dashboard/${curOwner.id}/orders`"
                  ><i class="el-icon-s-order"></i> Đơn Hàng</router-link
                >
              </el-dropdown-item> -->
              <el-dropdown-item>
                <router-link class="dashboard__operations-icon--black" :to="`/dashboard/${curOwner.id}/profile`"
                  ><i class="el-icon-s-custom"></i> Hồ Sơ</router-link
                >
              </el-dropdown-item>
              <el-dropdown-item class="dashboard__operations-icon--black" @click.native="telegram.dialogVisible = true">
                <i class="el-icon-s-promotion"></i>Telegram
              </el-dropdown-item>
              <el-dropdown-item class="dashboard__operations-icon--black" @click.native="signout">
                <i class="el-icon-switch-button"></i>Đăng Xuất
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="dashboard__operations-icon  hidden-xs-only">
          <router-link :to="`/dashboard/${curOwner.id}`"
            ><i class="el-icon-odometer"></i> Tổng Quan</router-link
          >
        </div>
        <div class="dashboard__operations-icon  hidden-xs-only ">
          <router-link :to="`/dashboard/${curOwner.id}/listing`"
            ><i class="el-icon-s-home"></i> Chỗ Ở</router-link
          >
        </div>
        <!-- <div class="dashboard__operations-icon  hidden-xs-only ">
          <router-link :to="`/dashboard/${curOwner.id}/orders`"
            ><i class="el-icon-s-order"></i> Đơn Hàng</router-link
          >
        </div> -->
        <div class="dashboard__operations-icon  hidden-xs-only ">
          <router-link :to="`/dashboard/${curOwner.id}/profile`"
            ><i class="el-icon-s-custom"></i> Hồ Sơ</router-link
          >
        </div>
        <div class="dashboard__operations-icon hidden-xs-only" @click="telegram.dialogVisible = true">
          <i class="el-icon-s-promotion"></i>
          Telegram
        </div>
      </div>
      <div class="dashboard__operations  hidden-xs-only ">
        <el-dropdown trigger="click" class="owner-name">
          <span class="el-dropdown-link dashboard__operations-icon">
            {{ `${curOwner.lastname} ${curOwner.firstname}`
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="signout"><i class="el-icon-switch-button"></i>Đăng Xuất</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-dialog title="Liên kết Telegram bot" :visible.sync="telegram.dialogVisible">
      <div class="dashboard__tele-options">
        <el-radio-group class="tele__options" v-model="telegram.type">
          <el-radio :label="1">Cá nhân</el-radio>
          <el-radio :label="2">Nhóm</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="telegram.dialogVisible = false">Hủy Bỏ</el-button>
        <el-button type="primary" @click="handleTelegram">Xác Nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { encrypt } from '../../utils/crypto';

export default {
  data() {
    return {
      telegram: {
        dialogVisible: false,
        type: 1,
      },
    };
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
  },
  methods: {
    signout() {
      this.$store.dispatch('ownerSignOut');
      this.$router.push('/owner');
    },
    handleTelegram() {
      const { iv, content } = encrypt(`${this.curOwner.id}`);
      window.open(`https://t.me/booking_hotel_bot?${this.telegram.type == 1 ? 'start' : 'startgroup'}=${iv}-${content}`, '_blank');
      this.telegram.type = 1;
      this.telegram.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
.dashboard {
  background-color: #1174a6;
  padding: 0 10%;
}
.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 !important;
}
.dashboard__operations {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dashboard__operations-icon {
  padding: 0 15px;
  font-size: 18px;
  color: #fff
}
.dashboard__operations-icon--black {
  color: #2A2A2A;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 15px;
}
.owner-name {
  color: #fff;
  font-size: 16px;
}
.el-menu-item .el-avatar .el-avatar--icon .el-avatar--circle i {
  color: #fff;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.navbar-toggle {
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 4px;
  font-size:18px !important;
}
.dashboard__tele-options {
  width: 70%;
  margin: 30px auto;
}
.tele__options {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Responsive */
@media(max-width: 767px) {
  .dashboard__tele-options {
    width: 30%;
    margin: 5px auto;
  }
}
@media(min-width:768px) and (max-width: 992px) {
  .dashboard__operations-icon {
    padding: 0 10px;
    font-size: 18px;
  }
  .dashboard__tele-options {
    width: 40%;
    margin: 5px auto;
  }
}
@media(min-width:992px) and (max-width: 1199px) {
  .dashboard__tele-options {
    width: 40%;
    margin: 10px auto;
  }
  .dialog-footer {
    padding: 0px;
  }
}
@media(min-width: 1200px) and (max-width: 1319px) {
  .dashboard__tele-options {
    width: 40%;
    margin: 10px auto;
  }
  .dialog-footer {
    padding: 0px;
  }
}
@media(min-width: 1320px) and (max-width: 1480px) {
  .dashboard__tele-options {
    width: 40%;
    margin: 20px auto;
  }
}
</style>
