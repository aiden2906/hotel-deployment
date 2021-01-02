<template>
  <div>
    <el-button class="login" type="text" @click="dialogFormVisible = true">Đăng nhập</el-button>
    <el-dialog class="dialog-login" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <h2>Đăng nhập</h2>
        <el-form-item 
          prop="username" 
          label="Username" 
          :label-width="formLabelWidth"
          :rules="[{required: true, message:'Please input username ', trigger:'blur'}]">
          <el-input v-model="form.username"  autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item
         prop="password"
         label="Mật khẩu" 
         :label-width="formLabelWidth"
         :rules="[{required: true, message:'Please input your password ', trigger:'blur'}]">
          <el-input
            type="password"
            @keyup.enter.native="signin"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-button class="modal-login" type="primary" @click="signin">Đăng nhập</el-button>
        <!-- <div class="chua-co-tai-khoan">
          <p>Bạn chưa có tài khoản</p>
          <el-button class="modal-register" type="primary">Đăng ký</el-button>
        </div> -->
      </el-form>
      <div class="bg-form">
        <img src="../assets/form.svg" alt />
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {required, minLength} from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        password: ""
      },
      formLabelWidth: "120px"
    };
  },
  validations: {
        username: {
          required,
          minLength: minLength(8)
        },
        password: {
          required,
          minLength: minLength(8)
        }
  },
  methods: {
    async signin() {
      try {
        await this.$store.dispatch("signIn", this.form);
        this.alertSuccess();
      } catch (err) {
        this.alertErr(err);
      }
    },
    alertErr(err) {
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra!",
        type: "error"
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: "Đăng Nhập Thành Công!",
        type: "success"
      });
    }
  }
};
</script>
<style scoped >
@media (max-width: 768px) {
  .bg-form {
    display: none;
  }
  .dialog-login .el-dialog__body .el-form {
    width: 100% !important;
  }
  .login-component .el-dialog {
    margin-top: 50vh !important;
  }
  .chua-co-tai-khoan {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 10px auto !important;
 }
}
.dialog-login .el-form-item {
  padding-bottom: 10px;
}
h2 {
  text-align: left;
  margin: 20px 40px;
}
.login {
  color: #5392f9;
  background-color: transparent;
  padding: 12px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  margin: 0 10px;
}
.bg-form {
  background-color: #ecf6ff;
  width: 50%;
  position: relative;
}
.bg-form img {
  position: absolute;
  left: 15%;
  top: 50%;
  width: 70%;
  transform: translateY(-50%);
}
.modal-login {
  width: 80%;
  margin: 20px auto 20px;
  display : flex;
  justify-content: center;
}

</style>
<style>
@media (max-width: 768px) {
  .login-component .el-dialog {
    margin-top: 30vh !important;
  }
}

.login-component .el-dialog__wrapper {
  overflow: hidden;
}
.login-component .el-dialog {
  margin: 50px auto 0;
}
.dialog-login .el-dialog__header {
  display: none;
}
.dialog-login .el-dialog__footer {
  display: none;
}
.dialog-login .el-dialog__body {
  display: flex;
  padding: 0;
  height: 100%;
}
/* .dialog-login .el-dialog{
    
  } */
.dialog-login .el-dialog__body .el-form {
  width: 50% !important;
}
.dialog-login .el-dialog__body .el-form .el-form-item__content {
  width: 80%;
  margin: 0 auto !important;

}
.dialog-login .el-dialog__body .el-form .el-form-item {
  margin: 0 !important;
}
.dialog-login .el-dialog__body .el-form .el-form-item .el-form-item__label {
  text-align: left;
  margin: 0 40px;
}
</style>