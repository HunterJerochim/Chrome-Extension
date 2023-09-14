import React, { useState, useEffect } from "react";
import "./chrome.css";

export default function Chrome() {
  const [unsplash, setUnsplash] = useState(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    )
      .then((response) => response.json())
      .then((data) => {
        setUnsplash(data);
        console.log(data);
      });

    const interval = setInterval(() => {
      const date = new Date();
      const currentTime = date.toLocaleTimeString("en-us", {
        timeStyle: "short",
      });
      setTime(currentTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${unsplash?.urls?.full})` }}
        className="background"
      >
        {unsplash && unsplash.user.name}
      </div>
      <div className="time-container">
        <h1 className="time">{time}</h1>
      </div>
    </div>
  );
}
