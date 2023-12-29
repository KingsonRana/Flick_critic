import React, { useEffect } from 'react'
import { useContext } from 'react'
import states from '../context/states'
import PopularMovie from './PopularMovie'
export default function PopularMovieList() {
  const {popularMovies,index,changeIndex} = useContext(states)
  useEffect(()=>{
  
  },[])
  return (
    <div className='popularContainer' >
    <div className="movie-list-container popularMovieList">
          <div id="carouselExampleFade" className="carousel slide carousel-fade">
  <div className="carousel-inner">
       <div>
       {popularMovies.length > 0 && (
         <PopularMovie key={index} movie={popularMovies[index]} />
       )}
 </div>
 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev" onClick={()=>{changeIndex("left")}}>
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" onClick={()=>{changeIndex("right")}}>
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
  

</div>
    
    <div className='popularContainerH2'>
    <p>"Uncover cinematic tales,explore genres, and immerse  in captivating stories  on our movie platform."</p>
    </div>
    </div>
  )
}
