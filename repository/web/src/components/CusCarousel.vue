<template>
  <div class="bg-carousel">
    <div class="carousel">
      <!-- <h2>KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA</h2>
      <p>Nhận giá tốt nhất cho >2.000.000 chỗ nghỉ, trên toàn cầu</p> -->
      <div style="font-weight: 600; z-index: 10;position: absolute; color: white; font-size: 32px; right:50%;top: 26%; transform:translatex(50%)">Tìm khách sạn</div>
      <div class="table">
       
        <div class="search">
          <el-select
            class="add-hotel__select-info"
            v-model="provinceId"
            clearable
            filterable
            placeholder="Vui Lòng Chọn Tỉnh Thành"
          >
            <el-option
              v-for="province in provinces"
              :key="province.id"
              :label="province.name"
              :value="province.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="overlay">
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinceId: '',
      options: [
        {
          value: 'Phòng 1 người',
          label: 'Phòng 1 người',
        },
        {
          value: 'Phòng 2 người',
          label: 'Phòng 2 người',
        },
        {
          value: 'Phòng 3 người',
          label: 'Phòng 3 người',
        },
      ],
    };
  },
  created() {
    this.$store.dispatch('fetchProvince');
  },
  computed: {
    provinces() {
      return this.$store.state.provinces;
    },
  },
  methods: {
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Vui lòng chọn tỉnh thành !',
        type: 'error',
      });
    },
  },
  watch: {
    "provinceId": async function(nVal) {
      await this.$store.dispatch('searchHotel', {provinceId: nVal});
      this.$router.push(`/search/${nVal}`); 
    }
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .table {
    width: 75% !important;
    top: 60% !important;
  }
  .select .el-select {
    width: 55% !important;
  }
  /* .button-select {
    width: 45% !important;
  } */
 
}
.bg-carousel {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
}
.carousel {
  background-image: url(../assets/antlr-4.8-complete.jpg);
  background-position: bottom center;
  background-size: contain;
  padding-bottom: 39%;
  background-repeat: no-repeat;
  position: relative;
}
h2 {
  color: white;
  margin: 0;
  padding-top: 30px;
}
p {
  font-size: 16px;
  margin: 0;
  color: white;
  font-weight: 600;
  padding: 10px;
}
.table {
  width: 50%;
  margin: auto;
  background-color: rgba(221, 210, 210, 0.5);
  position: absolute;
  top: 50%;
  padding: 20px 0;
  right: 50%;
  transform: translate(50%, -50%);
  border-radius: 5px;
  max-width: 680px;
  z-index: 10;
}
.search {
  margin: auto;
  width: 80%;
  cursor: pointer;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}

.search .el-select {
  width: 100%;
}

.date {
  margin: 10px auto;
  width: 80%;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}
.select {
  display: flex;
  margin: 10px auto 30px;
  width: 80%;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}
.button-select {
  color: white;
  background-color: #5392f9;
  text-decoration: none;
  width: 100%;
  cursor: pointer;
  font-size: 18px;
  line-height: 75px;
  border-radius: 5px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}
.button-select:hover {
  color: white;
  background-color: rgb(83, 146, 249, 0.7);
}
</style>

<style>
@media (max-width: 768px) {
  /* .button-select {
    width: 45% !important;
  } */
   .el-select-dropdown {
    top: 390px !important;
    left: 154px !important;
  }
}
.search .el-select input {
  height: 80px;
}
.el-range-separator {
  position: relative !important;
}
.el-range-separator::before {
  content: '';
  background-color: #aaa2a2;
  height: 60px;
  width: 1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.search .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 18px;
  letter-spacing: 1px;
}
.search .el-input__inner {
  font-size: 18px;
  letter-spacing: 1px;
}
.search .el-icon-search {
  color: black;
  font-size: 25px;
  padding: 0 20px;
}

.date .el-range-input::-webkit-input-placeholder {
  color: #898484 !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date .el-range-input {
  color: black !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date .el-icon-date {
  font-size: 25px !important;
  padding: 0 20px !important;
  color: black !important;
}
.select .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 16px;
  letter-spacing: 1px;
}
.select .el-input__inner {
  color: black;
  font-size: 16px;
  letter-spacing: 1px;
}
.select .el-select input {
  height: 80px;
}
.select .el-select {
  width: 65%;
}
.date .el-date-editor {
  width: 100% !important;
  height: 80px;
}
.date .el-date-editor .el-range-separator {
  line-height: 70px;
}
.search .cus-input input {
  height: 80px !important;
}
</style>
