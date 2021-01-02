import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuelidate from 'vuelidate'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en'

import Filters from './utils/filters';

Vue.use(Vuelidate);
Vue.use(ElementUI,{ locale });
Vue.config.productionTip = false

Vue.mixin({
  filters: Filters
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
