// create a page that will be fetch character data as static by using getAllCharaters

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getAllCharacters } from "../../src/services/get-all-characters";
import { Character, CharacterResponse } from "../../src/types/Character";

type Props = {
  characters: CharacterResponse;
};

const CharacterPage = ({ characters }: Props) => {
  const router = useRouter();

  const handleClick = (id: string) => () => {
    router.push(`/character/${id}`);
  };

  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.results.map((character) => (
          <li onClick={handleClick(character.id.toString())} key={character.id}>
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const characters = await getAllCharacters();
  return {
    props: {
      characters,
    },
  };
};

export default CharacterPage;
