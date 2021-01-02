<template>
  <div>
    <CusNavbar></CusNavbar>
    <el-container>
      <el-main>
        <el-row class="myreview">
          <el-divider>My Reviews</el-divider>
        </el-row>
        <el-row class="myreview">
           <div style="text-align: center" v-if="reviews.length == 0">
            <div>
              <img src="../assets/illustration-globe.png" alt ="" />
            </div>
            <div>
              <h3>Chưa có gì để cho bạn nhận xét</h3>
              <h4 style="color: #5a5b5b">Thế giới rộng lớn đang chờ bạn khám phá. Xách balo lên và đi nào!</h4>
            </div>
            <el-button @click="backToHotelDetail" type="primary">Quay lại</el-button>
            
          </div>
          <div v-else>
            <div v-for="review of reviews" :key="review.id" class="myreview-wrapper">
              <div style="display: flex; align-items:center">
                <el-col :span="6" class="review-detail">
                  <div class="review-hotel">{{ review.hotel.name }}</div>
                  <div class="review-rating">{{ review.rating }}.0</div>
                </el-col>
                <el-col :span="18" class="myreview-content">
                  <div class="review-content-tag">"{{ review.tag.name }}"</div>
                  <div class="review-content-body">
                    {{ review.content }}
                  </div>
                </el-col>
              </div>
              <div style="text-align: right; padding: 10px 0">
                <el-button @click="fixReview(review.id)" type="success">CẬP NHẬT</el-button>
                <el-button @click="deleteReview(review.id)" type="danger">Xóa</el-button>
                <el-dialog title="Review" :visible.sync="dialogReviewVisible">
                  <el-form :model="reviewById">
                    <el-form-item label="Đánh giá" :label-width="formLabelWidth">
                      <el-rate
                        v-model="reviewById.rating"
                        :texts="['Oops!', 'Disappointed!', 'Normal!', 'Good!', 'Excellent!']"
                        show-text
                      >
                      </el-rate>
                    </el-form-item>
                    <el-form-item label="Nội dung" :label-width="formLabelWidth">
                      <el-card shadow="hover">
                        <el-input
                          type="textarea"
                          :rows="4"
                          maxlength="5000"
                          show-word-limit
                          v-model="reviewById.content"
                        ></el-input>
                      </el-card>
                    </el-form-item>
                    <el-form-item label="Hình ảnh" :label-width="formLabelWidth">
                      <el-upload
                        accept="image/png, image/jpeg, image/jpg"
                        action="#"
                        list-type="picture-card"
                        :file-list="fileList"
                        :auto-upload="false"
                        :ref="`upload_${review.id}`"
                        :on-change="handleOnChange"
                        multiple
                      >
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{ file }">
                          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                          <span class="el-upload-list__item-actions">
                            <span
                              class="el-upload-list__item-preview"
                              @click="handlePictureCardPreview(file)"
                            >
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
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogReviewVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleUpdateReview">Confirm</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
          </div>
         
        </el-row>
        
      </el-main>
    </el-container>
    <Footer></Footer>
  </div>
</template>

<script>
import CusNavbar from '../components/CusNavbar';
import Footer from '../components/Footer'

export default {
  components: {
    CusNavbar, Footer
  },
  data() {
    return {
      reviewById: {},
      dialogReviewVisible: false,
      formLabelWidth: '80px',
      tags: [],
      
      hotels: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
    };
  },
  async created() {
    await this.$store.dispatch('fetchReviewsByCustomer', this.$store.state.myCustomer.id);
    await this.$store.dispatch('fetchTags');
    await this.$store.dispatch('fetchAllHotels');
    this.tags = this.$store.state.tags;
    this.hotels = this.$store.state.allHotels;
   
  },
  computed: {
    reviews() {
      return this.$store.state.reviewsByCustomer.map((r) => {
      r.tag = this.tags.find((t) => t.id == r.tagId);
      r.hotel = this.hotels.find((h) => h.id == r.hotelId);
      return r;
    });
    }
  },
  methods: {
    deleteReview(id) {
      this.$confirm('Xác nhận xóa bài review ?', 'Xóa', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          await this.$store.dispatch('deleteReview', id);
          this.$store.dispatch('fetchReviewsByCustomer', this.$store.state.myCustomer.id);
          this.alertSuccess();
        })
        .catch(() => {
          this.alertErr();
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      const index = this.fileList.findIndex((f) => f.url == file.url);
      this.fileList.splice(index, 1);
    },
    handleOnChange(file, fileList) {
      this.fileList = fileList;
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã xóa bài review thành công.',
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
    fixReview(id) {
      this.reviewById = this.$store.state.reviewsByCustomer.find((r) => r.id == id);
      this.fileList = (this.reviewById.images || []).map((i, index) => ({
        name: `${this.reviewById.id}-image-${index}`,
        url: i,
      }));
      this.dialogReviewVisible = true;
    },
    async handleUpdateReview() {
      const files = this.$refs[`upload_${this.reviewById.id}`][0].uploadFiles.filter((f) => f.raw).map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.reviewById.images = this.$refs[`upload_${this.reviewById.id}`][0].uploadFiles
        .filter((f) => !f.raw)
        .map((f) => f.url)
        .concat(data);
      await this.$store.dispatch('updateReview', this.reviewById);
      this.alertUpdateSuccess();
      this.dialogReviewVisible = false;
    },
    parseFormData(files) {
      let formData = new FormData();
      for (const file of files) {
        formData.append('image', file);
      }
      return formData;
    },
    alertUpdateSuccess() {
      this.$message({
        showClose: true,
        message: 'Update bài review thành công!',
        type: 'success',
      });
    },
    backToHotelDetail() {
      this.$router.back()
    }
  },
};
</script>

<style scope>
.el-rate {
  text-align: left;
}
.myreview {
  margin: 0 auto;
  width: 80%;
  padding: 10px;
}
.myreview .el-divider__text {
  font-size: 24px;
  font-weight: 600;
}
.review-content-tag {
  font-weight: 600;
  font-size: 18px;
}
.review-content-body {
  font-size: 14px;
  padding-top: 20px;
  color: #4e4e4e;
}
.myreview-content {
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 15px;
}
.review-hotel {
  font-size: 14px;
  font-weight: 600;
  padding: 10px 0;
}
.review-rating {
  font-size: 36px;
  color: #488bf8;
}
.myreview-wrapper {
  padding: 20px 10px;
}
.review-row {
  width: 80%;
  margin: 0 auto;
  padding: 40px 10px 0 10px;
  border-top: 1px solid rgb(221, 223, 226);
}
.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<style>
.myreview-header .el-divider__text {
  font-size: 24px;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail {
}
</style>
