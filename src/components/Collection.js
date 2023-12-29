import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import states from '../context/states';
import { useParams } from 'react-router-dom';
import CircularProgress from "./CircularProgress";
export default function Collection() {
    const {collection,setCollection,loading,setLoading} = useContext(states)
    const {id} = useParams()
    const [data,setData] = useState({})
//fetch collections
const fetchCollection = async(id)=>{
    setLoading(true)
    try{
const url = `https://api.themoviedb.org/3/collection/${id}?language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3MTlhMTI3OWNkYzliMjQ3NzFkOTMxZTU3OTdkYiIsInN1YiI6IjY1NzYwMTQyNTY0ZWM3MDBmZWI0Y2QxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfaXg2Q4f0I4-rvcZ7nCVHWIKUi8OnpeyVZ58rklLuc'
  }
};

var response = await fetch(url, options)
const collection = await response.json()
        setData(collection)
        setCollection((prevCollection)=>(
            {
                ...prevCollection,
                [id]:collection
            }
           
        ))
    }
    catch(e){
        console.log(e)
    }finally{
        setTimeout(() => {
            setLoading(false);
          }, 1000);
        
    }
}
useEffect(()=>{
  if(collection[id]===undefined){
    fetchCollection(id)
  }else{
    setData(collection[id])
  }

},[id])


  return (
    <div>
     {loading?(<div className="text-center" style={{"display":"flex","justifyContent":"center","alignItems":"center","textAlign":"center","height":"100vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>):((data) && (<div style={{paddingTop:"60px" ,height:"100vh",display:"flex",flexDirection:"row"}}>
      <div style={{width:"40%",display:"flex",flexDirection:"column",padding:"2px"}}>
    <div style={{backgroundImage: data.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`
                  : "none",
                  border:"2px solid white",
                backgroundSize: "cover",
                backgroundPosition: "center center",height:"60%"}}></div>
    <div style={{background:"rgba(0,0,0,0.8)",height:"40%",padding:"5px",border:"2px solid white", borderTop:"0px"}}>
        <h3>{data.name?data.name:""}</h3>
        <p>{data.overview?data.overview:""}</p>
    </div>
    </div>
    <div className='season' style={{width:"60%",overflowY:"auto",margin:"2px"}}>
        <div>
          {
            data&&data.parts?(data.parts.map((part,index)=>(

                   <div key={index} style={{backgroundImage: part.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original/${part.backdrop_path})`
                    : "none",}}>
                        <div
            style={{
              display: "flex",
              flexDirection:"column",
              backgroundColor: "rgba(0,0,0,0.7)",
            
              marginBottom:"2px"
            }}
          >
            <div
              style={{
                backgroundImage: part.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original/${part.backdrop_path})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                width: "100%",
                height: "24rem",
                
                translate: "(-30%,-50%)",
              }}
            ></div>
            <div style={{ width: "100%",padding:"10px" }}>
              <h2>
                {part.title} (
                {part.release_date && part.release_date.slice(0, 4)})
              </h2>
              <h4>
                {" "}
                <CircularProgress
                  percentage={Math.floor(part.vote_average * 10)}
                />{" "}
                Like Meter
              </h4>
             

              <h4>overview</h4>
              <p>{part.overview}</p>
            </div>
          </div>
                   </div>
                
            ))):"No Info"
          }
          </div>
    </div>
      </div>))
     }   
    </div>
  )
}
