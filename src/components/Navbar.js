import React, { useEffect, useState,useRef } from "react";
import { useContext } from "react";
import states from "../context/states";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Navbar() {
  const navigate = useNavigate();
  const { setShouldSearch, searchList, shouldSearch, setLoading,setQuery } = useContext(states);
  const [Query, setquery] = useState("");
  const navBarButton = useRef(null)
  const searchBoxRef = useRef(null);
  const handleSubmit = async (e) => {
    navBarButton.current.setAttribute("aria-expanded","false")
    searchBoxRef.current.classList.toggle('show');
    e.preventDefault();
    if(Query.length>0){
      setQuery(Query)
      setLoading(true)
      navigate("/searchList");
      setquery(" ")
    }
    
  };

  // useEffect(() => {
        
  // }, [Query,]);

  const handleChange = (e) => {
    setquery(e.target.value);
  };
  return (
    <nav
      className="navbar navbar-expand-lg navBar"
      style={{ position: "fixed", top: "0px", zIndex: "1000", width: "100%", "display":"flex" }}
    >
      <div class="container-fluid">
      <Link to="/" class="navbar-brand gradient-text" href="#">Flick Critic</Link>
      <button ref={navBarButton} style={{background:"White"}} class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div ref={searchBoxRef} className="collapse navbar-collapse searchBox" id="navbarSupportedContent" >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          {/* <div className="mx-3 gradient-text" ></div> */}
         
          {/* <div className="mx-3 position-relative" style={{color:"white"}}>
            <Link style={{color:"white"}} class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Movies
          </Link>
            <ul style={{top:"130%"}} className="dropdown-menu">
            <li><Link className="dropdown-item" href="#">Popular</Link></li>
            <li><Link className="dropdown-item" href="#">Top Rated</Link></li>
            <li><Link className="dropdown-item" href="#">Upcoming</Link></li>
          </ul>
          </div>
          <div className="mx-3 position-relative">

            <Link style={{color:"white"}} class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Tv
          </Link>
            <ul style={{top:"130%"}} className="dropdown-menu">
            <li><Link className="dropdown-item" href="#">On The Air</Link></li>
            <li><Link className="dropdown-item" href="#">Popular</Link></li>
            <li><Link className="dropdown-item" href="#">Top Rated</Link></li>
          </ul>
          </div> */}
          
          <div className="position-relative">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              name="search"
              value={Query}
              onChange={handleChange}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
          </div>
        </ul>
        </div>
      </div>
    </nav>
  );
}
