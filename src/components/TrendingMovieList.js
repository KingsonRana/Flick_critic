import React, { useState } from 'react'
import { useContext,useEffect} from 'react'
import states from '../context/states'
import TrendingMovie from './TrendingMovie'
export default function TrendingMovieList() {
    const[toggle,setToggle]= useState(1)
    const {trendingMovies,trendingMoviesWeek}=useContext(states)
    const handleInputChange = (event) => {
      const selectedToggle = parseInt(event.target.value, 10);
      setToggle(selectedToggle);
    };
    return (
      <div className='cardContainer'>
        <div >
      <h3 style={{"paddingLeft":"9px"}}>Trending Movies</h3>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{"paddingLeft":"9px"}}>
          <input
          type="radio"
          className="btn-check"
          name="btnradio2"
          id="movieDay"
          autoComplete="off"
          value={1}
          checked={toggle === 1}
          onChange={handleInputChange}
        />
        <label className="btn btn-outline-primary" htmlFor="movieDay" style={{ borderColor: "white", color: "aliceblue", "--bs-btn-active-bg": "#3dd43d" }}>Day</label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio2"
          id="movieWeek"
          autoComplete="off"
          value={2}
          checked={toggle === 2}
          onChange={handleInputChange}
        />
        <label className="btn btn-outline-primary" htmlFor="movieWeek" style={{ borderColor: "white", color: "aliceblue", "--bs-btn-active-bg": "#3dd43d" }}>Week</label>

    </div>
      
      </div>
        <div className="movie-list-container">
          <div className="movie-list">
            {toggle===1&&trendingMovies.map((movie, index) => (
              <TrendingMovie key={index} movie={movie} />
            ))}
            {toggle===2&&trendingMoviesWeek.map((movie, index) => (
              <TrendingMovie key={index} movie={movie} />
            ))}
          </div>
        </div>
        </div>
      );
    }
