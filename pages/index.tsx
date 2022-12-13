import { useState } from "react";
import styles from "../styles/Home.module.css";
import { getLocations } from "../src/services/get-locations";
import { useRouter } from "next/router";
import { LocationResponse, Location } from "../src/types/Location";
import { Pagination } from "../src/components/Pagination";

export default function Home({
  locations: initialLocations,
}: {
  locations: LocationResponse;
}) {
  const [locations, setLocations] =
    useState<LocationResponse>(initialLocations);
  const { push } = useRouter();

  const handlePageChange = (name: string) => () => {
    console.log(name);
    push("/character");
    // todo: set the location name using redux
  };

  const totalPages = locations?.info?.pages;
  const lastElementIdOfLocations =
    locations?.results[locations?.results.length - 1].id;
  const currentPage = Math.ceil(lastElementIdOfLocations / 20);

  const getLocationWithPage = async (page: number) => {
    const data = await getLocations(page);
    if (data) {
      setLocations(data as LocationResponse);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Locations</h1>
      <ul>
        {locations?.results.map((location: Location) => (
          <li onClick={handlePageChange(location.name)} key={location.id}>
            {location.name}
          </li>
        ))}
      </ul>
      <Pagination
        onPageChange={(page: number) => getLocationWithPage(page)}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export async function getStaticProps() {
  const res = await getLocations();
  return {
    props: { locations: res },
  };
}
