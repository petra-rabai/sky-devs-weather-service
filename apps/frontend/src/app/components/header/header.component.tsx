"use client";
import { Image } from "react-bootstrap";
import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  id: string;
  dataTest: string;
}

export const HeaderComponent: React.FC<HeaderProps> = ({
  title,
  id,
  dataTest,
}) => {
  return (
    <div id={id} data-test={dataTest} className={styles.header}>
      <h1 className="text-center align-items-center">
        <Image
          className="me-3 pe-3 text-center"
          src="/images/weatherAppLogo.png"
          alt="logo"
          height={72}
        ></Image>
        {title}
      </h1>
    </div>
  );
};
