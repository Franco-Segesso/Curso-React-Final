import React from 'react'
import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <>
      {/* Hero Section Principal */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Domina la Estrategia</h1>
          <p className="lead mb-4" style={{ color: '#edf2f4', maxWidth: '700px', margin: '0 auto' }}>
            Descubre la colección más exclusiva de juegos de mesa. 
            Desde clásicos milenarios como el Senet hasta las últimas novedades de estrategia.
          </p>
          <div className="d-flex gap-3 justify-content-center mt-4">
            <Link to="/productos">
              <button className="btn btn-danger btn-lg rounded-pill px-5 shadow">Ver Catálogo</button>
            </Link>
            <Link to="/servicios">
              <button className="btn btn-outline-light btn-lg rounded-pill px-5">Saber más</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de Contenido */}
      <div className="container mb-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img 
              src="https://images.unsplash.com/photo-1632501641765-e568d28b0015?q=80&w=1000&auto=format&fit=crop" 
              alt="Juego de mesa" 
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-md-6 ps-md-5">
            <h2 className="fw-bold text-dark mt-3 mt-md-0">El Arte del Juego</h2>
            <p className="text-muted">
              Más allá del entretenimiento, los juegos de mesa son una puerta a la historia y al desarrollo mental.
              El <strong>Senet</strong>, por ejemplo, no era solo un juego para los egipcios, sino un ritual vinculado a la vida eterna.
            </p>
            <p className="text-muted">
              Hoy en día, jugar fomenta la empatía, el pensamiento estratégico y la desconexión digital necesaria.
            </p>
            <a href="https://www.man.es/man/en/educacion/recursos/juegos.html" target="_blank" rel="noreferrer" className="text-danger fw-bold text-decoration-none">
              Leer historia completa →
            </a>
          </div>
        </div>

        {/* Galería pequeña */}
        <div className="row g-4 text-center">
            <div className="col-4">
                <img src="https://www.glueckshaendler.de/wp-content/uploads/2020/09/Senet-Brettspiel-aus-Holz-mit-Spielsteinen.jpg" className="img-fluid rounded shadow-sm hover-zoom" alt="Senet" />
            </div>
            <div className="col-4">
                 <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1jKo9c_Vh2Rsg0jUj4idDOhBge3smcm8qrjmJklxoNe9vPpFSKJWhfi00lMaGrpn3oyAABwhhVwrxxnDk0Vsvno-HiGhOuUXN0mC_42I8CLswGKJzUHgl-UqtkDdEf5SsbmsAHg9CxZ0/s320/492ca122590140b5b1366be3336cd2d3.jpg" className="img-fluid rounded shadow-sm" alt="Historia" />
            </div>
            <div className="col-4">
                <div className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column justify-content-center">
                    <h5>Descarga la App</h5>
                    <p className="small text-muted">Lleva el Senet en tu bolsillo</p>
                    <div className="d-flex justify-content-center gap-2">
                        <a href="#" className="btn btn-sm btn-dark">Android</a>
                        <a href="#" className="btn btn-sm btn-secondary">iOS</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Inicio