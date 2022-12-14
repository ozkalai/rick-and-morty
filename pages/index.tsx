import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocations } from "../src/services/get-locations";
import { useRouter } from "next/router";
import { LocationResponse, Location } from "../src/types/Location";
import { Pagination } from "../src/components/Pagination";
import {
  setLocations,
  setSelectedLocation,
  setCurrentPage,
} from "../src/store/slices/locations";
import { useAppSelector } from "../src/store/hooks";
import LocationCard from "../src/components/LocationCard";
import styles from "../styles/pages/Location.module.scss";

function Home({ locations }: { locations: LocationResponse }) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const locationsFromStore = useAppSelector(
    (state) => state.location.locations
  );
  const currentPage = useAppSelector((state) => state.location.currentPage);

  const handlePageChange = (location: Location) => {
    push("character");
    dispatch(setSelectedLocation(location));
  };

  const getLocationWithPage = useCallback(
    async (page: number) => {
      const data = await getLocations(page);
      if (data) {
        dispatch(setLocations(data as LocationResponse));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setLocations(locations));
    dispatch(setCurrentPage(currentPage));
  }, [dispatch, locations, currentPage]);

  useEffect(() => {
    getLocationWithPage(currentPage);
  }, [currentPage, getLocationWithPage]);

  const totalPages = locations?.info?.pages;

  return (
    <div>
      <div>
        <div className={styles.container}>
          <div className={styles.locations}>
            {locationsFromStore?.results?.map((location: Location) => (
              <LocationCard
                location={location}
                onClick={() => handlePageChange(location)}
                key={location.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.pagination__wapper}>
          <Pagination
            onPageChange={(page: number) => {
              dispatch(setCurrentPage(page));
            }}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await getLocations();
  return {
    props: { locations: res },
  };
}

export default Home;
