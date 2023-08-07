import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Xout } from "../../assets/Icons/Xout - New Gray.svg";
import { students } from "../../utils";

export const Reward = () => {
  const [reward, setReward] = useState({
    title: "",
    url: "",
    coin: 220,
    image: null,
    studentId: null,
  });
  const [student, setStudent] = useState(students);
  const Upload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setReward({
        ...reward,
        image: URL.createObjectURL(img),
      });
    }
  };
  const RemoveImage = () => {
    setReward({ ...reward, image: null });
    const file = document.getElementById("file");
    file.value = null;
  };
  const Search = (e) => {
    const term = e.target.value;
    const filter = students.filter((item) => item.name.includes(term));
    setStudent(filter);
  };
  return (
    <div className="container">
      <div className="header">
        <div className="title">New Reward</div>
        <Link to="/reward">
          <div className="btn">
            <div className="text">New Rewards</div>
            <div className="plus">+</div>
          </div>
        </Link>
      </div>
      <div className="card new">
        <div className="form-control">
          <div className="label">Reward Title</div>
          <input
            type="text"
            className="text"
            placeholder="Reward Title"
            value={reward.title}
            onChange={(e) => setReward({ ...reward, title: e.target.value })}
          />
        </div>
        <div className="form-control">
          <div className="label">Reward URL</div>
          <input
            type="text"
            className="text"
            placeholder="Type URL"
            value={reward.url}
            onChange={(e) => setReward({ ...reward, url: e.target.value })}
          />
        </div>
        <div className="form-control">
          <div className="label">Reward Coin Value</div>
          <input
            type="number"
            min={0}
            value={reward.coin}
            className="grade"
            onChange={(e) => setReward({ ...reward, coin: e.target.value })}
          />
        </div>
        <div className="form-control">
          <div className="file">
            <input className="file" id="file" type="file" onChange={Upload} />
            <div className="icon" onClick={() => RemoveImage()}>
              <Xout />
            </div>
          </div>
        </div>
        {reward.image && <img src={reward.image} alt="Reward" />}
        <div className="form-control">
          <div className="header">
            <div className="label">Assign To Students</div>
            <div className="search">
              <input
                type="text"
                placeholder="Type a new message"
                onChange={Search}
              />
              <div className="search-icon">
                <div className="icon" />
              </div>
            </div>
          </div>
          <div className="table">
            <div className="row header">
              <div className="select">Select</div>
              <div className="name">Customer Name</div>
              <div className="email">Email</div>
            </div>
            {student.map((item) => (
              <div className="row">
                <div className="select">
                  <input
                    type="radio"
                    name="student"
                    onChange={() =>
                      setReward({ ...reward, studentId: item.id })
                    }
                  />
                </div>
                <div className="name">{item.name}</div>
                <div className="email">{item.email}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="submit">Submit</div>
      </div>
    </div>
  );
};
