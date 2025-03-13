import { FC } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductFilter from "./ProductFilter";

const ProductTable: FC = () => {
  const { products, filteredProducts, setFilteredProducts, sortOrder, handleSort } = useProducts();

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tabla de Productos</h2>
      <ProductFilter products={products} setFilteredProducts={setFilteredProducts} />
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
              <td colSpan={4} className="text-center">
                No se encontraron productos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
