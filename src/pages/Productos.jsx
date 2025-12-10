import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useState, useEffect } from "react";
// Importamos iconos para decorar
import { FaSearch, FaCartPlus, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito, formatearNumeroArgentino } = useCartContext(); 
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1); 
  const productosPorPagina = 6; // Mostramos más productos para que se vea mejor el grid

  const manejarEliminar = (producto) => {
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    navigate('/formulario-producto', { state: { producto } });
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    (producto.categoria && producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  useEffect(() => {
    document.title = "Tienda | BoardGames";
  }, []);

  if (cargando) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>
    </div>
  );
  
  if (error) return <div className="alert alert-danger m-5">{error}</div>;

  return (
    <>
      <div className="container mt-5">
        
        {/* Encabezado y Buscador */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
            <div>
                <h1 className="fw-bold text-dark">Nuestra Colección</h1>
                <p className="text-muted">Encuentra tu próxima aventura</p>
            </div>
            
            <div className="position-relative w-100" style={{maxWidth: '400px'}}>
                <FaSearch className="position-absolute text-muted" style={{top: '12px', left: '15px'}} />
                <input
                    type="text"
                    placeholder="Buscar juego..."
                    className="form-control rounded-pill ps-5 py-2 shadow-sm border-0"
                    value={busqueda}
                    onChange={manejarBusqueda}
                />
            </div>
        </div>

        {/* Grid de productos MODERNO */}
        <div className="row">
          {productosActuales.map((producto) => (
            <div key={producto.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 card-custom">
                <div style={{overflow: 'hidden', height: '220px'}}>
                    <img
                    src={producto.avatar}
                    alt={producto.nombre}
                    className="card-img-top w-100 h-100"
                    style={{ objectFit: "cover" }}
                    />
                </div>
               
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold">{producto.nombre}</h5>
                      <span className="badge bg-light text-dark border">{producto.categoria}</span>
                  </div>
                  
                  <p className="card-text text-muted flex-grow-1 small">
                    {producto.descripcion.substring(0, 80)}...
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fs-4 fw-bold text-dark">
                        ${formatearNumeroArgentino(producto.precio)}
                    </span>
                  </div>
                 
                  <div className="mt-3 pt-3 border-top">
                    <div className="d-grid gap-2 d-flex">
                      <Link
                        to={`/productos/${producto.id}`}
                        state={{producto}}
                        className="btn btn-outline-secondary btn-sm flex-fill rounded-pill d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaInfoCircle /> Ver
                      </Link>
                      <button
                        onClick={() => agregarAlCarrito(producto)}
                        className="btn btn-custom btn-sm flex-fill d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaCartPlus /> Comprar
                      </button>
                    </div>

                    {esAdmin && (
                      <div className="d-flex gap-2 mt-2">
                          <button onClick={() => manejarEditar(producto)} className="btn btn-warning btn-sm flex-fill rounded-pill">
                            <FaEdit />
                          </button>
                          <button onClick={() => manejarEliminar(producto)} className="btn btn-danger btn-sm flex-fill rounded-pill">
                            <FaTrash />
                          </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginador Estilizado */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-5">
            <nav>
                <ul className="pagination">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                    <li key={index} className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}>
                        <button
                            className="page-link rounded-circle mx-1 border-0 fw-bold shadow-sm"
                            style={paginaActual === index + 1 ? {background: '#2b2d42', color: 'white'} : {color: '#2b2d42'}}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                    ))}
                </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}