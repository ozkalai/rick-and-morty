import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../src/store/hooks";
import { Pagination } from "../../src/components/Pagination";
import {
  setError,
  setCharacters,
  setCurrentPage,
  setFilter,
} from "../../src/store/slices/characters";
import FilterButton from "../../src/components/FilterButton";
import { CharacterFilters } from "../../src/types/Character";
import styles from "../../styles/pages/Character.module.scss";
import Character from "../../src/components/Character";
import Head from "next/head";

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
  const filter = useAppSelector((state) => state.character.filter);

  useEffect(() => {
    dispatch(setFilter(""));
    dispatch(setCurrentPage(1));
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
    fetch(
      `https://rickandmortyapi.com/api/character/${residentsIds}?status=dead`
    ).then((response) => {
      response.json().then((data) => {
        if (typeof data === "object" && !Array.isArray(data)) {
          dispatch(setCharacters([data]));
          return;
        }
        dispatch(setCharacters(data));
      });
    });
  }, [dispatch, residentsIds]);

  const handleClick = (id: number) => {
    if (id) {
      router.push(`/character/${id}`);
    }
  };

  const handleClickFilter = (filter: CharacterFilters) => {
    dispatch(setFilter(filter));
  };

  const filteredCharacters = useMemo(() => {
    if (filter === "") {
      return characters;
    }

    if (characters?.length) {
      return characters.filter((character) => {
        return character.status.toLowerCase() === filter;
      });
    }
    return [];
  }, [characters, filter]);

  const totalCharacters = filteredCharacters?.length || 0;
  const totalPage = Math.ceil(totalCharacters / 20);

  const paginatedCharacters =
    filteredCharacters.length > 20
      ? filteredCharacters?.slice((currentPage - 1) * 20, currentPage * 20)
      : filteredCharacters;

  return (
    <div>
      <Head>
        <title>Rick and Morty Characters</title>
        <meta
          name="description"
          content="You can find all characters of selected location here."
          key="desc"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.filter}>
          <h3 className={styles.filter__title}>Filter by status:</h3>
          <div className={styles.filter__group}>
            {(["alive", "dead", "unknown"] as CharacterFilters[]).map(
              (filter) => (
                <FilterButton
                  filter={filter}
                  handleClick={() => handleClickFilter(filter)}
                  key={filter}
                />
              )
            )}
          </div>
        </div>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.character__list}>
            {paginatedCharacters?.map((character) => (
              <Character
                key={character.id}
                character={character}
                handleClick={() => handleClick(character.id)}
              />
            ))}
          </div>
        )}
      </div>
      {filteredCharacters.length > 20 && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={(e) => dispatch(setCurrentPage(e))}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterPage;
