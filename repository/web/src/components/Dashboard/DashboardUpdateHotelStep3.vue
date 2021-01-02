<template>
  <el-form-item class="container-step3">
    <h4 class="form__description-title">Hình ảnh</h4>
    <el-upload
      accept="image/png, image/jpeg, image/jpg"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      ref="upload"
      :file-list="fileList"
      :on-change="handleOnChange"
      multiple
      :limit="8"
      :on-exceed="handleExceed"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <el-image
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          :fit="'contain'"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <div slot="tip" class="el-upload__tip">định dạng jpg/png và kích thước ảnh nhỏ hơn 5MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button type="primary" class="submit-btn btn" @click="handleUpload">Cập nhật</el-button>
    <el-button class="goback-btn btn" @click="back">Quay Lại</el-button>
  </el-form-item>
</template>
<script>
export default {
  props: ['hotel', 'active'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      url: "https://cdn.dribbble.com/users/129991/screenshots/6008315/hotel.png"
    };
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.findIndex(f => f.url == file.url);
      this.fileList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    parseFormData(files) {
      let formData = new FormData();
      for (const file of files) {
        formData.append('image', file);
      }
      return formData;
    },
    handleOnChange(file, fileList){
      this.fileList = fileList;
    },
    async handleUpload(e) {
      e.preventDefault();
      const files = this.$refs.upload.uploadFiles.filter(f => f.raw).map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.hotel.images = this.$refs.upload.uploadFiles.filter(f => !f.raw).map(f => f.url).concat(data);

      try {
        this.$store.dispatch('updateHotel', { hotelId: this.$route.params.id, hotel: this.hotel });
        this.alertSuccess();
        await this.$store.dispatch('fetchRoomsByHotelId', this.$route.params.id);
        this.$router.push(`/hotel/${this.$route.params.id}/room`);
      } catch (err) {
        this.alertErr();
      }
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã cập nhật khách sạn thành công.',
        type: 'success',
      });
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        type: 'error',
      });
    },
    back() {
      this.newActive = this.active - 1;
      this.$emit('on-back', this.newActive);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`Tối đa chỉ 8 ảnh, bạn đã chọn ${files.length} ảnh, tổng cộng ảnh đang có là ${files.length + fileList.length}`);
    },
  },
  watch: {
    '$store.state.hotelById': function(nVal) {
      this.fileList = nVal.images.map((i, index) => ({
        name: `${nVal.name.normalize()}-image-${index}`,
        url: i,
      }));
    }
  },
  created() {
    this.fileList = this.hotel.images.map(item => {
      return {
        name: item,
        url: item
      }
    });
  }
};
</script>
<style scoped>
.form__description-title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
}
.submit-btn {
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
  margin-top: 12px;
}
.submit-btn:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.goback-btn{
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
.btn {
  margin-left: 5px;
  margin-top: 10px;
  float: right;
  min-height: 42px;
  min-width: 180px;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
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
</style>

<style>
.container-step3 .el-image .el-image__inner {
  height: 150px;
  width: auto;
}
</style>