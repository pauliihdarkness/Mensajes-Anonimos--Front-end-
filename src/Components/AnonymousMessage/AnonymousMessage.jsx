import "../../Styles/AnonymousMessage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, iniciarSesionConEmail } from "../../Config/FirebaseConfig";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import IpLocationCity from "../../Hooks/IpLocationCity";
import Loading from "../Loading/Loading";
import SuccessAnimation from "../SuccessAnimation/SuccessAnimation"; // Importar la animación

const AnonymousMessage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingLogin, setLoadingLogin] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const { ciudad } = IpLocationCity();

    const email = import.meta.env.VITE_EMAIL_AUTOMATICO;
    const password = import.meta.env.VITE_PASSWORD_AUTOMATICO;

    useEffect(() => {
        const loginAutomatico = async () => {
            try {
                await iniciarSesionConEmail(email, password);
            } catch (error) {
                console.error("Error al iniciar sesión automáticamente:", error);
                setErrorMsg(error.message);
            } finally {
                setLoadingLogin(false);
            }
        };
        loginAutomatico();
    }, []);

    useEffect(() => {
        if (!userId || loadingLogin) return;

        const fetchUser = async () => {
            setLoadingUser(true);
            try {
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUser({ id: userSnap.id, ...userSnap.data() });
                } else {
                    setErrorMsg("Usuario no encontrado");
                }
            } catch (err) {
                console.error("Error al obtener usuario:", err);
                setErrorMsg("Error al cargar usuario");
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, [userId, loadingLogin]);

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

            setMessage("");
            setShowSuccessAnimation(true);
            setTimeout(() => setShowSuccessAnimation(false), 3000); // Ocultar después de 3s

        } catch (err) {
            console.error("Error al enviar mensaje:", err);
            alert("❌ Error al enviar el mensaje. Intenta de nuevo.");
        }
    };

    const placeholderImg = `https://placehold.co/100x100?text=${user ? user.name.charAt(0).toUpperCase() : "U"}`;
    const charLimit = 256;

    if (loadingLogin || loadingUser) return <Loading />;
    if (errorMsg) return <p className="error-msg">{errorMsg}</p>;

    return (
        <section className="msg-container">
            {showSuccessAnimation && <SuccessAnimation />}
            
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

            <div className="textarea-wrapper">
                <textarea
                    className="msg-anonimo"
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Escribe tu mensaje anónimo aquí..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={charLimit}
                ></textarea>
                <div className="char-counter">{message.length}/{charLimit}</div>
            </div>

            <button className="btn-send-msg" onClick={handleSendMessage}>
                ¡Enviar!
            </button>
        </section>
    );
};

export default AnonymousMessage;
