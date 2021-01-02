<template>
  <div>
    <dash-board-header />
    <router-view />
    <dashboard-footer />
  </div>
</template>
<script>
import DashBoardHeader from "../Dashboard/DashBoardHeader";
import DashboardFooter from "../Dashboard/DashboardFooter";
export default {
  components: {
    DashBoardHeader,
    DashboardFooter
  }
};
</script>