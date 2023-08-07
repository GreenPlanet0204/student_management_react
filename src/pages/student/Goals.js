import React, { useState } from "react";
import { ReactComponent as Search } from "../../assets/Icons/Search - New Gray.svg";
import { goals } from "../../utils";

export const Goals = () => {
  const [type, setType] = useState("behavior");
  const teachers = [
    { id: 1, name: "Jhon Simons" },
    { id: 2, name: "Jeff Durym" },
  ];
  const [teacher, setTeacher] = useState(1);
  return (
    <div className="container">
      <div className="header">
        <div className="title">Goals</div>
      </div>
      <div className="card goals">
        <div className="filter">
          <div className="type">
            <div
              className={type === "behavior" ? "behavior bold" : "behavior"}
              onClick={() => setType("behavior")}
            >
              Behavioral
            </div>
            <div
              className={type === "academic" ? "academic bold" : "academic"}
              onClick={() => setType("academic")}
            >
              Academic
            </div>
            <div
              className={type === "parent" ? "parent bold" : "parent"}
              onClick={() => setType("parent")}
            >
              Parent
            </div>
          </div>
        </div>
        {type !== "parent" && (
          <div className="teachers">
            <div className="label">Teacher</div>
            <div className="divider" />
            {teachers.map((item) => (
              <div
                className={
                  teacher === item.id ? "teacher underline" : "teacher"
                }
                onClick={() => setTeacher(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
        <div className="search">
          <input type="search" placeholder="Search for a goal" />
          <div className="btn">
            <Search />
          </div>
        </div>
        {goals.map((goal) => (
          <div className="goal">
            <div className="detail">
              <div className="step">Goal {goal.step}</div>
              <div className="name">{goal.name}</div>
            </div>
            <div className="action">
              <div className="btn">View</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
