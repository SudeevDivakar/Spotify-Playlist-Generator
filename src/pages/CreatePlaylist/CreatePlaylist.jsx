import "./CreatePlaylist.css";
import { useEffect, useState } from "react";
import Custom from "./Custom";
import Top from "./Top";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePlaylist() {
  const [page, setPage] = useState("top");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profileName, setProfileName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  async function getAccountInfo(accessToken) {
    const getAccountInfoResponse = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setProfileName(getAccountInfoResponse.data.display_name);
    setProfilePic(getAccountInfoResponse.data.images[0].url);
  }

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    const invalid_code = Cookies.get("invalid_code");

    if (access_token) {
      getAccountInfo(access_token);
    }

    if (access_token && refresh_token && !invalid_code) {
      Cookies.remove("invalid_code", { path: "" });
    }
  });

  function logout() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    navigate("/");
  }

  return (
    <div
      className={`items-center min-h-screen flex flex-col ${
        loading ? "justify-center bg-green-600" : "bg-black"
      }`}
    >
      {loading ? (
        <>
          <h1 className="font-extrabold text-xl mb-10">HOLD ON WHILE WE</h1>
          <h1 className="font-bold text-[1.4rem] sm:text-4xl md:text-5xl text-white animate-bounce">
            GENERATE YOUR PLAYLIST
          </h1>
          <AiOutlineLoading3Quarters className="animate-spin text-white text-5xl mt-10" />
        </>
      ) : (
        <>
          <div className="w-full flex justify-end">
            <img
              src={
                profilePic === ""
                  ? "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  : profilePic
              }
              alt="Profile Pic"
              className="h-10 w-10 rounded-full mr-5 mt-5 cursor-pointer"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            />
            {showDropdown && (
              <div className="absolute top-16 right-20 bg-white text-black p-3 rounded shadow-lg">
                <h1 className="font-semibold">{profileName}</h1>
              </div>
            )}
            <button
              onClick={logout}
              className="bg-red-800 text-white h-10 mt-5 mr-3 p-2 rounded-lg hover:bg-red-900 transition-all"
            >
              LogOut
            </button>
          </div>
          <h1 className="font-extrabold text-3xl mt-5 text-green-600 w-[90%] text-center">
            Choose a way to craft your perfect playlist
          </h1>
          <div className="mt-10">
            <button
              id="top-artist"
              className={`${
                page === "top" ? "bg-green-600 active" : ""
              } text-white p-4 rounded-t-lg relative`}
              onClick={() => setPage("top")}
            >
              Top Artists
            </button>
            <button
              id="custom"
              className={`${
                page === "custom" ? "bg-green-600 active" : ""
              } text-white p-4 rounded-t-lg relative`}
              onClick={() => setPage("custom")}
            >
              Handpicked Artists
            </button>
          </div>
          <div className="w-5/6 flex justify-center border-2 rounded-xl bg-green-600 border-green-600 mb-10">
            {page === "custom" ? (
              <Custom setLoading={setLoading} />
            ) : (
              <Top setLoading={setLoading} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
