<template>
  <div class="dashboard">
    <!-- Profile of The Owner -->
    <el-row :gutter="24" class="profile hidden-md-and-down">
      <el-col :span="16">
        <div class="flexcontainer">
          <span style="font-size: 20px;"><b>Xin chào {{curOwner.username}}, rất vui khi thấy bạn trở lại!</b></span>
        </div>
        <div class="flexcontainer">
          <span style="font-size: 15px;"><b>Hãy cùng kiếm thêm nhiều khách hàng hôm nay nào.</b></span>
        </div>
      </el-col>
      
      <el-col :span="6">
        <div class="profile-owner">
          <b>
            <span class="profile-title-content">Hồ sơ chủ nhà</span>
          </b>

          <el-card class="box-card owner-card">
            <div slot="header" class="owner-card-header">
              <div class="profile-owner-content">
                <div>
                  <el-avatar :src="curOwner.avatar" style="line-height: 1.75; width: 45px; height: 45px; font-size: 25px;"></el-avatar>
                </div>
                <span style="font-weight: 700; font-size: 20px;">{{curOwner.username}}</span>
                <el-button
                  class="edit-btn"
                  @click="editProfile"
                >Sửa</el-button>
              </div>
            </div>
            <div class="owner-card-body" style="padding: 20px; text-align:center">
              <el-row :gutter="20">
                <el-col :span="12">
                  <span><i class="el-icon-chat-dot-round"></i>Tỷ lệ phản hồi</span>
                  <div><b>-</b></div>
                </el-col>
                <el-col :span="12" style="border-left: 1px solid #dddfe2;">
                  <span><i class="el-icon-time"></i>Thời gian trả lời tr.bình</span>
                  <div><b>-</b></div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>

        <div class="feedback">
          <b>
            <span class="profile-title-content">Đánh giá/Góp ý</span>
          </b>
           <el-card class="box-card owner-card">
            <div class="owner-card-body">
              <img src="//img.agoda.net/images/agoda-homes/overview-dashboard/announcment.png" srcset="//img.agoda.net/images/agoda-homes/overview-dashboard/announcment.png 1x, 
                                            //img.agoda.net/images/agoda-homes/overview-dashboard/announcment@2x.png 2x, 
                                            //img.agoda.net/images/agoda-homes/overview-dashboard/announcment@3x.png 3x">
              <h4>Hãy cùng Agoda cải thiện công cụ bạn đang dùng</h4>
            </div>
            <div class="text-right">
              <a data-element-name="agoda-homes-give-us-feedback-link" class="text-primary" href="https://www.surveygizmo.com/s3/5024085/aghomes-fdbck-v1?PID=10312&amp;HID=0&amp;mID=388c1851-134d-4776-9de2-4e3b114ffe53&amp;TPT=web-overview" target="_blank"><strong>Ý kiến đánh giá</strong></a>
            </div>
          </el-card>
        </div>
      </el-col>
      
    </el-row>

    <!-- Profile for small screens -->
    <el-row :gutter="24" class="profile hidden-lg-and-up">
        <div class="flexcontainer">
          <span style="font-size: 20px;"><b>Xin chào {{curOwner.username}}, rất vui khi thấy bạn trở lại!</b></span>
        </div>
        <div class="flexcontainer">
          <span style="font-size: 15px;"><b>Hãy cùng kiếm thêm nhiều khách hàng hôm nay nào.</b></span>
        </div>
      
        <div class="profile-owner">
          <b>
            <span class="profile-title-content">Hồ sơ chủ nhà</span>
          </b>

          <el-card class="box-card owner-card">
            <div slot="header" class="owner-card-header">
              <div class="profile-owner-content">
                <div>
                  <el-avatar :src="curOwner.avatar" style="line-height: 1.85; width: 60px; height: 60px; font-size: 30px;"></el-avatar>
                </div>
                <span style="font-weight: 700; font-size: 20px;">{{curOwner.username}}</span>
                <el-button
                  class="edit-btn"
                  @click="editProfile"
                >Sửa</el-button>
              </div>
            </div>
            <div class="owner-card-body" style="padding: 20px; text-align:center">
                <el-col :span="12">
                  <span><i class="el-icon-chat-dot-round"></i>Tỷ lệ phản hồi</span>
                  <div><b>-</b></div>
                </el-col>
                <el-col :span="12" style="border-left: 1px solid #dddfe2;">
                  <span><i class="el-icon-time"></i>Thời gian trả lời tr.bình</span>
                  <div><b>-</b></div>
                </el-col>
            </div>
          </el-card>
        </div>

        <div class="feedback">
          <b>
            <span class="profile-title-content">Đánh giá/Góp ý</span>
          </b>
           <el-card class="box-card owner-card">
            <div class="owner-card-body">
              <img src="//img.agoda.net/images/agoda-homes/overview-dashboard/announcment.png" srcset="//img.agoda.net/images/agoda-homes/overview-dashboard/announcment.png 1x, 
                                            //img.agoda.net/images/agoda-homes/overview-dashboard/announcment@2x.png 2x, 
                                            //img.agoda.net/images/agoda-homes/overview-dashboard/announcment@3x.png 3x">
              <h4>Hãy cùng Agoda cải thiện công cụ bạn đang dùng</h4>
            </div>
            <div class="text-right">
              <a data-element-name="agoda-homes-give-us-feedback-link" class="text-primary" href="https://www.surveygizmo.com/s3/5024085/aghomes-fdbck-v1?PID=10312&amp;HID=0&amp;mID=388c1851-134d-4776-9de2-4e3b114ffe53&amp;TPT=web-overview" target="_blank"><strong>Ý kiến đánh giá</strong></a>
            </div>
          </el-card>
        </div>
    </el-row>
    <!-- ------------------------ -->
  </div>
</template>
<script>
export default {
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    // idOwner(){
    //   return this.$store.state.curOwner.id;
    // },
  },
  methods: {
    editProfile() {
      this.$router.push(`/dashboard/${this.curOwner.id}/profile`)
    },
  }
}
</script>

<style scoped>
.router-link-active {
  background-color: indianred;
  cursor: pointer;
}
.edit-btn {
  color:#1174a6; 
  background-color: white; 
  border: 1px solid #1174a6; 
  min-height: 42px;
}
.profile {
  padding: 0 10%;
  margin-top: 20px;
}
.user-info {
  display: flex;
}
.profile-owner {
  padding-top: 30px;
}
.profile-owner-content {
  display: flex; 
  justify-content: space-between;
  align-items: center;
}
.profile-title-content {
  font-size: 20px; 
  padding-left: 8px;
  border-left: 4px solid #1174a6;
}
.owner-card-header {
  padding: 0 !important;
}
.owner-card-body {
  padding: 0 !important;
  display: flex;
  align-items: center;
}
.owner-card {
  border: 1px solid #ddd; 
  margin-top: 10px;
}
.feedback {
  padding-top: 30px;
}
.text-right {
  text-align: right;
}
.text-primary {
  color: #1174a6;
  text-decoration: none;
}
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.dashboard {
  height: 80vh;
}
/* Responsive */
@media (max-width: 768px){
  .dashboard {
    padding: 0px;
  }
  
}
@media (max-width: 992px) {
  .flexcontainer{
    text-align: center;
  }
}
@media (max-width: 1440px) {
  .edit-btn { 
    min-height: 30px;
  }
}
</style>