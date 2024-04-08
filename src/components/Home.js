import React, { useContext, useEffect, useState } from "react";
import TrendingMovieList from "./TrendingMovieList";
import PopularMovieList from "./PopularMovieList";
import UpcomingMovieList from "./UpcomingMovieList";
import PeopleList from "./PeopleList";
import TrendingTvList from "./TrendingTvList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import states from "../context/states";

export default function Home() {
  const { loading } = useContext(states);
  return (
    <div className="home" style={{"paddingTop":"60px"}}>
      {loading ? (
        <div className="text-center" style={{"display":"flex","justifyContent":"center","alignItems":"center","padding":"5px","textAlign":"center","height":"100vh"}}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <PopularMovieList />
          <TrendingMovieList />
          <UpcomingMovieList />
          <PeopleList />
          <TrendingTvList />
        </div>
      )}
      <div>
        <div
          style={{
            background: "rgba(0,0,0,0.9)",
            color: "white",
            fontWeight: "bold",
            margin: "auto",
            
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {" "}
          <div className="mx-3 gradient-text">
            Flick Critic{" "}
            <p style={{ fontSize: "13px", fontWeight: "normal" }}>
              I wish to extend my sincere gratitude to "The Movie Database" for
              graciously providing the essential API necessary for the
              completion of this personal project. Their invaluable support and
              provision of the required resources significantly contributed to
              the project's success. This project operates within the confines
              of a limited request scope, aimed at fulfilling personal
              objectives and development. The collaboration with "The Movie
              Database" has been instrumental in achieving the project's
              objectives, and their API has been an integral part of its
              functionality. If you found value in this project or have any
              feedback, I invite you to reach out to me. I am readily available
              for communication and open to discussions. You can contact me via
              LinkedIn. Your support and feedback are highly appreciated and contribute
              immensely to the continual improvement and refinement of this
              project. Thank you once again to "The Movie Database" for their
              pivotal role in making this project possible.
            </p>
          </div>
          <div className="mx-3" style={{ color: "white" }}>
         
            {/* <a
              href="https://www.instagram.com/kingson_rana07/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fedit%2F%3F__coig_login%3D1"
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faSquareInstagram} className="mx-3" />
            </a> */}
            {/* <a
               href={`mailto:kingson7075@gmail.com`}
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mx-3" />
            </a> */}
            <a
              href="https://www.linkedin.com/in/kingson-rana-353956212?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faLinkedin} className="mx-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
