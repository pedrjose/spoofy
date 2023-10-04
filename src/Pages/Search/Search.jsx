import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "./Search.css";
import { SearchModal } from "../../Components/Modal/search.component";
import { Navbar } from "../../Components/Navbar/Navbar";

export const SearchPage = () => {
  return (
    <>
      <section className="section-settings-search-page">
        <Navbar />
        <span>
          <SearchModal />
        </span>
      </section>
    </>
  );
};
