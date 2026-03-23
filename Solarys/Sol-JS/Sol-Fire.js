// 🔥 IMPORTS FIREBASE (CDN - CORRETO PRA HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔑 CONFIG REAL (SEU PROJETO)
const firebaseConfig = {
  apiKey: "AIzaSyCFHA7rpUw_DL_qf7zR3U9E2PUC52KIL6M",
  authDomain: "roleplayplus-58437.firebaseapp.com",
  databaseURL: "https://roleplayplus-58437-default-rtdb.firebaseio.com",
  projectId: "roleplayplus-58437",
  storageBucket: "roleplayplus-58437.firebasestorage.app",
  messagingSenderId: "105930144178",
  appId: "1:105930144178:web:09f0a227149bb7e7510cab"
};

// 🚀 INIT
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🌍 ROOM ATUAL
const ROOM = "solarys";

// 📤 EXPORT
export { db, ref, set, get, onValue, update, ROOM };