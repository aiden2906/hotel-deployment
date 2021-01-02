<template>
  <div>
    <el-container>
      <el-main class="searchBar">
        <el-row class="searchBar-row">
          <el-col  :span="18">
            <div class="search-sticky">
              <el-input 
                @keyup.enter.native="handleSearch"
                class="cus-input"
                placeholder="Tìm theo tên khách sạn, địa chỉ"
                suffix-icon="el-icon-search"
                v-model="hotelName"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="select-sticky">
              <button :style="{height: '46px'}" class="button-select" @click="handleSearch">TÌM</button>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelName: '',
      value: this.$store.state.hotel.number || '',
    };
  },
  methods: {
    jumpBooking() {
      const checkAccessToken = JSON.parse(localStorage.getItem('accessToken'));
      if (!checkAccessToken) {
        this.alertErr();
      } else this.$router.push(`/booking`);
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Quý khách cần phải đăng nhập để thực hiện tác vụ này!',
        type: 'error',
      });
    },
    async handleSearch() {
      // this.$store.commit('UPDATE_FILTER_HOTEL', this.hotelName);
      await this.$store.dispatch('updateFilterHotel', {
        hotelName: this.hotelName,
        provinceId: this.$route.params.id})
    },
    // convertViToEn(str, toUpperCase = false) {
    // str = str.toLowerCase();
    // str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    // str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    // str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    // str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    // str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    // str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    // str = str.replace(/đ/g, "d");

    // str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    // str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    // return toUpperCase ? str.toUpperCase() : str;
    // }
  },
  
 
};
</script>

<style scoped>

.searchBar {
  padding: 0;
}
.searchBar .searchBar-row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
}
.el-col {
  padding: 0 15px;
}
.searchBar {
  background-color: black;
}
.search-sticky {
  cursor: pointer;
}
.button-col-searchbar {
  display: flex;
}
.button-select {
  color: white;
  background-color: #00af87;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}
.button-select:hover {
  color: white;
  background-color: #099474;
}
</style>

<style>

.date-sticky .el-range-separator {
  position: relative !important;
}
.date-sticky .el-range-separator::before {
  content: '';
  background-color: #aaa2a2;
  height: 30px;
  width: 1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.search-sticky .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 18px;
  letter-spacing: 1px;
}
.search-sticky .el-input__inner {
  font-size: 18px;
  letter-spacing: 1px;
  height: 46px;
}
.search-sticky .el-icon-search {
  color: black;
  font-size: 25px;
  padding: 0 20px;
}

.date-sticky .el-range-input::-webkit-input-placeholder {
  color: #898484 !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date-sticky .el-range-input {
  color: black !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date-stick .el-icon-date {
  font-size: 25px !important;
  padding: 0 20px !important;
  color: black !important;
}
.select-sticky .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 16px;
  letter-spacing: 1px;
}
.select-sticky .el-input__inner {
  color: black;
  font-size: 16px;
  letter-spacing: 1px;
  height: 46px;
}

.select-sticky .el-select {
  width: 65%;
}
.date-sticky .el-date-editor {
  width: 100% !important;
  height: 46px;
}
.date-sticky .el-date-editor .el-range-separator {
  line-height: 70px;
}
.item {
  position: absolute;
  top: 50%;
  right: 0;
}
</style>
