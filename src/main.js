import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5c4aEFuWjghCrOUqlTGYmAD79JPKLAt8",
  authDomain: "ramen-syndrome-91acc.firebaseapp.com",
  projectId: "ramen-syndrome-91acc",
  storageBucket: "ramen-syndrome-91acc.appspot.com",
  messagingSenderId: "584795925646",
  appId: "1:584795925646:web:184d5e485e23eaa9ad2ddf",
  measurementId: "G-488F54FZQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
