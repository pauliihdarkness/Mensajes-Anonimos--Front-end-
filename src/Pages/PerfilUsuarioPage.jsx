import { useState, useEffect } from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import StoryContent from "../Components/StoryContent/StoryContent";
import '../Styles/PerfilUsuarioPage.css'; // Importar el archivo CSS

const PerfilUsuarioPage = () => {
    const userId = "pauliihdarkness"; // Reemplazar con el ID del usuario autenticado

    const [mensajes, setMensajes] = useState([]);
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);

    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const mensajesRef = collection(db, "messages", userId, "userMessages");
                const querySnapshot = await getDocs(mensajesRef);
                const mensajesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMensajes(mensajesData);
            } catch (error) {
                console.error("Error obteniendo mensajes:", error);
            }
        };

        fetchMensajes();
    }, [userId]);

    const handleCloseStory = () => {
        setMensajeSeleccionado(null);
    };

    return (
        <main className="profile-container">
            <header className="profile-header">
                <h1>Perfil de Usuario</h1>
                <p>Bienvenido, {userId}. Aquí puedes ver tus mensajes anónimos.</p>
            </header>

            <section className="messages-section">
                <h2>Mis Mensajes</h2>
                {mensajes.length === 0 ? (
                    <p className="no-messages">No tienes mensajes aún.</p>
                ) : (
                    <ul className="messages-list">
                        {mensajes.map(msg => (
                            <li key={msg.id} className="message-item">
                                <p>{msg.message}</p>
                                <button onClick={() => setMensajeSeleccionado(msg)}>Compartir en Story</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {mensajeSeleccionado && (
                <StoryContent message={mensajeSeleccionado.message} onClose={handleCloseStory} />
            )}
        </main>
    );
};

export default PerfilUsuarioPage;
