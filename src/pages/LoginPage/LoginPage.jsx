import queryString from "query-string";
import "./LoginPage.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
      ""
    );
  };

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

  useEffect(() => {
    const error = Cookies.get("invalid_code");
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    if (access_token && refresh_token) {
      navigate("/create-playlist");
    }
    if (!error) {
      return;
    } else {
      notify(error);
      setTimeout(() => {
        Cookies.remove("invalid_code");
      }, 3000);
    }
  }, []);

  const notify = (errorText) => {
    toast.error(errorText, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div id="full-container" className="middle-align">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        id="left-box"
        className="middle-align bg-black w-4/6 text-white flex-col"
      >
        <h1 id="main-header" className="font-bold text-5xl mb-7 text-green-500">
          Spotify Playlist Generator
        </h1>
        <h3 id="secondary-header" className="font-medium text-xl mb-14">
          Create Custom Playlists Tailored to Your Preferences
        </h3>

        <div
          id="saucy-section"
          className="flex w-full justify-around items-center"
        >
          <img
            id="music-dood"
            src="/music_dude.jpg"
            alt=""
            className="rounded-full"
          />
          <div
            id="right-box-responsive"
            className="middle-align text-white bg-black top-section flex-col h-auto"
          >
            <button
              id="login-button"
              className="bg-green-600 p-4 mt-5 rounded-full font-medium hover:scale-105 transition-transform"
              onClick={() => {
                authorise();
              }}
            >
              Login with Spotify
            </button>
          </div>

          <div id="sauce">
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
                <span>Eminem|</span>
              </li>
              <li className="text-5xl font-semibold">
                <span>Rihanna|</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="creator-handles-custom"
        className="bottom-section bg-black flex items-center justify-around w-full text-white"
      >
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
      <div id="right-section-login" className="w-2/6">
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
