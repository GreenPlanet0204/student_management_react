import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils";

export const Schools = () => {
  const [schools, setSchools] = useState([]);

  const fetchData = async () => {
    axios.get(API_URL + "/school/").then((res) => {
      console.log("res", res.data);
      setSchools(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="header">
        <div className="title">Schools</div>
        <Link to="/school" className="btn">
          <div className="text">New School</div>
          <div className="plus">+</div>
        </Link>
      </div>
      <div className="card students">
        <div className="label">
          <div className="col names">School Name</div>
          <div className="col">School Level</div>
          <div className="col count">Student Count</div>
          <div className="action">Actions</div>
        </div>
        {schools.map((school, index) => (
          <div className="row" key={index}>
            <div className="col names">
              <div className="image">
                <img src={API_URL + school.image} alt="School" />
              </div>
              <div className="name">{school.name}</div>
            </div>
            <div className="col">{school.level}</div>
            <div className="col count">{school.students.length}</div>
            <div className="action">
              <Link className="btn" to={"/school/" + school.id}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
