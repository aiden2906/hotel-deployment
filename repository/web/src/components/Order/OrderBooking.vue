<template>
  <div>
    <el-row class="booking hidden-md-and-down" :gutter="24">
      <el-col :span="14">
        <!-- Payment Method(s) -->
        <el-card>
          <h4 class="booking__form-title">Chọn cách thanh toán</h4>
          <el-radio :value="1" :label="1">Thanh toán sau</el-radio>
        </el-card>
        <!-- Customers Booking Form -->
        <el-card class="booking__card">
          <h4 class="booking__form-title">Vui lòng điền thông tin của bạn</h4>
          <el-form :label-position="'top'">
            <el-form-item
              class="booking__form-content"
              prop="fullname"
              label="Họ và Tên:"
              :rules="[{ required: false, message: 'Vui lòng điền họ và tên của bạn' }]"
            >
              <el-input v-model="order.fullname"></el-input>
            </el-form-item>
            <el-form-item
              class="booking__form-content"
              prop="email"
              label="Email:"
              :rules="[{ required: false, message: 'Vui lòng nhập email của bạn' }]"
            >
              <el-input v-model="order.email"></el-input>
            </el-form-item>
            <el-form-item
              class="booking__form-content"
              prop="phone"
              label="Số Điện Thoại:"
              :rules="[{ required: false, message: 'Vui lòng nhập số điện thoại của bạn' }]"
            >
              <el-input v-model="order.phone"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <!-- Add To Cart -->
        <el-card class="booking__card">
          <h4 class="booking__form-title">Giỏ hàng</h4>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="name" label="Tên phòng" width="150"> </el-table-column>
            <el-table-column prop="quantity" label="Số lượng" width="120"> </el-table-column>
            <el-table-column prop="price" label="Giá" width="120"> </el-table-column>
            <el-table-column prop="start" label="Ngày bắt đầu" width="150"> </el-table-column>
            <el-table-column prop="end" label="Ngày kết thúc" width="300"> </el-table-column>
            <el-table-column fixed="right" label="Thao tác" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="handleRemove(scope.$index, scope.row)"
                  type="danger"
                  size="small"
                  plain
                  icon="el-icon-delete"
                  >Xóa</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- Get Total -->
          <h4 class="booking__form-title">
            Tổng Hóa Đơn:
            <span class="booking__pricing-footer">{{ this.total }}</span>
          </h4>
          <!-- Confirm Booking -->
          <div class="booking__confirm booking__card">
            <el-button class="booking__btn" @click="handlePurchase">Thanh toán</el-button>
          </div>
        </el-card>
      </el-col>
      <!-- Hotel Short Description -->
      <el-col :span="10">
        <el-card>
          <h4 class="booking__hotel-name">{{ this.hotel.name }}</h4>
          <div class="booking__hotel-address">
            <span
              >{{ this.hotel.address }}, {{ this.wardById.name }}, {{ this.districtById.name }},
              {{ this.provinceById.name }}</span
            >
          </div>
          <div class="booking__hotel-description">{{ this.hotel.description }}</div>
          <div v-if="hasImages()" slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
          <el-carousel
            v-else
            height="300px"
            indicator-position="outside"
            class="booking__hotel-images"
          >
            <el-carousel-item v-for="image in hotel.images" :key="image" :fit="'contain'">
              <el-image :src="image" :preview-src-list="hotel.images"> </el-image>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
    </el-row>

    <!-- Small screens -->
    <div class="booking hidden-lg-and-up">
      <!-- Payment Method(s) -->
      <el-card>
        <h4 class="booking__form-title">Chọn cách thanh toán</h4>
        <el-radio :value="1" :label="1">Thanh toán sau</el-radio>
      </el-card>
      <!-- Customers Booking Form -->
      <el-card class="booking__card">
        <h4 class="booking__form-title">Vui lòng điền thông tin của bạn</h4>
        <el-form :label-position="'top'">
          <el-form-item
            class="booking__form-content"
            prop="fullname"
            label="Họ và Tên:"
            :rules="[{ required: false, message: 'Vui lòng điền họ và tên của bạn' }]"
          >
            <el-input v-model="order.fullname"></el-input>
          </el-form-item>
          <el-form-item
            class="booking__form-content"
            prop="email"
            label="Email:"
            :rules="[{ required: false, message: 'Vui lòng nhập email của bạn' }]"
          >
            <el-input v-model="order.email"></el-input>
          </el-form-item>
          <el-form-item
            class="booking__form-content"
            prop="phone"
            label="Số Điện Thoại:"
            :rules="[{ required: false, message: 'Vui lòng nhập số điện thoại của bạn' }]"
          >
            <el-input v-model="order.phone"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- Add To Cart -->
      <el-card class="booking__card">
        <h4 class="booking__form-title">Giỏ hàng</h4>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="name" label="Tên phòng" width="150"> </el-table-column>
          <el-table-column prop="quantity" label="Số lượng" width="120"> </el-table-column>
          <el-table-column prop="price" label="Giá" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.price | formatCurrency }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="start" label="Ngày bắt đầu" width="150"> </el-table-column>
          <el-table-column prop="end" label="Ngày kết thúc" width="300"> </el-table-column>
          <el-table-column fixed="right" label="Thao tác" width="120">
            <template slot-scope="scope">
              <el-button
                @click="handleRemove(scope.$index, scope.row)"
                type="danger"
                size="small"
                plain
                icon="el-icon-delete"
                >Xóa</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- Get Total -->
        <h4 class="booking__form-title">
          Tổng Hóa Đơn:
          <span class="booking__pricing-footer">{{ this.total }}</span>
        </h4>
        <!-- Confirm Booking -->
        <div class="booking__confirm booking__card">
          <el-button class="booking__btn" @click="handlePurchase">Thanh toán</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: {
        fullname: this.$store.state.myCustomer.fullname,
        hotelId: 0,
        email: this.$store.state.myCustomer.email,
        phone: this.$store.state.myCustomer.phone,
        orderLines: [
          {
            quantity: 1,
            start: '',
            end: '',
            price: 0,
            roomId: 0,
            orderId: 0,
          },
        ],
      },
      total: 0,
    };
  },
  computed: {
    hotel() {
      return this.$store.state.hotelById;
    },
    wardById() {
      return this.$store.state.wardById;
    },
    districtById() {
      return this.$store.state.districtById;
    },
    provinceById() {
      return this.$store.state.provinceById;
    },
    orderLines() {
      return this.$store.state.orderLines;
    },
    tableData() {
      return this.orderLines;
    },
  },
  methods: {
    hasImages() {
      if (this.hotel.images == undefined) return;
      if (this.hotel.images.length != 0) {
        return false;
      } else return true;
    },
    handleRemove(index, row) {
      this.$confirm('Sẽ xóa phòng ra khỏi giỏ hàng. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      })
        .then(() => {
          const orderLines = this.$store.state.orderLines;
          const orderLineIndex = orderLines.findIndex((l) => l.id == row.id);
          if (orderLineIndex != -1) {
            orderLines.splice(orderLineIndex, 1);
            this.$store.commit('UPDATE_ORDERLINE', orderLines);
          }
          this.total = 0;
          this.getTotal(this.orderLines);
        })
        .catch(() => {
          return;
        });
    },

    getTotal(orderLines) {
      for (const order of Array.from(orderLines)) {
        this.total += order.price * order.quantity;
      }
      return (this.total = this.$options.filters.formatCurrency(this.total));
    },
    async handlePurchase() {
      if ((this.orderLines || []).length) {
        console.log('Đơn hàng trống');
      }
      for (let i = 0; i < this.orderLines.length - 1; i++) {
        if (this.orderLines[i].hotelId != this.orderLines[i + 1].hotelId) {
          console.log('Không hợp lệ');
          return;
        }
      }
      const payload = {
        fullname: this.order.fullname,
        hotelId: this.orderLines[0].hotelId,
        email: this.order.email,
        phone: this.order.phone,
        orderLines: this.orderLines,
      };
      if (!JSON.parse(localStorage.getItem('accessToken'))) {
        this.$message({
          showClose: true,
          message: 'Vui lòng Đăng Nhập để đặt phòng!',
          type: 'warning',
        });
      } else {
        try {
          await this.$store.dispatch('createOrder', payload);
          this.$store.commit('UPDATE_ORDERLINE', []);
          this.alertSuccess();
          this.$router.go(-1);
        } catch (err) {
          this.alertErr();
        }
      }
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Đã có lỗi xảy ra!',
        type: 'error',
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Gửi Xác Nhận Đặt Phòng Thành Công!',
        type: 'success',
      });
    },
  },
  created() {
    this.getTotal(this.orderLines);
    if ((this.$store.state.orderLines || []).length == 0) {
      window.history.go(-1);
      return;
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchHotelById', this.orderLines[0].hotelId);
    await this.$store.dispatch('fetchWardById', this.hotel.wardId);
    await this.$store.dispatch('fetchDistrictById', this.hotel.districtId);
    await this.$store.dispatch('fetchProvinceById', this.hotel.provinceId);
  },
};
</script>
<style scoped>
.booking {
  padding: 50px 10%;
}
.booking__card {
  margin-top: 30px;
}
.booking__form-content {
  margin: 0px;
  flex-basis: 100%;
  -webkit-box-flex: 0;
  flex-grow: 0;
  max-width: 100%;
  padding-top: 15px;
}
.text-center {
  text-align: center;
}
.booking__form-title {
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
  margin: 8px 0px;
}
.booking__date-picker {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.booking__confirm {
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.booking__btn {
  position: relative;
  border: none;
  border-radius: 4px;
  user-select: none;
  background-color: rgb(83, 146, 249);
  color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 1px;
  transition: all 0.15s ease-in-out 0s;
  align-self: flex-end;
  margin: 0px;
  padding: 12px 64px;
}
.booking__hotel-name {
  color: #2a2a2e;
  font-size: 20px;
  line-height: 1.4;
}
.booking__hotel-address {
  color: #2a2a2e;
  font-size: 12px;
  line-height: 1.2;
  margin: 0;
}
.booking__hotel-description {
  color: #2a2a2e;
  font-size: 15px;
  line-height: 1.4;
  padding-top: 20px;
  overflow-wrap: break-word;
  text-align: justify;
}
.booking__hotel-details {
  padding-left: 20px !important;
  padding-right: 20px !important;
}
.booking__hotel-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.booking__room-details {
  font-size: 16px;
  line-height: 1.5;
  color: #2a2a2e;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #cbd3db;
}
.booking__room-date {
  font-size: 14px;
  line-height: 1.57;
}
.booking__room-change {
  font-size: 12px;
  font-weight: 600;
  color: #5392f9;
  cursor: pointer;
  text-decoration: underline;
}
.booking__room-capacity {
  vertical-align: middle;
  font-weight: 400;
  font-style: normal;
  text-decoration: inherit;
  text-transform: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-bottom: 3px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.booking__room-icon {
  margin: 2px 8px 0 0;
}

.booking__pricing-header {
  padding: 16px;
  margin-left: 0;
  margin-right: 0;
  white-space: nowrap;
}
.booking__pricing-footer {
  padding: 16px;
}
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.booking__hotel-images {
  margin-top: 20px;
}
.booking__hotel-des {
  width: 150px;
  height: 150px;
  padding: 3%;
}
</style>
