import html2canvas from "html2canvas";

const StoryContent = ({ message }) => {
    // Función para generar la imagen y compartir
    const compartirImagenStory = async () => {
        const element = document.getElementById("story-content");
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        canvas.toBlob(async (blob) => {
            if (!blob) return;

            const file = new File([blob], "mensaje_story.png", { type: "image/png" });

            // Usar Web Share API si está disponible (solo móvil)
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: "Mensaje Anónimo",
                        text: "Mirá este mensaje anónimo que recibí",
                    });
                } catch (error) {
                    console.error("Error compartiendo:", error);
                }
            } else {
                // Si no hay soporte, abrir la imagen en otra pestaña
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
            }
        });
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #f72585, #7209b7)",
            }}
        >
            <div
                id="story-content"
                style={{
                    width: "25vw",
                    minWidth: "200px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        backgroundColor: "#7209b7",
                        padding: "10px",
                    }}
                >
                    <h2 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>
                        Mandame mensajes anónimos
                    </h2>
                </div>

                {/* Mensaje */}
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        color: "#000",
                        fontSize: "16px",
                        lineHeight: "1.4",
                    }}
                >
                    {message.message}
                </div>
            </div>

            <button
                onClick={compartirImagenStory}
                style={{
                    position: "absolute",
                    bottom: "40px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    background: "#fff",
                    color: "#7209b7",
                    cursor: "pointer",
                }}
            >
                Compartir Story
            </button>
        </div>
    );
};

export default StoryContent;

