import React from "react";
import { useNavigate } from "react-router-dom";
export default function TrendingTv({ series }) {
  const navigate = useNavigate()
  return (
    <div
      className="card movieParent"
      style={{
        cursor: "pointer",
        display: "flex",
        backgroundImage: series.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original/${series.backdrop_path})`
          : `url(https://image.tmdb.org/t/p/original/${series.poster_path})`,
        backgroundColor: series.poster_path ? "transparent" : "black",
        backgroundSize: "cover",
        backgroundPosition: "center", 
      }}
      onClick={()=>{navigate(`/TvDetail/${series.id}`)}}
    >
      <div className="card-body movie trending">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
          {Math.floor(series.vote_average * 10)}%
          <span className="visually-hidden"></span>{" "}
        </span>
      </div>
      <div style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}>
        <h3  style={{ fontSize: "12px", textAlign: "center" }}>{series.name}</h3>
      </div>
    </div>
  );
}
