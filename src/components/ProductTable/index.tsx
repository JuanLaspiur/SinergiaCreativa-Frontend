import { FC } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductFilter from "./ProductFilter";
import Table from "../commons/Table"; 
import { IProduct } from "../../interfaces/Product";

const ProductTable: FC = () => {
  const { products, filteredProducts, setFilteredProducts, sortOrder, handleSort } = useProducts();

  const columns = [
    { label: "Título", key: "title" },
    { label: "Precio", key: "price", isSortable: true },
    { label: "Stock", key: "stock", isSortable: true },
    { label: "Imagen", key: "image" }
  ];

  const renderRow = (product: IProduct) => (
    <>
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
    </>
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tabla de Productos</h2>
      <ProductFilter products={products} setFilteredProducts={setFilteredProducts} />
      <Table
        columns={columns}
        data={products}
        sortOrder={sortOrder}
        handleSort={handleSort}
        filteredData={filteredProducts}
        renderRow={renderRow}
        noDataMessage="No se encontraron productos"
      />
    </div>
  );
};

export default ProductTable;
