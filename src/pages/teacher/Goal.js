import React, { useState, useEffect } from "react";
import { ReactComponent as XIcon } from "../../assets/Icons/X.svg";
import Select from "../../components/Select";
import { API_URL } from "../../utils";
import DatePicker from "../../components/DatePicker";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoalSelect from "../../components/GoalSelect";

export const Goal = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const types = ["Behavioral", "Academic"];

  const [goal, setGoal] = useState({
    start: "",
    end: "",
    type: "Behavioral",
    score: "",
    goal: "",
    student: "",
    name: "",
    responses: [],
  });

  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);

  const onChangeScore = (e) => {
    let val = e.target.value;
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    const num = parseFloat(val).toFixed(4);
    setGoal({ ...goal, score: num });
  };

  const NewResponse = () => {
    const responses = document.getElementById("responses");
    let html = responses.innerHTML;
    html += '<textarea className="response" placeholder="Type Response" />';
    responses.innerHTML = html;
  };

  const Search = (e) => {
    const term = e.target.value;
    const filter = students.filter((item) => item.name.includes(term));
    setFilterStudents(filter);
  };

  /* eslint-disable */
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      axios.get(API_URL + "/reward/?id=" + params.id).then((res) => {
        setGoal({ ...res.data });
      });
    }
    axios.get(API_URL + "/student/?school=" + user.school).then((res) => {
      setStudents(res.data);
      setFilterStudents(res.data);
    });
  }, []);
  /* eslint-enable */

  const onChange = (item, index) => {
    var responses = goal.responses;
    responses[index] = item;
    setGoal({ ...goal, responses: responses });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">New Goal</div>
      </div>
      <div className="card new">
        <div className="form-group">
          <div className="form-control">
            <div className="label">Goal Date From</div>
            <DatePicker
              value={goal.start}
              max={goal.end}
              onChange={(e) => setGoal({ ...goal, start: e.target.value })}
            />
          </div>
          <div className="form-control">
            <div className="label">Goal Date To</div>
            <DatePicker
              value={goal.end}
              min={goal.start}
              onChange={(e) => setGoal({ ...goal, start: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <div className="label">Goal Type</div>
            <Select
              value={goal.type}
              options={types}
              onChange={(val) => setGoal({ ...goal, type: val })}
              placeholder="Select Goal"
            />
          </div>
          <div className="form-control">
            <div className="label">Average Score Goal</div>
            <div className="date">
              <input
                type="number"
                min={0}
                max={100}
                value={goal.score}
                placeholder="--.----"
                onChange={(e) => setGoal({ ...goal, score: e.target.value })}
                onMouseLeave={(e) => onChangeScore(e)}
              />
              <div
                className="icon"
                onClick={() => setGoal({ ...goal, score: "" })}
              >
                <XIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="form-control">
          <div className="label">Goal Bank</div>
          <GoalSelect
            value={goal.bank}
            placeholder="Select Goal"
            onChange={(val) => setGoal({ ...goal, student: val })}
          />
        </div>
        <div className="or">Or</div>
        <div className="form-control">
          <div className="label">Goal</div>
          <textarea className="goal" placeholder="Goal" />
        </div>

        <div className="form-control" id="responses">
          <div className="label">Responses</div>
          {goal.responses?.map((item, index) => (
            <textarea
              className="response"
              placeholder="Type Response"
              value={item}
              onChange={() => onChange(item, index)}
            />
          ))}
          {goal.responses?.length > 0 && (
            <textarea
              className="response"
              placeholder="Type Response"
              onChange={(e) =>
                setGoal({
                  ...goal,
                  responses: [...goal.responses, e.target.value],
                })
              }
            />
          )}
        </div>
        <div className="btn response" onClick={NewResponse}>
          <div className="text">New Response</div>
          <div className="plus">+</div>
        </div>
        <div className="form-control">
          <div className="header">
            <div className="label">
              <div className="">Assign To:</div>
              <div className="underline">Student</div>
            </div>
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
            {filterStudents.map((item, index) => (
              <div className="row" key={index}>
                <div className="select">
                  <input
                    type="radio"
                    name="students"
                    onChange={() =>
                      setGoal({
                        ...goal,
                        student: item.id,
                      })
                    }
                  />
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
