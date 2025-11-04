import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Bienvenido a Mensajes Anónimos</h1>
        <p>Envía y recibe mensajes anónimos de forma segura y divertida.</p>
        <Link to="/login" className="start-button">
          Empieza ahora
        </Link>
      </header>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>¿Cómo funciona?</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Crea tu perfil</h3>
            <p>Regístrate y obtén un enlace único para compartir.</p>
          </div>
          <div className="step">
            <h3>2. Comparte tu enlace</h3>
            <p>Publica tu enlace en redes sociales para que tus amigos te envíen mensajes.</p>
          </div>
          <div className="step">
            <h3>3. Lee tus mensajes</h3>
            <p>Recibe y responde los mensajes anónimos desde tu panel personal.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Características Principales</h2>
        <div className="features">
          <div className="feature">
            <h3>Totalmente Anónimo</h3>
            <p>La identidad de los remitentes se mantiene en secreto.</p>
          </div>
          <div className="feature">
            <h3>Seguro y Privado</h3>
            <p>Protegemos tus mensajes y tu información personal.</p>
          </div>
          <div className="feature">
            <h3>Fácil de Usar</h3>
            <p>Una interfaz intuitiva para una experiencia sin complicaciones.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Mensajes Anónimos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
