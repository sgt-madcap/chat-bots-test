import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
// eslint-disable-next-line no-unused-vars
import M from "materialize-css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const eventEmitter = new Vue();

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(Loader);

firebase.initializeApp({
  apiKey: "AIzaSyApl1BNXaHjxDwMFFuu2sSzfiFJEjhXpI0",
  authDomain: "newsbotsapp.firebaseapp.com",
  databaseURL: "https://newsbotsapp.firebaseio.com",
  projectId: "newsbotsapp",
  storageBucket: "newsbotsapp.appspot.com",
  messagingSenderId: "126406614811",
  appId: "1:126406614811:web:98b2a6ed517b9b10427dbe",
  measurementId: "G-T39VK9KYJ4"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
