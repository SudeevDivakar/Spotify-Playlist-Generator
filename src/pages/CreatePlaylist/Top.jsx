import { useState } from "react";
import InfiniteCarousel from "../../components/InfiniteCarousel/InfiniteCarousel";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Top() {
  const [errors, setErrors] = useState({
    playlistName: "",
    playlistType: "",
    limit: "",
  });

  const [formData, setFormData] = useState({
    limit: 15,
    playlistType: "true",
    playlistName: "",
  });

  let [accessToken, refreshAccessToken] = useAuth();

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((oldFormData) => {
      return { ...oldFormData, [name]: value };
    });
  }

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!formData.playlistName) {
      newErrors.playlistName = "Please Provide a Playlist Name";
      isValid = false;
    }

    if (formData.limit > 20) {
      newErrors.limit = "Too Many Artists";
      isValid = false;
    } else if (formData.limit < 5) {
      newErrors.limit = "Not Enough Artists";
      isValid = false;
    }

    setErrors((oldErrors) => ({ ...oldErrors, ...newErrors }));
    return isValid;
  }

  async function addSongsToPlaylist(trackIDs, playlist_id) {
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
  }

  async function getUserId() {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    const getProfileResponse = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return getProfileResponse.data.id;
  }

  async function createPlaylist() {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    const userId = await getUserId();

    const createPlaylistResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: formData.playlistName,
        description:
          "Playlist made for you using random songs from your top artists. :D",
        public: formData.playlistType === "true" ? true : false,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return createPlaylistResponse.data.id;
  }

  async function getArtistsTopTracks(artistIDs) {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    const trackIDs = [];

    for (let id of artistIDs) {
      const topTracksResponse = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const topTracks = topTracksResponse.data.tracks;
      const temporary_IDs = [];
      for (let track of topTracks) {
        temporary_IDs.push(track.id);
      }
      for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * temporary_IDs.length);
        trackIDs.push(`spotify:track:${temporary_IDs[index]}`);
        temporary_IDs.splice(index, 1);
      }
    }
    const playlist_id = await createPlaylist();
    addSongsToPlaylist(trackIDs, playlist_id);
  }

  async function getTopArtistIDs() {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    const isFormValid = validateForm();

    if (isFormValid) {
      const top20ArtistsResponse = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          params: {
            limit: formData.limit,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const top20List = top20ArtistsResponse.data.items;
      const artistIDs = [];
      for (let artist of top20List) {
        artistIDs.push(artist.id);
      }
      getArtistsTopTracks(artistIDs);
    } else {
      return;
    }
  }

  return (
    <div className="flex flex-col items-center w-[90%] overflow-hidden mb-10">
      <h1 className="font-bold text-3xl mt-10">
        Make a Playlist Using Random Songs From Your Top Artists
      </h1>

      <InfiniteCarousel />

      <div
        id="form-section"
        className="flex flex-col items-center bg-gray-200 py-2 px-1 w-full rounded-xl"
      >
        <div className="mt-8 inline-block">
          <label
            htmlFor="playlistName"
            className="font-semibold text-md text-2xl"
          >
            Playlist Name:
          </label>
          <div className="inline-block">
            <input
              type="text"
              id="playlistName"
              name="playlistName"
              value={formData.playlistName}
              onChange={handleChange}
              className={`border border-black rounded-md ml-1 p-1 ${
                errors.playlistName ? "border-red-500 border-2 relative" : ""
              }`}
            />
            {errors.playlistName ? (
              <h1 className="absolute text-red-600">{errors.playlistName}</h1>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mt-8 inline-block">
          <label htmlFor="limit" className="font-semibold text-md text-xl">
            Number of Top Artists (5-20):
          </label>
          <div className="inline-block">
            <input
              id="limit"
              name="limit"
              type="number"
              className={`w-14 ml-2 rounded-md p-1 border border-black ${
                errors.limit ? "border-red-500 border-2" : ""
              }`}
              value={formData.limit}
              onChange={handleChange}
            />
            {errors.limit ? (
              <h1 className="absolute text-red-600">{errors.limit}</h1>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="mt-8 w-full flex justify-center">
          <div>
            <input
              type="radio"
              id="public-playlist"
              name="playlistType"
              value="true"
              checked
              onChange={handleChange}
            />
            <label
              htmlFor="public-playlist"
              className="text-lg inline-block mr-2"
            >
              Public Playlist
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="private-playlist"
              name="playlistType"
              value="false"
              onChange={handleChange}
              className="ml-2"
            />
            <label htmlFor="private-playlist" className="text-lg inline-block">
              Private Playlist
            </label>
          </div>
        </div>

        <button
          onClick={getTopArtistIDs}
          className="bg-black hover:scale-105 active:scale-95 transition-transform text-white text-green-600 py-2 px-3 rounded-xl mt-8 mb-5"
        >
          CREATE PLAYLIST
        </button>
      </div>
    </div>
  );
}
