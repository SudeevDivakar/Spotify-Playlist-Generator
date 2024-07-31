import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "./useAuth";

const useAddSongsToPlaylist = () => {
  const [accessToken, refreshAccessToken] = useAuth();

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

    console.log(addSongsToPlaylistResponse.data);
  };

  return addSongsToPlaylist;
};

export default useAddSongsToPlaylist;
