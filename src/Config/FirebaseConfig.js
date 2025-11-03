// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

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

// 🧠 Crear un nuevo usuario anónimo
const crearUsuarioAnonimo = async () => {
    try {
        const result = await signInAnonymously(auth);
        console.log("✅ Usuario anónimo creado:", result.user.uid);
        return result.user;
    } catch (error) {
        console.error("❌ Error al crear usuario anónimo:", error);
        throw error;
    }
};


// 🔑 Iniciar sesión con usuario anónimo existente
const iniciarSesionAnonima = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            console.log("🔐 Sesión anónima activa:", user.uid);
            return user;
        } else {
            console.log("⚙️ No hay sesión activa, creando nuevo usuario...");
            const nuevoUser = await signInAnonymously(auth);
            console.log("✅ Usuario anónimo autenticado:", nuevoUser.user.uid);
            return nuevoUser.user;
        }
    } catch (error) {
        console.error("❌ Error al iniciar sesión anónima:", error);
        throw error;
    }
};


// 🚪 Cerrar sesión (opcional)
const cerrarSesion = async () => {
    try {
        await signOut(auth);
        console.log("👋 Sesión cerrada correctamente.");
    } catch (error) {
        console.error("❌ Error al cerrar sesión:", error);
    }
};

// 👂 Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("🔑 Usuario conectado");
    } else {
        console.log("👤 No hay usuario activo.");
    }
});
const crearUsuarioConEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ Usuario creado:", userCredential.user.uid);
        return userCredential.user;
    } catch (error) {
        console.error("❌ Error al crear usuario con email:", error);
        throw error;
    }
};

// 🔹 Iniciar sesión con email y contraseña
const iniciarSesionConEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("❌ Error al iniciar sesión con email:", error);
        throw error;
    }
};



// 🔹 Escuchar cambios en la sesión
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("🔑 Usuario conectado");
    } else {
        console.log("👤 No hay usuario activo.");
    }
});

// 🧩 Exportar todo para usar en tus hooks o componentes
export {
    db,
    auth,
    crearUsuarioAnonimo,
    iniciarSesionAnonima,
    cerrarSesion,
    crearUsuarioConEmail,
    iniciarSesionConEmail
};



