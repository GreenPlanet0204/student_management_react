import React, { useEffect, useState } from "react";
import { ReactComponent as BiArrow } from "../../assets/Icons/Bi Arrow.svg";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils";
import axios from "axios";

export const Rewards = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rewards, setRewards] = useState([]);

  /* eslint-disable */
  useEffect(() => {
    axios
      .get(API_URL + "/reward/?school=" + user.id)
      .then((res) => setRewards(res.data));
  }, []);
  /* eslint-enable */

  return (
    <div className="container rewards">
      <div className="header">
        <div className="title">Rewards</div>
        <Link to="/reward">
          <div className="btn">
            <div className="text">New Rewards</div>
            <div className="plus">+</div>
          </div>
        </Link>
      </div>
      <div className="card students">
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
        <div className="label">
          <div className="col names">Reward Names</div>
          <div className="col count">Coins Needed</div>
          <div className="col count">Used</div>
          <div className="action">Actions</div>
        </div>
        {rewards.map((reward, index) => (
          <div className="row" key={index}>
            <div className="col names">
              <div className="image reward">
                <img src={API_URL + reward.image} alt="reward" />
              </div>
              <div className="name">{reward.title}</div>
            </div>
            <div className="col count">{reward.coin}</div>
            <div className="col count">{reward.students.length}</div>
            <Link to={"/reward/" + reward.id} className="action">
              <div className="btn">View</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
