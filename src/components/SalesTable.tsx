import { FC, useState } from "react";
import { useSales } from "../contexts/SaleContext";
import Table from "./commons/Table";
import { ISale } from "../interfaces/Sale";
import { formatDate } from "../helpers/formatDateHelper";

const SalesTable: FC = () => {
  const { userSales } = useSales();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(userSales.length / itemsPerPage);

  const columns = [
    { label: "Producto", key: "productName" },
    { label: "Precio Unitario", key: "unitPrice", isSortable: true },
    { label: "Ganancia", key: "profit" },
    { label: "Fecha", key: "date" },
  ];

  const renderRow = (sale: ISale) => (
    <>
      <td>{sale?.product?.title}</td>
      <td>$$ {sale?.total}</td>
      <td>$$ {sale?.profit ? sale?.profit : ''}</td>
      <td>{sale?.date && formatDate(sale?.date)}</td>
    </>
  );

  // Paginación: Filtrar las ventas según la página actual
  const paginatedSales = userSales.slice(
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
      <h2 className="mb-4">Tabla de Ventas</h2>
      <Table
        columns={columns}
        data={paginatedSales} 
        filteredData={paginatedSales} 
        renderRow={renderRow}
        noDataMessage="No se encontraron ventas"
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

export default SalesTable;
