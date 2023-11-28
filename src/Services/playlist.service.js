import axios from "axios";

const apiUrl = "https://spoofy-api.onrender.com";

export const createPlaylist = async (id, playlistName) => {
  try {
    const response = await axios.patch(`${apiUrl}/user/create-playlist`, {
      id,
      playlistName,
    });

    return response.data.message;
  } catch (err) {
    console.log(err.response);
  }
};

export const findUserPlaylists = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/user/find-playlist-by-user`, {
      userId,
    });

    return response;
  } catch (err) {
    console.log(err.response.data);
  }
};
