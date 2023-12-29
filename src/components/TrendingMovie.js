import React from "react";
import { useNavigate } from "react-router-dom";
export default function TrendingMovie({ movie }) {
  const navigate = useNavigate()
  return (
    <div
      className="card movieParent"
      style={{
        display: "flex",
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : "none",
        backgroundColor: movie.backdrop_path ? "transparent" : "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor:"pointer"
       
      }}
      onClick={()=>{
        navigate(`/movieDetail/${movie.id}`)
     }}
    >
      <div className="card-body movie trending">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
          {Math.floor(movie.vote_average * 10)}%
          <span className="visually-hidden"></span>{" "}
        </span>
        
      </div>
      <div className="dataName" style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.5)", color: "white"}}>
  <p>{movie.title}</p>
</div>
    </div>
  );
}
