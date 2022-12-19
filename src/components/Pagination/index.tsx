import ArrowIcon from "../ArrowIcon";
import styles from "./Pagination.module.scss";

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
    <div className={styles.pagination}>
      <div className={styles.left__arrow}>
        <ArrowIcon
          style={currentPage === 1 ? { opacity: 0.5 } : {}}
          onClick={() => onPageChange(currentPage - 1)}
        />
      </div>
      {currentPage !== 1 && (
        <button
          className={styles.pagination__button}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      )}
      {currentPage !== 1 && currentPage - 1 !== 1 && (
        <div className={styles.pagination__separator}>
          <span className={styles.pagination__button__placeholder}>...</span>
          <button
            className={styles.pagination__button}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        </div>
      )}
      <span className={styles.pagination__current}>{currentPage}</span>
      {currentPage !== totalPages && currentPage !== totalPages - 1 && (
        <div className={styles.pagination__separator}>
          <button
            className={styles.pagination__button}
            onClick={() => onPageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
          <span>...</span>
        </div>
      )}
      {currentPage !== totalPages && (
        <button
          className={styles.pagination__button}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      <ArrowIcon
        className="pagination__button"
        style={currentPage === totalPages ? { opacity: 0.5 } : {}}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
