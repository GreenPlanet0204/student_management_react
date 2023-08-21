import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as DownArrow } from "../assets/Icons/DownArrow.svg";

export const UserTypeSelect = ({ type, onChange }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  /* eslint-disable */
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  /* eslint-enable */
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      className={open ? "select open" : "select"}
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <div className="user">
        <div className="name small-text medium">{type}</div>
        <div className="icon">
          <DownArrow />
        </div>
      </div>
      <div className="options">
        <div className="details">
          {user.role !== "student" && (
            <div className="small-text" onClick={() => onChange("student")}>
              Student
            </div>
          )}
          {user.role !== "teacher" && (
            <div className="small-text" onClick={() => onChange("teacher")}>
              Teacher
            </div>
          )}
          {user.role !== "parent" && (
            <div className="small-text" onClick={() => onChange("parent")}>
              Parent
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const UserSelect = ({ user = {}, users = [], onChange }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  /* eslint-disable */
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  /* eslint-enable */
  return (
    <div
      className={open ? "select open" : "select"}
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <div className="user">
        <div className="name small-text medium">{user?.name}</div>
        <div className="icon">
          <DownArrow />
        </div>
      </div>
      <div className="options">
        <div className="details">
          {users.map((item, index) => (
            <div
              className="small-text"
              onClick={() => onChange(item)}
              key={index}
            >
              {item?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
