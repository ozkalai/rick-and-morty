import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../src/store/hooks";
import { Pagination } from "../../src/components/Pagination";
import { setIsLoading } from "../../src/store/slices/locations";
import {
  setError,
  setCharacters,
  setCurrentPage,
} from "../../src/store/slices/characters";

export const CharacterPage = () => {
  const [residentsIds, setResidentsIds] = useState<number[]>();

  const router = useRouter();
  const dispatch = useDispatch();

  const selectedLocation = useAppSelector(
    (state) => state.location.selectedLocation
  );
  const error = useAppSelector((state) => state.character.error);
  const characters = useAppSelector((state) => state.character.characters);
  const currentPage = useAppSelector((state) => state.character.currentPage);

  const totalCharacters = characters?.length || 0;
  const totalPage = Math.ceil(totalCharacters / 20);

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, [dispatch]);

  useMemo(() => {
    if (selectedLocation?.residents && selectedLocation.residents.length) {
      const characterNumbers = selectedLocation.residents.map((resident) => {
        const characterNumber = resident.split("/").pop();
        return parseInt(characterNumber as string);
      });
      setResidentsIds(characterNumbers);
      dispatch(setError(null));
    } else {
      dispatch(setError("No residents found"));
    }
  }, [dispatch, selectedLocation.residents]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${residentsIds}`).then(
      (response) => {
        response.json().then((data) => {
          if (typeof data === "object" && !Array.isArray(data)) {
            dispatch(setCharacters([data]));
            return;
          }
          dispatch(setCharacters(data));
        });
      }
    );
  }, [dispatch, residentsIds]);

  const handleClick = (id: number) => () => {
    if (id) {
      router.push(`/character/${id}`);
    }
  };

  const paginatedCharacters =
    characters.length > 20
      ? characters?.slice((currentPage - 1) * 20, currentPage * 20)
      : characters;

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1>Characters</h1>
          <ul>
            {paginatedCharacters?.map((character) => (
              <li onClick={handleClick(character.id)} key={character.id}>
                {character.name}
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={(e) => dispatch(setCurrentPage(e))}
          />
        </>
      )}
    </div>
  );
};

export default CharacterPage;
