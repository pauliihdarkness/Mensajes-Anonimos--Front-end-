import { useState, useEffect } from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import html2canvas from "html2canvas";
import StoryContent  from "../Components/StoryContent/StoryContent";


const PerfilUsuarioPage = () => {

  const userId = "pauliihdarkness"; // Reemplazar con el ID del usuario autenticado

  const [mensajes, setMensajes] = useState([]);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);


  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        // Referencia a la subcolección 'userMessages' del usuario 'pauliihdarkness'
        const mensajesRef = collection(db, "messages", userId, "userMessages");
        const querySnapshot = await getDocs(mensajesRef);
        const mensajesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMensajes(mensajesData);
      } catch (error) {
        console.error("Error obteniendo mensajes:", error);
      }
    };

    fetchMensajes();
  }, []);

  // Función para generar la imagen
  const generarImagenStory = () => {
    const element = document.getElementById("story-content");
    if (!element) return;

    html2canvas(element, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.download = "mensaje_story.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <main>
      <h1>Página de Perfil de Usuario</h1>

      <section>
        <h2>Mis Mensajes</h2>
        {mensajes.length === 0 ? (
          <p>No tienes mensajes aún.</p>
        ) : (
          <ul>
            {mensajes.map(msg => (
              <li key={msg.id}>
                {msg.message}  {/* Usamos siempre el mismo campo */}
                <button onClick={() => setMensajeSeleccionado(msg)}>Compartir en Story</button>
              </li>
            ))}
          </ul>
        )}
      </section>
      {mensajeSeleccionado && (
        <StoryContent message={mensajeSeleccionado}></StoryContent>
      )}
    </main>
  );
};

export default PerfilUsuarioPage;

