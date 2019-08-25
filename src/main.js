import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueNoty from "vuejs-noty";
import "vuejs-noty/dist/vuejs-noty.css";
import VueDisqus from "vue-disqus";
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(VueNoty);
Vue.use(VueDisqus);
Vue.use(wysiwyg, {
  hideModules: {
    headings: true,
    link: true,
    code: true,
    image: true,
    table: true,
    removeFormat: true,
    separator: true
  }
});

Vue.config.productionTip = false;

const authData = localStorage.getItem("auth");

new Vue({
  router,
  // global data in $root which is accessible throughout the whole app
  data: {
    auth: authData ? JSON.parse(authData) : {}
  },

  render: h => h(App)
}).$mount("#app");
