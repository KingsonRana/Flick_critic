import React, { useEffect, useState } from "react";
import { useContext } from "react";
import states from "../context/states";
import { useParams } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import People from "./People";
import TrendingTv from "./TrendingTv";

export default function TvDetails() {
  const { id } = useParams();
  const { tvDetail, setTvDetail, loading, setLoading } = useContext(states);
  const [data, setData] = useState([]);

  const key = process.env.REACT_APP_SECRET_KEY
 

  const fetchTvDetail = async (id) => {
    setData({})
    setLoading(true);
    try {
      //details
      const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };

      const response = await fetch(url, options);
      const series = await response.json();

      //cast
      const url2 = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
      const options2 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };

      const response2 = await fetch(url2, options2);
      let cast = await response2.json();
      cast = cast.cast;

      //keywords

      const url3 = `https://api.themoviedb.org/3/tv/${id}/keywords`;
      const options3 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };

      const response3 = await fetch(url3, options3);
      let keywords = await response3.json();
      keywords = keywords.results;

      //reviews
      const url4 = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`;
      const options4 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };

      const response4 = await fetch(url4, options4);
      let review = await response4.json();
      review = review.results;
     
      // similar

      const url5 = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
      const options5 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };

      const response5 = await fetch(url5, options5);
      let similar = await response5.json();
      similar = similar.results;
      //

      series.cast = cast;
      series.keywords = keywords;
      series.review = review;
      series.similar = similar;

      setTvDetail((prevData) => ({
        ...prevData,
        [id]: series,
      }));
      setData(series);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (tvDetail[id] === undefined) {
      fetchTvDetail(id);
       const initialLoadingTimer = setTimeout(() => {
      // Set loading to true after a small delay for initial rendering
      const mainTimer = setTimeout(() => {
        setLoading(false); // Set loading to false after 10 seconds
      }, 3000);
      return () => {
        clearTimeout(mainTimer); // Clear the main timer when the component unmounts or when the dependency changes
      };
    }, 100); // Small delay for initial rendering

    return () => {
      clearTimeout(initialLoadingTimer); // Clear the initial loading timer if component unmounts early
    };
    } else {
      setData(tvDetail[id]);
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
          <div
           className="movie2"
          >
            <div
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
            <div className="movieTvBasic" >
              <h2>
                {data.name} (
                { data?.first_air_date?.length > 0
                  ? data.first_air_date.slice(0, 4)
                  : "Data Not available"}
                )
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
              width: "100%",
              margin: "auto",
              height: "2px",
              background: "red",
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
              style={{
                border: "2px solid white",
                background: "rgba(0,0,0,0.7)",
                padding: "5px",
              }}
            >
              <div style={{ padding: "6px" }}>
                <h6 style={{ color: "aqua" }}> Creator</h6>{" "}
                {data.created_by &&
                  data.created_by.map((creator, index) => (
                    <span key={creator.id} style={{ color: "white" }}>
                      {creator.name}
                      {index !== data.created_by.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </div>
              <div style={{ padding: "6px" }}>
                <h6 style={{ color: "aqua" }}> Production Companies</h6>
                {data.production_companies &&
                  data.production_companies.map((company, index) => (
                    <span key={company.id} style={{ color: "white" }}>
                      {company.name}
                      {index !== data.production_companies.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
              </div>
              <div style={{ padding: "6px" }}>
                <h6 style={{ color: "aqua" }}>Watch On</h6>{" "}
                {data.networks &&
                  data.networks.map((name, index) => (
                    <span key={name.id} style={{ color: "white" }}>
                      {name.name}
                      {index !== data.networks.length - 1 ? ", " : ""}
                    </span>
                  ))}
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
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px",
                background: "rgba(0,0,0,0.7)",
              }}
            >
              <div style={{ display: "flex" }}>
                {data.seasons ? (
                  <div
                    className="season"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                      height: "20rem",
                      scrollbarWidth: "thin",
                      width: "100%",
                    }}
                  >
                    {data.seasons.map((season, index) => (
                      <div className="seriesSeason" key={index}>
                        <div className="child1"
                          style={{
                            backgroundImage: season.poster_path
                              ? `url(https://image.tmdb.org/t/p/original/${season.poster_path})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "20rem",
                          }}
                        ></div>
                        <div
                        className="child2"
                          style={{
                            padding: "5px",
                            background: "rgba(0,0,0,0.5)",
                          }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              fontFamily: "fantasy",
                              background: "#519a8f",
                            }}
                          >
                            <h5>{season.name}</h5>
                          </div>
                          <p>
                            <h6>
                              Aired On :{" "}
                              {season.air_date && season.air_date.length > 0
                                ? season.air_date
                                : "No data available"}
                            </h6>
                          </p>
                          <p>
                            <h6>Number of Episodes : {season.episode_count}</h6>
                          </p>
                        {season?.vote_average&&<h4>
                              {" "}
                              
                              <CircularProgress
                                percentage={Math.floor(season.vote_average * 10)}
                              />{" "}
                              Like Meter
                            </h4>}
                          <p>
                           {season?.overview&& <h6>Overview : {season.overview}</h6>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No other season</p>
                )}
              </div>
              <div>
                <div className="movie5C">
                  <div>
                    <h3 style={{ paddingLeft: "9px", fontFamily: "fantasy" }}>
                      Cast
                    </h3>
                  </div>
                  <div
                    className="movie-list-container horizontal-scrollbar"
                    style={{ overflowX: "auto" }}
                  >
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
              <div className="movie5C">
                <h3 style={{ paddingLeft: "9px", fontFamily: "fantasy" }}>
                  Similar Shows
                </h3>
                <div className="movie-list-container">
                  <div className="movie-list">
                    {data.similar &&
                      data.similar.map((series, index) => (
                        <TrendingTv key={index} series={series} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
