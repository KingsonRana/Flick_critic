import { useState, useEffect } from "react";
import States from "./states";

const ManageState = (props) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesWeek, setTrendingMoviesWeek] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upComingMovies, setUpcomingMovies] = useState([]);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchData, setSearchData] = useState();
  const [query, setQuery] = useState("");
  const [trendingPeople, settrendingPeople] = useState([]);
  const [trendingPeopleWeek,setTrendingPeopleWeek] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingTvWeek,setTrendingWeek] = useState([])
  const [movieDetails,setMovieDetails] = useState({})
  const [loading,setLoading]= useState(true)
  const [tvDetail,setTvDetail] = useState([])
  const [collection,setCollection] = useState({})
  const [peopleDetail, setPeopleDetail] = useState({})
  const key = process.env.REACT_APP_SECRET_KEY
  //Fetch Trending Series
  const fetchTrendingTv = async () => {
    //fetch for day
    const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer " +key
      },
    };

    const response = await fetch(url, options)
    let data = await response.json()
    data = data.results
    
    //fetch for week
    const url2 = "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
    const options2 = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
           "Bearer " +key},
    };

    const response2 = await fetch(url2, options2)
    let data2 = await response2.json()
    data2 = data2.results
    
    setTrendingTv(data)
    setTrendingWeek(data2)
    
  };
  
  //Fetch Trending People
  const fetchtrendingPeople = async () => {
    //fetch for day
    const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3MTlhMTI3OWNkYzliMjQ3NzFkOTMxZTU3OTdkYiIsInN1YiI6IjY1NzYwMTQyNTY0ZWM3MDBmZWI0Y2QxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfaXg2Q4f0I4-rvcZ7nCVHWIKUi8OnpeyVZ58rklLuc'
      }
    };
    

    const response = await fetch(url, options);
    let data = await response.json();
    data = data.results;
    
    //fetch for week
    const url2 = 'https://api.themoviedb.org/3/trending/person/week?language=en-US';
    const options2 = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3MTlhMTI3OWNkYzliMjQ3NzFkOTMxZTU3OTdkYiIsInN1YiI6IjY1NzYwMTQyNTY0ZWM3MDBmZWI0Y2QxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfaXg2Q4f0I4-rvcZ7nCVHWIKUi8OnpeyVZ58rklLuc'
      }
    };
  
    const response2 = await fetch(url2, options2);
    let data2 = await response2.json();
    data2 = data2.results;

    settrendingPeople(data);
    setTrendingPeopleWeek(data2)
  };
  const [index, setIndex] = useState(0);

  //Fetch Trending Movie
  const fetchTrendindMovies = async () => {
    //fetch for day
    const url =  "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
           "Bearer " +key},
    };

    const response = await fetch( url,options);
    const data = await response.json();
    
  //fetch for week
    const url2 =  "https://api.themoviedb.org/3/trending/movie/week?language=en-US"
    const options2 = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
           "Bearer " +key},
    };

    const response2 = await fetch( url2,options2);
    const data2 = await response2.json();
    setTrendingMovies(data.results);
    setTrendingMoviesWeek(data2.results);
    

  };


  //Fetch Popular Movie 
  const fetchPopularMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
           "Bearer " +key},
    };
    const resonse = await fetch(url, options);
    const data = await resonse.json();
    setPopularMovies(data.results);
  };
  const changeIndex = (event) => {
    if (event === "left") {
      if (index === 0) {
        setIndex(popularMovies.length - 1);
      } else {
        setIndex(index - 1);
      }
    } else {
      if (index === popularMovies.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  };
  const fetchUpcomingMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
           "Bearer " +key},
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setUpcomingMovies(data.results);
  };

  useEffect(() => {
    try{
    fetchPopularMovies();
    fetchTrendindMovies();
    fetchUpcomingMovies();
    fetchtrendingPeople();
    fetchTrendingTv();
    }catch(e){
      console.log(e)
    }finally{
     setLoading(false)
    }
  }, []);

  return (
    <States.Provider
      value={{
        trendingMovies,
        popularMovies,
        index,
        changeIndex,
        upComingMovies,
        searchData,
        setShouldSearch,
        shouldSearch,
        query,
        setQuery,
        trendingPeople,
        trendingTv,
        trendingMoviesWeek,
        trendingPeopleWeek,
        trendingTvWeek,
        setMovieDetails,
        movieDetails,
        loading,
        setLoading,
        tvDetail,
        setTvDetail,
        collection,
        setCollection,
        peopleDetail, 
        setPeopleDetail
      }}
    >
      {props.children}
    </States.Provider>
  );
};
export default ManageState;
