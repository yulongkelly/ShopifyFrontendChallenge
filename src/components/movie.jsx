import React from "react";

function Movie(props) {
  return (
    <div>
      {console.log(props.movie)}
      <p>
        {props.movie.Title} ({props.movie.Year})<button>Nominate</button>
      </p>
    </div>
  );
}

export default Movie;
