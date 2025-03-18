import { FC } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductFilter from "./ProductFilter";
import Table from "../commons/Table";
import { IProduct } from "../../interfaces/Product";
import { useSales } from "../../contexts/SaleContext";
import { getTotalSalesByProduct, getCommission } from "../../helpers/productHelpers";

const ProductTable: FC = () => {
  const { products, filteredProducts, setFilteredProducts, sortOrder, handleSort } = useProducts();
  const { monthlySales } = useSales();

  const columns = [
    { label: "Título", key: "title" },
    { label: "Precio", key: "price", isSortable: true },
    { label: "Stock", key: "stock", isSortable: true },
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
        <td>{totalSales}</td>
        <td>{getCommission(product, monthlySales)}</td>
      </>
    );
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tabla de Productos</h2>
      <ProductFilter products={products} setFilteredProducts={setFilteredProducts} />
      <Table
        columns={columns}
        data={filteredProducts}
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
