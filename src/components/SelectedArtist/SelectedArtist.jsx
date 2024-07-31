import { IoIosClose } from "react-icons/io";

export default function SelectedArtist({
  selectedArtist,
  selectedArtists,
  setSelectedArtists,
  errors,
  setErrors,
}) {
  function selectedArtistsRemove() {
    if (selectedArtists && selectedArtists.length > 20 && errors.limit) {
      setErrors((oldErrors) => {
        return { ...oldErrors, limit: "" };
      });
    }
    const filteredArray = selectedArtists.filter(
      (artist) => artist.id !== selectedArtist.id
    );
    setSelectedArtists(filteredArray);
  }

  return (
    <div className="w-[90%] bg-black text-white mt-2 mb-2 flex rounded-lg">
      <img
        src={selectedArtist.image}
        alt=""
        className="h-14 w-auto rounded-l-lg"
      />
      <h1 className="flex justify-center items-center w-full">
        {selectedArtist.name}
      </h1>
      <button
        onClick={selectedArtistsRemove}
        className="cursor-pointer flex items-center mr-5 hover"
      >
        <IoIosClose className="h-[30%] bg-white text-black rounded-full" />
      </button>
    </div>
  );
}
