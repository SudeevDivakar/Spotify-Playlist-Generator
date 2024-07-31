import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAddSongsToPlaylist = () => {
  const [accessToken, refreshAccessToken] = useAuth();
  const navigate = useNavigate();

  const addSongsToPlaylist = async (trackIDs, playlist_id) => {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    const addSongsToPlaylistResponse = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        uris: trackIDs,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    navigate("/success");
  };

  return addSongsToPlaylist;
};

export default useAddSongsToPlaylist;
