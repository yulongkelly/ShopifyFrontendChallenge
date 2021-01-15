import React, { useState } from "react";
import { Button } from "reactstrap";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

function Home() {
  const [movie, setMovie] = useState("");

  function handleInput(event) {
    const target = event.target;
    const value = target.value;
    setMovie(value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  function handleSubmit() {
    axios
      .get("http://www.omdbapi.com/?i=tt3896198&apikey=576fc94e")
      // axios automatically changes the response to JSON
      .then((res) => {})
      .catch((err) => {});
    setMovie("");
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
        <p>{movie}</p>
      </div>
    </div>
  );
}

export default Home;
