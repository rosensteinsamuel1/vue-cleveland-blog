import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);

import { store } from './store/store'
import { USER_CHECK_LOGGED_IN } from './store/action-types'
import routes from './routes'
import vuetify from './plugins/vuetify';
// Support icons for Vuetify
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

// Set up VueRouter
Vue.use(VueRouter)
const router = new VueRouter({ routes: routes, mode: 'history' })

new Vue({
  store: store,
  el: '#app',

  created() {
    this.$store.dispatch(USER_CHECK_LOGGED_IN);
  },

  render: h => h(App),
  vuetify,
  router: router
}).$mount('#app')
