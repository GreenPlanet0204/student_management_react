import React from "react";
import { students } from "../../utils";
import { PieChart, Pie, Cell } from "recharts";

export const Tracking = () => {
  const getColor = (point) => {
    if (point === 3) {
      return "#F4B200";
    } else if (point < 3) {
      return "#913A7E";
    } else {
      return "#CCCC00";
    }
  };
  const pieData = students.map((student) => ({
    name: student.name,
    value: student.value,
  }));
  const COLORS = ["#CCCC00", "#913A7E", "#CCCC00", "#F4B200"];
  const COLORS1 = ["#F4B200", "#913A7E", "#F4B200", "#003595"];
  const COLORS2 = ["#003595", "#913A7E", "#003595", "#F4B200"];
  console.log("data", pieData);
  return (
    <div className="container tracking">
      <div className="blue text">
        <div className="title">Tracking</div>
        <div className="text">
          <span>80%</span> of your students engaged
          <br />
          their assignments this week.
        </div>
      </div>
      <div className="category">
        <div className="card students">
          <div className="label">Students</div>
          <div className="number">4</div>
        </div>
        <div className="card goals">
          <div className="label">Goals</div>
          <div className="number">45</div>
        </div>
      </div>
      <div className="details">
        <div className="card">
          <div className="title">Student Engagement</div>
          <div className="content">
            <div className="row">
              <div className="label">Students</div>
              <div className="label">Coins Earned</div>
            </div>
            <div className="divider" />
            {students.map((student) => (
              <div className="row">
                <div className="name">{student.name}</div>

                <div
                  className="result"
                  style={{ color: getColor(student.earned) }}
                >
                  <div className="line">
                    <div
                      className="progress"
                      style={{
                        width: 100 * (student.earned / 5) + "%",
                      }}
                    />
                  </div>
                  <div className="text">{student.earned} of 40</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="title">Monthly Data</div>
          <div className="graphs">
            <div className="lines">
              {students.map((student) => (
                <div
                  className="line"
                  style={{ color: getColor(student.earned) }}
                >
                  <div
                    className="progress"
                    style={{ height: 100 * (student.earned / 5) + "%" }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="circles">
              <div className="circle">
                <PieChart width={200} height={200}>
                  <Pie data={pieData} dataKey="value" nameKey="name">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card more">
        <div className="title">School Year Data </div>
        <div className="graphs">
          <div className="lines">
            {students.map((student) => (
              <div className="line" style={{ color: getColor(student.earned) }}>
                <div
                  className="progress"
                  style={{ height: 100 * (student.earned / 5) + "%" }}
                ></div>
              </div>
            ))}
          </div>
          <div className="circles">
            <div className="circle">
              <PieChart width={200} height={200}>
                <Pie data={pieData} dataKey="value" nameKey="name">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS1[index]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="circle">
              <PieChart width={200} height={200}>
                <Pie data={pieData} dataKey="value" nameKey="name">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS2[index]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
