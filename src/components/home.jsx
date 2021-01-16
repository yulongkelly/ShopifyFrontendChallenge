import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import "./home.css";
import Movie from "./movie";
import Banner from "react-js-banner";

function Home() {
  const [movie, setMovie] = useState("");
  const [currentMovie, setCurrentMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [nominationList, setNominationList] = useState([]);
  const [nominations, setNominations] = useState(new Set());

  const banner = (
    <Banner
      title="You already have 5 nominations in your list"
      css={{ color: "#000", backgroundColor: "grey", fontFamily: "arial" }}
    />
  );

  function handleInput(event) {
    const target = event.target;
    const value = target.value;
    setMovie(value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      setCurrentMovie(movie);
      handleSubmit();
    }
  }

  function handleSubmit() {
    axios
      .get(`http://www.omdbapi.com/?s=${movie}&apikey=576fc94e`)
      // axios automatically changes the response to JSON
      .then((res) => {
        setMovies(res.data.Search);
      })
      .catch((err) => {});
  }

  const changeNominationList = () => {
    const tmp = [];
    for (const nomination of nominations) {
      tmp.push(
        <li>
          <Movie
            key={nomination.Title}
            movie={nomination}
            nominations={nominations}
            action="remove"
            changeNominationList={changeNominationList}
          />
        </li>
      );
    }
    setNominationList(tmp);
  };

  return (
    <div className="container">
      {nominations.size >= 5 ? banner : undefined}
      <div className="omdb">
        <div className="search">
          <div style={{ margin: 20 }}>
            <TextField
              fullWidth={true}
              label="Movie"
              value={movie}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {currentMovie ? <h5>Results for "{currentMovie}"</h5> : ""}
          {movies.map((movie) => {
            return (
              <Movie
                key={movie.imdbID}
                movie={{
                  ID: movie.imdbID,
                  Title: movie.Title,
                  Year: movie.Year,
                }}
                nominations={nominations}
                action="Nominate"
                changeNominationList={changeNominationList}
              />
            );
          })}
        </div>
        <div className="nominations">
          <h2>Nominations</h2>
          <ul>{nominationList}</ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
