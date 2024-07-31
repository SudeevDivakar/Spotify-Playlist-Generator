import { useState } from "react";
import axios from "axios";
import queryString from "query-string";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";
import InfiniteCarousel from "../../components/InfiniteCarousel/InfiniteCarousel";
import SelectedArtist from "../../components/SelectedArtist/SelectedArtist";
import DisplayedArtist from "../../components/DisplayedArtist/DisplayedArtist";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useAddSongsToPlaylist from "../../hooks/useAddSongsToPlaylist";
import { useEffect } from "react";

export default function Custom({ setLoading }) {
  const [formData, setFormData] = useState({
    searchText: "",
    playlistName: "",
  });

  const [errors, setErrors] = useState({
    playlistName: "",
    limit: "",
  });

  const [selectedArtists, setSelectedArtists] = useState([]);

  const [displayArtists, setDisplayArtists] = useState([]);

  useEffect(() => {
    const addedArtistsDiv = document.getElementById("added-artists");
    addedArtistsDiv.scrollTop = addedArtistsDiv.scrollHeight;
    // window.scrollTo({
    //   top: document.body.scrollHeight / 2.5,
    //   behavior: "smooth",
    // });
    document.getElementById("added-artists").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedArtists]);

  let [accessToken, refreshAccessToken] = useAuth();
  const createPlaylist = useCreatePlaylist();
  const addSongsToPlaylist = useAddSongsToPlaylist();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((oldFormData) => {
      return { ...oldFormData, [name]: value };
    });

    if (name === "searchText") {
      if (value !== "") {
        const query = queryString.stringify({
          q: value,
          type: "artist",
          limit: 5,
        });
        searchArtists(query);
      } else {
        setDisplayArtists([]);
      }
    }

    if (name === "playlistName" && errors.playlistName) {
      setErrors((oldErrors) => {
        return { ...oldErrors, playlistName: "" };
      });
    }
  }

  async function searchArtists(query) {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    const displayArtistsResponse = await axios.get(
      `https://api.spotify.com/v1/search?${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const artistItems = displayArtistsResponse.data.artists.items;
    const final_artist_list = [];
    for (let artistItem of artistItems) {
      final_artist_list.push({
        id: artistItem.id,
        image: artistItem.images[2].url,
        name: artistItem.name,
      });
    }
    setDisplayArtists(final_artist_list);
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

    if (selectedArtists && selectedArtists.length < 5) {
      newErrors.limit = "Not Enough Artists";
      isValid = false;
    } else if (selectedArtists && selectedArtists.length > 20) {
      newErrors.limit = "Too many Artists";
      isValid = false;
    } else {
      newErrors.limit = "";
    }

    setErrors((oldErrors) => ({ ...oldErrors, ...newErrors }));
    return isValid;
  }

  async function getArtistsTopTracks() {
    const checkAccessToken = Cookies.get("access_token");
    if (!accessToken || !checkAccessToken) {
      await refreshAccessToken();
    }

    const isFormValid = validateForm();

    if (isFormValid) {
      setLoading(true);

      const trackIDs = [];

      for (let i of selectedArtists) {
        const selectedArtistTracksResponse = await axios.get(
          `https://api.spotify.com/v1/artists/${i.id}/top-tracks?market=IN`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const selectedArtistTracks = selectedArtistTracksResponse.data.tracks;

        if (selectedArtists && selectedArtists.length <= 10) {
          if (selectedArtistTracks.length <= 10) {
            for (let i of selectedArtistTracks) {
              trackIDs.push(`spotify:track:${i.id}`);
            }
          } else {
            const temporary_IDs = [];
            for (let track of selectedArtistTracks) {
              temporary_IDs.push(track.id);
            }
            for (let i = 0; i < 10; i++) {
              let index = Math.floor(Math.random() * temporary_IDs.length);
              trackIDs.push(`spotify:track:${temporary_IDs[index]}`);
              temporary_IDs.splice(index, 1);
            }
          }
        } else {
          if (selectedArtistTracks.length <= 5) {
            for (let i of selectedArtistTracks) {
              trackIDs.push(`spotify:track:${i.id}`);
            }
          } else {
            const temporary_IDs = [];
            for (let track of selectedArtistTracks) {
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
    } else {
      return;
    }
  }

  return (
    <div className="flex flex-col items-center w-[90%]">
      <h1 className="font-bold text-3xl mt-10">
        Make a Playlist Using Artists YOU Want
      </h1>
      <div className="flex justify-around w-full mt-10">
        <div className="w-[63%] overflow-hidden">
          <InfiniteCarousel />

          <div
            id="form-section"
            className="flex flex-col items-center bg-black py-2 px-1 w-full rounded-xl my-2"
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
                  className={`border rounded-md ml-2 p-1 ${
                    errors.playlistName
                      ? "border-red-500 border-2 relative"
                      : "border-black"
                  }`}
                />
                {errors.playlistName ? (
                  <h1 className="absolute text-red-600">
                    {errors.playlistName}
                  </h1>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button
              onClick={getArtistsTopTracks}
              className="bg-white hover:scale-105 active:scale-95 transition-transform text-green-600 font-semibold py-2 px-3 rounded-xl mt-8 mb-5"
            >
              CREATE PLAYLIST
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center w-[33%]">
          <h1 className="mb-2 font-semibold text-xl">
            Search and Add Artists (5-20)
          </h1>
          <input
            type="text"
            placeholder="Search Artists"
            id="searchText"
            name="searchText"
            autoComplete="off"
            className="p-2 rounded-t-md w-[90%] bg-gray-200"
            value={formData.searchText}
            onChange={handleChange}
          />
          {displayArtists && displayArtists.length > 0 && (
            <div className="w-[90%] flex flex-col h-72 bg-white rounded-b-lg">
              {displayArtists.map((displayedArtist) => {
                return (
                  <DisplayedArtist
                    key={displayedArtist.id}
                    displayedArtist={displayedArtist}
                    setSelectedArtists={setSelectedArtists}
                    selectedArtists={selectedArtists}
                    errors={errors}
                    setErrors={setErrors}
                  />
                );
              })}
            </div>
          )}
          <h1 className="mt-8 font-semibold text-2xl">Added Artists</h1>
          <div
            id="added-artists"
            className={`w-full bg-white rounded-lg h-60 mb-2 mt-2 py-2 overflow-auto flex flex-col items-center ${
              errors.limit ? "border-2 border-red-600" : "mb-8"
            }`}
          >
            {selectedArtists && selectedArtists.length > 0 ? (
              selectedArtists.map((selectedArtist) => {
                return (
                  <SelectedArtist
                    key={selectedArtist.id}
                    selectedArtist={selectedArtist}
                    selectedArtists={selectedArtists}
                    setSelectedArtists={setSelectedArtists}
                    errors={errors}
                    setErrors={setErrors}
                  />
                );
              })
            ) : (
              <div className="text-gray-500 mt-4">No Artists Added Yet</div>
            )}
          </div>
          {errors.limit ? (
            <h1 className="text-red-600 mb-6 font-semibold">{errors.limit}</h1>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
