import styles from "./Header.module.scss";
import BackIcon from "../../components/LeftIcon";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { back, pathname } = useRouter();
  const isGoBackIconVisible = pathname !== "/" ? true : false;
  return (
    <div className={styles.header}>
      {isGoBackIconVisible && (
        <BackIcon onClick={back} className={styles.header__icon} />
      )}
      <img className={styles.header__logo} src="logo.svg" />
    </div>
  );
};

export default Header;
