import { FC, useState } from "react";
import { useSales } from "../contexts/SaleContext";
import Table from "./commons/Table";
import { ISale } from "../interfaces/Sale";
import { formatDate } from "../helpers/formatDateHelper";
import Pagination from "./commons/Pagination";

const SalesTable: FC = () => {
  const { userSales } = useSales();
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns = [
    { label: "Producto", key: "productName" },
    { label: "Precio Unitario", key: "unitPrice", isSortable: true },
    { label: "Ganancia", key: "profit" },
    { label: "Fecha", key: "date" },
  ];

  // Calcular el índice de los elementos actuales para la página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSales = userSales.slice(startIndex, endIndex);

  const renderRow = (sale: ISale) => (
    <>
      <td>{sale?.product?.title}</td>
      <td>$$ {sale?.total}</td>
      <td>$$ {sale?.profit ? sale?.profit : ""}</td>
      <td>{sale?.date && formatDate(sale?.date)}</td>
    </>
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tabla de Ventas</h2>
      <Table
        columns={columns}
        data={currentSales}
        filteredData={currentSales}
        renderRow={renderRow}
        noDataMessage="No se encontraron ventas"
      />
      <Pagination
        dataLength={userSales.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default SalesTable;
