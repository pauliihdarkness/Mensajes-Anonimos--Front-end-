import "./AnonymousMessage.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Config/FirebaseConfig";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import IpLocationCity from "../../Hooks/IpLocationCity";
import Loading from "../Loading/Loading";


const AnonymousMessage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { ciudad } = IpLocationCity();

    const placeholderImg = `https://placehold.co/100x100?text=${user ? user.name.charAt(0).toUpperCase() : "U"}`;

    // 🔹 Obtener usuario desde Firestore
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUser({ id: userSnap.id, ...userSnap.data() });
                } else {
                    setError("Usuario no encontrado");
                }
            } catch (err) {
                console.error("Error al obtener usuario:", err);
                setError("Error al cargar usuario");
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchUser();
    }, [userId]);

    // 🔹 Enviar mensaje anónimo
    const handleSendMessage = async () => {
        if (!message.trim()) {
            alert("Por favor, escribe un mensaje antes de enviarlo.");
            return;
        }

        if (!user) {
            alert("Error: no se encontró el usuario.");
            return;
        }

        try {
            const messagesRef = collection(db, "messages", userId, "userMessages");

            await addDoc(messagesRef, {
                message,
                createdAt: new Date(),
                city: ciudad || "Desconocida",
            });

            alert("✅ Mensaje enviado con éxito!");
            setMessage("");
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
            alert("❌ Error al enviar el mensaje. Intenta de nuevo.");
        }

    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <>
            <section className="msg-container">
                {user && (
                    <div className="header-msg-anonimo">
                        <img
                            className="header-msg-user-img"
                            src={user.img || placeholderImg}
                            alt={`${user.name} avatar`}
                        />
                        <div className="header-msg-box">
                            <span className="header-msg-user-name">@{userId}</span>
                            <h2 className="header-msg-title">¡Mándame mensajes anónimos!</h2>
                        </div>
                    </div>
                )}

                <textarea
                    className="msg-anonimo"
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Escribe tu mensaje anónimo aquí..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                >
                </textarea>

                <button className="btn-send-msg" onClick={handleSendMessage}>
                    ¡Enviar!
                </button>
            </section>
        </>
    );
};


export default AnonymousMessage
