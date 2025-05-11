import { Link } from "react-router";
import "./styles.css";
import { type FC, type ReactNode } from "react";

const StorePage: FC<{
  title: string;
  backButtonText: string;
  backButtonHref: string;
  children: ReactNode;
}> = (props) => {
  return (
    <main>
      <div id="topbar">
        <Link to={props.backButtonHref} id="goToCart">
          {props.backButtonText}
        </Link>
      </div>
      <div>
        <h1 id="title">{props.title}</h1>
        <section id="mainSection">
          <section id="productsSection">{props.children}</section>
        </section>
      </div>
    </main>
  );
};

export default StorePage;
