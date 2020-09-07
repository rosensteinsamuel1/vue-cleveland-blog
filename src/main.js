import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);

import { store } from './store/store'
import routes from './routes'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Set up VueRouter
Vue.use(VueRouter)
const router = new VueRouter({ routes: routes, mode: 'history' })

new Vue({
  store: store,
  el: '#app',

  created() {
    this.$store.dispatch("retrieveUser");
  },

  render: h => h(App),
  vuetify,
  router: router
}).$mount('#app')
