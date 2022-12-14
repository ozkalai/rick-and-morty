import { GetStaticPaths, GetStaticProps } from "next";
import { getCharacter } from "../../src/services/get-character";
import { useAppSelector } from "../../src/store/hooks";
import { Character, CharacterFilters } from "../../src/types/Character";
import styles from "../../styles/pages/CharacterDetail.module.scss";

type Props = {
  character: Character;
};

const CharacterDetailPage = ({ character }: Props) => {
  const { name, image, species, status, gender, origin } = character;

  const statusForFilter = character?.status?.toLowerCase() as CharacterFilters;
  const characters = useAppSelector((state) => state.character.characters);
  const otherCharacters = characters.filter((c) => {
    return c.id !== character.id && c.status.toLowerCase() === statusForFilter;
  });

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <div className={styles.image__wrapper}>
          <img className={styles.image} src={image} alt={name} />
        </div>
        <div className={styles.character__info}>
          <div className={styles.character__info__left}>
            <h1 className={styles.character__name}>{name}</h1>
            <div className={styles.character__status}>
              <div className={styles[character?.status?.toLowerCase()]} />
              <h3 className={styles.character__status__text}>
                {status}-{species}
              </h3>
            </div>
            <div className={styles.character__status__text}>{origin.name}</div>
          </div>
          <div className={styles.character__info__right}>{gender}</div>
        </div>
      </div>
      <div className={styles.other__characters}>
        <h1 className={styles.other__characters__title}>Other characters</h1>
        <div className={styles.other__characters__list}>
          {otherCharacters.map((character) => (
            <div className={styles.other__characters__card} key={character.id}>
              <img
                className={styles.other__characters__image}
                src={character.image}
                alt={character.name}
              />
              <div className={styles.other__characters__info}>
                <h2 className={styles.other__characters__name}>
                  {character.name}
                </h2>
                <div className={styles.other__characters__origin}>
                  {character.origin.name}
                </div>
                <div className={styles.other__characters__gender}>
                  {character.gender}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const character = await getCharacter(id as string);

  if (!character) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      character,
    },
  };
};

export default CharacterDetailPage;
