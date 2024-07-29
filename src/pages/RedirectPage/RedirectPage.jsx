import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import "./RedirectPage.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function RedirectPage() {
  const navigate = useNavigate();

  async function getAccessToken(queryParams) {
    const code = queryParams.get("code");

    const encodedCredentials = btoa(
      `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
    );

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
      Cookies.set("access_token", response.data.access_token, {
        expires: inOneHour,
      });
      Cookies.set("refresh_token", response.data.refresh_token);
      navigate("/create-playlist");
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    getAccessToken(queryParams);
  });

  return (
    <div id="full-container" className="middle-align">
      <div
        id="left-box"
        className="middle-align bg-black w-4/6 text-white h-screen flex-col"
      >
        <h1 className="font-bold text-5xl mb-7 text-green-500">
          Spotify Playlist Generator
        </h1>
        <h3 className="font-medium text-xl mb-14">
          Create Custom Playlists Tailored to Your Preferences
        </h3>
        <div className="flex w-full justify-around items-center">
          <img src="/music_dude.jpg" alt="" className="rounded-full" />
          <div>
            <h1 className="text-4xl font-semibold mb-10">
              From Your Favourite Artists
            </h1>
            <ul className="dynamic-texts">
              <li className="text-5xl font-semibold text-green-600">
                <span>Ed Sheeran|</span>
              </li>
              <li className="text-5xl font-semibold">
                <span>Arijit Singh|</span>
              </li>
              <li className="text-5xl font-semibold text-green-600">
                <span>Taylor Swift|</span>
              </li>
              <li className="text-5xl font-semibold">
                <span>Rihanna|</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-2/6">
        <div
          id="right-box"
          className="middle-align text-white bg-green-600 h-screen flex-col"
        >
          <h2 className="font-semibold text-5xl mb-14 text-center">
            Hold On While We Redirect You
          </h2>
          <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
        </div>
      </div>
    </div>
  );
}
