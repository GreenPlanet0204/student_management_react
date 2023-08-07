import React, { useRef, useState, useEffect } from "react";
import { ReactComponent as XIcon } from "../../assets/Icons/X.svg";
import { ReactComponent as DownArrow } from "../../assets/Icons/DownArrow.svg";
import { students } from "../../utils";

export const Goal = () => {
  const startRef = useRef();
  const startRef2 = useRef();
  const endRef = useRef();
  const endRef2 = useRef();
  const select = useRef(null);
  const [open, setOpen] = useState(false);

  const [goal, setGoal] = useState({
    start: "",
    end: "",
    type: "Behavioral",
    score: "",
    bank: null,
  });

  const handleClickOutside = (event) => {
    if (select.current && !select.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const onChangeScore = (e) => {
    const num = parseFloat(e.target.value).toFixed(4);
    setGoal({ ...goal, score: num });
  };
  const NewResponse = () => {
    const responses = document.getElementById("responses");
    let html = responses.innerHTML;
    html += '<textarea className="response" placeholder="Type Response" />';
    responses.innerHTML = html;
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
    <div className="container">
      <div className="header">
        <div className="title">New Goal</div>
      </div>
      <div className="card new">
        <div className="form-group">
          <div className="form-control">
            <div className="text">Goal Date From</div>
            <div
              className="date"
              onClick={(e) =>
                !startRef2.current.contains(e.target)
                  ? startRef.current.showPicker()
                  : (startRef.current.value = null)
              }
            >
              <input
                type="date"
                ref={startRef}
                value={goal.start}
                max={goal.end}
                onChange={(e) => setGoal({ ...goal, start: e.target.value })}
              />
              <div className="icon" ref={startRef2}>
                <XIcon />
              </div>
            </div>
          </div>
          <div className="form-control">
            <div className="text">Goal Date To</div>
            <div
              className="date"
              onClick={(e) =>
                !endRef2.current.contains(e.target)
                  ? endRef.current.showPicker()
                  : (endRef.current.value = null)
              }
            >
              <input
                type="date"
                value={goal.end}
                ref={endRef}
                min={goal.start}
                onChange={(e) => setGoal({ ...goal, end: e.target.value })}
              />
              <div className="icon" ref={endRef2}>
                <XIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <div className="label">Goal Type</div>
            <div className={open ? "select open" : "select"}>
              <div
                className="select-select"
                onClick={() => setOpen(!open)}
                ref={select}
              >
                <div className="text">{goal.type}</div>
                <div className="icon">
                  <DownArrow />
                </div>
              </div>
              <div className="select-options">
                <div
                  className="text"
                  onClick={() => setGoal({ ...goal, type: "Behavioral" })}
                >
                  Behavioral
                </div>
                <div
                  className="text"
                  onClick={() => setGoal({ ...goal, type: "Academic" })}
                >
                  Academic
                </div>
              </div>
            </div>
          </div>
          <div className="form-control">
            <div className="text">Average Score Goal</div>
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
          <select className="bank" value={goal.bank}>
            <option>Select Goal</option>
          </select>
        </div>
        <div className="or">Or</div>
        <div className="form-control">
          <div className="label">Goal</div>
          <textarea className="goal" placeholder="Goal" />
        </div>
        <div className="form-control" id="responses">
          <div className="label">Responses</div>
          <textarea className="response" placeholder="Type Response" />
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
          </div>
          <div className="table">
            <div className="row header">
              <div className="select">Select</div>
              <div className="name">Customer Name</div>
              <div className="email">Email</div>
            </div>
            {students.map((item) => (
              <div className="row">
                <div className="select">
                  <input
                    type="radio"
                    name="student"
                    onChange={() => setGoal({ ...goal, studentId: item.id })}
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
