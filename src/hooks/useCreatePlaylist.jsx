import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "./useAuth";
import useSpotifyUserId from "./useSpotifyUserId";

const useCreatePlaylist = () => {
  const [accessToken, refreshAccessToken] = useAuth();
  const userId = useSpotifyUserId();

  const createPlaylist = async (playlistName) => {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    if (userId && accessToken) {
      try {
        const createPlaylistResponse = await axios.post(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            name: playlistName,
            description:
              "Playlist made for you using artists selected by you. :D",
            public: true,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return createPlaylistResponse.data.id;
      } catch (error) {
        console.error("Error creating Spotify playlist:", error);
      }
    }
  };

  return createPlaylist;
};

export default useCreatePlaylist;
