import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/Icons/Logo.svg";
import axios from "axios";
import { API_URL } from "../utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const Submit = async () => {
    try {
      const res = await axios.post(API_URL + "/token/", user);
      const token = res.data.access;
      localStorage.setItem("token", token);
      const res2 = await axios.get(API_URL + "/profile/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      localStorage.setItem("user", JSON.stringify(res2.data));
      navigate("/");
    } catch {
      console.error("error");
    }
  };

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <div className="auth">
      <div className="topbar">
        <div className="logo">
          <Logo />
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="title">Sign In</div>
          <div className="form-group">
            <div className="form-control">
              <div className="label">Username</div>
              <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Username"
              />
            </div>
            <div className="form-control">
              <div className="label">Password</div>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="btn" onClick={Submit}>
            Go
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
