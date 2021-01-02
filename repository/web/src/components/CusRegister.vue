<template>
    <div>
        <el-button class="register" type="text" @click="dialogFormVisible = true">Tạo tài khoản</el-button>

        <el-dialog class="dialog-register"  :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <h2 >Tạo tài khoản</h2>
            <div>
                <el-form-item 
                prop="lastname"
                label="Họ"  
                :label-width="formLabelWidth"
                :rules="[{required: true, message:'Please input your lastname ', trigger:'blur'}]">
                <el-input  v-model="form.lastname" autocomplete="off"></el-input>
              </el-form-item>
                <el-form-item 
                label="Tên"  
                :label-width="formLabelWidth"
                prop="firstname"
                :rules="[{required: true, message:'Please input your firstname ', trigger:'blur'}]">
                  <el-input  v-model="form.firstname" autocomplete="off"></el-input>
                </el-form-item>
            </div>
            
            <el-form-item 
            label="Username" 
            :label-width="formLabelWidth"
            prop="username"
            :rules="[{required: true, message:'Please input your username ', trigger:'blur'}]">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="Mật khẩu" :label-width="formLabelWidth"
             prop="password"
             :rules="[{required: true, message:'Please input your password ', trigger:'blur'}]">
              <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="Email" :label-width="formLabelWidth"
             prop="email"
             :rules="[{required: true, message:'Please input your email', trigger:'blur'},
                      {type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] }]">
              <el-input  v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
              <el-input type="phone" v-model="form.phone" @keyup.enter.native="submit" autocomplete="off"></el-input>
            </el-form-item>
            <el-button class="modal-register" type="primary" @click="submit">Tạo tài khoản</el-button>
            <!-- <div class="da-co-tai-khoan-position">
               <div class="da-co-tai-khoan">
              <p>Bạn đã có tài khoản</p>
              <el-button class="modal-login" type="primary">Đăng nhập</el-button>
            </div>
            </div> -->
           
          </el-form>
          <div class="bg-form">
            <img src="../assets/form.svg" alt="">
          </div>
        </el-dialog>

    </div>
</template>


<script>
export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          firstname: '',
          lastname:'',
          email: '',
          username: '',
          phone: '',
          // address:'',
          password: ''
        },
        formLabelWidth: '120px'
      };
    },
     methods: {
      async submit(){
        try {
          await this.$store.dispatch("register", this.form);
          this.dialogFormVisible=false;
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
          message: "Đăng ký Thành Công!",
          type: "success"
        });
      }
    }
}
</script>
<style scoped >
    @media(max-width: 768px){
    .bg-form {
      display: none;
    }
    .dialog-register .el-dialog__body .el-form {
      width: 100% !important;
    }
    .register-component .el-dialog {
      margin-top: 50vh !important;
    }
  }
    h2{
    text-align: left;
    margin:20px 40px;
  }
  .register{
    color: #5392f9;
    background-color:transparent;
    padding: 12px;
    border:1px solid #5392f9;
    font-size: 14px;
    font-weight: 600;
    border-radius: 5px;
    margin: 0 10px;
  }
  .register:hover{
    border:1px solid #5392f9;
  }
  .bg-form{
    background-color: #ecf6ff;
    width: 50%;
    position: relative;
  }
  .bg-form img{
    position: absolute;
    left: 15%;
    top: 50%;
    width: 70%;
    transform: translateY(-50%);
  }
  .modal-register{
    width: 80%;
    margin: 20px auto 20px; 
    display: flex;
    justify-content: center;
  }
  .da-co-tai-khoan {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: 10px auto !important;
  }

</style>

<style>
  .register-component .el-form-item__error {
    top: 10px;
    left: 100px;
  }
  .register-component .el-dialog__wrapper{
    overflow: hidden;
  }
  .register-component .el-dialog{
    margin: 10px auto 0 !important;
  }
  .dialog-register .el-dialog__header{
    display:none;
  }
    .dialog-register .el-dialog__footer{
    display:none;
  }
  .dialog-register .el-dialog__body{
    display:flex;
    padding:0;
    height:100%
  }
  .dialog-register .el-dialog__body .el-form{
    width: 50% !important;
  }
  .dialog-register .el-dialog__body .el-form .el-form-item__content{
    width: 80%;
    margin: 0 auto !important;
    
  }
  .dialog-register .el-dialog__body .el-form .el-form-item{
    margin: 0 !important;
  }
  .dialog-register .el-dialog__body .el-form .el-form-item .el-form-item__label{
    text-align: left;
    margin: 0 40px;
  }
</style>