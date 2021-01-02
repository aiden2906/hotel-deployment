<template>
    <div class="nav">
      <div style="cursor: pointer" @click="backToHomePage"  class="logo">
        <img src="../assets/logo1.svg" alt="">
      </div>
      <div style="display: flex" class=button>
        <router-link class="owner" to="/owner" > Đăng ký cho thuê nhà</router-link>
        <div style="display: inline-block" v-if="!myCustomer.fullname">
          <Login class=login-component></Login>
          <Register class=register-component></Register>
        </div>
        <div style="display: flex; align-items:center ; font-weight:600" v-else>
          <div class="avatarCustomer">
            <img v-if="!myCustomer.avatar" :src="preview" alt="">
            <img v-else :src="myCustomer.avatar" alt="">
          </div>
            <el-dropdown style="cursor: pointer" trigger="click">
              <span style="padding-left: 5px;" class="el-dropdown-link">
                {{myCustomer.lastname}} {{myCustomer.firstname}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="customerUpdate" icon="el-icon-user">Hồ sơ của {{myCustomer.firstname}}</el-dropdown-item>
                <el-dropdown-item @click.native="moveReview" icon="el-icon-star-off">Bài nhận xét</el-dropdown-item>
                <el-dropdown-item @click.native="signOut" icon="el-icon-switch-button">Đăng xuất</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
</template>

<script>
  import Register from '../components/CusRegister'
  import Login from '../components/CusLogin'
  export default {
    data() {
      return {
        preview:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      }
    },
    components: {
      Register, Login
    },
    computed:{
      myCustomer(){
        return this.$store.state.myCustomer
      }
    },
    methods: {
      signOut() {
        this.$store.dispatch('customerSignOut');
        this.$router.push('/')
      },
      customerUpdate() {
        this.$router.push('/customer-update')
      },
      backToHomePage() {
        this.$router.push('/')
      },
      moveReview() {
        this.$router.push(`/customer-review`);
      }
    }
  };
</script>

<style scoped>
  @media(max-width: 768px){
    .el-dropdown-menu {
      left: 570px !important;
    } 
  } 
  .register-component{
    display:inline-block;
  }
  .login-component{
    display:inline-block;
  }
  h2{
    text-align: left;
    margin:20px 40px;
  }
  .nav{
    display: flex;
    justify-content: space-between;
    padding: 15px !important;
  }
  .owner{
    color: #00af87;
    text-decoration: none;
    border: 1px solid #00af87;
    line-height: 40px;
    padding: 0 10px;
    font-weight: 600;
    border-radius: 5px;
    font-size: 14px;
    margin: 0 10px;
  }
  .owner:hover{
    color: white;
    background-color: #00af87;
  }
  .logo img{
    width: 150px;
  }
  .logo {
    display: flex;
  }
  .nav{
    padding: 20px 0;
  }
  .el-dropdown-menu {
      width: 170px !important;
  }
  .avatarCustomer {
    line-height: 1;
  }
  .avatarCustomer img {
    width: 40px;
    border-radius: 50%;
    height: 35px;
    object-fit: cover;
  }
 
</style>

<style>
  
</style>

