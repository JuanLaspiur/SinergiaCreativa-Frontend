import React, { FC } from "react";
import { ISortOrder } from "../../hooks/useProducts";

interface TableProps<T> {
  columns: { label: string; key: keyof T; isSortable?: boolean }[];
  data: T[];
  sortOrder?: ISortOrder;
  handleSort?: (column: keyof T) => void;
  renderRow: (item: T) => React.ReactNode;
  filteredData?: T[];
  noDataMessage?: string;
}

const Table: FC<TableProps<any>> = ({
  columns,
  data,
  sortOrder,
  handleSort,
  renderRow,
  filteredData = data,
  noDataMessage = "No se encontraron datos",
}) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          {columns.map((column) => (
            <th key={column.key as string} scope="col">
              {column.label}
              {column.isSortable && handleSort && sortOrder && (
                <button
                  className="btn btn-link"
                  onClick={() => handleSort(column.key)}
                >
                  {sortOrder[column.key as string] === "asc" ? "↑" : "↓"}
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <tr key={index}>{renderRow(item)}</tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center">
              {noDataMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
