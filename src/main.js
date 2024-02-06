import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvqC2_fUMauwP-uFoG36E_Z4khcrIxe_g",
  authDomain: "ramen-syndrome.firebaseapp.com",
  projectId: "ramen-syndrome",
  storageBucket: "ramen-syndrome.appspot.com",
  messagingSenderId: "1053641996305",
  appId: "1:1053641996305:web:9c26c88ace64697ce899b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
