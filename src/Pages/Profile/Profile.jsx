import "./Profile.css";
import Cookies from "js-cookie";

export function ProfilePage() {
  const endSession = () => {
    Cookies.remove("sessionToken");
    Cookies.set("logged", "0");
    window.location.reload();
  };

  return (
    <>
      <button onClick={() => endSession()}>ENCERRAR SESSÃO</button>
    </>
  );
}
