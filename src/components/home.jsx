import React, { useState, useDebugValue } from "react";
import { Button } from "reactstrap";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Movie from "./movie";

function Home() {
  const [movie, setMovie] = useState("");
  const [currentMovie, setCurrentMovie] = useState("");
  const [movies, setMovies] = useState([]);

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

  return (
    <div className="">
      <div className="search">
        <TextField
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
        {currentMovie ? <h5>Results for "{currentMovie}"</h5> : ""}
        {movies.map((m) => {
          return <Movie movie={m} />;
        })}
      </div>
    </div>
  );
}

export default Home;
