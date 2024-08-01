import { TbError404 } from "react-icons/tb";
import { FcPrevious } from "react-icons/fc";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-green-600 flex flex-col justify-center items-center">
      <TbError404 className="text-9xl text-white text-blue-500" />
      <h1 id="header-404" className="text-4xl font-bold mt-5 text-white">
        PAGE NOT FOUND D:
      </h1>
      <button
        onClick={() => {
          navigate("/create-playlist");
        }}
        className="flex text-white bg-black px-4 py-2 mt-8 rounded-2xl hover:scale-105 active:scale-95 transition-all"
      >
        <FcPrevious className="h-full scale-110 mr-2" />
        BACK TO HOMEPAGE
      </button>
    </div>
  );
}
