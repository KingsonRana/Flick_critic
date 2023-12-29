import React from 'react'
import { useContext, useState, useEffect } from 'react'
import states from '../context/states'
import TrendingTv from './TrendingTv'
export default function TrendingTvList() {
    const[toggle,setToggle]= useState(1)
    const {trendingTv,trendingTvWeek} = useContext(states)
  
    const handleInputChange = (event) => {
      const selectedToggle = parseInt(event.target.value, 10);
      setToggle(selectedToggle);
    };
  return (
    <div className='cardContainer' >
            <div >
      <h3 style={{"paddingLeft":"9px"}}>Trending Series</h3>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{"paddingLeft":"9px"}}>
       <input
          type="radio"
          className="btn-check"
          name="btnradio3"
          id="tvDay"
          autoComplete="off"
          value={1}
          checked={toggle === 1}
          onChange={handleInputChange}
        />
        <label className="btn btn-outline-primary" htmlFor="tvDay" style={{ borderColor: "white", color: "aliceblue", "--bs-btn-active-bg": "#3dd43d" }}>Day</label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio3"
          id="tvWeek"
          autoComplete="off"
          value={2}
          checked={toggle === 2}
          onChange={handleInputChange}
        />
        <label className="btn btn-outline-primary" htmlFor="tvWeek" style={{ borderColor: "white", color: "aliceblue", "--bs-btn-active-bg": "#3dd43d" }}>Week</label>
    

    </div>
      
      </div>
      <div className="movie-list-container">
        <div className="movie-list">
          {toggle===1 &&trendingTv.map((series, index) => (
            <TrendingTv key={index} series={series} />
          ))}
          {toggle===2 &&trendingTvWeek.map((series, index) => (
            <TrendingTv key={index} series={series} />
          ))}
        </div>
      </div>
      </div>
  )
}
