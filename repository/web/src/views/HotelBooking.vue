<template>
  <div>
    <order-header />
    <order-booking />
    <Footer />
  </div>
</template>
<script>
import OrderHeader from '../components/Order/OrderHeader'
import OrderBooking from '../components/Order/OrderBooking'
import Footer from '../components/Footer'
export default {
  components: {
    OrderHeader,
    OrderBooking,
    Footer
  }
}
</script>