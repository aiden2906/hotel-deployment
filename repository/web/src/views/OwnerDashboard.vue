<template>
  <div>
    <dash-board-header/>
    <router-view></router-view>
    <dashboard-footer/>
  </div>
</template>

<script>
import DashBoardHeader from '../components/Dashboard/DashBoardHeader'
import DashboardFooter from '../components/Dashboard/DashboardFooter'
export default {
  data() {
    return {
        url: "//img.agoda.net/images/agoda-homes/overview-dashboard/announcment.png"
    };
  },
  components: {
    DashBoardHeader,
    DashboardFooter
  },
};
</script>

<style scoped>
.flexcontainer {
  padding: 0 10%;
}
.flex-left {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  padding-bottom: 20px;
  font-size: 10px;
  font-weight: 700;
  border-top: 1px solid #dddfe2;
  background: #fff;
}

.flex-right {
  display: flex;
  flex-direction: column;
  margin-left: 60%;
  margin-right: 20%;
  justify-content: flex-end;
}
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
</style>