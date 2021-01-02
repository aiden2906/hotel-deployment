<template>
  <div class="info">
    <div class="room__name">
      <span class="name__title">{{room.name}}</span>
      <div class="room__actions">
        <el-button type="primary" icon="el-icon-edit" class="name__edit" circle plain @click="editRoom"></el-button>
        <el-button type="danger" icon="el-icon-delete" class="name__edit" circle plain @click="deleteRoom(room.id)"></el-button>
      </div>
    </div>
    <template>
      <el-tabs v-model="activeName" stretch class="room__detail">
        <el-tab-pane label="Thông Tin" name="first">
          <div class="room__info">
            <div class="room-card__content-description">
              <span class="room-card__content-title">Mô tả</span>
              <p class="text-justify">{{room.description}}</p>
            </div>
            <el-row :gutter="24" class="room__stock hidden-xs-only">
              <el-col :span="6">
                <span class="room-card__content-title">Số Lượng Phòng: </span>
                <span class="text-justify">{{room.stock}}</span>
              </el-col>
              <el-col :span="6">
                <span class="room-card__content-title">Sức Chứa Mỗi Phòng: </span>
                <span class="text-justify">{{room.capacity}}</span>
              </el-col>
              <el-col :span="6">
                <span class="room-card__content-title">Giá Gốc: </span>
                <span class="text-justify">{{room.regularPrice | formatCurrency}}</span>
              </el-col>
              <el-col :span="6">
                <span class="room-card__content-title">Giá Giảm: </span>
                <span class="text-justify">{{room.salePrice | formatCurrency}}</span>
              </el-col>
            </el-row>
            <!-- For small screens -->
            <el-row :gutter="24" class="room__stock hidden-sm-and-up">
              <el-col :span="12">
                <div>
                  <span class="room-card__content-title">Số Lượng Phòng: </span>
                  <span class="text-justify">{{room.stock}}</span>
                </div>
                <div class="info__room">
                  <span class="room-card__content-title">Sức Chứa Mỗi Phòng: </span>
                  <span class="text-justify">{{room.capacity}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span class="room-card__content-title">Giá Gốc: </span>
                  <span class="text-justify">{{room.regularPrice | formatCurrency}}</span>
                </div>
                <div class="info__room">
                  <span class="room-card__content-title">Giá Giảm: </span>
                  <span class="text-justify">{{room.salePrice | formatCurrency}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Hình Ảnh" name="second">
          <div class="image__description-helper">
            <h4>* Mẹo: Click vào từng hình để phòng to.</h4>
          </div>
          <div v-if="isImageEmpty(room.images)" class="handle-empty-image">
            <el-image style="width: 50%; height: 50%" :src="'https://cdn.dribbble.com/users/992274/screenshots/7392790/media/95483df50a0a3324c4cf9ccb1094b825.jpg'"></el-image>
          </div>
          <div class="hotel-card__images">
            <el-image class="room-card__image" v-for="image in room.images" :key="image" :src="image" :preview-src-list="room.images" :fit="'contain'"></el-image>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {
    room() {
      return (Array.from(this.$store.state.roomsByHotelId).filter(room => room.id == this.$route.params.roomId))[0];
    },
  },
  methods: {
    isImageEmpty(images) {
      if (images == null) return true;
      else if (images.length == 0) return true;
      else return false;
    },
    editRoom() {
      this.$router.push(`/hotel/${this.$route.params.id}/room/${this.$route.params.roomId}`);
    },
    deleteRoom(roomId) {
      this.$confirm("Xóa vĩnh viễn phòng. Tiếp tục?", "Cảnh Báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Hủy bỏ",
        type: "warning"
      })
        .then(async () => {
          await this.$store.dispatch("deleteRoom", roomId);
          this.$store.dispatch("fetchRoomsByHotelId", this.$route.params.id);
          this.alertSuccess();
        })
        .catch(() => {
          this.alertErr();
        });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: "Đã xóa phòng thành công.",
        type: "success"
      });
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: "Đã có lỗi xảy ra, vui lòng thử lại.",
        type: "error"
      });
    },
  }
}
</script>
<style scoped>
.info{ 
  padding: 0 0 0 3%;
}
.room-card__content-title {
  font-weight: 700;
  color: #a6a7ac;
}
.text-justify {
  text-align: justify;
  line-height: 1.2;
  font-weight: 700;
  color: #31343c;
}
.room__info {
  background-color: #f4f7f9;
  padding: 40px;
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.room__stock {
  padding-top: 20px;
}
.name__title {
  color: #252831;
  font-weight: 700;
  font-size: 40px;
}
.name__edit {
  font-size: 20px;
}
.room__name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.room__detail {
  padding-top: 30px;
}
.room-card__image {
  width: 30%;
  height: 30%;
  padding: 1%;
}
.info__room{
  padding-top: 10px;
}
.room__actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Responsive */
@media (max-width: 767px) {
  .name__title {
    font-size: 30px;
  }
  .name__edit {
    font-size: 15px;
  }
  .room-card__content-title {
    font-size: 14px;
  }
  .text-justify {
    font-size: 14px;
  }
}
</style>