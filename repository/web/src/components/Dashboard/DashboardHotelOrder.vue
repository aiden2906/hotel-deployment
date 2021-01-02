<template>
  <div>
    <div v-if="orders.length == 0" class="handle-empty-order">
      <el-image style="width: 50%; height: 50%" :src="'https://cdn.dribbble.com/users/1083427/screenshots/2630650/ordini-vidra-.jpg'" :fit="'contain'"></el-image>
      <h1 class="room-card__title">Wow...Thật Trống Trải. Chưa Có Đơn Hàng Mới!</h1>
    </div>
    <div v-else class="manage-order">
      <el-row class="order-search" :gutter="24">
        <el-col :span="6">
          <el-input
            placeholder="Tìm Theo Tên Khách Hàng"
            suffix-icon="el-icon-search"
            v-model="search"
          >
          </el-input>
        </el-col>
        <el-col :span="6" />
        <el-col :span="12" class="order-filter">
          <el-select v-model="value" filterable placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- <el-divider class="order-title"><h2>Danh Sách Đơn Hàng</h2></el-divider> -->
      <div class="order-list" v-for="order in orderPagination" :key="order.id">
        <el-card class="order-card">
          <div slot="header" class="clearfix">
            <span class="order-card__title">[{{ order.id }}] {{ order.fullname }}</span>
          </div>
          <div class="order-card__body">
            <div>
              <span class="order-card__content">Đơn tạo:</span>
              <span>{{ order.createdAt | formatTime }},</span>
              <span> {{ order.createdAt | formatDate }}</span>
            </div>
            <div class="order-card__content-description">
              <span class="order-card__content">Lần cập nhật mới nhất:</span>
              <span>{{ order.updatedAt | formatTime }},</span>
              <span> {{ order.updatedAt | formatDate }}</span>
            </div>
            <div class="order-card__content-description">
              <span class="order-card__content">Trạng Thái:</span>
              <el-tag
                v-if="order.status === 'new'"
                class="hotel-card__tag"
                :type="'success'"
                effect="dark"
                ><span class="order-card__content-title">Mới</span></el-tag
              >
              <el-tag
                v-else-if="order.status === 'done'"
                class="hotel-card__tag"
                :type="'warning'"
                effect="dark"
                ><span class="order-card__content-title">Hoàn thành</span></el-tag
              >
              <el-tag v-else class="hotel-card__tag" :type="'danger'" effect="dark"
                ><span class="order-card__content-title">Hủy</span></el-tag
              >
            </div>
            <el-button class="order-detail" type="text" @click="fetchOrder(order.id)"
              >Chi Tiết Đơn Hàng</el-button
            >

            <el-dialog
              title="Chi Tiết Đơn Hàng"
              class="order-card__content-title"
              :visible.sync="dialogVisible"
            >
              <div class="order__modal">
                <div class="order-card__content-description">
                  <span class="order-card__content order-card__content-title-des">Email:</span>
                  <span> {{ order.email }}</span>
                </div>
                <div class="order-card__content-description">
                  <span class="order-card__content order-card__content-title-des">Phone:</span>
                  <span> {{ order.phone }}</span>
                </div>
                <el-table
                  :data="orderById.orderLines"
                  stripe
                  style="width: 100%"
                  class="order-card__content-description"
                >
                  <el-table-column prop="id" label="ID" width="60"> </el-table-column>
                  <el-table-column prop="start" label="Date" width="240">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.start | formatDate }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="end" label="Date" width="240">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.end | formatDate }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="Số lượng" width="100"></el-table-column>
                  <el-table-column prop="price" label="Giá" width="180"> 
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.price | formatCurrency }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- Get Total -->
                <h4 class="booking__form-title">
                  Tổng Hóa Đơn:
                  <span class="booking__pricing-footer">{{getTotal(orderById.orderLines || [])}}</span>
                </h4>
              </div>

              <span v-if="checkOrderDone(orderById.status)" slot="footer" class="dialog-footer">
                <el-button
                  class="order-detail__btn--cancel order-detail__btn"
                  @click="cancelOrder(orderById)"
                  >Huỷ Đơn</el-button
                >
                <el-button
                  class="order-detail__btn--confirm order-detail__btn"
                  type="primary"
                  @click="confirmOrder(orderById)"
                  >Xác Nhận Đơn Hàng</el-button
                >
              </span>
              <span v-else slot="footer" class="dialog-footer">
                <el-button
                  class="order-detail order-detail__btn--dialog"
                  type="text"
                  @click="dialogVisible = false"
                  >Đơn Hàng Đã Xác Nhận</el-button
                >
              </span>
            </el-dialog>
          </div>
        </el-card>
      </div>
      <el-pagination 
        background
        layout="prev, pager, next"
        :total="filterOrderByStatus.length"
        :page-size="5"
        @current-change="handleChangePage"
        class="paging">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  data() {
    return {
      search: '',
      dialogVisible: false,
      options: [
        {
          label: 'Mới',
          value: 'new'
        },
        {
          label: 'Hoàn thành',
          value: 'done'
        },
        {
          label: 'Hủy',
          value: 'cancel'
        },
        {
          label: 'Tất cả',
          value: 'all'
        },
      ],
      value: 'all',
      total: 0,
      currentPage: 1,
    };
  },
  computed: {
    orders() {
      return this.$store.state.roomOrdersByHotelId;
    },
    orderById() {
      return this.$store.state.orderById;
    },
    filteredOrders() {
      return (Array.from(this.orders) || []).filter((order) => {
        return order.fullname.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    filterOrderByStatus(){
      if (this.value == 'all') return (Array.from(this.orders) || []);
      return (Array.from(this.orders) || []).filter(o => o.status == this.value);
    },
    orderPagination() {
      return _.chunk(this.filterOrderByStatus, 5)[this.currentPage - 1];
    },
  },
  methods: {
    async fetchOrder(orderId) {
      await this.$store.dispatch('fetchOrderById', orderId);
      this.dialogVisible = true;
    },
    async confirmOrder(order) {
      try {
        if (order.status == 'done') {
          this.alertCheckOrderDone();
        } else {
          await this.$store.dispatch('confirmOrder', order.id);
          (this.orders.find((o) => o.id === order.id) || {}).status = 'done';
          this.dialogVisible = false;
          this.alertSuccess();
        }
      } catch (err) {
        this.alertErr();
        this.dialogVisible = false;
      }
    },
    cancelOrder(order) {
      if (order.status == 'done') {
        this.alertCheckOrderDone();
      } else {
        this.$confirm('Hủy đơn hàng. Tiếp tục?', 'Cảnh Báo', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning',
        })
          .then(() => {
            this.$store.dispatch('cancelOrder', order.id);
          })
          .then(() => {
            this.dialogVisible = false;
            (this.orders.find((o) => o.id === order.id) || {}).status = 'cancel';
          })
          .catch(() => {
            return;
          });
      }
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        type: 'error',
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã xác nhận đơn hàng thành công.',
        type: 'success',
      });
    },
    checkOrderDone(orderStatus) {
      return orderStatus !== 'done';
    },
    getTotal(orderLines) {
      this.total = orderLines.reduce((cur, i) => {
        return cur + i.price * i.quantity;
      }, 0);
      return this.$options.filters.formatCurrency(this.total);
    },
    handleChangePage(number) {
      this.currentPage = number;
    },
  },
  async mounted() {
    this.$store.dispatch('fetchRoomOrdersByHotelId', this.$route.params.hotelId);
  },
};
</script>
<style scoped>
/* .manage-order {
  padding: 0 10%;
} */
.order-title {
  margin: 30px 0;
}
.order-search {
  padding-top: 30px;
  display: flex;
  align-items: center;
}
.order-card {
  padding-bottom: 30px;
}
.order-card__body {
  padding: 20px 20px 0;
}
.order-card__title {
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  color: inherit;
  word-break: break-all;
  margin-top: 0;
  font-size: 20px;
}
.order-card__content-title {
  font-weight: 700;
}
.order-card__tag {
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
}
.order-card__content {
  font-size: 16px;
  text-align: justify;
  line-height: 1.2;
  margin: 10px 10px 0;
  font-weight: 700;
}
.order-card__content-description {
  padding-top: 20px;
}
.order-list {
  padding: 20px 0;
}
.order-detail {
  color: #1174a6;
  font-weight: 600;
  position: relative;
  margin: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin: 0 12px;
  text-decoration: none;
  font-size: 16px;
  float: right;
}
.order-detail__btn {
  margin-left: 5px;
  min-height: 42px;
  min-width: 180px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.order-detail__btn--confirm {
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
}
.order-detail__btn--confirm:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.order-detail__btn--cancel {
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
.order__modal {
  padding: 0 5%;
}
.order-detail__btn--dialog {
  float: none;
}
.order-filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.order-card__content-title-des {
  color: #2a2a2a;
}
.handle-empty-order {
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.paging {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}
/* Responsive */
@media (max-width: 767px) {
  .order-card__content {
    margin: 0;
    margin-right: 10px;
  }
}
</style>
