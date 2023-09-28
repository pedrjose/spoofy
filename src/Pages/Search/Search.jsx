import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const SearchPage = () => {
  const logout = () => {
    Cookies.remove("sessionToken");
    Cookies.set("logged", "0");
    window.location.reload();
  };
  return (
    <>
      <p>Search Page</p>
      <br />
      <button className="bg-red-800	text-white" onClick={() => logout()}>
        Sair
      </button>
    </>
  );
};
