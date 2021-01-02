<template>
  <div class="Info">
    <el-container>
      <el-main>
        <el-row class="Info-row">
          <el-col class="Info1">
            
              <div class="Info-image" v-if="hotel.images.length == 1">
                <el-image
                    style="height: 500px; object-fit: cover; width: 100%"
                    :src="hotel.images[0]" 
                    alt=""
                    :preview-src-list="hotel.images">
                </el-image>
              </div>
              <div class="Info-image" v-if="hotel.images.length >=2 && hotel.images.length <=3 ">
                <div class="Main-image">
                  <el-image
                    style="height: 360px;  width: 100%"
                    :src="hotel.images[0]" 
                    alt=""
                    :preview-src-list="hotel.images">
                  </el-image>
                </div>
                <div class="Sub-image">
                  <el-image
                    style="height: 360px; width: 100%"
                    :src="hotel.images[1]" 
                    alt=""
                    :preview-src-list="hotel.images">
                  </el-image>
                </div>
              </div>
              <div class="Info-image" v-if="hotel.images.length >= 4 ">
                 <div class="Main-image">
                <el-image
                style="height: 360px; width: 100%"
                :src="hotel.images[0]" 
                alt=""
                :preview-src-list="hotel.images"></el-image>
                </div>
                <div class="Sub-image">
                  <div class="Sub-image1">
                    <el-image
                      style="height: 225px;  width: 100%"
                      :src="hotel.images[1]" 
                      alt=""
                      :preview-src-list="hotel.images">
                    </el-image>
                  </div>
                  <div class="Sub-image2">
                    <div style="padding-right:3px" class="thumbnail">
                      <el-image
                        style="height: 132px;  width: 100%"
                        :src="hotel.images[2]" 
                        alt=""
                        :preview-src-list="hotel.images">
                      </el-image>
                    </div>
                    <div class="thumbnail">
                      <el-image
                        style="height: 132px; width: 100%"
                        :src="hotel.images[3]" 
                        alt=""
                        :preview-src-list="hotel.images">
                      </el-image>
                    </div>
                  </div>
                </div>
              </div>
             
            
            <div class="InfoDetail">
              <div class="HeaderCerebrum">
                <div class="HeaderCerebrum_Name" style="text-transform:capitalize">
                  {{ hotel.name }}
                </div>
              
                <div style="color:#f7ba2a; font-weight: 600" v-if="round == 0">Chưa xếp hạng</div>
                <el-rate v-else :value="round" disabled show-score text-color="#ff9900"> </el-rate>
              </div>
              <div class="Header_Location"><strong>Địa chỉ</strong>: {{ hotel.address }}</div>
              <div class="Header_Location">
                <strong>Mô tả khách sạn</strong>: {{ hotel.description }}
              </div>
              <div class="Healthy">
                <span style="font-weight:600;">Các hoạt động sức khỏe</span>
                <div class="WellnessBadge__Wrapper">
                  <div class="WellnessBadge">
                    <img src="../../assets/spa-and-beauty.svg" alt="" />
                    <div class="WellnessBadge_Text">Spa & Làm Đẹp</div>
                  </div>
                  <div class="WellnessBadge">
                    <img src="../../assets/fitness-and-pool.svg" alt="" />
                    <div class="WellnessBadge_Text">Tập Tành & Giải Trí</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="Feature">
              <div style="margin: 10px 0; font-weight: 600" class="Feature_Name">
                Đặc điểm nổi bật
              </div>
              <el-row class="Feature_Detail">
                <el-col :span="12" class="Feature-item">
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                    class="sc-fzplgP javoXr"
                  >
                    <defs>
                      <path
                        id="agoda-price-guarante_24px-a"
                        d="M12.407 19.082h-.011l-5.783 4.683a.5.5 0 0 1-.805-.293l-.786-4.022-3.585-1.388a.5.5 0 0 1-.134-.854l2.975-2.409a9.09 9.09 0 1 1 15.703-.441l3.535 2.863a.5.5 0 0 1-.134.855l-3.584 1.387-.787 4.023a.5.5 0 0 1-.805.292l-5.8-4.696zm7.041-3.868a9.095 9.095 0 0 1-5.659 3.7l4.4 3.564.68-3.477a.5.5 0 0 1 .31-.37l3.037-1.176-2.768-2.241zm-8.568 3.809a9.08 9.08 0 0 1-6.027-3.404l-2.25 1.823 3.037 1.175a.5.5 0 0 1 .31.37l.68 3.478 4.25-3.442zM12 18.09a8.09 8.09 0 1 0 0-16.182 8.09 8.09 0 0 0 0 16.182zm-3.744-6.658l1.232 1.185 6.244-6.244a.5.5 0 0 1 .707.707l-6.591 6.591a.5.5 0 0 1-.7.007l-1.586-1.526a.5.5 0 1 1 .694-.72z"
                      ></path>
                    </defs>
                    <use xlink:href="#agoda-price-guarante_24px-a"></use>
                  </svg>

                  <div class="Feature-text">
                    <div style="font-weight:600">Uy tín trên cả tuyệt vời</div>
                    <div>90% sẽ giới thiệu cho bạn bè</div>
                  </div>
                </el-col>
                <el-col :span="12" class="Feature-item">
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                    class="sc-fzplgP javoXr"
                  >
                    <defs>
                      <path
                        id="agoda-price-guarante_24px-a"
                        d="M12.407 19.082h-.011l-5.783 4.683a.5.5 0 0 1-.805-.293l-.786-4.022-3.585-1.388a.5.5 0 0 1-.134-.854l2.975-2.409a9.09 9.09 0 1 1 15.703-.441l3.535 2.863a.5.5 0 0 1-.134.855l-3.584 1.387-.787 4.023a.5.5 0 0 1-.805.292l-5.8-4.696zm7.041-3.868a9.095 9.095 0 0 1-5.659 3.7l4.4 3.564.68-3.477a.5.5 0 0 1 .31-.37l3.037-1.176-2.768-2.241zm-8.568 3.809a9.08 9.08 0 0 1-6.027-3.404l-2.25 1.823 3.037 1.175a.5.5 0 0 1 .31.37l.68 3.478 4.25-3.442zM12 18.09a8.09 8.09 0 1 0 0-16.182 8.09 8.09 0 0 0 0 16.182zm-3.744-6.658l1.232 1.185 6.244-6.244a.5.5 0 0 1 .707.707l-6.591 6.591a.5.5 0 0 1-.7.007l-1.586-1.526a.5.5 0 1 1 .694-.72z"
                      ></path>
                    </defs>
                    <use xlink:href="#agoda-price-guarante_24px-a"></use>
                  </svg>

                  <div class="Feature-text">
                    <div style="font-weight:600">
                      <span class="sc-AxgMl bRclY">Sạch sẽ tuyệt vời</span>
                    </div>
                    <div>8,7 điểm cho sự sạch sẽ</div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="Feature_Detail">
                <el-col :span="12" class="Feature-item">
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="sc-fzplgP javoXr"
                  >
                    <path
                      d="M2.5 13.5V13c0-4.687 3.394-8.58 7.858-9.359a2 2 0 1 1 3.285 0C18.105 4.42 21.5 8.313 21.5 13v.5h.538a.5.5 0 1 1 0 1H1.554a.5.5 0 1 1 0-1H2.5zm1 0h17V13a8.5 8.5 0 0 0-17 0v.5zM6 17.007V21.5h13c.745 0 .745-1.555 0-1.555H8a.5.5 0 1 1 0-1h3.546v-.073c0-1.151-1.564-1.827-3.594-1.865H6zm-.13-1h2.09c2.536.047 4.586.933 4.586 2.865v.073H19c2.078 0 2.078 3.555 0 3.555H6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 .87.507zM2 16.5v6h3v-6H2zm10-13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3.308 6.62a.5.5 0 1 1 0 1h-.292v.547a.5.5 0 0 1-1 0v-.546h-1.627a.5.5 0 0 1-.431-.753l2.127-3.621c.258-.44.93-.257.93.253v3.12h.293zm-1.292-1.282l-.754 1.283h.754V8.838zm-2.897 2.329a.5.5 0 1 1 0 1H8.533a.5.5 0 0 1-.5-.523c.026-.548.166-.985.442-1.299a5.18 5.18 0 0 1 .83-.742c.102-.075.741-.523.884-.637.19-.152.292-.268.326-.355.294-.755-.28-1.282-.888-1.072-.377.13-.579.423-.63.974a.5.5 0 1 1-.995-.091c.084-.92.525-1.561 1.3-1.829 1.38-.476 2.763.797 2.144 2.382-.111.285-.317.52-.632.772-.173.138-.835.6-.913.66-.284.21-.498.397-.675.598a.577.577 0 0 0-.096.162h1.99z"
                    ></path>
                  </svg>

                  <div class="Feature-text">
                    <div style="font-weight:600">Dịch vụ xuất sắc</div>
                    <div>8,7 điểm cho dịch vụ</div>
                  </div>
                </el-col>
                <el-col :span="12" class="Feature-item">
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                    class="sc-fzplgP javoXr"
                  >
                    <defs>
                      <path
                        id="recommendations_24px-a"
                        d="M22.127 20.397a1.5 1.5 0 0 1-1.5 1.5H3.593a1.5 1.5 0 0 1-1.5-1.5V8.907c0-.5.25-.968.666-1.246l8.467-6.333a1.5 1.5 0 0 1 1.662-.004l8.567 6.336a1.5 1.5 0 0 1 .672 1.25v11.487zm-1 0V8.911a.5.5 0 0 0-.224-.417l-8.567-6.336a.5.5 0 0 0-.554.001L3.315 8.492a.5.5 0 0 0-.222.416v11.49a.5.5 0 0 0 .5.5h17.034a.5.5 0 0 0 .5-.5zm-13.78-5.566l1.584 1.525 7.71-7.71a.5.5 0 0 1 .706.708L9.291 17.41a.5.5 0 0 1-.7.007l-1.938-1.865a.5.5 0 1 1 .694-.72z"
                      ></path>
                    </defs>
                    <use xlink:href="#recommendations_24px-a"></use>
                  </svg>

                  <div class="Feature-text">
                    <div style="font-weight:600">Tiện nghi tuyệt vời tại đây</div>
                    <div>8,5 điểm cho tiện nghi tại đây</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="FavFeature_List">
              <div class="FavFeature-item">
                <i class="el-icon-star-off"></i>
                Wi-Fi miễn phí cho tất cả các phòng
              </div>
              <div class="FavFeature-item">
                <i class="el-icon-cold-drink"></i>
                Quán bar
              </div>
              <div class="FavFeature-item">
                <i class="el-icon-no-smoking"></i>
                Không hút thuốc
              </div>
              <div class="FavFeature-item">
                <i class="el-icon-brush"></i>
                Dọn phòng hằng ngày
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  props: ['hotel'],
  computed: {
    round() {
      return Math.round(this.hotel.rating * 100) / 100;
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .Feature_Detail {
    font-size: 14px;
  }
  .Info-image .Main-image {
    height: 190px !important;
  }
  .Main-image img {
    height: 190px !important;
  }
  .Main-image .el-image {
    height: 190px !important;
  }
  .Info-image .Sub-image {
    height: 190px !important;
  }
  .Info-image .Sub-image1 {
    height: 117px !important;
  }
  .Info-image .Sub-image1 .el-image {
    height: 117px !important;
  }
  .Info-image .Sub-image1 img {
    height: 117px !important;
  }
  .Info-image .Sub-image2 {
    height: 70px !important;
  }
  .Info-image .Sub-image2 .el-image {
    height: 70px !important;
  }
  .Sub-image2 .thumbnail img {
    height: 70px !important;
  }
}
.LocationBadge {
  padding: 15px 0;
}
.park {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
}
.MapCompact {
  position: relative;
}
.static-map-pin {
  width: 30px;
  height: 50px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -90%);
}
.MapCompact a {
  text-decoration: none;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, 30%);
}
.Info_Location {
  margin: 15px 0;
  padding: 10px;
  border: 1px solid rgb(221, 223, 226);
  border-radius: 5px;
}
.Info1 {
  padding: 0 10px;
  width: 100%;
}
.Info2 {
  padding: 0 10px;
}
.ReviewScore {
  background-color: #5392f9;
  color: white;
  padding: 10px;
  font-size: 28px;
  border-radius: 5px;
  margin-right: 10px;
}
.ReviewPlate {
  font-size: 18px;
  display: flex;
  margin: 15px 0;
  padding: 10px;
  border: 1px solid rgb(221, 223, 226);
  border-radius: 5px;
}
.FavFeature-item i {
  padding: 10px 0;
}
.el-icon-star-off:before {
  font-size: 30px;
  color: #85c150;
}
.el-icon-cold-drink:before {
  font-size: 30px;
  color: #85c150;
}
.el-icon-no-smoking:before {
  font-size: 30px;
  color: #85c150;
}
.el-icon-brush:before {
  font-size: 30px;
  color: #85c150;
}
.FavFeature-item {
  display: grid;
  text-align: center;
  font-size: 12px;
}
.FavFeature_List {
  justify-content: space-around;
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  border: 1px solid rgb(221, 223, 226);
  border-radius: 5px;
}
.Feature-text {
  padding: 0 10px;
}
.Feature-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
}
.javoXr {
  font-size: 24px;
}
.javoXr * {
  fill: rgb(83, 146, 249);
}
.Feature {
  margin: 15px 0;
  padding: 10px;
  border: 1px solid rgb(221, 223, 226);
  border-radius: 5px;
}
.WellnessBadge_Text {
  padding: 0 10px;
}
.Header_Location {
  padding: 10px 0;
}
.WellnessBadge__Wrapper {
  display: flex;
  align-items: center;
}
.WellnessBadge {
  display: flex;
  align-items: center;
  border: 1px solid rgb(221, 223, 226);
  border-radius: 4px;
  margin: 10px 10px 10px 0;
}

.Info-image {
  padding: 10px 0;
  width: 100%;
  display: flex;
}
.Info-image .Main-image {
  padding-right: 5px;
  width: 60%;
  height: 360px;
}
.Info-image .Sub-image {
  width: 40%;
  height: 360px;
}

.Info-image .Sub-image1 {
  width: 100%;
  height: 225px;
}

.Info-image .Sub-image2 {
  width: 100%;
  height: 132px;
  display: flex;
  padding-top: 3px;
}

.Sub-image1 img {
  width: 100%;
  height: 225px;
  object-fit: cover;
}
.Info-image img {
  object-fit: cover;
}
.Sub-image .thumbnail {
  width: 50%;
}
.Sub-image2 .thumbnail img {
  width: 100%;
  height: 132px;
  object-fit: cover;
}

.Main-image img {
  width: 100%;
  height: 360px;
  object-fit: cover;
}

.InfoDetail {
  padding: 10px;
  border: 1px solid rgb(221, 223, 226);
  border-radius: 5px;
}

.HeaderCerebrum_Name {
  padding: 10px 10px 10px 0;
  font-weight: 600;
  font-size: 26px;
}
</style>
<style>
.BadgeHolder .el-button {
  padding: 5px 10px;
}
.Info-image .el-image img {
  object-fit: cover;
}
</style>
