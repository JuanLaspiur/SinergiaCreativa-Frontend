import { FC, useState } from "react";
import { useSales } from "../../../contexts/SaleContext";
import Table from "../../commons/Table";
import { ISale } from "../../../interfaces/Sale";
import { formatDate } from "../../../helpers/formatDateHelper";
import Pagination from "../../commons/Pagination";
import { MdToday, MdCalendarMonth, MdAllInbox } from "react-icons/md"; 

const filterSalesByDate = (sales: ISale[], filter: string) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  return sales.filter((sale) => {
    const saleDate = new Date(sale.date);

    switch (filter) {
      case "today":
        return saleDate.toDateString() === today.toDateString();
      case "month":
        return saleDate >= startOfMonth && saleDate <= today;
      case "all":
      default:
        return true;
    }
  });
};

const SalesTable: FC = () => {
  const { userSales } = useSales();
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("all");

  const columns = [
    { label: "Producto", key: "productName" },
    { label: "Precio Unitario", key: "unitPrice", isSortable: true },
    { label: "Ganancia", key: "profit" },
    { label: "Fecha", key: "date" },
  ];

  const filteredSales = filterSalesByDate(userSales, filter);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSales = filteredSales.slice(startIndex, endIndex);

  const renderRow = (sale: ISale) => (
    <>
      <td>{sale?.product?.title}</td>
      <td>$$ {sale?.total}</td>
      <td>$$ {sale?.profit ? sale?.profit : ""}</td>
      <td>{sale?.date && formatDate(sale?.date)}</td>
    </>
  );

  const getButtonClass = (buttonType: string) => 
    filter === buttonType ? "btn btn-primary me-2 active" : "btn btn-outline-primary me-2";

  return (
    <div className="container my-5 d-flex flex-column" style={{ minHeight: "70vh" }}>
      <div className="mb-4 d-flex justify-content-between flex-column flex-md-row">
        <h2>Tabla de Ventas</h2>

        <div>
          {/* Agregamos los íconos */}
          <button className={getButtonClass("today")} onClick={() => setFilter("today")}>
            <MdToday /> Hoy
          </button>
          <button className={getButtonClass("month")} onClick={() => setFilter("month")}>
            <MdCalendarMonth /> Este Mes
          </button>
          <button className={getButtonClass("all")} onClick={() => setFilter("all")}>
            <MdAllInbox /> Todas
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        data={currentSales}
        filteredData={currentSales}
        renderRow={renderRow}
        noDataMessage="No se encontraron ventas"
      />
      
      <div className="mt-auto">
        <Pagination
          dataLength={filteredSales.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default SalesTable;
