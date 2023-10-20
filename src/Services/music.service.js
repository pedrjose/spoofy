import axios from "axios";
import { breaklineContent } from "./breakline.service";

const apiUrl = "https://api.vagalume.com.br/search.php";

export const findLyrics = async (artist, music) => {
  const response = await axios.get(`${apiUrl}?art=${artist}&mus=${music}`);

  if (response.data.type === "notfound" || response.data.mus === undefined) {
    return { promiseSolved: false };
  } else {
    return {
      promiseSolved: true,
      artist: response.data.art.name,
      musicName: response.data.mus[0].name,
      musicLyric: breaklineContent(response.data.mus[0].text),
      translate: breaklineContent(response.data.mus[0].translate[0].text),
      badwords: response.data.badwords,
    };
  }
};
