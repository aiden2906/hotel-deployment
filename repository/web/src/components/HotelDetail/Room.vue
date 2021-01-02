<template>
  <div class="Room">
    <el-container>
      <el-main>
        <el-row class="RoomGrid-content">
          <el-col class="RoomWrap" :span="24">
            <el-col :span="5" class="MasterRoom-info">
              <div class="MasterRoom-infoHeader">Hình ảnh mô tả</div>
              <div class="MasterRoom-infoPhoto">
                <img :src="`${room.images[0]}`" alt="" />
              </div>
              <div class="MasterRoom-infoPhotoThumbnail">
                <div class="infoPhotoThumbnail1">
                  <img :src="`${room.images[1]}`" alt="" />
                </div>
                <div class="infoPhotoThumbnail2">
                  <img :src="`${room.images[2]}`" alt="" />
                </div>
              </div>
            </el-col>
            <el-col :span="19" class="MasterRoom-roomList">
              <el-row class="roomList_wrapper">
                <el-col :span="10" class="ChildRoom-include">
                  <div class="include-header">Mô tả phòng</div>
                </el-col>
                <el-col :span="3" class="ChildRoom-capacity">
                  <div class="capacity-header">Sức chứa</div>
                </el-col>
                <el-col :span="5" class="ChildRoom-price">
                  <div class="price-header">Giá phòng</div>
                </el-col>
                <el-col :span="6" class="ChildRoom-book">
                  <div class="book-header">Đặt nhiều nhất</div>
                </el-col>
              </el-row>
              <el-row class="ChildRoomsList-room-contents">
                <el-col :span="10" class="ChildRoom-include-content">
                  <div class="include-content-badge">{{ room.name }}</div>
                  <div class="include-content-bucket">
                    <div style="padding: 10px"><strong>Mô tả:</strong> {{ room.description }}</div>
                  </div>
                </el-col>
                <el-col :span="3" class="ChildRoom-capacity-content">
                  <div style="padding: 15px 0; text-align:center">
                    <i class="el-icon-user-solid"></i> x {{ room.capacity }}
                  </div>
                </el-col>
                <el-col :span="5" class="ChildRoom-price-content">
                  <div class="finalPrice">
                    {{ room.salePrice | formatCurrency }}
                  </div>
                </el-col>
                <el-col :span="6" class="ChildRoom-book-content">
                  <el-button
                    type="primary"
                    class="reverseNow"
                    @click="dialogDatePickerVisible = true"
                    >Đặt phòng</el-button
                  >
                  <el-dialog title="Chọn ngày" :visible.sync="dialogDatePickerVisible" width="20%">
                    <el-date-picker
                      v-model="datePicker1"
                      type="daterange"
                      range-separator="To"
                      start-placeholder="Start date"
                      end-placeholder="End date"
                      :style="{ margin: '20px 0px' }"
                    >
                    </el-date-picker>
                    <el-button
                      :style="{ marginBottom: '20px' }"
                      type="primary"
                      @click="handleDatePicker()"
                      :disabled="button1"
                      >Xem</el-button
                    >
                  </el-dialog>
                  
                </el-col>
                <el-dialog title="Lịch đặt phòng" :visible.sync="dialogDetailVisible" width="50%">
                    <el-row>
                      <el-calendar>
                        <template slot="dateCell" slot-scope="{ date, data }">
                          <div
                            :class="data.isSelected ? 'is-selected' : ''"
                            :style="
                              renderCellCalender(...data.day.split('-').slice(1))
                                ? {
                                    width: '100%',
                                    height: '100%',
                                  }
                                : {
                                    backgroundColor: 'rgb(221, 223, 226)',
                                    width: '100%',
                                    height: '100%',
                                  }
                            "
                          >
                            <div>
                              {{
                                data.day
                                  .split('-')
                                  .slice(1)
                                  .reverse()
                                  .join('-')
                              }}
                            </div>
                            <div>
                              {{
                                renderCellCalender(...data.day.split('-').slice(1))
                                  ? room.stock -
                                      renderCellCalender(...data.day.split('-').slice(1)).sum >
                                    0
                                    ? ''
                                    : '❌'
                                  : ''
                              }}
                            </div>
                          </div>
                        </template>
                      </el-calendar>
                    </el-row>
                    <el-row :style="{ marginTop: '30px' }">
                      <el-col :span="10">Chọn ngày đặt phòng: </el-col>
                      <el-col :span="14"
                        ><el-date-picker
                          v-model="datePicker2"
                          type="daterange"
                          range-separator="To"
                          start-placeholder="Start date"
                          end-placeholder="End date"
                          @change="handleChangeDatePicker2"
                        >
                        </el-date-picker
                      ></el-col>
                    </el-row>
                    <el-row :style="{ margin: '30px 0px' }">
                      <el-col :span="10">Số phòng: </el-col>
                      <el-col :span="14">
                        <el-input-number
                          v-model="quantity"
                          :min="0"
                          :max="maxquantity"
                        ></el-input-number>
                      </el-col>
                    </el-row>
                    <el-row :style="{color: 'red', fontWeight: 'lighter', fontStyle: 'italic'}" v-if="button2">* Ngày đặt phòng không nằm trong quá khứ</el-row>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="danger" @click="handleCancel">Thoát</el-button>
                      <el-button type="primary" @click="handlePickRoom" :disabled="button2"
                        >Thêm vào giỏ hàng</el-button
                      >
                    </span>
                  </el-dialog>
              </el-row>
            </el-col>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  props: ['room'],
  data() {
    return {
      dialogDatePickerVisible: false,
      dialogDetailVisible: false,
      datePicker1: '',
      datePicker2: '',
      roomDetail: {},
      hotel: {},
      quantity: 0,
      button1: false,
      button2: false,
    };
  },
  computed: {
    maxquantity() {
      const start = new Date(Date.parse(this.datePicker2[0])).toDateString();
      const end = new Date(Date.parse(this.datePicker2[1])).toDateString();
      const dates = this.getDates(start, end);
      let stop = false;
      let max = 0;
      dates.forEach((d) => {
        if (stop) return;
        const date = new Date(d);
        const month = date.getMonth();
        const day = date.getDate();
        const transaction = this.roomDetail.transaction.find((t) => {
          const time = new Date(t.day);
          return day == time.getDate() && month == time.getMonth();
        });
        if (!transaction) {
          stop = true;
          max = 0;
          return;
        } else {
          if (this.roomDetail.stock - transaction.sum - this.quantity < 0) {
            stop = true;
            max = 0;
            return;
          }
          max =
            this.roomDetail.stock - transaction.sum - this.quantity >= max
              ? this.roomDetail.stock - transaction.sum - this.quantity
              : max;
        }
      });
      return max;
    },
  },
  methods: {
    handleChangeDatePicker2() {
      this.quantity = 0;
    },
    async handleDatePicker() {
      const payload = {
        id: this.room.id,
        start: new Date(Date.parse(this.datePicker1[0])).toDateString(),
        end: new Date(Date.parse(this.datePicker1[1])).toDateString(),
      };
      this.dialogDatePickerVisible = false;
      this.datePicker1 = '';
      this.roomDetail = await this.$store.dispatch('fetchRoomDetail', payload);
      this.dialogDetailVisible = true;
    },
    handlePickRoom() {
      const start = new Date(Date.parse(this.datePicker2[0])).toDateString();
      const end = new Date(Date.parse(this.datePicker2[1])).toDateString();
      const payload = {
        hotelId: this.roomDetail.hotelId,
        roomId: this.roomDetail.id,
        name: this.roomDetail.name,
        price: this.roomDetail.salePrice,
        start,
        end,
        quantity: this.quantity,
        id: uuidv4(),
      };
      const orderLine = JSON.parse(localStorage.getItem('orderLine')) || [];
      const e = orderLine.find((l) => l.hotelId !== payload.hotelId);
      if (e) {
        alert('abcabc');
        return;
      }
      orderLine.push(payload);
      this.$store.commit('UPDATE_ORDERLINE', orderLine);
      this.$message({
        showClose: true,
        message: 'Đã thêm thành công.',
        type: 'success',
      });
      this.dialogDetailVisible = false;
    },
    renderCellCalender(month, day) {
      const transaction = this.roomDetail.transaction.find((t) => {
        const time = new Date(t.day);
        return day == time.getDate() && month == time.getMonth() + 1;
      });
      return transaction;
    },
    handleCancel() {
      this.dialogDetailVisible = false;
    },
    getDates(start, end) {
      const days = [];
      const currentDate = new Date(start);
      const endDate = new Date(end);
      while (currentDate <= endDate) {
        days.push(new Date(currentDate).toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return days;
    },
  },
  mounted() {
    this.hotel = this.$store.state.hotelById;
  },
  watch: {
    'datePicker1': function (nVal) {
      if (nVal[1] < Date.now()) {
        this.button1 = true;
      } else {
        this.button1 = false;
      }
    },
    'datePicker2': function (nVal) {
      if (nVal[0] < Date.now()) {
        this.button2 = true;
      } else {
        this.button2 = false;
      }
    },
  }
};
</script>

<style scoped>
.reverseNow {
  white-space: normal;
  padding: 12px 2px;
  font-size: 12px;
}
.ChildRoomsList-room-contents {
  display: flex;
}
.ChildRoom-include-content {
  border-right: 1px solid rgb(221, 223, 226);
}
.ChildRoom-capacity-content {
  border-right: 1px solid rgb(221, 223, 226);
}
.ChildRoom-price-content {
  border-right: 1px solid rgb(221, 223, 226);
}
.ChildRoom-room-content {
  border-right: 1px solid rgb(221, 223, 226);
}
.reverseNow {
  width: 85%;
  margin: 10px 0;
}
.ChildRoom-book-content {
  text-align: center;
}

.room-dropdown {
  padding: 10px;
  text-align: center;
}
.finalPrice {
  padding: 15px 0;
  text-align: center;
  color: #ed5c59;
  font-size: 14px;
}
.include-content-badge {
  background-color: #f79911;
  color: white;
  font-size: 13px;
  padding: 5px 10px;
}
.include-content-bucket {
  font-size: 12px;
  font-weight: 500;
  padding: 10px;
}
.ChildRoomsList-room-contents {
  border: 1px solid #f79911;
  background-color: white;
  height: 100%;
}
.MasterRoom-infoPhoto {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
}
.MasterRoom-infoPhoto:hover {
  transform: scale(1.2);
}
.MasterRoom-infoPhotoThumbnail {
  display: flex;
}
.infoPhotoThumbnail1 img {
  width: 100%;
  height: 100%;
}
.infoPhotoThumbnail2 img {
  width: 100%;
  height: 100%;;
}
.infoPhotoThumbnail1 {
  width: 50%;
  padding-right: 3px;
}
.infoPhotoThumbnail2 {
  width: 50%;
}
.MasterRoom-infoHeader {
  margin-bottom: 10px;
}
.MasterRoom-infoPhoto img {
  width: 100%;
}
.roomList_wrapper {
  margin-bottom: 10px;
}
.MasterRoom_Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
}
.Room_review {
  font-weight: 600;
  color: blueviolet;
}
.MasterRoom_Header h3 {
  font-weight: 600;
  font-size: 16px;
}
.RoomWrap {
  border: 1px solid rgb(221, 223, 226);
  background-color: #f7f7f7;
}
.Room .Room-row {
  width: 80%;
  margin: 0 auto;
}
.Room .RoomGrid-content {
  width: 100%;
  padding: 10px;
}
.Room-title {
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
}
.MasterRoom-info {
  padding: 10px 0 10px 10px;
  font-size: 14px;
  font-weight: 600;
}
.MasterRoom-roomList {
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
}
</style>
<style>
.ChildRoom-book-content .el-dialog {
  width: 30% !important;
}
.el-range-separator::before {
  content: none !important;
  background-color: #fff;
}
.el-calendar-table .el-calendar-day {
  padding: 0px !important;
}
.el-calendar-table .el-calendar-day > div {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;
}
</style>
