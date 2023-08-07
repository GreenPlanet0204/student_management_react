import React, { useState } from "react";
import moment from "moment";
import Avatar from "../../assets/Images/avatar.jpg";
import { ReactComponent as DownArrow } from "../../assets/Icons/DownArrow.svg";
import { ReactComponent as PrintIcon } from "../../assets/Icons/Print - New Gray.svg";
import { ReactComponent as GoalIcon } from "../../assets/Icons/Goals.svg";
import { ReactComponent as XIcon } from "../../assets/Icons/X.svg";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { records } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Progress = () => {
  const time = new Date();
  const start = new Date("2023.04.01");
  const end = new Date("2023.06.30");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const data = [
    {
      date: new Date("2023-04-02"),
      value: 0,
      val1: 10,
      val2: 20,
      val3: 30,
      val4: 40,
      val5: 50,
      val6: 60,
      val7: 70,
      val8: 80,
      val9: 90,
      val10: 100,
    },
    {
      date: new Date("2023-04-08"),
      value: 47,
      val1: 10,
      val2: 20,
      val3: 30,
      val4: 40,
      val5: 50,
      val6: 60,
      val7: 70,
      val8: 80,
      val9: 90,
      val10: 100,
    },
    {
      date: new Date("2023-05-03"),
      value: 47,
      val1: 10,
      val2: 20,
      val3: 30,
      val4: 40,
      val5: 50,
      val6: 60,
      val7: 70,
      val8: 80,
      val9: 90,
      val10: 100,
    },
    {
      date: new Date("2023-05-25"),
      value: 72,
      val1: 10,
      val2: 20,
      val3: 30,
      val4: 40,
      val5: 50,
      val6: 60,
      val7: 70,
      val8: 80,
      val9: 90,
      val10: 100,
    },
    {
      date: new Date("2023-06-08"),
      value: 78,
      val1: 10,
      val2: 20,
      val3: 30,
      val4: 40,
      val5: 50,
      val6: 60,
      val7: 70,
      val8: 80,
      val9: 90,
      val10: 100,
    },
    {
      date: new Date("2023-06-15"),
      value: 85,
      val1: 10,
      val2: 20,
      val3: 30,
      val4: 40,
      val5: 50,
      val6: 60,
      val7: 70,
      val8: 80,
      val9: 90,
      val10: 100,
    },
  ];
  const [select, setSelect] = useState({
    date: data[0].date,
    value: data[0].value,
  });
  const [record, setRecord] = useState();
  const dateFormatter = (date) => {
    return moment(new Date(date)).format("MMMM");
  };
  const dotClick = (e) => {
    const { payload } = e;
    setSelect({
      date: payload.date,
      value: payload.value,
    });
  };

  const confirm = () => {
    navigate("/students");
  };
  return (
    <>
      <div className="container profile">
        <div className="card profile progress">
          <div className="header">
            <div className="title">Progress Monitoring</div>
            <div className="info">
              <div className="image">
                <img src={Avatar} alt="avatar" />
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
                  Last login: {moment(time).format("MMM. DD, YYYY hh:mm")}
                </div>
              </div>
            </div>
            <div className="user-info">
              <div className="name">Melony Cartwright</div>
              <div className="email">Melony.Cartwright@sjc.students.com</div>
            </div>
          </div>
          <div className="goal-details">
            <div className="detail">
              <div className="text">Behavioral</div>
              <div className="value">Goal 1</div>
              <div className="icon">
                <DownArrow />
              </div>
            </div>
            <div className="detail col">
              <div className="text">Goal Name</div>
              <div className="value">Reading Comprehension</div>
            </div>
            <div className="detail">
              <div className="text">Coin Value</div>
              <div className="value">2</div>
            </div>
          </div>
          <div className="details">
            <div className="description">
              <div className="date">
                Completion Date: {moment(new Date(end)).format("MM/DD/YYYY")}
              </div>
              <div className="text">
                Administration and or teacher identifies students who need more
                intervention support than what the School wide Positive Behavior
                Intervention Support (PBIS) -a framework for supporting
                students’ behavioral, academic, ocial,emotional, and mental
                health can offer.
              </div>
            </div>
            <div className="score">
              Average Score Goal: <b>85</b>
            </div>
            <div className="progress-line">
              <div className="line">
                <div className="progress" style={{ width: "20%" }} />
              </div>
              <div className="text">20%</div>
            </div>
          </div>
          <div className="btn complete" onClick={() => setOpen(true)}>
            Complete
          </div>
        </div>
        <div className="card">
          <div className="header">
            <div className="left">
              <div className="title">Progress Chart</div>
              <div className="score">
                <div className="text">Average Score:</div>
                <div className="value">63</div>
              </div>
            </div>
            <div className="right">
              <div className="btn">
                <div className="text">Print</div>
                <div className="icon">
                  <PrintIcon />
                </div>
              </div>
              <div className="btn">
                <div className="text">Export</div>
                <div className="icon">
                  <GoalIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="details">
              <div className="date detail">
                <div className="text">Entry Date From</div>
                <div className="btn">
                  <div className="date">
                    {moment(new Date(start)).format("MM/DD/YYYY")}
                  </div>
                  <div className="icon">
                    <XIcon />
                  </div>
                </div>
              </div>
              <div className="date detail">
                <div className="text">Entry Date To</div>
                <div className="btn">
                  <div className="date">
                    {moment(new Date(end)).format("MM/DD/YYYY")}
                  </div>
                  <div className="icon">
                    <XIcon />
                  </div>
                </div>
              </div>
              <div className="score detail">
                <div className="text">Score</div>
                <div className="btn">85.0000</div>
              </div>
            </div>
            <div className="gray-container">
              <div className="graph">
                <LineChart width={600} height={360} data={data}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={dateFormatter}
                    fontSize={13}
                    fontFamily="Poppins"
                    fontWeight={500}
                    letterSpacing={0}
                    stroke="#003595"
                    tickSize={0}
                    tickMargin={10}
                  />
                  <YAxis
                    fontSize={13}
                    fontFamily="Poppins"
                    fontWeight={500}
                    letterSpacing={0}
                    stroke="#003595"
                    tickSize={0}
                    tickMargin={10}
                    spacing={30}
                  ></YAxis>
                  <Line
                    dataKey="value"
                    stroke="#913A7E"
                    strokeWidth="3"
                    activeDot={{ r: 8 }}
                    dot={{
                      onClick: dotClick,
                      strokeWidth: 1,
                      r: 4,
                      stroke: "#003595",
                      cursor: "pointer",
                    }}
                  />
                  <Line dataKey="val1" stroke="#707070" className="straight" />
                  <Line dataKey="val2" stroke="#707070" className="straight" />
                  <Line dataKey="val3" stroke="#707070" className="straight" />
                  <Line dataKey="val4" stroke="#707070" className="straight" />
                  <Line dataKey="val5" stroke="#707070" className="straight" />
                  <Line dataKey="val6" stroke="#707070" className="straight" />
                  <Line dataKey="val7" stroke="#707070" className="straight" />
                  <Line dataKey="val8" stroke="#707070" className="straight" />
                  <Line dataKey="val9" stroke="#707070" className="straight" />
                  <Line dataKey="val10" stroke="#707070" className="straight" />
                </LineChart>
              </div>
              <div className="description">
                <div className="date">
                  {moment(select.date).format("MMM D, YYYY")}
                </div>
                <div className="details">
                  <div className="detail">
                    <div className="text bold">Score:</div>
                    <div className="text medium">{select.value.toFixed(4)}</div>
                  </div>
                  <div className="detail">
                    <div className="text bold">Status:</div>
                    <div className="text medium">Satisfactory</div>
                  </div>
                </div>
                <div className="details">
                  <div className="text bold">Notes:</div>
                  <div className="text">
                    Administration and or teacher identifies students who need
                    more intervention support than what the School wide Positive
                    Behavior Intervention Support (PBIS) -a framework for
                    supporting students’ behavioral, academic, ocial,emotional,
                    and mental health can offer.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="records">
            <div className="record-header">
              <div className="btn-group">
                <div className="btn fill">Update</div>
                <div className="btn">Undo</div>
                <div className="btn">Delete</div>
              </div>
              <div className="btn">
                <div className="text">New Record</div>
                <div className="icon">+</div>
              </div>
            </div>
            <div className="table">
              <div className="thead">
                <div className="row text-1 medium">
                  <div className="select">
                    <XIcon />
                  </div>
                  <div className="line">Line</div>
                  <div className="date">Date</div>
                  <div className="score">Score</div>
                  <div className="notes">Notes</div>
                </div>
              </div>
              <div className="tbody">
                {records.map((rec, index) => (
                  <div className="row text-1 medium">
                    <div className="select">
                      <input
                        type="radio"
                        name="record"
                        value={index}
                        onChange={() => setRecord(rec)}
                      />
                    </div>
                    <div className="line">{index + 1}</div>
                    <div className="date">
                      {moment(new Date(rec.date + " 08:00:00")).format(
                        "MM/DD/YYYY"
                      )}
                    </div>
                    <div className="score">{rec.score.toFixed(4)}</div>
                    <div className="notes">{rec.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <>
          <div className="panel" />
          <div className="modal">
            <div className="card">
              <div className="header">
                <div className="title">Complete Goal</div>
                <div className="btn" onClick={() => setOpen(false)}>
                  Close
                </div>
              </div>
              <div className="coins">
                <div className="text">Maximum Coins Available</div>
                <div className="circle">3</div>
              </div>
              <div className="rewards coins">
                <div className="text">Select Coins Earned</div>
                <div className="coins large-text bold">
                  <div className="coin">1</div>
                  <div className="coin">2</div>
                  <div className="coin">3</div>
                </div>
                <div className="explain">
                  <div className="text bold">Explaination of Coins Earned</div>
                  <textarea placeholder="Explanation for Coins Earned" />
                </div>
              </div>

              <div className="btn-group">
                <div className="btn deny" onClick={() => setOpen(false)}>
                  Cancel
                </div>
                <div className="btn confirm" onClick={() => confirm()}>
                  Confirm
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
