import React, { useState, useEffect } from "react";

export function Movie(props) {
  const [color, setColor] = useState("black");
  const [nominations, setNominations] = useState(props.nominations);
  console.log(nominations);

  function handleClick() {
    if (props.action === "remove") {
      setNominations((prenominations) => prenominations.delete(props.movie));
    } else if (props.action === "Nominate") {
      if (nominations.size >= 5) {
        // pop up a baner
      } else if (!nominations.has(props.movie)) {
        setColor("grey");
        console.log("after");
        setNominations((prenominations) => prenominations.add(props.movie));
      }
    }
  }

  useEffect(() => {
    console.log("in---");
    props.socket.emit("nominationsChanged");
  }, [nominations]);

  return (
    <div>
      <p>
        {props.movie.Title} ({props.movie.Year})
        <button style={{ color: color, borderRadius: 5 }} onClick={handleClick}>
          {props.action}
        </button>
      </p>
    </div>
  );
}
