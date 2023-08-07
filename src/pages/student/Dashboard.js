import React from "react";
import { ReactComponent as DownArrow } from "../../assets/Icons/DownArrow.svg";
import { rewards } from "../../utils";

export const Dashboard = () => {
  return (
    <div className="container">
      <div className="blue text">
        <div className="title">
          Welcome back <span>Stephanie</span>
        </div>
        <div className="text medium">
          “Do what you can, with what you
          <br /> have, where you are.”{" "}
          <span className="bold">―Theodore Roosevelt.</span>
        </div>
      </div>
      <div className="category">
        <div className="card goals">
          <div className="label">Goals</div>
          <div className="number">34</div>
        </div>
        <div className="card coins">
          <div className="label">Coins Earned</div>
          <div className="number">25</div>
        </div>
      </div>
      <div className="details progress">
        <div className="card">
          <div className="title">My Engagement</div>
          <div className="small-text ">
            <div className="bold">Goals Met:</div>
            <div className="medium">3 of 34</div>
          </div>
          <div className="small-text">
            <div className="bold">Last login:</div>
            <div className="medium">Last login: Jun. 12, 2022 12:00PM</div>
          </div>
          <div className="small-text">
            <div className="bold">Last Redemption:</div>
            <div className="medium">Jun. 02, 2022</div>
          </div>
        </div>

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
      </div>
      <div className="card more">
        <div className="title">More Content</div>
      </div>
    </div>
  );
};
