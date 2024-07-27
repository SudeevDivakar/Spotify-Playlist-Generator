import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import "./LoginPage.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function LoginPage() {
  const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
      ""
    );
  };

  async function getAuthCode(queryParams) {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      queryString.stringify({
        code: code,
        redirect_uri: "http://localhost:5173",
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    );
    if (response.data.status) {
      console.log("hi");
    } else {
    }
  }

  const authorise = async () => {
    const state = generateRandomString(16);
    const scope =
      "user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public";

    const queryParams = queryString.stringify({
      response_type: "code",
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: scope,
      redirect_uri: import.meta.env.VITE_REDIRECT_URL,
      state: state,
    });

    const authorisationUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
    window.location.href = authorisationUrl;
  };

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
          className="middle-align text-white bg-green-600 top-section flex-col"
        >
          <h2 className="font-semibold text-5xl mb-14 text-center">
            Get Started Now
          </h2>
          <button
            id="login-button"
            className="bg-black p-4 rounded-full font-medium hover:scale-105 transition-transform"
            onClick={() => {
              authorise();
            }}
          >
            Login with Spotify
          </button>
        </div>
        <div className="bottom-section bg-green-600 flex items-center justify-around">
          <span className="font-semibold">Creator Handles:</span>
          <a target="_blank" href="https://github.com/SudeevDivakar">
            <FaGithub />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/sudeev-divakar-66116026a/"
          >
            <FaLinkedin />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/sudeev_gb?igsh=NGl0YXJqMXpodjk5"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}
