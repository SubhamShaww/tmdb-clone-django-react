import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Movies.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Movies({ title, fetchUrl, isTrailer, isTrending }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [trailerBackgroundUrl, setTrailerBackgroundUrl] = useState("");
  // const [showBlur, setShowBlur] = useState(true);
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const myRef = useRef(null);

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  // a snippet of code that runs on specific condition / variable.
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();

    // const handleScroll = () => {
    //   const currentPosition = myRef.current;

    //   // window.pageYOffset;

    //   if (currentPosition > 20) {
    //     setShowBlur(false);
    //     setScrollPosition(currentPosition);
    //   }
    // };

    // window.addEventListener("scroll", handleScroll, { passive: true });

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie.title ||
          movie.original_title ||
          movie.name ||
          movie.original_name ||
          ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(trailerUrl);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="movies"
      style={
        (isTrailer && {
          backgroundImage: `linear-gradient(
            to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0) 100%
          ), url(
            "https://image.tmdb.org/t/p/original/8M4u0pzhsCG3Z4Kl7uMJq6nvGRs.jpg"
          )`,
          backgroundPosition: "center",
          color: "white",
        }) ||
        (isTrending && {
          backgroundImage: `url(
            "https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg"
          )`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        })
      }
    >
      <h2 className="category-title">{title}</h2>

      <div className="row-posters">
        {/* several posters */}
        {movies.map((movie) => {
          return (
            (isTrailer ? movie.backdrop_path : movie.poster_path) && (
              <div
                key={movie.id}
                className={`each-movie-box ${isTrailer && "each-trailer-box"}`}
              >
                <img
                  onClick={
                    isTrailer &&
                    (() => {
                      handleClick(movie);
                    })
                  }
                  className={`row-poster ${isTrailer && "row-poster-backdrop"}`}
                  src={`${imageBaseUrl}${
                    isTrailer ? movie.backdrop_path : movie.poster_path
                  }`}
                  alt={movie.name}
                />
                <div
                  className={`row-poster-content ${
                    isTrailer && "row-poster-content-trailer"
                  }`}
                >
                  <h2 className="movie-title">
                    {movie.title ||
                      movie.original_title ||
                      movie.name ||
                      movie.original_name}
                  </h2>
                  {!isTrailer && (
                    <p className="movie-date">
                      {movie.first_air_date || movie.release_date}
                    </p>
                  )}
                </div>
              </div>
            )
          );
        })}
        <div className={!isTrailer && "row-posters-blur"}></div>
      </div>

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Movies;
