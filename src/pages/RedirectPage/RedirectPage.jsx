import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import "./RedirectPage.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";

export default function RedirectPage() {
  const navigate = useNavigate();

  async function getAccessToken(queryParams) {
    const code = queryParams.get("code");

    if (code === null) {
      navigate("/");
    } else {
      const encodedCredentials = btoa(
        `${import.meta.env.VITE_CLIENT_ID}:${
          import.meta.env.VITE_CLIENT_SECRET
        }`
      );

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          queryString.stringify({
            code: code,
            redirect_uri: `${import.meta.env.VITE_REDIRECT_URL}`,
            grant_type: "authorization_code",
          }),
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${encodedCredentials}`,
            },
          }
        );

        if (!response.data.error) {
          var inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
          Cookies.set(
            "access_token",
            response.data.access_token,
            {
              expires: inOneHour,
            },
            { secure: import.meta.env.VITE_SECURE }
          );
          Cookies.set("refresh_token", response.data.refresh_token, {
            secure: import.meta.env.VITE_SECURE,
          });
          navigate("/create-playlist");
        }
      } catch (err) {
        const access_token = Cookies.get("access_token");
        const refresh_token = Cookies.get("refresh_token");
        if (!access_token && !refresh_token) {
          Cookies.set("invalid_code", err.response.data.error_description, {
            secure: import.meta.env.VITE_SECURE,
          });
          navigate("/");
        } else {
          navigate("/create-playlist");
        }
      }
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    getAccessToken(queryParams);
  });

  return (
    <div id="full-container" className="middle-align bg-green-600 flex-col ">
      <FaSpotify className="text-9xl animate-spin mb-10 text-white" />
      <h1 id="text-1" className="text-5xl font-bold mb-7 text-white">
        ONE SEC !
      </h1>
      <h1 id="text-2" className="text-2xl font-bold text-white">
        AMAZING PLAYLISTS ARRIVING YOUR WAY
      </h1>
    </div>
  );
}
