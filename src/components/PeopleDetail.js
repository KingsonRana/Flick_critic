import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import states from "../context/states";
import TrendingMovie from "./TrendingMovie";

export default function PeopleDetail() {
  const { id } = useParams();
  const { loading, setLoading, peopleDetail, setPeopleDetail } =
    useContext(states);
  const [data, setData] = useState({});
  const key = process.env.REACT_APP_SECRET_KEY
  // fetch person Info
  const fetchData = async (id) => {
    setData({})
    setLoading(true);
    const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
           "Bearer " +key,
      },
    };

    const respone = await fetch(url, options);
    const detail = await respone.json();
    //fetch movies
    const url2 = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;
    const options2 = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
           "Bearer " +key,
      },
    };

    const response2 = await fetch(url2, options2);
    let movies = await response2.json();
    movies = movies.cast;
    detail.movies = movies;
    setPeopleDetail((prevData) => ({
      ...prevData,
      [id]: detail,
    }));
    setData(detail);
  };

  useEffect(() => {
    if (peopleDetail[id] === undefined) {
      fetchData(id);
      const initialLoadingTimer = setTimeout(() => {
        // Set loading to true after a small delay for initial rendering
        const mainTimer = setTimeout(() => {
          setLoading(false); // Set loading to false after 10 seconds
        }, 2000);
        return () => {
          clearTimeout(mainTimer); // Clear the main timer when the component unmounts or when the dependency changes
        };
      }, 100); // Small delay for initial rendering

      return () => {
        clearTimeout(initialLoadingTimer); // Clear the initial loading timer if component unmounts early
      };
    } else {
      setData(peopleDetail[id]);
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "5px",
              paddingTop: "80px",
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.3",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                  flex: "1",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      backgroundImage: data.profile_path
                        ? `url(https://image.tmdb.org/t/p/original/${data.profile_path})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      width: "18rem",
                      height: "20rem",
                      padding: "10px",
                    }}
                  ></div>
                  <div style={{ padding: "10px" }}>
                    <h3>
                      {data.name} (
                      {data.gender === 2
                        ? "Male"
                        : data.gender === 3
                        ? "Non Binary"
                        : "Female"}
                      )
                    </h3>{" "}
                    <h5
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "400",
                        fontStyle: "italic",
                        opacity: ".7",
                        color: "#fff",
                      }}
                    >
                      Born at {data.place_of_birth}
                    </h5>
                    <h6>Known for {data.known_for_department}</h6>
                    <p>Born on {data.birthday}</p>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "400",
                      fontStyle: "italic",
                      opacity: ".7",
                      color: "#fff",
                    }}
                  >
                    Known as -{" "}
                    {data &&
                      data.also_known_as &&
                      data.also_known_as.map((name, index) => (
                        <span key={index}>
                          {name}
                          {index !== data.also_known_as.length - 1 ? ", " : ""}
                        </span>
                      ))}{" "}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    <p>{data.biography}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="movie5C"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h3 style={{ paddingLeft: "9px", fontFamily: "fantasy" }}>
              Movies{" "}
            </h3>
            <div style={{ display: "flex", overflowX: "scroll" }}>
              <div style={{ display: "flex" }}>
                {data &&
                  data.movies &&
                  data.movies.map((movie, index) => (
                    <TrendingMovie key={index} movie={movie} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
