import React, { useState, useEffect } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import "./home.css";
import { Movie } from "./movie";
import io from "socket.io-client";

function Home() {
  console.log("begin");
  const [socket, setSocket] = useState(null);
  const [movie, setMovie] = useState("");
  const [currentMovie, setCurrentMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [nominationList, setNominationList] = useState([]);
  const [nominations, setNominations] = useState(new Set());

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

  useEffect(() => {
    setSocket(io("http://localhost:3000"));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("nominationsChanged", () => {
      const tmp = [];
      for (const nomination of nominations) {
        tmp.push(
          <li>
            <Movie
              movie={nomination}
              nominations={nominations}
              action="remove"
            />
          </li>
        );
      }
      setNominationList(tmp);
    });
  }, [socket]);

  return (
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
              movie={movie}
              nominations={nominations}
              action="Nominate"
              socket={socket}
            />
          );
        })}
      </div>
      <div className="nominations">
        <h2>Nominations</h2>
        <ul>{nominationList}</ul>
      </div>
    </div>
  );
}

export default Home;
