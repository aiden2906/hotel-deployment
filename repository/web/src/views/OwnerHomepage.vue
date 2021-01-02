<template>
  <div class="owner-homepage">
    <owner-header />
    <carousel-info />
    <instruction />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
import OwnerHeader from '../components/Owner/OwnerHeader'
import CarouselInfo from '../components/Owner/CarouselInfo'
import Instruction from '../components/Owner/Instruction'
export default {
  components: {
    Footer,
    OwnerHeader,
    CarouselInfo,
    Instruction
  },
  methods: {}
};
</script>

<style scope>
.el-dialog__header {
  padding: 30px 20px 0px !important;
}
.el-dialog__title {
  padding: 20px 30px;
  font-weight: 700;
  font-size: 20px;
}
/* .el-dialog__body {
  padding: 0px !important;
} */
.el-dialog__footer {
  border-top: 1px solid #e5e5e5;
}

.footer__content {
  color: #2A2A2E;
}

/* Responsive */
@media (max-width: 767px) {
  html {
    width: 768px;
  }
  .signup-dialog {
    width: 98% !important;
    padding: 0 1% !important;
  }
  #signup-button-form {
    max-height: 40px;
  }
  .signin-dialog {
    width: 98% !important;
    padding: 0 1% !important;
  }
  .navbar-brand .el-image__inner {
    width: unset !important;
    padding-left: 20%;
  }
}
@media (min-width: 992px){
  .register-hotel{
    height: 534px;
  }
}
@media (min-width: 1200px) {
  .navbar-brand {
    padding-top: 8px;
  }
}
@media (min-width: 768px) and (max-width: 991px){
  html {
    width: 992px;
  }
  #signin, #signup {
    padding: 4px;
    min-height: 26px!important;
    min-width: 80px;
    font-size: 10px;
  }
  .signup-dialog {
    width: 90% !important;
    padding: 0 5% !important;
  }
  .signin-dialog {
    width: 90% !important;
    padding: 0 5% !important;
  }
  .navbar-brand .el-image__inner {
    width: unset !important;
    padding-left: 20%;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  #signin, #signup {
    padding: 4px;
    min-height: 30px!important;
    min-width: 100px;
    font-size: 10px;
  }
  .signup-dialog {
    width: 90% !important;
    padding: 0 5% !important;
  }
  .signin-dialog {
    width: 80% !important;
    padding: 0 10% !important;
  }
  .navbar-brand .el-image__inner {
    width: unset !important;
    padding-left: 20%;
  }
}
@media (min-width: 1200px) and (max-width: 1319px) {
  #signin, #signup {
    padding: 4px;
    min-height: 32px!important;
    min-width: 120px;
    font-size: 12px;
  }
  .signup-dialog {
    width: 90% !important;
    padding: 0 5% !important;
  }
  .signin-dialog {
    width: 70% !important;
    padding: 0 15% !important;
  }
}
@media (min-width: 1320px) and (max-width: 1480px) {
  .signin-dialog {
    width: 60% !important;
    padding: 0 20% !important;
  }
}
</style>