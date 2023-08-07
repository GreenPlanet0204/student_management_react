import React, { useEffect, useState } from "react";
import { ReactComponent as BiArrow } from "../../assets/Icons/Bi Arrow.svg";
import { API_URL } from "../../utils";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

export const Tracking = () => {
  const [tab, setTab] = useState("student");

  const [data, setData] = useState([]);

  /* eslint-disable */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`${API_URL}/${tab}/?school=${user.id}`)
      .then((res) => setData(res.data));
  }, [tab]);
  /* eslint-enable */
  return (
    <div className="container">
      <div className="blue tracking">
        <div className="title">Tracking</div>
        <div className="text">
          <span>80%</span> of your students engaged
          <br />
          their assignments this week.
        </div>
      </div>
      <div className="card students">
        <div className="tabs">
          <div
            className={tab === "student" ? "tab active" : "tab"}
            onClick={() => setTab("student")}
          >
            Students
          </div>
          <div
            className={tab === "teacher" ? "tab active" : "tab"}
            onClick={() => setTab("teacher")}
          >
            Teachers
          </div>
          <div
            className={tab === "parent" ? "tab active" : "tab"}
            onClick={() => setTab("parent")}
          >
            Parents
          </div>
          <div
            className={tab === "reward" ? "tab active" : "tab"}
            onClick={() => setTab("reward")}
          >
            Rewards
          </div>
        </div>
        <div className="filter">
          <div className="search">
            <input type="text" placeholder="Search for a reward" />
            <div className="search-icon">
              <div className="icon" />
            </div>
          </div>
          <div className="btn">
            <div className="text">Filter</div>
            <div className="icon">
              <BiArrow />
            </div>
          </div>
        </div>
        <div className="row small label">
          <div className="col names">Names</div>
          {tab !== "reward" && tab !== "school" && (
            <>
              <div className="col school">Schools</div>
              <div className="col">Last Active</div>
            </>
          )}
          {tab === "student" && <div className="col count">Coins Earned</div>}
          {tab === "school" && <div className="col count">Teacher Count</div>}
          {(tab === "school" || tab === "teacher") && (
            <div className="col count">Student Count</div>
          )}
          {tab === "reward" && (
            <>
              <div className="col count">Coins Needed</div>
              <div className="col count">Used</div>
            </>
          )}

          <div className="action">Actions</div>
        </div>
        {data.map((item, index) => (
          <div className="row small" key={index}>
            <div className={tab !== "school" ? "col names" : "col school"}>
              <div className="image">
                <img src={API_URL + item?.image} alt="Logo" />
              </div>
              <div className="name">
                {tab !== "reward" ? item?.name : item.title}
              </div>
            </div>
            {tab !== "reward" && tab !== "school" && (
              <>
                <div className="col school">
                  <div className="image">
                    <img src={API_URL + item.school?.image} alt="School" />
                  </div>
                  <div className="name">{item.school?.name}</div>
                </div>
                <div className="col">
                  {item.last && moment(item.last).format("MM/DD/YYYY")}
                </div>
              </>
            )}
            {tab === "reward" && (
              <>
                <div className="col count">{item.coin}</div>
                <div className="col count">{item.students?.length}</div>
              </>
            )}
            {tab === "student" && <div className="col count">{item.coin}</div>}
            {tab === "school" && (
              <div className="col count">{item.teachers?.length}</div>
            )}
            {(tab === "school" || tab === "teacher") && (
              <div className="col count">{item.students?.length}</div>
            )}
            <Link to={`/${tab}/${item.id}`} className="action">
              <div className="btn">View</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
