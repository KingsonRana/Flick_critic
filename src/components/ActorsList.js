import React from 'react'

export default function ActorsList({actors}) {
    const backgroundImageStyle = {
        backgroundImage: actors.profile_path
          ? `url(https://image.tmdb.org/t/p/original/${actors.profile_path})`
          : "none",
        
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      };
    
      return (
        <div style={{
          display: "flex",
          margin: "5px",
          top: "5px",
          height: "10rem",
          overflow: "hidden",
        }}>
          <div className="card profileImage" style={backgroundImageStyle}></div>
          <div
            className="card-body"
            style={{
              color:"black",
              padding: '5px',
              borderRadius: '5px',
              marginLeft: '2px',
              width:"60rem"
            }}
          >
            <p className="card-text">
              Name : {actors.name}
            </p>
            <p className="card-text searchP" >
              Orginal Name : {actors.original_name}
            </p>
            <p className="card-text searchP" >
              Gender : {actors.gender===1?"Female":"Male"}
            </p>
          
          </div>
        </div>
      );
  
}
