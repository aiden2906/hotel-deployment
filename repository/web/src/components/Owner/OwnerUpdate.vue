<template>
  <div>
    <el-container class="update-profile">
      <el-main>
        <el-row>
          <el-col :span="24">
            <div class="avatar__description">
              <h3>Chọn/ Đổi hình đại diện hình đại diện trong hồ sơ (không bắt buộc)</h3>
              <p>
                Tạo thiện cảm từ cái nhìn đầu tiên! Chúng tôi sẽ thêm hình đại diện vào hồ sơ của
                bạn và hiển thị cho khách hàng hay chủ nhà khác về sau.
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="avatar">
              <el-col class="avatar-content hidden-md-and-down" :span="17">
                <el-avatar v-if="owner.avatar" :size="70" :src="owner.avatar"></el-avatar>
                <el-avatar v-else :size="70" :src="owner.preview"></el-avatar>
                <p>
                  Hình ảnh thật sự có tác dụng. Hãy chọn một bức ảnh rõ ràng và thân thiện để tăng
                  lượng khách đặt phòng.
                </p>
              </el-col>
              <!-- Small Screens -->
              <el-col class="avatar-content hidden-lg-and-up hidden-xs-only" :span="17">
                <el-avatar v-if="owner.avatar" :size="80" :src="owner.avatar"></el-avatar>
                <el-avatar v-else :size="80" :src="owner.preview"></el-avatar>
                <p>
                  Hãy chọn một bức ảnh rõ ràng và thân thiện để tăng lượng khách đặt phòng.
                </p>
              </el-col>
              <!-- For extra small -->
              <el-col class="avatar-content hidden-sm-and-up" :span="17">
                <el-avatar v-if="owner.avatar" :src="owner.avatar" class="avatar__img"></el-avatar>
                <el-avatar v-else :src="owner.preview" class="avatar__img"></el-avatar>
                <p>
                  Hãy chọn một bức ảnh rõ ràng và thân thiện để tăng lượng khách đặt phòng.
                </p>
              </el-col>
              <el-col class="avatar-update" :span="7">
                <el-upload
                  class="avatar-uploader hidden-xs-only"
                  action="https://hotel.eyeteam.vn/api.upload/image"
                  name="image"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  ref="upload"
                >CHỌN/ĐỔI HÌNH ĐẠI DIỆN</el-upload>
                <!-- For small screens -->
                <el-upload
                  class="avatar-uploader hidden-sm-and-up"
                  action="https://hotel.eyeteam.vn/api.upload/image"
                  name="image"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  ref="upload"
                >CHỌN/ĐỔI HÌNH</el-upload>
              </el-col>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <h3 style="padding: 20px 0">Chỉnh sửa thông tin</h3>
          <el-col class="InfoOwner-col" :span="12">
            <div class="firstName">Tên</div>
            <el-input v-model="owner.firstname"></el-input>
          </el-col>
          <el-col class="InfoOwner-col" :span="12">
            <div class="lastName">Họ</div>
            <el-input v-model="owner.lastname"></el-input>
          </el-col>
          <el-col class="InfoOwner-col" :span="12">
            <div class="phone">Số điện thoại</div>
            <el-input v-model="owner.phone"></el-input>
          </el-col>
          <el-col class="InfoOwner-col" :span="12">
            <div class="email">Email</div>
            <el-input v-model="owner.email"></el-input>
          </el-col>
          <el-col class="InfoOwner-col" :span="12">
            <div class="address">Địa chỉ</div>
            <el-input v-model="owner.address"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="cancelUpdate">Hủy</el-button>
          <el-button class="saveInfo" @click="handleUpdateOwner">Lưu</el-button>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.saveInfo {
  color: white;
  background-color: #1174a6;
  border: 1px solid #1174a6;
}
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: burlywood;
}
.ed-main {
  background-color: #fcfcfc !important;
}
.avatar {
  border: 1px solid rgb(216, 207, 207, 0.5);
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
}
.avatar-content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.avatar-content p {
  margin: 0 10px;
}
.avatar-update {
  border-radius: 5px;
  border: 1px solid #1174a6;
  text-align: center;
  padding: 10px 0;
  color: #1174a6;
  cursor: pointer;
}
.avatar-update:hover {
  color: white;
  background-color: #1174a6;
  border: 1px solid #1174a6;
}
.el-row {
  padding: 10px 0;
  width: 80%;
  margin: 0 auto;
}
.InfoOwner-col {
  padding-right: 20px !important;
  font-weight: 600;
}
.firstName {
  padding: 10px 0;
}
.lastName {
  padding: 10px 0;
}
.email {
  padding: 10px 0;
}
.phone {
  padding: 10px 0;
}
.address {
  padding: 10px 0;
}
.avatar-uploader {
  padding: 10px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-plus {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar__img {
  height: 80px;
  width: 140px;
}
.update-profile{
  height: 80vh;
}
/* Responsive */
@media(max-width: 767px) {
  .el-col {
    padding-right: 0px !important;
  }
  .avatar__description {
    font-size: 15px;
  }
  .avatar-content {
    font-size: 15px;
  }
  .avatar-uploader {
    font-size: 15px;
  }
  .el-row .InfoOwner-col {
    padding-right: 20px !important;
  }
}

@media(min-width: 768px) and (max-width: 1319px) {
  .avatar-content .el-avatar {
    width: 100px !important;
  }
}

</style>
<style>


.el-avatar img {
  width: 100% !important;
}
</style>
<script>
export default {
  data() {
    return {
      owner: {
        id: this.$store.state.curOwner.id,
        firstname: this.$store.state.curOwner.firstname,
        lastname: this.$store.state.curOwner.lastname,
        phone: this.$store.state.curOwner.phone,
        address: this.$store.state.curOwner.address,
        email: this.$store.state.curOwner.email,
        preview:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        avatar: this.$store.state.curOwner.avatar
      },
      success: ""
    };
  },
 
  computed: {
    avatarUpdate() {
      return this.$store.state.curOwner.avatar;
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.owner.preview = URL.createObjectURL(file.raw);
      this.owner.avatar = res.data[0];
    },
    async handleUpdateOwner() {
      await this.$store.dispatch("updateUser", this.owner);
      this.alertSuccess();
      this.$router.push(`/dashboard/${this.$route.params.id}`);
    },
    alertSuccess() {
      this.$message({
          showClose: true,
          message: 'Update dữ liệu thành công!',
          type: 'success'
      });
    },
    alertErr() {
      this.$message({
          showClose: true,
          message: 'Update dữ liệu thất bại!',
          type: 'error'
      });
    },
    cancelUpdate() {
      this.$confirm('Hồ sơ sẽ không được cập nhật. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
      .then(() => {
        this.$router.push(`/dashboard/${this.$route.params.id}`);
      })
      .catch(() => {
        this.alertErr();
      });
    }
  }
};
</script>
