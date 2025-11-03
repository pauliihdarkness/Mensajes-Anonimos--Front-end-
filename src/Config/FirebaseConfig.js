// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

// ⚙️ Configuración desde tus variables de entorno (.env)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🚀 Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);

// 🧠 Función auxiliar para asegurar autenticación anónima
const iniciarAuthAnonimo = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            const result = await signInAnonymously(auth);
            console.log("Usuario anónimo autenticado:", result.user.uid);
        }
    } catch (error) {
        console.error("Error al iniciar sesión anónima:", error);
    }
};

// Escuchar cambios en la sesión
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("🔑 Usuario conectado:", user.uid);
    } else {
        console.log("👤 No hay usuario activo.");
    }
});

// 🧩 Exportar para usar en tus hooks o componentes
export { db, auth, iniciarAuthAnonimo };
