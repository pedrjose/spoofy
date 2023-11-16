import axios from "axios";
import { formatHotspotArray } from "./format.service";

const apiUrl = "https://api.vagalume.com.br/hotspots.php?"; // Adicione o protocolo https

export const hotspot = async (artist, music) => {
  try {
    const response = await axios.get(apiUrl);
    if (
      !response.data ||
      !response.data.hotspots ||
      response.data.hotspots.length === 0
    ) {
      return { promiseSolved: false };
    } else {
      const formatedHotspotArray = formatHotspotArray(response.data.hotspots);

      return formatedHotspotArray;
    }
  } catch (err) {
    return { promiseSolved: false, error: err.message };
  }
};
