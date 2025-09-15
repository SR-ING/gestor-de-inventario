
// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Exporta la instancia de la base de datos de Firestore para usarla en otras partes de la app
export const db = getFirestore(app);
