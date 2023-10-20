import "./NotFound.css";
import notfound from "../../../public/logo/notfound.png";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <div className="content-not-found">
        <img
          className="not-found-image-hg"
          src={notfound}
          alt="Not Found Image"
        />
        <h5 className="block text-sm font-medium leading-6 text-blue-900 pt-1.5">
          Música e/ou artista não encontrados.{" "}
          <Link to="/">
            <b>Tente novamente!</b>
          </Link>
        </h5>
      </div>
    </>
  );
}
