import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "./useAuth";

const useSpotifyUserId = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, refreshAccessToken] = useAuth();

  useEffect(() => {
    const fetchUserId = async () => {
      const checkAccessToken = Cookies.get("access_token");
      if (!accessToken || !checkAccessToken) {
        await refreshAccessToken();
      }

      if (accessToken) {
        try {
          const getProfileResponse = await axios.get(
            "https://api.spotify.com/v1/me",
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setUserId(getProfileResponse.data.id);
        } catch (error) {
          console.error("Error fetching Spotify user ID:", error);
        }
      }
    };

    fetchUserId();
  }, [accessToken, refreshAccessToken]);

  return userId;
};

export default useSpotifyUserId;
