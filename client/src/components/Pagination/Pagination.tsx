import styles from './Pagination.module.css';

interface Props {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({ page, totalPages, onNext, onPrev }: Props) => (
  <div className={styles.pagination}>
    <button onClick={onPrev} disabled={page === 1}>Prev</button>
    <span>Page {page} of {totalPages}</span>
    <button onClick={onNext} disabled={page === totalPages}>Next</button>
  </div>
);

export default Pagination;
