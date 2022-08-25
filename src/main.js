import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import vueBreadcrumbs from 'vue-breadcrumbs'
import VeeValidate from 'vee-validate';
import moment from 'moment'
import VueFire from 'VueFire'



Vue.use(VeeValidate);

window.moment = moment;
window.Vue = Vue;
Vue.use(Vuetify);
Vue.use(vueBreadcrumbs);
Vue.use(VueFire);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
