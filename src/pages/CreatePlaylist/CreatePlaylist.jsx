// import "./CreatePlaylist.css";
import { useState } from "react";
import Custom from "./Custom";
import Top from "./Top";

export default function CreatePlaylist() {
  const [page, setPage] = useState("top");

  return (
    <div className="items-center min-h-screen flex flex-col bg-black">
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
          Use My Top Artists
        </button>
        <button
          id="custom"
          className={`${
            page === "custom" ? "bg-green-600 active" : ""
          } text-white p-4 rounded-t-lg relative`}
          onClick={() => setPage("custom")}
        >
          Use Handpicked Artists
        </button>
      </div>
      <div className="w-5/6 flex justify-center border-2 rounded-xl bg-green-600 border-green-600 mb-10">
        {/* {page === "custom" ? <Custom /> : <Top />} */}
        {page === "custom" ? "lol" : "hi"}
      </div>
    </div>
  );
}
