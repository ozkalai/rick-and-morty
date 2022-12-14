import { Character } from "../../types/Character";
import styles from "./Character.module.scss";

const Character = ({
  character,
  handleClick,
}: {
  character: Character;
  handleClick: () => void;
}) => {
  const { name, image, species, status, gender, type, origin } = character;
  return (
    <div onClick={handleClick} className={styles.character}>
      <div className={styles.image__wrapper}>
        <img className={styles.image} src={image} alt={name} />
      </div>
      <h1 className={styles.character__name}>{name}</h1>
      <div className={styles.character__status}>
        <div className={styles[character.status.toLowerCase()]} />
        <h3 className={styles.character__status__text}>
          {status}-{species}
        </h3>
      </div>
    </div>
  );
};

export default Character;
