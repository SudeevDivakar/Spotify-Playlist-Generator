import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(Cookies.get("access_token"));
  const navigate = useNavigate();

  async function refreshAccessToken() {
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) {
      navigate("/");
    } else {
      const encodedCredentials = btoa(
        `${import.meta.env.VITE_CLIENT_ID}:${
          import.meta.env.VITE_CLIENT_SECRET
        }`
      );

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      );

      const { access_token } = response.data;

      const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
      Cookies.set("access_token", access_token, {
        expires: inOneHour,
      });
      setAccessToken(access_token);
    }
  }

  useEffect(() => {
    if (!accessToken) {
      refreshAccessToken();
    }
  }, [accessToken]);

  return [accessToken, refreshAccessToken];
}
