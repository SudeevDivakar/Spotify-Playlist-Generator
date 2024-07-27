import "./InfiniteCarousel.css";

export default function InfiniteCarousel() {
  const images = [
    "https://yt3.googleusercontent.com/6V0CcYb9kTkxLqNH5BWDPLKIs_WqWv2Q9e0DsuhwfxiYavSQWQ_dVTTwzd5fIBVsU3s0bTetZg=s900-c-k-c0x00ffffff-no-rj",
    "https://images.mid-day.com/images/images/2023/mar/Raghu-Dixit_d.jpg",
    "https://images.hellomagazine.com/horizon/square/7e9358879f4b-rihanna-green-dress.jpg",
    "https://filmfare.wwmindia.com/content/2022/apr/arijitsingh11650885572.jpg",
    "https://www.mensjournal.com/.image/t_share/MjAyNzQ0NDMzNzE4ODYyOTE2/weekends-with-adele-residency-opens-at-the-colosseum-at-caesars-palace.jpg",
    "https://blackhattalent.com/wp-content/uploads/2023/07/1601537507_screenshot_20201001-130025_instagram_copy_1200x800.jpg",
    "https://media.gq.com/photos/5d28ae8d3691470008b21798/16:9/w_2560%2Cc_limit/What's-the-Point-of-Ed-Sheeran-G-2019-071219.jpg",
    "https://img.etimg.com/thumb/width-1200,height-900,imgsize-162490,resizemode-75,msid-101262414/news/international/us/taylor-swift-performs-dear-john-for-first-time-since-2012.jpg",
    "https://www.billboard.com/wp-content/uploads/2022/04/Travis-Scott-2022-billboard-1548.jpg?w=942&h=623&crop=1",
    "https://media.pitchfork.com/photos/5f3ff9dcf6eb11025fede860/1:1/w_450%2Cc_limit/everythng%2520means%2520nothing_blackbear.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/34/Tri_Nation_Mega_Concert_Sonu_Nigam_%288388639915%29.jpg",
    "https://m.media-amazon.com/images/M/MV5BODg4N2I0NmEtNTIyMS00MzVjLThjYzgtODAwMzcwYThkMTVkXkEyXkFqcGdeQXVyMTI2Nzk3NzI4._V1_FMjpg_UX1000_.jpg",
    "https://www.billboard.com/wp-content/uploads/2024/06/Eminem-press-credit-Travis-Shinn-2024-billboard-1548.jpg?w=942&h=623&crop=1",
  ];
  return (
    <div className="py-10 w-full artists">
      <div className="h-32 artists-slide">
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
      <div className="h-32 artists-slide">
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
