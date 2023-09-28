import { SignUpModal } from "../../Components/Modal/signup.component.jsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
import "./SignUp.css";

export function SignUp() {
  useEffect(() => {
    if (Cookies.get("logged") && Cookies.get("logged") === "1") {
      window.location.reload();
    }
  }, []);
  return (
    <>
      <section className="section-settings">
        <SignUpModal />
      </section>
    </>
  );
}
