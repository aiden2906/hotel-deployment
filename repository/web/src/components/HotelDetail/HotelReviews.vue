<template>
  <el-container>
    <el-main>
      <el-row class="review-row">
        <div class="review-header">
          <div class="review-title" style="font-size:24px, font-weight:600">
            Bài đánh giá Khách Sạn 
          </div>
          <div class="review-button">
            <!-- <el-button @click="updateReview" type="success">Bài review của tôi</el-button> -->
            <el-button style="font-weight: 600" @click="postReview(idHotel)" type="primary">Đăng bài review</el-button>
          </div>
        </div>
        <div v-for="review of reviewPagination" :key="review.id" class="review-body">
         

          <div class="review-title">
            <div>
              <div class="review-name">{{(review.customer && review.customer.fullname) || 'Người dùng vô danh'}} </div>
              <div class="review-date">{{review.createdAt | formatDate}}</div>
            </div>
            <div class="review-rating">{{review.rating+'.0'}}</div>
          </div>
          
          <div class="review-content">
            <div class="review-tag">{{review.tag.name}}</div>
            <div class="review-description">{{review.content}}</div>
          </div>

          <div v-if="review.images.length != 0" class="review-image" style="padding: 10px 0">
            <div class="main-image">
              <el-image
                  :src="review.images[0]"
                  :preview-src-list="review.images">
              </el-image>
            </div>
            <div v-if="review.subImages.length >1" :style="{paddingBottom: height/review.subImages.length + 'px'}" class="sub-images">
              <div v-for="sub of review.subImages" :key="sub">
                <el-col style="padding: 0 1px" class="sub-image" :span="24/review.subImages.length">
                  <el-image
                  :src="sub"
                  :preview-src-list="review.images"
                  :style="{width: '100%', height : height/review.subImages.length + 'px' }"
                  ></el-image>
                </el-col>
              </div>
            </div>    
          </div>
          
        </div>
      </el-row>
      <el-row v-if="reviews.length">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="reviews.length"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </el-row>
      <el-row class="review-row" v-else>Chưa có nhận xét nào</el-row>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash';
export default {
  props: ['idHotel'],
  data() {
    return {
      reviews: [],
      tags: [],
      currentPage: 1,
    };
  },
  computed: {
    reviewPagination(){
      return _.chunk(this.reviews, 10)[this.currentPage-1];
    },
    height() {
      let mq = window.matchMedia( "(max-width: 768px)" );
      if (mq.matches) {
        return 300
      }else{
         return 520;
      }
    }
  },
  methods: {
    postReview(id) {
      if (!this.checkPermission()) {
        return this.alertErr();
      }
      return this.$router.push(`/review/${id}`);
    },
    updateReview() {
      if (!this.checkPermission()) {
        return this.alertErr();
      }
      return this.$router.push(`/customer-review`);
    },
    handleChangePage(number) {
      this.currentPage = number;
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Quý khách cần phải đăng nhập để thực hiện tác vụ này!',
        type: 'error',
      });
    },
    checkPermission() {
      const check =
        JSON.parse(localStorage.getItem('accessToken')) &&
        JSON.parse(localStorage.getItem('customer'));
      if (check) {
        return true;
      }
      return false;
    },
  },
  async created() {
    await this.$store.dispatch('fetchReviews', this.idHotel);
    await this.$store.dispatch('fetchTags');
    this.tags = this.$store.state.tags;
    this.reviews = this.$store.state.reviews.map((r) => {
      r.tag = this.tags.find((t) => t.id == r.tagId)
      r.subImages = r.images.filter(
        (i) => r.images.indexOf(i) > 0 && r.images.indexOf(i) <= 4
      );
      return r;
    });
  },

};
</script>

<style scoped>
@media (max-width: 768px){
  .main-image .el-image {
    height: 220px !important;
  }
}
.main-image .el-image {
  width: 100%;
  height: 450px;
}

.review-tag {
  font-weight: 600;
}
.review-name {
  font-weight: 600;
  font-size: 16px;
}
.review-date {
  color: silver;
  font-size: 12px;
}
.review-header .review-title {
   font-size: 24px;
   font-weight: 600;
   
}
.review-body .review-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 20px 0;
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
.review-content {
  padding: 15px 20px;
  background-color: #f5f5f5;
  border-radius: 5px
}
.review-customer {
  font-size: 14px;
  font-weight: 600;
  padding: 10px 0;
}
.review-description {
  padding: 10px 0;
}
.review-rating {
  font-size: 15px;
  color: white;
  background-color: #488bf8 ;
  border-radius: 50%;
  padding: 6px;
  font-weight: 600;

}
.review-body {
  padding: 10px 10px 30px 10px;
  border-bottom: 1px solid rgb(221,223,226);
}
.review-row {
  width: 90%;
  padding: 40px;
  border-top: 1px solid rgb(221, 223, 226);
}
.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
</style>

<style>
.main-image .el-image img {
  object-fit: cover;
}
.sub-image .el-image img {
  object-fit: cover;
}
</style>
