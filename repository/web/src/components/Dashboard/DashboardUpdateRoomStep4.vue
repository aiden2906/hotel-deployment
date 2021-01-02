<template>
  <div>
    <!-- Upload images -->
    <el-form-item>
      <div>
        <h4 class="form__description-title">Hình ảnh</h4>
        <h4 class="form__description-content">
          Hình ảnh rất quan trọng đối với du khách. Hãy đăng càng nhiều ảnh chất lượng cao càng
          tốt. Bạn có thể thêm ảnh về sau. Agoda có sẵn những bí kíp đăng tải ảnh chất lượng để
          thu hút nhiều đặt phòng hơn
        </h4>
        <h5 class="form__description-helper">
          * Mẹo: tối thiểu 800x600 px — lý tưởng 2048x1536 px
        </h5>
      </div>
      <el-upload
        accept="image/png, image/jpeg, image/jpg"
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        ref="upload"
        :file-list="fileList"
        :on-change="handleOnChange"
        multiple
        :limit="9"
        :on-exceed="handleExceed"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }" class="image--full-height">
          <el-image class="el-upload-list__item-thumbnail" :src="file.url" :fit="'cover'" alt="" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
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
     <!-- Form Submission -->
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm()"
        class="form__btn--submit form__btn"
        >Cập Nhật</el-button
      >
      <el-button @click="resetForm()" class="form__btn--goback form__btn"
        >Quay Lại</el-button
      >
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: ['room', 'active'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
    };
  },
  methods: {
    async submitForm() {
      const files = this.$refs.upload.uploadFiles.filter((f) => f.raw).map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.room.images = this.$refs.upload.uploadFiles
        .filter((f) => !f.raw)
        .map((f) => f.url)
        .concat(data);
      console.log('this room:', this.room)
      // this.$refs[formName].validate(async (valid) => {
        try {
          await this.$store.dispatch('updateRoomById', {
            roomId: this.$route.params.roomId,
            room: this.room,
          });
          this.$message({
            showClose: true,
            message: 'Đã cập nhật phòng thành công.',
            type: 'success',
          });
          await this.$store.dispatch('fetchRoomsByHotelId', this.$route.params.id);
          this.$router.push(`/hotel/${this.$route.params.id}/room`);
        } catch {
          this.$message({
            showClose: true,
            message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
            type: 'error',
          });
          return false;
        }
      // });
    },
    resetForm() {
      this.newActive = this.active - 1;
      this.$emit('on-back', this.newActive);
    },
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
    handleExceed(files, fileList) {
      this.$message.warning(`Tối đa chỉ 9 ảnh, bạn đã chọn ${files.length} ảnh, tổng cộng ảnh đang có là ${files.length + fileList.length}`);
    },
  },
  async created() {
    this.fileList = this.$store.state.roomById.images.map((i, index) => ({
      name: `${this.$store.state.roomById.name.normalize()}-image-${index}`,
      url: i,
    }));
  },
}
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
.form__description-content {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.form__description-helper {
  color: #999;
  font-size: 12px;
  margin: 0 0 10px;
}
.form__btn {
  margin-left: 5px;
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
.form__btn--submit {
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
}
.form__btn--goback {
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
.form__submit:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.image--full-height {
  height: 100%;
  width: 100%;
}
</style>