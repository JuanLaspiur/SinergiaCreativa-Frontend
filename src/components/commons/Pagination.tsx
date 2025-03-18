import { FC } from "react";

interface PaginationProps {
  dataLength: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  dataLength,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(dataLength / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrevPage}>
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <li
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={handleNextPage}>
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
