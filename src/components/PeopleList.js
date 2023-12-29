import React from 'react'
import { useContext, useState, useEffect } from 'react'
import states from '../context/states'
import People from './People'
export default function PeopleList() {
  const[toggle,setToggle]= useState(1)
  const {trendingPeople,trendingPeopleWeek} = useContext(states)
  
  const handleInputChange = (event) => {
    const selectedToggle = parseInt(event.target.value, 10);
    setToggle(selectedToggle);
  };
  return (
    <div className='cardContainer'>
        <div >
      <h3 style={{"paddingLeft":"9px"}}>Trending People</h3>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{"paddingLeft":"9px"}}>
      <input
          type="radio"
          className="btn-check"
          name="btnradio1"
          id="peopleDay"
          autoComplete="off"
          value={1}
          checked={toggle === 1}
          onChange={handleInputChange}
        />
        <label className="btn btn-outline-primary" htmlFor="peopleDay" style={{ borderColor: "white", color: "aliceblue", "--bs-btn-active-bg": "#3dd43d" }}>Day</label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio1"
          id="peopleWeek"
          autoComplete="off"
          value={2}
          checked={toggle === 2}
          onChange={handleInputChange}
        />
        <label className="btn btn-outline-primary" htmlFor="peopleWeek" style={{ borderColor: "white", color: "aliceblue", "--bs-btn-active-bg": "#3dd43d" }}>Week</label>
    </div>
      
      </div>
      <div className="movie-list-container">
        <div className="movie-list">
          {toggle===1&&trendingPeople.map((people, index) => (
            <People key={index} people={people} />
          ))}
          {toggle===2&&trendingPeopleWeek.map((people, index) => (
            <People key={index} people={people} />
          ))}
        </div>
      </div>
      </div>

  )
}
