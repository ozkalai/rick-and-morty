import { Location } from "../../types/Location";
import styles from "./LocationCard.module.scss";

const LocationCard = ({
  location,
  onClick,
}: {
  location: Location;
  onClick?: () => void;
}) => {
  const { name, type, dimension, residents } = location;

  return (
    <div onClick={onClick} className={styles.card}>
      <h2 className={styles.card__header}>{name}</h2>
      <div className={styles.card__info}>
        <div className={styles.card__subheader}>Type</div>: {type}
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__subheader}>Dimension</div>:{" "}
        {dimension === "unknown" ? "-" : dimension}
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__subheader}>Residents count</div>:{" "}
        {residents.length}
      </div>
    </div>
  );
};

export default LocationCard;
