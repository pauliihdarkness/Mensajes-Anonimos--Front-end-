import html2canvas from "html2canvas";
import { useRef } from "react";
import '../../Styles/StoryContent.css';

const StoryContent = ({ message, onClose }) => {
    const storyContentRef = useRef(null);

    const compartirImagenStory = async () => {
        const element = storyContentRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        canvas.toBlob(async (blob) => {
            if (!blob) return;

            const file = new File([blob], "mensaje_story.png", { type: "image/png" });

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
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
            }
        });
    };

    return (
        <div className="story-modal-overlay" onClick={onClose}>
            <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="story-body" ref={storyContentRef}>
                    <p className="story-message">{message}</p>
                </div>
                <button className="share-button" onClick={compartirImagenStory}>
                    Compartir como Historia
                </button>
            </div>
        </div>
    );
};

export default StoryContent;
