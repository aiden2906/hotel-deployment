<template>
  <div class="cus-homepage">
    <Nav></Nav>
    <Carousel></Carousel>
    <el-container class="extend" style="display: inline-block">
      <h2>Những địa điểm du lịch nổi bật</h2>
      <el-row class="homepage-row" :gutter="20">
         <el-col  :sm="6" >
          <div @click="search(44)" class="grid-content">
            <img src="../assets/dalat.jpg" alt="">
            <div style="text-align: center" class="content">
              Đà Lạt
              <!-- <div class="number-room">156.786 chỗ nghỉ</div> -->
            </div>
          </div>
        </el-col>
         <el-col  :sm="6" >
          <div @click="search(37)" class="grid-content">
            <img src="../assets/nhatrang.jpg" alt="">
            <div style="text-align: center" class="content">
              Nha Trang
              <!-- <div class="number-room">156.786 chỗ nghỉ</div> -->
            </div>
          </div>
        </el-col>
         <el-col  :sm="6" >
          <div @click="search(32)" class="grid-content">
            <img src="../assets/danang.jpg" alt="">
            <div style="text-align: center" class="content">
              Đà Nẵng
              <!-- <div class="number-room">156.786 chỗ nghỉ</div> -->
            </div>
          </div>
        </el-col>
         <el-col  :sm="6" >
          <div @click="search(241)" class="grid-content">
            <img src="../assets/vhl.jpg" alt="">
            <div style="text-align: center" class="content">
              Vịnh Hạ Long 
              <!-- <div class="number-room">156.786 chỗ nghỉ</div> -->
            </div>
          </div>
        </el-col>
       
      </el-row>

    </el-container>
    <Footer></Footer>
  </div>
 
</template>

<script>
import Nav from '../components/CusNavbar'
import Carousel from '../components/CusCarousel'
import Footer from '../components/Footer'
  export default {
    data() {
      return {
          
      };
    },
    created() {
    this.$store.dispatch('fetchProvince');
    console.log(this.getProvinceSuggestion)
    },
    components: {
      Nav,
      Carousel,
      Footer
    },
    computed: {
      provinces() {
        return this.$store.state.provinces
      },
      getProvinceSuggestion() {
        let randomList = [];
        let fetchProvince = this.provinces;
        if (fetchProvince.length <= 4) return fetchProvince
        while(randomList.length < 4) {
          let rand = ~~(Math.random() * fetchProvince.length);
          if (randomList.includes(rand)) {
            continue;
          }
          randomList.push(rand);
        }

        let provinceSuggestion = [];
        randomList.forEach((idx) => provinceSuggestion.push(fetchProvince[idx]))
        return provinceSuggestion
      }
    },
    methods: {
        search(id) {
         this.$store.dispatch('searchHotel',{provinceId: id});
         this.$router.push(`/search/${id}`)
      }
    }
   
  }
</script>

<style scoped>
@media (max-width: 768px) {
  .grid-content {
   padding: 30px 100px !important;
  }
  .content {
    text-align: center !important
  }
}

.content{
  text-align: left;
  padding: 10px;
  font-weight: 600;
}
.content .number-room{
  font-weight: 500;
  padding: 5px 0;
  font-size: 14px;
}
.grid-content{
    border: 1px solid rgb(221, 223, 226);
    cursor: pointer
}
  .grid-content img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .cus-homepage {
    text-align: center;
  }
  .extend{
    padding: 50px 0;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<style>
  .homepage-row {
    margin:0 !important;
    padding: 0 25px;
  }
</style>