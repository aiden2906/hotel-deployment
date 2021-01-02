<template>
  <div>
    <CusNavbar></CusNavbar>
    <SearchBar></SearchBar>
    <el-container>
      <el-main class="filter-main">
        <el-row class="filter-row">
          <el-col class="filter" :span="24">
            <div class="filter-wrapper">
              <h4>Lọc chỗ nghỉ theo</h4>
              <el-select class="filter" v-model="priceFilter" placeholder="Giá">
                <el-option v-for="(price, index) in prices" :key="index" :value="price.label">
                  {{ price.label }}
                </el-option>
              </el-select>
              <el-select class="filter" v-model="star" clearable placeholder="Xếp hạng">
                <el-option v-for="item in ratings" :key="item.rating" :value="item.rating">
                  <el-rate v-model="item.rating" disabled show-score text-color="#ff9900">
                  </el-rate>
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <HotelList :star="star" :range="range"></HotelList>
    <Footer></Footer>
  </div>
</template>

<script>
import CusNavbar from '../components/CusNavbar';
import SearchBar from '../components/HotelSearch/SearchBar';
import HotelList from '../components/HotelSearch/HotelList';
import Footer from '../components/Footer';
export default {
  data() {
    return {
      search: '',
      star: '',
      ratings: [
        {
          rating: 1,
        },
        {
          rating: 2,
        },
        {
          rating: 3,
        },
        {
          rating: 4,
        },
        {
          rating: 5,
        },
      ],
      prices: [
        {
          label: 'Tất cả',
          value: [0, Infinity],
        },
        {
          label: 'Dưới 1 triệu',
          value: [0, 500000],
        },
        {
          label: 'Từ 1 triệu đến 3 triệu',
          value: [500000, 3000000],
        },
        {
          label: 'Từ 3 triệu đến 5 triệu',
          value: [3000000, 5000000],
        },
        {
          label: 'Từ 5 triệu đến 7 triệu',
          value: [5000000, 7000000],
        },
        {
          label: 'Trên 7 triệu',
          value: [7000000, Infinity],
        },
      ],
      priceFilter: 'Tất cả',
    };
  },
  computed: {
    range(){
      const option = this.prices.find(p => p.label == this.priceFilter);
      console.log(option);
      return option && option.value;
    }
  },
  components: {
    CusNavbar,
    SearchBar,
    HotelList,
    Footer,
  },
};
</script>

<style scoped>
h4 {
  padding: 0 10px;
  width: 200px;
  font-size: 14px;
}

.el-select-dropdown__item {
  overflow: inherit;
  height: none;
}
.price {
  padding: 0 10px;
  text-align: center;
  font-size: 12px;
}

.filter-wrapper {
  display: flex;
  align-items: center;
  padding: 0 5px;
}
.filter-row {
  width: 80% !important;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
.hotelName .el-input__inner {
  border-radius: 20px;
  background-color: #f8f7f9;
  color: #2a2a2e;
  border: 1px solid #2a2a2e;
}

.filter-main {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
}

.filter .el-icon-arrow-up:before {
  color: white;
}
.el-slider__runway {
  background-color: #dddfe2;
}
.el-slider__stop {
  background-color: #dddfe2 !important;
}
.el-tooltip__popper {
  display: none;
}
.filter .el-input__inner {
  border-radius: 20px;
  background-color: black;
  color: white;
  font-size: 14px;
  letter-spacing: 1px;
}
.filter-wrapper .el-input {
  width: 98%;
}
.filter .el-input__inner::-webkit-input-placeholder {
  color: white;
  font-size: 14px;
  letter-spacing: 1px;
}
.filter-wrapper .el-input .el-input__inner {
  text-align: center;
  font-weight: 600;
}
</style>
