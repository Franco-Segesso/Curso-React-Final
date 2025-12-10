import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaListUl, FaSignOutAlt, FaUserShield, FaKey, FaBoxOpen } from 'react-icons/fa';

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext();
  const navigate = useNavigate();
  const tokenActual = localStorage.getItem('authToken');

  const manejarAgregarProducto = () => {
    navigate('/formulario-producto');
  };

  return (
    <div className="container py-5">
      {/* Encabezado Dashboard */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-8">
            <h1 className="fw-bold" style={{color: '#2b2d42'}}>Panel de Administración</h1>
            <p className="text-muted lead">Gestiona el inventario y monitorea la tienda.</p>
        </div>
        <div className="col-md-4 text-md-end">
             <div className="d-inline-flex align-items-center gap-2 px-4 py-2 bg-white rounded-pill shadow-sm border">
                <FaUserShield className="text-success" size={20} />
                <div>
                    <small className="d-block text-muted" style={{fontSize: '10px', lineHeight: '1'}}>LOGUEADO COMO</small>
                    <span className="fw-bold text-dark">{usuario.nombre}</span>
                </div>
             </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Columna Izquierda: Acciones Rápidas */}
        <div className="col-lg-8">
            <h5 className="fw-bold mb-3 text-secondary">ACCIONES RÁPIDAS</h5>
            <div className="row g-3">
                
                {/* Tarjeta Agregar */}
                <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm hover-scale" style={{transition: '0.3s'}}>
                        <div className="card-body p-4 d-flex align-items-center gap-3">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                                <FaPlusCircle size={30} />
                            </div>
                            <div>
                                <h5 className="card-title fw-bold mb-1">Nuevo Producto</h5>
                                <p className="card-text text-muted small mb-2">Agrega juegos al catálogo.</p>
                                <button onClick={manejarAgregarProducto} className="btn btn-sm btn-outline-success rounded-pill stretched-link">
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarjeta Listado */}
                <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm hover-scale" style={{transition: '0.3s'}}>
                        <div className="card-body p-4 d-flex align-items-center gap-3">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                <FaListUl size={30} />
                            </div>
                            <div>
                                <h5 className="card-title fw-bold mb-1">Gestionar Inventario</h5>
                                <p className="card-text text-muted small mb-2">Edita o elimina items.</p>
                                <Link to="/productos" className="btn btn-sm btn-outline-primary rounded-pill stretched-link">
                                    Ir al Catálogo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarjeta Resumen (Estética) */}
                <div className="col-12">
                    <div className="card border-0 bg-dark text-white shadow">
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="fw-bold"><FaBoxOpen className="me-2"/>Estado de la Tienda</h5>
                                <p className="mb-0 opacity-75">El sistema está funcionando correctamente.</p>
                            </div>
                             <div className="text-end">
                                <span className="badge bg-success">En línea</span>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Columna Derecha: Info Técnica y Salir */}
        <div className="col-lg-4">
            <h5 className="fw-bold mb-3 text-secondary">DETALLES DE SESIÓN</h5>
            
            <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <FaKey className="text-warning" />
                        <h6 className="fw-bold mb-0">Token de Acceso</h6>
                    </div>
                    <div className="bg-light p-2 rounded border font-monospace text-break" style={{fontSize: '12px', color: '#666'}}>
                        {tokenActual}
                    </div>
                    <small className="text-muted d-block mt-2">
                        * Este token se renueva cada inicio de sesión.
                    </small>
                </div>
            </div>

            <button 
                onClick={cerrarSesion} 
                className="btn btn-danger w-100 py-3 rounded shadow-sm fw-bold d-flex align-items-center justify-content-center gap-2"
            >
                <FaSignOutAlt /> Cerrar Sesión Segura
            </button>
        </div>
      </div>
    </div>
  );
}