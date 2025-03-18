// @ts-ignore
import { FC, useState } from "react";
import { useProducts } from "../../../../hooks/useProducts";
import ProductFilter from "./ProductFilter";
import Table from "../../../commons/Table";
import { IProduct } from "../../../../interfaces/Product";
import { useSales } from "../../../../contexts/SaleContext";
import { getTotalSalesByProduct } from "../../../../helpers/productHelpers";
import ProductDetailModal from "./ProductDetailModal";
import { FaEye } from "react-icons/fa";

const ProductTable: FC = () => {
  const { products, filteredProducts, setFilteredProducts, sortOrder, handleSort } = useProducts();
  const { monthlySales } = useSales();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null); 
  const [showModal, setShowModal] = useState<boolean>(false); 
  const columns = [
    { label: "Título", key: "title" },
    { label: "Precio", key: "price", isSortable: true },
    { label: "Stock", key: "stock", isSortable: true },
    { label: "Ventas Totales Mes", key: "totalSales" },
    { label: "Ver mas", key: "see more" }
  ];
  const renderRow = (product: IProduct) => {
    const totalSales = getTotalSalesByProduct(product._id, monthlySales);
    return (
      <>
        <td>{product.title}</td>
        <td>$$ {product.price}</td>
        <td>{product.stock}</td>
        <td>{totalSales}</td>
        <td>  <button
                className="btn btn-primary animate__animated animate__pulse" 
            onClick={() => handleRowClick(product)}
          >
            <FaEye />
          </button></td> 
      </>
    );
  };

  const handleRowClick = (product: IProduct) => {
    setSelectedProduct(product);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
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
    {showModal && selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
        />
      )}
</>
  );
};

export default ProductTable;
