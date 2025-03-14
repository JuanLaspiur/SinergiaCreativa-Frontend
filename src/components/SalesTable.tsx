import { FC } from "react";
import { useSales } from "../contexts/SaleContext";
import Table from "./commons/Table";
import { ISale } from "../interfaces/Sale"; 
import { formatDate } from "../helpers/formatDateHelper";

const SalesTable: FC = () => {
  const { userSales } = useSales();

  const columns = [
    { label: "Producto", key: "productName" },  
    { label: "Precio Unitario", key: "unitPrice", isSortable: true }, 
    { label: "Total", key: "total", isSortable: true }, 
    { label: "Fecha", key: "date" },
  ];

  const renderRow = (sale: ISale) => (
    <>
      <td>{sale?.product?.title}</td>
      <td>${sale?.product?.price}</td>
      <td>${sale?.total}</td>
      <td>{sale?.date && formatDate(sale?.date)}</td>  
    </>
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tabla de Ventas</h2>
      <Table
        columns={columns}
        data={userSales}
        filteredData={userSales} 
        renderRow={renderRow}
        noDataMessage="No se encontraron ventas"
      />
    </div>
  );
};

export default SalesTable;
