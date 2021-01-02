<template>
  <div>
    <!-- Popup Sign In -->
    <el-dialog class="signin-dialog" title="Đăng Nhập" :visible.sync="dialogSignInVisible">
      <el-form ref="form" class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="form" >
        <el-form-item prop="username" class="form-item" label="Username"
        :rules="[
          { required: true, message: 'Username is required'},
        ]">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item" label="Mật Khẩu"
        :rules="[
          { required: true, message: 'Password is required'},
        ]">
          <el-input type="password" v-model="form.password" autocomplete="off" @keyup.enter.native="signin('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <a href="/forget-password">Quên Mật Khẩu</a>
        </el-form-item>
        <el-button type="danger" class="signin-button-form" @click="signin('form')">Đăng Nhập</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer hidden-sm-and-down">
        <strong class="footer__content">Bạn chưa có tài khoản?</strong>
        <el-button type="danger" id="signin" @click="closeSignInOpenSignUp()">Tạo tài khoản</el-button>
      </div>
      <!-- For small screen -->
      <div slot="footer" class="dialog__footer--small hidden-lg-and-up">
        <div class="footer__content">Bạn chưa có tài khoản?</div>
        <el-button type="danger" id="signin" class="dialog__sign-in-btn--small" @click="closeSignInOpenSignUp()">Tạo tài khoản</el-button>
      </div>
    </el-dialog>
    <!-- End of Pop Up -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      labelPosition: 'top',
    }
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    dialogSignInVisible: {
      get() {
        return this.$store.state.dialogSignInVisible;
      },
      set(value) {
        this.$store.commit('CHANGE_DIALOG_SIGN_IN', value);
      }
    },
  },
  methods: {
    closeSignInOpenSignUp() {
      this.$store.commit('CHANGE_DIALOG_SIGN_IN', false);
      this.$store.commit('CHANGE_DIALOG_SIGN_UP', true);
    },
    async signin(formName){
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          try {
            await this.$store.dispatch("ownerSignIn", this.form);
            this.alertSignInSuccess();
            this.$router.push(`/dashboard/${this.curOwner.id}`);
            this.$refs[formName].resetFields();
          }
          catch(err) {
            this.alertErr(err);
            this.$refs[formName].resetFields();
          }
        } else {
          this.alertErr({message: "Vui lòng điền đầy đủ các thông tin!"});
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
    alertErr(err) {
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra, vui lòng thử lại.",
        type: "error"
      });
    },
  }
}
</script>
<style scoped>
a {
  color: #1174a6 !important;
  text-decoration: none;
}
#signup {
  margin-top: -5px;
  min-height: 40px;
  min-width: 160px;
  padding: 10px;
  font-size: 14px;
  border-radius: 3px;
}
#signin {
  min-height: 40px;
  min-width: 120px;
  padding: 10px;
  font-size: 12px;
  color: #ff567d !important;
  background-color: #fff !important;
  border-color: #ff567d !important;
  margin-top: -5px;
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
.signin-dialog {
  width: 50%;
  padding: 0 25%;
}
.signin-dialog-content {
  padding: 0 30px;
}
.signin-button-form {
  width: 100%;
}
.dialog__footer--small {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
}
.dialog__sign-in-btn--small {
  width: 100%;
  margin-top: 10px !important;
}
.signin-dialog--small {
  width: 90%;
  padding: 0 5%;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}
</style>