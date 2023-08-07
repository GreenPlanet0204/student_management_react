import React from "react";
import { ReactComponent as BiArrow } from "../../assets/Icons/Bi Arrow.svg";
import { rewards } from "../../utils";

export const Rewards = () => {
  return (
    <div className="container rewards">
      <div className="header">
        <div className="title">Rewards</div>
      </div>
      <div className="card rewards">
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
        <div className="rewards">
          <div className="header">
            <div className="image">Image</div>
            <div className="name">Reward Name</div>
            <div className="coin">Coins Needed</div>
          </div>
          {rewards.map((reward) => (
            <div className="reward">
              <div className="detail">
                <div className="image">
                  <img src={reward.image} alt="reward" />
                </div>
                <div className="name">{reward.name}</div>
                <div className="coin">
                  <div className="circle">{reward.coins}</div>
                </div>
              </div>
              <div className="btn">Select</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
