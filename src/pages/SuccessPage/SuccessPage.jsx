import { FcPrevious } from "react-icons/fc";
import { FaSpotify } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div
      id="main-content"
      className="h-screen bg-green-600 flex flex-col items-center justify-center"
    >
      <FaSpotify className="animate-bounce text-9xl" />
      <h1 className="text-4xl font-bold mt-8">PLAYLIST GENERATED</h1>
      <h1 className="text-4xl font-bold mt-8">HAPPY LISTENING!</h1>
      <button
        onClick={() => {
          navigate("/create-playlist");
        }}
        className="flex text-white bg-black px-4 py-2 mt-8 rounded-2xl hover:scale-105 active:scale-95 transition-all"
      >
        <FcPrevious className="h-full scale-110 mr-2" />
        MORE MUSIC
      </button>
    </div>
  );
}
