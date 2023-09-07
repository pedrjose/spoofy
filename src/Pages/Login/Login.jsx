import { useEffect } from "react";
import { LoginModal } from "../../Components/Modal/login.components";
import Cookies from "js-cookie";
import "./Login.css";

export function Login() {
  useEffect(() => {
    if (Cookies.get("logged") && Cookies.get("logged") === "1") {
      window.location.reload();
    }
  }, []);
  return (
    <>
      <section className="section-settings">
        <LoginModal />
      </section>
    </>
  );
}
