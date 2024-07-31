import { useState } from "react";
import InfiniteCarousel from "../../components/InfiniteCarousel/InfiniteCarousel";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useAddSongsToPlaylist from "../../hooks/useAddSongsToPlaylist";

export default function Top() {
  const [errors, setErrors] = useState({
    playlistName: "",
    limit: "",
  });

  const [formData, setFormData] = useState({
    limit: 15,
    playlistName: "",
  });

  let [accessToken, refreshAccessToken] = useAuth();
  const createPlaylist = useCreatePlaylist();
  const addSongsToPlaylist = useAddSongsToPlaylist();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((oldFormData) => {
      return { ...oldFormData, [name]: value };
    });
    if (name === "limit" && errors.limit) {
      setErrors((oldErrors) => {
        return { ...oldErrors, limit: "" };
      });
    } else if (name === "playlistName" && errors.playlistName) {
      setErrors((oldErrors) => {
        return { ...oldErrors, playlistName: "" };
      });
    }
  }

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!formData.playlistName) {
      newErrors.playlistName = "Please Provide a Playlist Name";
      isValid = false;
    } else {
      newErrors.playlistName = "";
    }

    if (formData.limit > 20) {
      newErrors.limit = "Too Many Artists";
      isValid = false;
    } else if (formData.limit < 5) {
      newErrors.limit = "Not Enough Artists";
      isValid = false;
    } else {
      newErrors.limit = "";
    }

    setErrors((oldErrors) => ({ ...oldErrors, ...newErrors }));
    return isValid;
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

      if (formData.limit <= 10) {
        if (topTracks.length <= 10) {
          for (let i of topTracks) {
            trackIDs.push(`spotify:track:${i.id}`);
          }
        } else {
          const temporary_IDs = [];
          for (let track of topTracks) {
            temporary_IDs.push(track.id);
          }
          for (let i = 0; i < 10; i++) {
            let index = Math.floor(Math.random() * temporary_IDs.length);
            trackIDs.push(`spotify:track:${temporary_IDs[index]}`);
            temporary_IDs.splice(index, 1);
          }
        }
      } else {
        if (topTracks.length <= 5) {
          for (let i of topTracks) {
            trackIDs.push(`spotify:track:${i.id}`);
          }
        } else {
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
      }
    }
    const playlist_id = await createPlaylist(formData.playlistName);
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
        className="flex flex-col items-center bg-black py-2 px-1 w-full rounded-xl"
      >
        <div className="mt-8 inline-block">
          <label
            htmlFor="playlistName"
            className="font-semibold text-md text-2xl text-white"
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
              autoComplete="off"
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
          <label
            htmlFor="limit"
            className="font-semibold text-md text-xl text-white"
          >
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
              autoComplete="off"
            />
            {errors.limit ? (
              <h1 className="absolute text-red-600">{errors.limit}</h1>
            ) : (
              ""
            )}
          </div>
        </div>

        <button
          onClick={getTopArtistIDs}
          className="bg-white hover:scale-105 active:scale-95 transition-transform text-green-600 font-semibold py-2 px-3 rounded-xl mt-8 mb-5"
        >
          CREATE PLAYLIST
        </button>
      </div>
    </div>
  );
}
