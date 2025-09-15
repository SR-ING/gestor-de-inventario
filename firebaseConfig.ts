// Importa las funciones que necesitas de los SDKs que necesitas
// FIX: Use Firebase v9 compat imports to support the v8 namespaced API (e.g., firebase.initializeApp, firebase.firestore) used throughout the app.
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Reemplaza lo siguiente con la configuración de tu propio proyecto de Firebase
// que obtuviste en el Paso 1.
const firebaseConfig = {
  apiKey: "AIzaSyAGgtHnpvjjCykFwuvoOz6s0qnT6N4aKiU",
  authDomain: "gestor-inventario-ia.firebaseapp.com",
  projectId: "gestor-inventario-ia",
  storageBucket: "gestor-inventario-ia.firebasestorage.app",
  messagingSenderId: "627613583623",
  appId: "1:627613583623:web:5619bc19e1f6e47cc79da2",
  measurementId: "G-Y64BC1JSEH"
};
// Inicializa Firebase
// FIX: Use v8 syntax for initialization and prevent re-initialization errors on hot-reloads.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exporta la instancia de la base de datos de Firestore para usarla en otras partes de la app
// FIX: Use v8 syntax to get Firestore instance.
export const db = firebase.firestore();
