import styles from "./Header.module.scss";
import BackIcon from "../../components/LeftIcon";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/logo.svg";

const Header: React.FC = () => {
  const { back, pathname } = useRouter();
  const isGoBackIconVisible = pathname !== "/" ? true : false;
  return (
    <div className={styles.header}>
      {isGoBackIconVisible && (
        <BackIcon onClick={back} className={styles.header__icon} />
      )}
      <Image
        loading={"lazy"}
        className={styles.header__logo}
        src={logo}
        alt="logo"
      />
    </div>
  );
};

export default Header;
