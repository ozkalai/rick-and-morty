import { CharacterFilters } from "../../types/Character";
import styles from "./FilterButton.module.scss";
import { useAppSelector } from "../../store/hooks";

const FilterButton = ({
  filter,
  handleClick,
}: {
  filter: CharacterFilters;
  handleClick: () => void;
}) => {
  const buttonName = filter.charAt(0).toUpperCase() + filter.slice(1);
  const selectedFilter = useAppSelector((state) => state.character.filter);

  return (
    <button
      onClick={handleClick}
      className={`${styles[filter]} ${
        filter === selectedFilter ? styles.selected : ""
      }`}
    >
      <div className={styles.dot} />
      <h4>{buttonName}</h4>
    </button>
  );
};

export default FilterButton;
