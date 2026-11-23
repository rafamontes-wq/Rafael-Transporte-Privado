import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfEcwB3DXGS7e7mie9RBAEvV_qNQRfZf4",
  authDomain: "rafael-transporte-privado.firebaseapp.com",
  databaseURL: "https://rafael-transporte-privado-default-rtdb.firebaseio.com",
  projectId: "rafael-transporte-privado",
  storageBucket: "rafael-transporte-privado.firebasestorage.app",
  messagingSenderId: "785006646085",
  appId: "1:785006646085:web:7eab2605b4a09fdb65a42c"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export { app };
