import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ManageState from "./context/ManageState";
import { useContext } from "react";
import states from "./context/states";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import SearchList from "./components/SearchList";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import Collection from "./components/Collection";
import PeopleDetail from "./components/PeopleDetail";

function App() {
  const { upComingCover } = useContext(states);

  return (
    <div className="App">
      <ManageState>
      <Router>
        <header className="App-header">
          <Navbar></Navbar>
        </header>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/searchList/" element={<SearchList/>}></Route>
            <Route exact path="/movieDetail/:id" element={<MovieDetails/>}></Route>
            <Route exact path="/TvDetail/:id" element={<TvDetails/>}></Route>
            <Route exact path="/collection/:id" element={<Collection/>}></Route>
            <Route exact path="/People/:id" element={<PeopleDetail/>}></Route>
          </Routes>
        </Router>
      </ManageState>
      
    </div>
  );
}

export default App;
