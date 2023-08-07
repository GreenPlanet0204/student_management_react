import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils";
import axios from "axios";

export const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(API_URL + "/teacher/?school=" + user.id)
      .then((res) => setTeachers(res.data));
  }, []);
  return (
    <div className="container">
      <div className="header">
        <div className="title">Teacher</div>
        <Link to="/teacher" className="btn">
          <div className="text">New Teacher</div>
          <div className="plus">+</div>
        </Link>
      </div>
      <div className="card students">
        <div className="label">
          <div className="col names">Names</div>
          <div className="col names">School</div>
          <div className="action">Actions</div>
        </div>
        {teachers.map((teacher, index) => (
          <div className="row" key={index}>
            <div className="col names">
              <div className="image">
                <img src={API_URL + teacher.image} alt="Teacher" />
              </div>
              <div className="name">{teacher.name}</div>
            </div>
            <div className="col school">
              <div className="image">
                <img src={API_URL + teacher.school.image} alt="School" />
              </div>
              <div className="name">{teacher.school.name}</div>
            </div>
            <div className="action">
              <Link to={`/teacher/${teacher.id}`} className="btn">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
