import React from "react";
import Draggable from "react-draggable";
import "./inspiration.css";

export default function Inspiration() {
  const [inspiration, setInspiration] = React.useState("");

  React.useEffect(() => {
    fetch("https://api.kanye.rest/")
      .then((response) => response.json())
      .then((data) => {
        setInspiration(data);
        console.log(inspiration);
      });
  }, []);

  return (
    <Draggable>
      <div className="quote-container">
        <h1 className="quote-title">Inspiration</h1>
        <h1 className="quote">
          <em>"{inspiration.quote}"</em>
        </h1>
      </div>
    </Draggable>
  );
}

/* 
  <select className="mode-select" onChange={handleModeSelect} >
          {modes.map(mode => (  
            <option className="color-modes" key={mode} value={mode}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </option>
        ))}
        </select>

    */
