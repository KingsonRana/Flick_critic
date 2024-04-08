import React, { useState } from "react";
import { useContext, useEffect } from "react";
import states from "../context/states";
import SearchMovieTv from "./SearchMovieTv";
import ActorsList from "./ActorsList";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { act } from "react-dom/test-utils";
export default function SearchListMovie() {
  const navigate = useNavigate();
  const { loading, setLoading, query, setQuery } = useContext(states);
  const [active, setActive] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [prevQuery, setPrevQuery] = useState("");
  const [cPage,setcPage] = useState(0);
  const [mPage,setmPage] = useState(0);
  const [pPage,setpPage] = useState(0);
  const [tPage,settPage] = useState(0);
  const key = process.env.REACT_APP_SECRET_KEY
  //start

  const searchList = async () => {
    try {
      setPrevQuery(query);
      // collection
      const url = `https://api.themoviedb.org/3/search/collection?query=${query}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };
      const response = await fetch(url, options);
      let collection = await response.json();
      setcPage(1)

      //movies
      const url2 = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
      const options2 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };

      const respone2 = await fetch(url2, options2);
      let movies = await respone2.json();
      setmPage(1)
   

      // tv
      const url3 = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
      const options3 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };
 
      const response3 = await fetch(url3, options3);
      let tv = await response3.json();
      console.log(tv)
     settPage(1)
      // person

      const url4 = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
      const options4 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };

      const response4 = await fetch(url4, options4);
      let person = await response4.json();
      setpPage(1)
    
      const output = { collection, movies, tv, person };
      setSearchData(output);
  
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //end
  const fetchMoreData = async()=>{
     if(active===2){
      if(cPage<searchData.collection.total_pages){
          const url = `https://api.themoviedb.org/3/search/collection?query=${query}&include_adult=false&language=en-US&page=${cPage+1}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
             "Bearer " +key,
        },
      };
      const response = await fetch(url, options);
      let collection = await response.json();
      setSearchData(prevSearchData => ({
        ...prevSearchData,
        collection: {
          ...prevSearchData.collection,
          results: [
            ...(prevSearchData.collection?.results || []), // Preserve previous results if they exist
            ...collection.results, // Append new results
          ],  },
        }));
      
      setcPage(cPage+1)
      }
     }else if(active===1){

      if(mPage<searchData.movies.total_pages){
        const url2 = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${mPage+1}`;
        const options2 = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
               "Bearer " +key,
          },
        };
  
        const respone2 = await fetch(url2, options2);
        let movies = await respone2.json();
        setSearchData(prevSearchData => ({
          ...prevSearchData,
          movies: {
            ...prevSearchData.movies,
            results: [
              ...(prevSearchData.movies?.results || []), // Preserve previous results if they exist
              ...movies.results, // Append new results
            ],  },
          }));
        setmPage(mPage+1)
      }

     }else if(active===3){
      if(tPage<searchData.tv.total_pages){
        const url3 = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${tPage+1}`;
        const options3 = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
               "Bearer " +key,
          },
        };
   
        const response3 = await fetch(url3, options3);
        let tv = await response3.json();
        setSearchData(prevSearchData=>({
          ...prevSearchData,
          tv:{
            ...prevSearchData.tv,
            results : [
              ...(prevSearchData.tv?.results || []),
              ...tv.results
            ]
          }
        }))
      }
      settPage(tPage+1)
     }else{
       if(pPage<searchData.person.total_pages){
        const url4 = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=${pPage+1}`;
        const options4 = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
               "Bearer " +key,
          },
        };
  
        const response4 = await fetch(url4, options4);
        let person = await response4.json();
        setSearchData(prevSearchData=>({
          ...prevSearchData,
          person:{
            ...prevSearchData.person,
            results:[
              ...(prevSearchData.person?.results||[]),
              ...person.results
            ]
          }
        }))
       }
     setpPage(pPage+1)
     }
  }







  
  useEffect(() => {
    searchList();
  }, [query]);

  useEffect(() => {
    if (prevQuery === query) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <div
          className="text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
            paddingTop: "80px",
            textAlign: "center",
            height: "100vh",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="searchMain" >
          <div>
            <div className="card searchResult">
              <div
                className="card-header"
                style={{
                  height: "4rem",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgb(1,180,228)",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                Results for "<b>{query}</b>"
              </div>
              <ul
                className="list-group list-group-flush"
                style={{ cursor: "pointer" }}
              >
                <li
                  className="list-group-item"
                  onClick={() => {
                    setActive(1);
                  }}
                  style={{background:active===1?"#cacaca":"none",border:"none"}}
                >
                  Movies : <b>{searchData.movies?.total_results}</b>{" "}
                </li>
                <li
                  className="list-group-item"
                  onClick={() => {
                    setActive(2);
                  }}
                  style={{background:active===2?"#cacaca":"none",border:"none"}}
                >
                  Collections : <b>{searchData.collection?.total_results}</b>
                </li>
                <li
                  className="list-group-item"
                  onClick={() => {
                    setActive(3);
                  }}
                  style={{background:active===3?"#cacaca":"none",border:"none"}}
                >
                  Tv : <b>{searchData.tv?.total_results}</b>
                </li>
                <li
                  className="list-group-item"
                  onClick={() => {
                    setActive(4);
                  }}
                  style={{background:active===4?"#cacaca":"none",border:"none"}}
                >
                  People : <b>{searchData.person?.total_results}</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="season searchDisplay">
            {active === 1 &&
              searchData?.movies?.results?.map((data, index) => (
                <div
                style={{ cursor: "pointer", overflowY: "auto" }}
                onClick={() => {
                  navigate(`/movieDetail/${data.id}`);
                }}
                >
                  {
                    <SearchMovieTv key={index} data={data} />
                    }
                </div>
              ))}

            {active === 2 && searchData?.collection?.results?.map((data, index) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/Collection/${data.id}`);
                  }}
                >
                  {
                    <SearchMovieTv key={index} data={data} />
                  }
                </div>
              ))}

            {active === 3 &&
              searchData?.tv?.results?.map((data, index) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/TvDetail/${data.id}`);
                  }}
                >
                  {
                    <SearchMovieTv key={index} data={data} />
                  }
                </div>
              ))}

            {active === 4 &&
              searchData?.person?.results?.map((data, index) => (
                <div style={{cursor:"pointer"}} onClick={()=>{navigate(`/People/${data.id}`)}}>
                  {
                    <ActorsList key={index} actors={data} />

                  }
                  </div>
              ))}
            <div className="d-grid gap-2" style={{margin:"auto"}}>
              <button className="btn btn-primary" type="button" onClick={()=>{fetchMoreData()}}>
                More
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
