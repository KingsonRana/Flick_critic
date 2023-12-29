import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import states from '../context/states'
export default function UpcomingMovieList() {
const{upComingMovies} = useContext(states)
const[index,setIndex] = useState(0)
     
useEffect(() => {
    const intervalId = setInterval(() => {
      if (upComingMovies.length > 0) {
        setIndex((prevIndex) =>
          prevIndex === upComingMovies.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);
  
    return () => clearInterval(intervalId); 
  }, [upComingMovies]);
  return (
    <div className='upComing' style={{"margin":"10px","display":"flex","position":"relative",overflowY:"scroll"}}>
        <h2 style={{"borderRadius": "5px 0px 0px 0px","textAlign":"center","position":"absolute","padding":"5px","backgroundColor":"rgb(255,0,0)","top":"0px","left":"0px"}}>Upcoming</h2>
       {upComingMovies && upComingMovies[index] && ( 
    <div className='upComing1' style={{
      "backgroundImage": upComingMovies[index].backdrop_path ? `url(https://image.tmdb.org/t/p/original/${upComingMovies[index].backdrop_path})` : 'none',
      "backgroundColor": upComingMovies[index].backdrop_path ? 'rgba(0, 0, 0, 0)' : 'black', 
      "backgroundSize": "cover",
      "backgroundPosition": "center",
     
      "borderRadius":"5px"
    }}></div>
  )}
 {upComingMovies && upComingMovies[index] && (  <div className='upComing2 season' style={{

    "color": "white",
    "padding":"5px",
    "paddingTop":"0px",
    
    "overflow":"auto",
    "backgroundColor":"rgba(0,0,0,0.4)"
  }}><h2 style={{"background":"black","textAlign":"center","padding":"5px"}}>{upComingMovies[index].title}</h2>
     <p>Buzz : {Math.floor(upComingMovies[index].vote_average*10)}%</p>
     <p>Release Date : {upComingMovies[index].release_date}</p>
     <p>{upComingMovies[index].overview}</p>
  
  </div>)
}
    </div>
  )
}
/* <div style={{
        "color": "black",
        "display": "flex",
        "flexDirection": "column",
    }} className='upComingDivParent'>
    <div style={{   "backgroundImage": `url(https://image.tmdb.org/t/p/original/${upComingCover})`,
        "backgroundSize":"cover",
        "position":"center"}} className="UpComingDiv">
      <h3>Upcoming </h3>
        <div className="movie-list-container">
          <div className="movie-list">
            {upComingMovies.map((movie,index) => (
              <UpcomingMovie key={index} movie={movie} />
            ))}
          </div>
        </div>
        </div>
        </div> */
