<template>
  <div>
    <el-card class="admin-sign-in">
      <div class="sign-in__title">
        <h3>Welcome Back!</h3>
      </div>
      <el-form ref="form" class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="admin" @submit.native.prevent @keyup.enter.native="adminSignIn('form')">
        <el-form-item prop="username" class="form-item" label="Username"
        :rules="[
          { required: true, message: 'Username is required'},
        ]">
          <el-input v-model="admin.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item" label="Mật Khẩu"
        :rules="[
          { required: true, message: 'Password is required'},
        ]">
          <el-input type="password" v-model="admin.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <a href="/forget-password">Quên Mật Khẩu</a>
        </el-form-item>
        <el-button type="danger" class="sign-in__btn" @click="adminSignIn('form')">Đăng Nhập</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: {
        username: '',
        password: '',
      },
      labelPosition: "top"
    };
  },
  computed: {
    curAdmin() {
      return this.$store.state.curAdmin;
    }
  },
  methods: {
    async adminSignIn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch('ownerSignIn', this.admin);
            if (this.curAdmin.role == 'admin') {
              this.$router.push(`/admin/dashboard/${this.curAdmin.id}`);
              this.alertSignInSuccess();
            }
            else {
              this.alertErr();
            }
            this.$refs[formName].resetFields();
          } catch (err) {
            this.alertErr(err);
            this.$refs[formName].resetFields();
          }
        } else {
          this.alertErr();
        }
      });
    },
    alertSignInSuccess() {
      this.$message({
        showClose: true,
        message: "Đăng nhập thành công.",
        type: "success"
      });
    },
    alertErr(error) {
      if (error.message == "Cannot read property 'message' of undefined") {
        this.$message({
          showClose: true,
          message: "Khách hàng không thể đăng nhập Trang Admin!",
          type: "error"
        });
      }
      else {
        this.$message({
          showClose: true,
          message: error.message,
          type: "error"
        });
      }
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #1174a6;
}
.sign-in__forget:hover {
  color: #0a4461;
  text-decoration: underline;
}
.admin-sign-in {
  margin: 0 40%;
  margin-top: 15vh;
}
.sign-in__title {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
}
.sign-in__btn {
  margin-left: 5px;
  min-height: 42px;
  /* min-width: 180px; */
  width: 100%;
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
.sign-in__btn--confirm {
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
}
.sign-in__btn--confirm:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.sign-in__content {
  padding: 0 20px 20px;
}
</style>