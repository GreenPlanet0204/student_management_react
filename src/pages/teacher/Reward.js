import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as Xout } from "../../assets/Icons/Xout - New Gray.svg";
import { API_URL } from "../../utils";
import axios from "axios";

export const Reward = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [reward, setReward] = useState({
    title: "",
    url: "",
    coin: "",
    image: null,
    students: [],
  });
  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);

  /* eslint-disable */
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      axios.get(API_URL + "/reward/?id=" + params.id).then((res) => {
        setReward({ ...res.data });
      });
    }
    axios.get(API_URL + "/student/?school=" + user.school).then((res) => {
      setStudents(res.data);
      setFilterStudents(res.data);
    });
  }, []);
  /* eslint-enable */

  const Upload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setReward({
        ...reward,
        image: img,
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
    setFilterStudents(filter);
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
            className="grade text"
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
        {reward.image && (
          <img
            src={
              typeof reward.image === "string"
                ? API_URL + reward.image
                : URL.createObjectURL(reward.image)
            }
            alt="Reward"
          />
        )}
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
            </div>
            {filterStudents.map((item, index) => (
              <div className="row" key={index}>
                <div className="select">
                  {!reward.students.includes(item.id) ? (
                    <input
                      type="checkbox"
                      name="students"
                      onChange={() =>
                        setReward({
                          ...reward,
                          students: [...reward.students, item.id],
                        })
                      }
                    />
                  ) : (
                    <input
                      type="checkbox"
                      name="students"
                      onChange={() =>
                        setReward({
                          ...reward,
                          students: reward.students.filter(
                            (student) => student !== item.id
                          ),
                        })
                      }
                      checked
                    />
                  )}
                </div>
                <div className="col names">
                  <div className="image">
                    <img src={API_URL + item.image} alt="avatar" />
                  </div>
                  <div className="name">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="submit">Submit</div>
      </div>
    </div>
  );
};
