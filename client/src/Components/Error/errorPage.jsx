import style from "./error.module.css";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Error() {
  return (
    <div className={style.errorPage}>
      <div>
        <h1 className={style.customText}>
          ¡Error 404! Page not found
          <br />
        </h1>
        <br />
      </div>
      <div>
        <Link to="/home">
          <button className={style.customButton}>Home</button>
        </Link>
      </div>
    </div>
  );
}
