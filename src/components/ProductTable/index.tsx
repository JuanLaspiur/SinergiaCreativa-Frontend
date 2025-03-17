import { FC, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductFilter from "./ProductFilter";
import Table from "../commons/Table";
import { IProduct } from "../../interfaces/Product";
import { useSales } from "../../contexts/SaleContext";
import { getTotalSalesByProduct, getCommission } from "../../helpers/productHelpers";

const ProductTable: FC = () => {
  const { products, filteredProducts, setFilteredProducts, sortOrder, handleSort } = useProducts();
  const { monthlySales } = useSales();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const columns = [
    { label: "Título", key: "title" },
    { label: "Precio", key: "price", isSortable: true },
    { label: "Stock", key: "stock", isSortable: true },
    // { label: "Imagen", key: "image" },
    { label: "Ventas Totales Mes", key: "totalSales" },
    { label: "Comisión", key: "commission" }
  ];

  const renderRow = (product: IProduct) => {
    const totalSales = getTotalSalesByProduct(product._id, monthlySales);
    return (
      <>
        <td>{product.title}</td>
        <td>$$ {product.price}</td>
        <td>{product.stock}</td>
        {/*<td>
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ width: "50px", height: "50px" }}
          />
        </td>*/}
        <td>{totalSales}</td>
        <td>{getCommission(product, monthlySales)}</td>
      </>
    );
  };

  // Paginación: Filtrar los productos según la página actual
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tabla de Productos</h2>
      <ProductFilter products={products} setFilteredProducts={setFilteredProducts} />
      <Table
        columns={columns}
        data={paginatedProducts}
        sortOrder={sortOrder}
        handleSort={handleSort}
        filteredData={filteredProducts}
        renderRow={renderRow}
        noDataMessage="No se encontraron productos"
      />
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
