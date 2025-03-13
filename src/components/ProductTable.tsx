import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState({ price: "asc", stock: "asc" });
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        console.log('Numero '+JSON.stringify(data[0].commissions[0].number))
        console.log('Porcentaje '+JSON.stringify(data[0].commissions[0].percentage))
        setFilteredProducts(data); 
      } catch (error) {
        console.error("Error while fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by name
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filterText, products]);

  const handleSort = (column) => {
    const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";

    setSortOrder((prevOrder) => {
      const newOrder = { ...prevOrder, [column]: newSortOrder };
      if (column === "price") {
        newOrder.stock = "asc"; 
      } else if (column === "stock") {
        newOrder.price = "asc"; 
      }
      return newOrder;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[column] < b[column] ? -1 : 1;
      } else {
        return a[column] > b[column] ? -1 : 1;
      }
    });

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tabla de Productos</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filtrar por nombre del producto"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Título</th>
            <th scope="col">
              <button
                className="btn btn-link"
                onClick={() => handleSort("price")}
              >
                Precio {sortOrder.price === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th scope="col">
              <button
                className="btn btn-link"
                onClick={() => handleSort("stock")}
              >
                Stock {sortOrder.stock === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th scope="col">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
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

