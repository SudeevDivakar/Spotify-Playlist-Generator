export default function DisplayedArtist({
  displayedArtist,
  setSelectedArtists,
  selectedArtists,
  errors,
  setErrors,
}) {
  function handleDisplayedArtistClick() {
    if (selectedArtists && selectedArtists.length < 5 && errors.limit) {
      setErrors((oldErrors) => {
        return { ...oldErrors, limit: "" };
      });
    }
    setSelectedArtists((oldSelectedArtists) => {
      if (
        !oldSelectedArtists.find((ele) => ele.id === displayedArtist.id) &&
        selectedArtists &&
        selectedArtists.length < 20
      ) {
        return [...oldSelectedArtists, displayedArtist];
      } else {
        return oldSelectedArtists;
      }
    });
  }

  return (
    <button
      onClick={handleDisplayedArtistClick}
      className="w-full flex cursor-pointer p-1 rounded-lg hover:bg-gray-300"
    >
      <img
        src={displayedArtist.image}
        alt=""
        className="h-12 w-auto rounded-lg"
      />
      <h1 className="flex justify-center items-center h-full w-full">
        {displayedArtist.name}
      </h1>
    </button>
  );
}
