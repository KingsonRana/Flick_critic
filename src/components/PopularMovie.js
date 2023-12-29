import React from "react";
import { useNavigate } from "react-router-dom";
export default function PopularMovie({ movie }) {
  const navigate = useNavigate()
  return (
    <div
      className="card popularMovie "
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor:"pointer"
      }}
      onClick={()=>{

         navigate(`/movieDetail/${movie.id}`)
      }}
    >
      <div className="card-body movie">
        <span className="position-absolute popular top-0 start-100 translate-middle badge rounded-pill bg-success">
          {Math.floor(movie.vote_average * 10)}%
          <span className="visually-hidden"></span>{" "}
        </span>
        <h6>
          <span className="badge rounded-pill text-bg-info">{movie.title}</span>
        </h6>
      </div>
    </div>
  );
}
