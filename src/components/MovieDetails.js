import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import states from "../context/states";
import CircularProgress from "./CircularProgress";
import People from "./People";
import TrendingMovie from "./TrendingMovie";
import { useNavigate } from "react-router-dom";
export default function MovieDetails() {
  const navigate = useNavigate();
  const { setMovieDetails, movieDetails, loading, setLoading } =
    useContext(states);
  const { id } = useParams();
  const [data, setData] = useState({});
  const key = process.env.REACT_APP_SECRET_KEY;

  //If movie is not present in movieDetails fetch it
  const fetchMovieDetails = async (id) => {
    setData({});
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + key,
        },
      };

      const response = await fetch(url, options);
      const output = await response.json();

      //fetch cast for this movie
      const url2 = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
      const options2 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + key,
        },
      };

      const response2 = await fetch(url2, options2);
      const data2 = await response2.json();
      output.cast = data2.cast;

      //fetch similar movies

      const url3 = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
      const options3 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + key,
        },
      };

      const response3 = await fetch(url3, options3);
      const data3 = await response3.json();
      output.similar = data3.results;

      //fetch reviews

      const url4 = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
      const options4 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3MTlhMTI3OWNkYzliMjQ3NzFkOTMxZTU3OTdkYiIsInN1YiI6IjY1NzYwMTQyNTY0ZWM3MDBmZWI0Y2QxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfaXg2Q4f0I4-rvcZ7nCVHWIKUi8OnpeyVZ58rklLuc",
        },
      };

      const response4 = await fetch(url4, options4);
      let review = await response4.json();
      review = review.results;
      output.review = review;

      //fetch keywords
      const url5 = `https://api.themoviedb.org/3/movie/${id}/keywords`;
      const options5 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3MTlhMTI3OWNkYzliMjQ3NzFkOTMxZTU3OTdkYiIsInN1YiI6IjY1NzYwMTQyNTY0ZWM3MDBmZWI0Y2QxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfaXg2Q4f0I4-rvcZ7nCVHWIKUi8OnpeyVZ58rklLuc",
        },
      };

      const response5 = await fetch(url5, options5);
      let keywords = await response5.json();
      keywords = keywords.keywords;
      output.keywords = keywords;
      setData(output);
      setMovieDetails((prevDetails) => ({
        ...prevDetails,
        [id]: output,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (movieDetails[id] === undefined) {
      fetchMovieDetails(id);
      const initialLoadingTimer = setTimeout(() => {
        // Set loading to true after a small delay for initial rendering
        const mainTimer = setTimeout(() => {
          setLoading(false);
        }, 4000);
        return () => {
          clearTimeout(mainTimer); // Clear the main timer when the component unmounts or when the dependency changes
        };
      }, 100); // Small delay for initial rendering

      return () => {
        clearTimeout(initialLoadingTimer); // Clear the initial loading timer if component unmounts early
      };
    } else {
      setData(movieDetails[id]);
    }
  }, [id]);

  return (
    <div>
      {loading ? (
        <div
          className="text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
            paddingTop: "80px",
            textAlign: "center",
            height: "100vh",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "60px",
          }}
        >
          <div className="movie2">
            <div
              className="movie3"
              style={{
                backgroundImage: data.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                padding: "5px",
                width: "100%",
                height: "24rem",
                translate: "(-30%,-50%)",
              }}
            ></div>
            <div className="movieTvBasic">
              <h2>
                {data.title} (
                {data.release_date && data.release_date.slice(0, 4)})
              </h2>
              <p>
                {data.genres &&
                  data.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index !== data.genres.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </p>
              <h4>
                {" "}
                <CircularProgress
                  percentage={Math.floor(data.vote_average * 10)}
                />{" "}
                Like Meter
              </h4>
              <h5
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "400",
                  fontStyle: "italic",
                  opacity: ".7",
                  color: "#fff",
                }}
              >
                {data.tagline}{" "}
              </h5>

              <h4>overview</h4>
              <div className="season overViewSection">
                <p>{data.overview}</p>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "2px",
              backgroundColor: "red",
              width: "100%",
              margin: "auto",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
             
            }}
          >
            <div
              className="movie4"
              style={{ padding: "5px", background: "rgba(0,0,0,0.7)" }}
            >
              <div style={{ padding: "6px" }}>
                <h6 style={{ color: "aqua" }}>Production Companies </h6>
                {data.production_companies &&
                  data.production_companies.map((company, index) => (
                    <span key={company.id}>
                      {company.name}
                      {index !== data.production_companies.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
              </div>

              <div style={{ padding: "6px" }}>
                <h6 style={{ color: "aqua" }}>Status </h6>
                <span>{data.status}</span>
              </div>

              <div style={{ padding: "6px" }}>
                <h6 style={{ color: "aqua" }}>Budget </h6>
                <span>
                  {data.budget !== 0 && data.budget
                    ? `$${data.budget}`
                    : "No data available"}
                </span>
              </div>
              <div style={{ padding: "6px" }}>
                <h6 style={{ color: "aqua" }}> Keywords</h6>{" "}
                {data.keywords &&
                  data.keywords.map((keyword, index) => (
                    <span key={keyword.id} style={{ color: "white" }}>
                      {keyword.name}
                      {index !== data.keywords.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </div>
            </div>
            <div
              className="movie5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Cast Data */}
              <div style={{ display: "flex" }}>
                <div className="movie5C">
                  <h3 style={{ paddingLeft: "9px", fontFamily: "fantasy" }}>
                    Cast
                  </h3>

                  <div className="movie-list-container horizontal-scrollbar">
                    <div className="movie-list">
                      {data.cast && data.cast.length > 0 ? (
                        data.cast.map((cast, index) => (
                          <div key={index}>
                            <People people={cast}></People>
                          </div>
                        ))
                      ) : (
                        <p>No cast data available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}

              <div className="movie5C">
                <div>
                  <h3 style={{ paddingLeft: "9px", fontFamily: "fantasy" }}>
                    Similar Movies
                  </h3>
                </div>
                <div className="movie-list-container horizontal-scrollbar">
                  <div className="movie-list">
                    {data.similar && data.similar.length > 0 ? (
                      data.similar.map((movie, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            navigate(`/movieDetail/${movie.id}`);
                          }}
                        >
                          <TrendingMovie movie={movie}></TrendingMovie>
                        </div>
                      ))
                    ) : (
                      <p>No data available</p>
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px",
                }}
              >
                <h3 style={{ paddingLeft: "9px", fontFamily: "fantasy" }}>
                  Review
                </h3>

                {data?.review && data.review?.length > 0 ? (
                  <div
                    className="season"
                    style={{
                      margin: "auto",
                      width: "100%",
                      height: "13rem",
                      overflowY: "scroll",
                      backgroundColor: "white",
                      color: "black",
                      padding: "5px",
                      borderRadius: "5px",
                      fontFamily: "fangsong",
                      font: "menu",
                    }}
                  >
                    {data?.review?.map((review, index) => (
                      <div style={{borderBottom:"2px solid grey"}} key={index}>
                        <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                          {review?.author ? review.author : "No data"}
                        </p>
                        <p>
                          Date:{" "}
                          {review?.created_at
                            ? review.created_at.slice(0, 10)
                            : "No data"}
                        </p>
                        <p>{review?.content ? review.content : "No data"}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "8px" }}>
                    <p>No reviews avaiable for this movie</p>
                  </div>
                )}
              </div>
            </div>
            {/* Recommendations end */}
          </div>
        </div>
      )}
    </div>
  );
}
