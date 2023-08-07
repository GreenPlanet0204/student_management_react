import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils";
import { Link } from "react-router-dom";
import axios from "axios";

export const Students = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [students, setStudents] = useState([]);
  /* eslint-disable */
  useEffect(() => {
    axios
      .get(API_URL + "/student/?teacher=" + user.id)
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
        <div className="label">
          <div className="col names">Names</div>
          <div className="col progress">Weekly Progress</div>
          <div className="action">Actions</div>
        </div>
        {students.map((student) => (
          <div className="row">
            <div className="col names">
              <div className="image">
                <img src={API_URL + student.image} alt="avatar" />
              </div>
              <Link to={"/student/" + student.id}>
                <div className="name">{student.name}</div>
              </Link>
            </div>
            <div className={"progress"}>
              <div className="type">
                <div
                  className={
                    student.progress?.type === "behavior"
                      ? "behavior bold"
                      : "behavior"
                  }
                >
                  B
                </div>
                <div
                  className={
                    student.progress?.type === "academic"
                      ? "academic bold"
                      : "academic"
                  }
                >
                  A
                </div>
                <div
                  className={
                    student.progress?.type === "parent"
                      ? "parent bold"
                      : "parent"
                  }
                >
                  P
                </div>
              </div>
              <div className="progress-line">
                <div className="line">
                  <div
                    className={"color-line " + student.progress?.type}
                    style={{
                      width:
                        100 *
                          (student.progress?.point / student.progress?.goal) +
                        "%",
                    }}
                  />
                </div>
                <div className="text">
                  {student.progress?.point} of {student.progress?.goal}
                </div>
              </div>
            </div>
            <div className="action">
              <Link to={"/students/" + student.id + "/progress"}>
                <div className="btn">View</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
