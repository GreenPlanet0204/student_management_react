import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Dashboard = ({ show }) => {
  const ref = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  useEffect(() => {
    console.log(ref.current.clientWidth);
    if (ref.current.clientWidth > 1280) {
      ref.current.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    } else if (ref.current.clientWidth > 968) {
      ref.current.style.gridTemplateColumns = "1fr 1fr 1fr";
    } else if (ref.current.clientWidth > 640) {
      ref.current.style.gridTemplateColumns = "1fr 1fr";
    } else {
      ref.current.style.gridTemplateColumns = "1fr";
    }
  }, [windowWidth, show]);

  return (
    <div className="container">
      <div className="blue text">
        <div className="title">
          Welcome back <span>Stephanie</span>
        </div>
        <div className="text bold">
          Suize is on their way to <span className="bold">victory!</span>
        </div>
      </div>
      <div className="details parent" ref={ref}>
        <div className="card mini">
          <Link className="btn" to="/goals">
            Setup Goals
          </Link>
        </div>
        <div className="card mini">
          <Link to="/tracking" className="btn">
            Track Progress
          </Link>
        </div>
        <div className="card mini">
          <Link to="/students" className="btn">
            My Student
          </Link>
        </div>
        <div className="card mini">
          <Link to="/messages" className="btn">
            Messages
          </Link>
        </div>
      </div>
    </div>
  );
};
