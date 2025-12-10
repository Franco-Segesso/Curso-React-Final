import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Lógica original de validación
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email );
      navigate("/dashboard");
    }
    else if (formulario.nombre && formulario.email && formulario.nombre !== "admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion(formulario.nombre, formulario.email);

      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
    } else {
      alert("Credenciales de administrador incorrectas. Usa: admin / 1234@admin");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card border-0 shadow-lg" style={{ width: "100%", maxWidth: "450px", borderRadius: "20px", overflow: "hidden" }}>
        
        {/* Encabezado del Card */}
        <div className="card-header text-center py-4" style={{ backgroundColor: "#2b2d42", color: "white" }}>
            <h3 className="fw-bold mb-0">Bienvenido</h3>
            <p className="small mb-0 opacity-75">Ingresa a tu cuenta para continuar</p>
        </div>

        <div className="card-body p-5 bg-white">
          <form onSubmit={manejarEnvio}>
            
            {/* Input Nombre */}
            <div className="mb-4">
              <label className="form-label fw-bold text-muted small">NOMBRE DE USUARIO</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                    <FaUser className="text-muted"/>
                </span>
                <input 
                  type="text"
                  className="form-control bg-light border-start-0 ps-0 py-2"
                  placeholder="Ej: Juan Perez"
                  value={formulario.nombre}
                  onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="mb-4">
              <label className="form-label fw-bold text-muted small">CORREO ELECTRÓNICO</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                    <FaEnvelope className="text-muted"/>
                </span>
                <input
                  type="email"
                  className="form-control bg-light border-start-0 ps-0 py-2"
                  placeholder="nombre@ejemplo.com"
                  value={formulario.email}
                  onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-danger w-100 py-2 rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center gap-2">
              Ingresar <FaArrowRight />
            </button>
            
            <div className="text-center mt-3">
                 <button type="button" onClick={() => navigate("/productos")} className="btn btn-link text-decoration-none text-muted btn-sm">
                    Volver a la tienda sin ingresar
                </button>
            </div>

          </form>
        </div>
        
        {/* Pie del card con ayuda */}
        <div className="card-footer bg-light text-center py-3">
            <p className="mb-0 small text-muted">
                <FaLock className="me-1" /> 
                <strong>Admin Demo:</strong> admin / 1234@admin
            </p>
        </div>
      </div>
    </div>
  );
}