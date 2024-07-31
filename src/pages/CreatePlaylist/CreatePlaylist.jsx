import "./CreatePlaylist.css";
import { useState } from "react";
import Custom from "./Custom";
import Top from "./Top";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CreatePlaylist() {
  const [page, setPage] = useState("top");

  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`items-center min-h-screen flex flex-col ${
        loading ? "justify-center bg-green-600" : "bg-black"
      }`}
    >
      {loading ? (
        <>
          <h1 className="font-extrabold text-xl mb-10">HOLD ON WHILE WE</h1>
          <h1 className="font-bold text-5xl text-white animate-bounce">
            GENERATE YOUR PLAYLIST
          </h1>
          <AiOutlineLoading3Quarters className="animate-spin text-white text-5xl mt-10" />
        </>
      ) : (
        <>
          <h1 className="font-extrabold text-3xl mt-10 text-green-600">
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
