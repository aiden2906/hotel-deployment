<template>
  <div>
    <!-- Photos -->
    <el-form-item>
      <h4 class="form__description-title">Hình ảnh</h4>
      <el-upload
        accept="image/png, image/jpeg, image/jpg"
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        ref="upload"
        :on-change="handleOnChange"
        multiple
        :limit="9"
        :on-exceed="handleExceed"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }" class="image--full-height">
          <el-image class="el-upload-list__item-thumbnail" :fit="'cover'" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
        <div slot="tip" class="el-upload__tip">
          định dạng jpg/png và kích thước ảnh nhỏ hơn 5MB
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-button type="primary" class="submit-btn btn" @click="handleUpload">Đăng Ký</el-button>
    <el-button class="goback-btn btn" @click="back">Quay Lại</el-button>
  </div>
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
      newActive: 0
    }
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.findIndex((f) => f.url == file.url);
      this.fileList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleOnChange(file, fileList) {
      this.fileList = fileList;
    },
    parseFormData(files) {
      let formData = new FormData();
      for (const file of files) {
        formData.append('image', file);
      }
      return formData;
    },
    async handleUpload(e) {
      e.preventDefault();
      const files = this.$refs.upload.uploadFiles.map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.hotel.images = data;

      try {
        await this.$store.dispatch('registerHotel', this.hotel);
        this.alertSuccess();
        this.$store.dispatch('fetchHotels', this.curOwner.id);
        this.$router.push(`/dashboard/${this.curOwner.id}/listing`);
      } catch (err) {
        this.alertErr();
      }
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã thêm khách sạn thành công.',
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
      this.$message.warning(`Tối đa chỉ 9 ảnh, bạn đã chọn ${files.length} ảnh, tổng cộng ảnh đang có là ${files.length + fileList.length}`);
    },
  }
}
</script>
<style scoped>
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
.form__description-title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
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
  margin-bottom: 0;
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
.image--full-height {
  height: 100%;
  width: 100%;
}
</style>