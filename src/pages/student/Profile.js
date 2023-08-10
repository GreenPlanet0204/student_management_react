import React, { useEffect, useState } from "react";
import { ReactComponent as DownArrow } from "../../assets/Icons/DownArrow.svg";
import moment from "moment";
import { API_URL, goals, rewards } from "../../utils";
import axios from "axios";

export const Profile = () => {
  const [student, setStudent] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState("");
  const confirm = () => {
    setModal(false);
  };
  /* eslint-disable */
  useEffect(() => {
    axios
      .get(API_URL + "/student/?id=" + user.profile.id)
      .then((res) => setStudent(res.data));
  }, []);
  /* eslint-enable */
  return (
    <>
      <div className="container profile">
        <div className="card profile">
          <div className="header">
            <div className="title">My Progress</div>
            <div className="info">
              <div className="image">
                <img src={API_URL + student?.image} alt="avatar" />
              </div>
              <div className="status">
                <div className="status-info">
                  <div className="label">Status</div>
                  <div className="status">
                    <div className="circle green" />
                    <div className="text">Active</div>
                  </div>
                </div>
                <div className="login-info">
                  Last login:{" "}
                  {student?.last &&
                    moment(student.last).format("MMM. DD, YYYY hh:mm")}
                </div>
              </div>
            </div>
            <div className="user-info">
              <div className="name">{student?.name}</div>
              <div className="email">{student?.email}</div>
            </div>
          </div>

          <div className="coins">
            <div className="text">My Coins</div>
            <div className={modal ? "circle active" : "circle"}>
              {student?.coin}
            </div>
            <div className="redeem" onClick={() => setModal(true)}>
              Redeem
            </div>
          </div>
          <div className="details">
            <div className="change">Change</div>
            <div className="row">
              <div className="text">Grade</div>
              <div className="value">{student?.grade}</div>
            </div>
            <div className="row">
              <div className="text">Gender</div>
              <div className="value">{student?.gender}</div>
            </div>
            <div className="row">
              <div className="text">Athlete</div>
              <div className="value">{student?.athlete ? "Yes" : "No"}</div>
            </div>
            <div className="row">
              <div className="text">College Bound</div>
              <div className="value">
                {student?.college_bound ? "Yes" : "No"}
              </div>
            </div>
            <div className="row">
              <div className="text">Workforce Bound</div>
              <div className="value">
                {student?.college_bound ? "Yes" : "No"}
              </div>
            </div>
            <div className="row interests">
              <div className="text">Interests</div>
              <div className="interests">
                {student?.interests.map((item, index) => (
                  <div className="interest" key={index}>
                    {item}
                  </div>
                ))}
                <div className="plus">+</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-group">
          <div className="card">
            <div className="progress">
              <div className="header">
                <div className="title">This Week's Progress</div>
                <div className="select">
                  <div className="btn">
                    <div className="text">Behavioral</div>
                    <div className="icon">
                      <DownArrow />
                    </div>
                  </div>
                </div>
              </div>
              <div className="progress-line">
                <div className="line">
                  <div className="progress" />
                </div>
                <div className="text">3 of 5</div>
              </div>
            </div>
            <div className="divider" />
            <div className="rewards">
              <div className="header">
                <div className="title">Selected Rewards</div>
              </div>
              <div className="row">
                {rewards.map((reward) => (
                  <div className="reward">
                    <div className="image">
                      <img src={reward.image} alt="reward" />
                    </div>
                    <div className="mark">{reward.coins}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card progress">
            <div className="header">
              <div className="title">
                <div className="text">Behavioral</div>
                <div className="icon">
                  <DownArrow />
                </div>
              </div>
            </div>
            <div className="goals">
              {goals.map((goal) => (
                <div className="goal-content">
                  <div className="goal">
                    <div className="detail">
                      <div className="step">Goal {goal.step}</div>
                      <div className="name">{goal.name}</div>
                    </div>

                    <div className="action">
                      <div className="btn">View</div>
                    </div>
                  </div>
                  <div className={"status " + goal.status}>{goal.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <>
          <div className="panel" />
          <div className="modal">
            <div className="card">
              <div className="header">
                <div className="title">Redeeming Coins</div>
                <div className="btn" onClick={() => setModal(false)}>
                  Close
                </div>
              </div>
              <div className="coins">
                <div className="text">Current Coin Count</div>
                <div className="circle">25</div>
              </div>
              <div className="rewards">
                <div className="text">Select Reward</div>
                <div className="row">
                  {rewards.map((reward) => (
                    <div className="reward" onClick={() => setSelect(reward)}>
                      <div className="image">
                        <img src={reward.image} alt="reward" />
                      </div>
                      {select === reward && (
                        <div className="selected">Selected</div>
                      )}
                      <div className="mark">{reward.coins}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="btn-group">
                <div className="btn deny" onClick={() => setModal(false)}>
                  Cancel
                </div>
                <div className="btn confirm" onClick={() => confirm()}>
                  Redeem
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
