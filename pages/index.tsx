import styles from "../styles/Home.module.css";
import { getLocations } from "../src/services/get-locations";
import { useRouter } from "next/router";
import { LocationResponse, Location } from "../src/types/Location";

export default function Home({ locations }: { locations: LocationResponse }) {
  const { push } = useRouter();

  const handleClick = (name: string) => () => {
    push("/character");
    // todo: set the location name using redux
  };

  return (
    <div className={styles.container}>
      <h1>Locations</h1>
      <ul>
        {locations?.results?.map((location: Location) => (
          <li onClick={handleClick(location.name)} key={location.id}>
            {location.name}
          </li>
        ))}
      </ul>
      <h1>Characters</h1>
      <ul></ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await getLocations();
  return {
    props: { locations: res },
  };
}
