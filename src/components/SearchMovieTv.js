import React from "react";

export default function SearchMovieTv({ data }) {
  const backgroundImageStyle = {
    backgroundImage: data?.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`
      : (data?.poster_path?`url(https://image.tmdb.org/t/p/original/${data.poster_path})`:"none"),
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "5px",
        top: "5px",
        height: "10rem",
        overflow: "hidden",
      }}
    >
      <div className="card profileImage" style={backgroundImageStyle}></div>
      <div
        className="card-body"
        style={{
          color:"black",
          padding: "5px",
          borderRadius: "5px",
          marginLeft: "2px",
          width: "60rem",
        }}
      >
       
        <p className="card-text" style={{marginBottom:"0px"}}>{data.title ? data.title : data.name}</p>
        <p className="card-text searchP">
          {data.overview}
        </p>
      </div>
    </div>
  );
}
