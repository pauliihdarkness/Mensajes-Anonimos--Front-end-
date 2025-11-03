import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";

/**
 * Custom Hook para CRUD en una colección de Firestore
 * @param {string} collectionName - nombre de la colección en Firestore
 */
const useFirestoreCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 Escuchar en tiempo real la colección
  useEffect(() => {
    const colRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Error al obtener documentos:", err);
        setError(err);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  // 🟩 Crear documento
  const createDocument = async (newData) => {
    try {
      const colRef = collection(db, collectionName);
      const docRef = await addDoc(colRef, newData);
      return docRef.id;
    } catch (err) {
      console.error("Error al crear documento:", err);
      setError(err);
    }
  };

  // 🟨 Editar documento
  const updateDocument = async (id, updatedData) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);
    } catch (err) {
      console.error("Error al actualizar documento:", err);
      setError(err);
    }
  };

  // 🟥 Eliminar documento
  const deleteDocument = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Error al eliminar documento:", err);
      setError(err);
    }
  };

  return {
    data,
    loading,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
  };
};

export default useFirestoreCollection;
