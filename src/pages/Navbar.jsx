import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import styled from 'styled-components';
import { FaShoppingCart, FaUserCircle, FaGamepad } from 'react-icons/fa'; // Agregamos íconos nuevos

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { vaciarCarrito, carrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const manejarCerrarSesion = () => {
    navigate("/productos");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm">
        <div className="container">
          <Logo to="/" className="navbar-brand d-flex align-items-center gap-2">
            <FaGamepad size={28} />
            <span>BoardGames</span>
          </Logo>
          
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link">Nosotros</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/productos" className="nav-link">Tienda</NavLink>
              </li>
              {usuario?.nombre === "admin" && (
                <li className="nav-item">
                  <NavLinkAdmin to="/formulario-producto" className="nav-link">
                    + Nuevo Juego
                  </NavLinkAdmin>
                </li>
              )}
            </ul>

            <SeccionUsuario className="d-flex align-items-center gap-3">
              <ContenedorCarrito> 
                <IconoCarrito to="/pagar" className="nav-link">
                  <FaShoppingCart size={20}/>  
                  {totalItemsCarrito > 0 && (
                    <ContadorCarrito>
                      {totalItemsCarrito}
                    </ContadorCarrito>
                  )}
                </IconoCarrito>
              </ContenedorCarrito>

              {isAuthenticated ? (
                <div className="dropdown">
                  <BotonUsuario className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                    <FaUserCircle size={20} />
                    {usuario.nombre}
                  </BotonUsuario>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {usuario.nombre === "admin" && (
                      <li><Link className="dropdown-item" to="/dashboard">Panel Admin</Link></li>
                    )}
                    <li><button className="dropdown-item text-danger" onClick={manejarCerrarSesion}>Cerrar Sesión</button></li>
                  </ul>
                </div>
              ) : (
                <Link to="/iniciar-sesion" className="btn btn-light rounded-pill px-4 fw-bold">
                  Ingresar
                </Link>
              )}
            </SeccionUsuario>
          </div>
        </div>
      </NavbarContainer>
    </>
  )
} 

export default Navbar;

// --- STYLED COMPONENTS NUEVOS ---

const NavbarContainer = styled.nav`
  background-color: #2b2d42 !important; /* Azul oscuro moderno */
  padding: 0.8rem 1rem;
  backdrop-filter: blur(10px); /* Efecto vidrio si fuera transparente */
`;

const Logo = styled(Link)`
  color: #ef233c !important; /* Rojo vibrante */
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -1px;
  text-transform: uppercase;
 
  &:hover {
    color: white !important;
    transform: scale(1.05);
    transition: 0.3s;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255,255,255,0.8) !important;
  font-weight: 500;
  margin: 0 5px;
  position: relative;
  text-decoration: none;
 
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #ef233c;
    transition: width 0.3s;
  }

  &:hover {
    color: white !important;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const NavLinkAdmin = styled(NavLink)`
  color: #ffca28 !important; /* Amarillo para resaltar admin */
`;

const ContenedorCarrito = styled.div`
  position: relative;
  margin-right: 10px;
`;

const IconoCarrito = styled(Link)`
  color: white !important;
  position: relative;
  transition: 0.3s;
  
  &:hover {
    color: #ef233c !important;
    transform: scale(1.1);
  }
`;

const ContadorCarrito = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef233c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  border: 2px solid #2b2d42;
`;

const SeccionUsuario = styled.div`
  display: flex;
  align-items: center;
`;

const BotonUsuario = styled.button`
  border-radius: 50px;
  padding: 5px 15px;
  font-size: 0.9rem;
  border-color: rgba(255,255,255,0.3);
  
  &:hover {
    background-color: rgba(255,255,255,0.1);
    border-color: white;
  }
`;