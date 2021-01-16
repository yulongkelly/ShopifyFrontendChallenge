import React, { useRef } from "react";

export default function Movie(props) {
  const color = useRef("black");
  let i = 0;
  for (const nomination of props.nominations) {
    if (props.movie.ID === nomination.ID && props.action === "Nominate") {
      color.current = "grey";
      break;
    } else if (i === props.nominations.size - 1) {
      color.current = "black";
    }
    i++;
  }
  if (props.nominations.size === 0) {
    color.current = "black";
  }

  function handleClick() {
    if (props.action === "remove") {
      props.nominations.delete(props.movie);
      props.changeNominationList();
    } else if (props.action === "Nominate") {
      if (color.current === "grey") {
        alert("You've already nominated this movie");
      } else if (color.current === "black") {
        props.nominations.add(props.movie);
        props.changeNominationList();
      }
    }
  }

  return (
    <div>
      <p>
        {props.movie.Title} ({props.movie.Year})
        <button
          style={{ color: color.current, borderRadius: 5 }}
          onClick={handleClick}
        >
          {props.action}
        </button>
      </p>
    </div>
  );
}
