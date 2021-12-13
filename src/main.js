import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import HighchartsVue from 'highcharts-vue';
import pieChart from '@/components/pieChart.vue'
import lineChart from '@/components/lineChart.vue'
import axios from 'axios'
import VueAxios from 'vue-axios';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(HighchartsVue);
Vue.use(VueAxios, axios);
Vue.component('pieChart',pieChart);
Vue.component('lineChart',lineChart);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
