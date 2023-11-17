import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "./Search.css";
import { SearchModal } from "../../Components/Modal/search.component";
import { Navbar } from "../../Components/Navbar/Navbar";
import { HotSpotTrend } from "../../Components/HotSpot/HotSpot";
import { hotspotService } from "../../Services/hotspots.service";

export const SearchPage = () => {
  const [hotspots, setHotspots] = useState([]);

  const findHotSpots = async () => {
    const searchHotspots = await hotspotService();

    setHotspots(searchHotspots);
  };

  useEffect(() => {
    findHotSpots();
  }, []);
  return (
    <>
      <section className="section-settings-search-page">
        <Navbar />
        <span>
          <SearchModal />
        </span>
      </section>
      <section className="hotspot-page">
        <h1 className="hotspot-title">
          HotSpot 10: Explore as tendências musicais da semana 🔥
        </h1>
        <span className="hotspot-page-container">
          {hotspots.length > 0
            ? hotspots.map((item, index) => {
                return <HotSpotTrend key={index} props={item} />;
              })
            : null}
        </span>
      </section>
    </>
  );
};
