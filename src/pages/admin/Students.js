import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils";
import axios from "axios";

export const Students = () => {
  const [students, setStudents] = useState([]);
  /* eslint-disable */
  useEffect(() => {
    axios.get(API_URL + "/student/").then((res) => setStudents(res.data));
  }, []);
  /* eslint-enable */
  return (
    <div className="container">
      <div className="header">
        <div className="title">Students</div>
        <Link to="/student">
          <div className="btn">
            <div className="text">New Student</div>
            <div className="plus">+</div>
          </div>
        </Link>
      </div>
      <div className="card students">
        <div className="label">
          <div className="col names">Names</div>
          <div className="col school">School</div>
          <div className="action">Actions</div>
        </div>
        {students.map((student, index) => (
          <div className="row" key={index}>
            <div className="col names">
              <div className="image">
                <img src={API_URL + student.image} alt="avatar" />
              </div>
              <div className="name">{student.name}</div>
            </div>
            <div className="col school">
              <div className="image">
                <img src={API_URL + student.school.image} alt="School" />
              </div>
              <div className="name">{student.school.name}</div>
            </div>
            <div className="action">
              <Link to={"/student/" + student.id}>
                <div className="btn">Edit</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
