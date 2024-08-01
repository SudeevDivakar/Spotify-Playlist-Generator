import "./InfiniteCarousel.css";

export default function InfiniteCarousel() {
  const images = [
    "./kid_laroi.webp",
    "./raghu_dixit.webp",
    "./rihanna.webp",
    "./arijit_singh.webp",
    "./adele.jpg",
    "./sunidhi_chauhan.jpg",
    "./ed_sheeran.webp",
    "./taylor_swift.webp",
    "./travis_scott.webp",
    "./blackbear.webp",
    "./sonu_nigam.jpg",
    "./post_malone.jpg",
    "./eminem.webp",
  ];
  return (
    <div id="artists" className="py-10 w-full artists">
      <div id="first-slide" className="h-32 artists-slide">
        {images.map((image, index) => {
          return (
            <img
              loading="lazy"
              src={image}
              key={index}
              alt="Artist"
              className="h-32 w-auto rounded-lg inline mr-10"
            />
          );
        })}
      </div>
      <div id="second-slide" className="h-32 artists-slide">
        {images.map((image, index) => {
          return (
            <img
              loading="lazy"
              src={image}
              key={index}
              alt="Artist"
              className="h-32 w-auto rounded-lg inline mr-10"
            />
          );
        })}
      </div>
    </div>
  );
}
