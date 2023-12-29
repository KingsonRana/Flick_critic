import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function People({people}) {
  const navigate = useNavigate()
  return (
    <div className="card movieParent" onClick={()=>{navigate(`/People/${people.id}`)}} style={{"display":"flex","cursor":"pointer",  "backgroundImage": people.profile_path ? `url(https://image.tmdb.org/t/p/original/${people.profile_path})` : 'none', "backgroundColor": people.profile_path ? 'transparent' : 'black', 'backgroundSize':"cover", 'backgroundPosition':"center"}}>
  <div className="card-body movie trending">
    
  </div>
  <div style={{"backgroundColor":"rgba(0,0,0,0.5)","color":"white"}}>
  <h3 style={{"fontSize":"12px","textAlign":"center"}}>{people.name}</h3>
  </div>
</div>
  )
}
