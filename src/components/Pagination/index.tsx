type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="pagination" style={{ display: "flex" }}>
      <button
        className="pagination__button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>
      {currentPage !== 1 && <button onClick={() => onPageChange(1)}>1</button>}
      {currentPage !== 1 && currentPage - 1 !== 1 && (
        <div style={{ display: "flex", gap: "2px" }}>
          <span>...</span>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="pagination__separator"
          >
            {currentPage - 1}
          </button>
        </div>
      )}
      <span className="pagination__current-page">{currentPage}</span>
      {currentPage !== totalPages && currentPage !== totalPages - 1 && (
        <div style={{ display: "flex", gap: "2px" }}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="pagination__separator"
          >
            {currentPage + 1}
          </button>
          <span>...</span>
        </div>
      )}
      {currentPage !== totalPages && (
        <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
      )}
      <button
        className="pagination__button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
};
