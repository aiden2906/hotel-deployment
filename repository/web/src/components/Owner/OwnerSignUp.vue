<template>
  <div>
    <!-- Popup Sign Up -->
    <el-dialog class="signin-dialog signup-dialog " title="Tạo Tài Khoản" :visible.sync="dialogSignUpVisible">
      <el-form ref="formSignUp" class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="formSignUp" :rules="rules" @submit.native.prevent>
        <el-row :gutter="24" class="hidden-xs-only">
          <el-col :span="12">
            <el-form-item prop="firstname" class="form-item" label="Tên">
              <el-input v-model="formSignUp.firstname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="lastname" class="form-item" label="Họ">
              <el-input v-model="formSignUp.lastname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="username" class="form-item" label="Username">
              <el-input v-model="formSignUp.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="phone" class="form-item" label="Số Điện Thoại">
              <el-input v-model.number="formSignUp.phone" autocomplete="off">
                <template slot="prepend">+84</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="email" class="form-item" label="Email">
              <el-input type="email" v-model="formSignUp.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="form-item" label="Mật Khẩu">
              <el-input type="password" v-model="formSignUp.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="address" class="form-item" label="Địa Chỉ">
              <el-input v-model="formSignUp.address" autocomplete="off" @keyup.enter.native="signup('formSignUp')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- For small screen -->
        <el-row class="hidden-sm-and-up">
          <el-form-item prop="firstname" class="form-item" label="Tên">
            <el-input v-model="formSignUp.firstname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="lastname" class="form-item" label="Họ">
            <el-input v-model="formSignUp.lastname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="username" class="form-item" label="Username">
            <el-input v-model="formSignUp.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="phone" class="form-item" label="Số Điện Thoại">
            <el-input v-model.number="formSignUp.phone" autocomplete="off">
              <template slot="prepend">+84</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email" class="form-item" label="Email">
            <el-input type="email" v-model="formSignUp.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-item" label="Mật Khẩu">
            <el-input type="password" v-model="formSignUp.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="address" class="form-item" label="Địa Chỉ">
            <el-input v-model="formSignUp.address" autocomplete="off" @keyup.enter.native="signup('formSignUp')"></el-input>
          </el-form-item>
        </el-row>
        <el-button type="danger" class="signin-button-form" @click="signup('formSignUp')">Tạo tài khoản</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer signup-footer">
        <strong class="footer__content">Bạn đã có tài khoản?</strong>
        <el-button type="danger" id="signin" @click="closeSignUpOpenSignIn()">Đăng Nhập</el-button>
      </div>
    </el-dialog>
    <!-- End of Pop Up -->
  </div>
</template>
<script>
export default {
  data() {
    var checkPhoneNumber = (rule, value, callback) => {
      console.log('value:', value)
      if (!value) {
        return callback(new Error('Please input the phone number!'));
      }
      if (typeof(value) === "string") {
        return callback(new Error('Please input numbers!'));
      }
      callback();
    };
    return {
      labelPosition: 'top',
      formSignUp: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        address: '',
        phone: '', 
        role: 'owner'
      },
      rules: {
        firstname: [
          { required: true, min: 4, trigger: 'blur'},
        ],
        lastname: [
          { required: true, min: 4, trigger: 'blur'},
        ],
        username: [
          { required: true, min: 4, trigger: 'blur'},
        ],
        email: [
          { type:'email', required: true, trigger:'blur'},
        ],
        password: [
          { required: true, min: 4, trigger: 'blur'},
        ],
        address: [
          { required: true, message: 'Address is required', trigger: 'blur'},
        ],
        phone: [
          { validator: checkPhoneNumber, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogSignUpVisible: {
      get() {
        return this.$store.state.dialogSignUpVisible;
      },
      set(value) {
        this.$store.commit('CHANGE_DIALOG_SIGN_UP', value);
      }
    },
  },
  methods: {
    closeSignUpOpenSignIn() {
      this.$store.commit('CHANGE_DIALOG_SIGN_UP', false);
      this.$store.commit('CHANGE_DIALOG_SIGN_IN', true);
    },
    signup(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.formSignUp.phone = '0' + this.formSignUp.phone.toString()
            this.$store.dispatch('ownerSignUp', this.formSignUp);
            this.alertSignUpSuccess();
            this.$refs[formName].resetFields();
          }
          catch(err) {
            this.alertErr(err);
          }
        } else {
          this.alertErr({message: "Vui lòng điền đầy đủ các thông tin!"});
        }
      });
    },
    alertErr(err) {
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra, vui lòng thử lại.",
        type: "error"
      });
    },
    alertSignUpSuccess() {
      this.$message({
        showClose: true,
        message: "Đăng ký thành công.",
        type: "success"
      });
    },
  }
}
</script>
<style scoped>
.el-button--danger {
  background-color: #ff567d !important;
  border-color: #ff567d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}

a {
  color: #1174a6 !important;
  text-decoration: none;
}
#signin {
  min-height: 40px;
  min-width: 120px;
  padding: 10px;
  font-size: 14px;
  color: #ff567d !important;
  background-color: #fff !important;
  border-color: #ff567d !important;
  margin-top: -5px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 3px;
}
#signup {
  margin-top: -5px;
  min-height: 40px;
  min-width: 160px;
  padding: 10px;
  font-size: 14px;
  border-radius: 3px;
}
.signup-dialog {
  width: 70%;
  padding: 0 15%;
}
.el-button--danger {
  background-color: #ff567d !important;
  border-color: #ff567d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}
.signin-dialog-content {
  padding: 0 30px;
}
.signin-button-form {
  width: 100%;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}
</style>