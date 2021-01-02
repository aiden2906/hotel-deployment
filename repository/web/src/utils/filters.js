export default {
  formatCurrency: function(value) {
    return Number((value).toFixed(2)).toLocaleString('de-DE', {style : 'currency', currency : 'VND'})
  },
  formatRating: function(value) {
    return Number.parseFloat(value).toFixed(2);
  },
  formatDate: function(value) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(Date.parse(value)).toLocaleDateString('vi-VN', options);
  },
  formatTime: function(value) {
    return new Date(Date.parse(value)).toLocaleTimeString('vi-VN');
  }
}