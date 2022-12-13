// create a character detail page that will be fetch character data as static by using getCharacterById

import { GetStaticPaths, GetStaticProps } from "next";
import { getCharacter } from "../../src/services/get-character";
import { Character } from "../../src/types/Character";

type Props = {
  character: Character;
};

const CharacterDetailPage = ({ character }: Props) => {
  return (
    <div>
      <h1>Character Detail</h1>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
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
