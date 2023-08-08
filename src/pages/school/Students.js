import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils";
import axios from "axios";

export const Students = () => {
  const [students, setStudents] = useState([]);
  /* eslint-disable */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(API_URL + "/student/?school=" + user.id)
      .then((res) => setStudents(res.data));
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
        <div className="row">
          <div className="col">
            <div className="label">Names</div>
            {students.map((student, index) => (
              <div className="item names" key={index}>
                <div className="image">
                  <img src={API_URL + student.image} alt="avatar" />
                </div>
                <div className="name">{student.name}</div>
              </div>
            ))}
          </div>
          <div className="col">
            <div className="label">School</div>
            {students.map((student, index) => (
              <div className="item school" key={index}>
                <div className="image">
                  <img src={API_URL + student.school.image} alt="School" />
                </div>
                <div className="name">{student.school.name}</div>
              </div>
            ))}
          </div>
          <div className="col count">
            <div className="label">Coins Earned</div>
            {students.map((student, index) => (
              <div className="item" key={index}>
                {student.coin}
              </div>
            ))}
          </div>
          <div className="col action">
            <div className="label">Action</div>
            {students.map((student, index) => (
              <div className="item" key={index}>
                <Link to={"/student/" + student.id}>
                  <div className="btn">Edit</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
