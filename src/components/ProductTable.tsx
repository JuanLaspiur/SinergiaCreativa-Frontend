import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";

function ProductTable() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [orden, setOrden] = useState({ precio: "asc", stock: "asc" });
  const [textoFiltro, setTextoFiltro] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const data = await getAllProducts();
        setProductos(data);
        setProductosFiltrados(data); // Inicializa los productos filtrados
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  // Filtrar productos por nombre
  useEffect(() => {
    const filtrados = productos.filter((producto) =>
      producto.title.toLowerCase().includes(textoFiltro.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  }, [textoFiltro, productos]);

  // Ordenar productos por precio o stock
  const manejarOrden = (columna) => {
    const nuevoOrden = orden[columna] === "asc" ? "desc" : "asc";
    setOrden({ ...orden, [columna]: nuevoOrden });

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
      if (nuevoOrden === "asc") {
        return a[columna] < b[columna] ? -1 : 1;
      } else {
        return a[columna] > b[columna] ? -1 : 1;
      }
    });

    setProductosFiltrados(productosOrdenados);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tabla de Productos</h2>

      {/* Filtro por nombre */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filtrar por nombre del producto"
          value={textoFiltro}
          onChange={(e) => setTextoFiltro(e.target.value)}
        />
      </div>

      {/* Tabla de productos */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Título</th>
            <th scope="col">
              <button
                className="btn btn-link"
                onClick={() => manejarOrden("precio")}
              >
                Precio {orden.precio === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th scope="col">
              <button
                className="btn btn-link"
                onClick={() => manejarOrden("stock")}
              >
                Stock {orden.stock === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th scope="col">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.title}</td>
                <td>${producto.price}</td>
                <td>{producto.stock}</td>
                <td>
                  <img
                    src={producto.image}
                    alt={producto.title}
                    className="img-fluid"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No se encontraron productos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
