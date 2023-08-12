import React, { useEffect, useState } from "react";
import moment from "moment";
import { ReactComponent as PrintIcon } from "../../assets/Icons/Print - New Gray.svg";
import { ReactComponent as GoalIcon } from "../../assets/Icons/Goals.svg";
import { ReactComponent as XIcon } from "../../assets/Icons/X.svg";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import ServerURL from "../../utils/ServerURL";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "../../components/Select";

export const Progress = () => {
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [select, setSelect] = useState({});
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState({});
  const [record, setRecord] = useState();
  const [index, setIndex] = useState(0);
  const [student, setStudent] = useState();
  const dateFormatter = (date) => {
    return moment(new Date(date + " 01:00:00")).format("MMM DD");
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

  const fetchTableData = (data) => {
    const record = [];

    const start = record.filter((item) => item.date === data?.start_date);
    const end = data?.records?.filter((item) => item.date === data?.end_date);
    if (start.length < 1) {
      record.push({
        date: data?.start_date,
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
      });
    }
    data?.records?.forEach((item) => {
      record.push({
        date: item.date,
        value: item.score,
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
      });
    });
    if (end?.length < 1) {
      record.push({
        date: data?.end_date,
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
      });
    }
    setData(record);
  };
  /* eslint-disable */
  useEffect(() => {
    if (params.goalId) {
      axios
        .get(ServerURL.BASE_URL + "/goal/?id=" + params.goalId)
        .then((res) => {
          setGoal(res.data);
          setStudent(res.data.student);
          fetchTableData(res.data);
        });
    } else if (params.id) {
      axios
        .get(ServerURL.BASE_URL + "/goal/?student=" + params.id)
        .then((res) => {
          setGoals(res.data.filter((item) => item.type === "Parent"));
          setGoal(res.data.filter((item) => item.type === "Parent")[index]);
          fetchTableData(
            res.data.filter((item) => item.type === "Parent")[index]
          );
        })
        .catch(() => console.error("error"));
      axios
        .get(ServerURL.BASE_URL + "/student/?id=" + params.id)
        .then((res) => setStudent(res.data))
        .catch(() => console.error("error"));
    } else {
      axios.get(ServerURL.BASE_URL + "/goal/?user=" + user.id).then((res) => {
        setGoals(res.data);
        setGoal(res.data[index]);
        fetchTableData(res.data[index]);
        setStudent(res.data[index]?.student);
      });
    }
  }, [modalOpen]);

  useEffect(() => {
    setGoal(goals[index]);
    fetchTableData(goals[index]);
    if (!params.id) setStudent(goals[index]?.student);
  }, [index]);
  /* eslint-enable */
  const NewRecord = () => {
    setRecord({
      score: "",
      note: "",
    });
    setModalOpen(true);
  };

  const Undo = () => {
    axios.delete(ServerURL.BASE_URL + "/record/?id=" + record.id);
  };

  const getProgress = (start_date, end_date) => {
    const time = new Date().getTime();
    const end = new Date(end_date).getTime();
    const start = new Date(start_date).getTime();
    if (time < start) return "0%";
    if (time > end) return "100%";
    const percent = ((100 * (time - start)) / (end - start)).toFixed(0) + "%";
    return percent;
  };

  const addRecord = async () => {
    const data = {
      ...record,
      goal: goal.id,
    };
    try {
      await axios.post(ServerURL.BASE_URL + "/record/", data);
      setModalOpen(false);
    } catch {
      console.error("error");
    }
  };

  const handleChangeScore = (val) => {
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    setRecord({
      ...record,
      score: val,
    });
  };
  return (
    <>
      <div className="container profile">
        <div className="card profile progress">
          <div className="header">
            <div className="title">Progress Monitoring</div>
            <div className="info">
              <div className="image">
                {student?.image && (
                  <img src={ServerURL.BASE_URL + student?.image} alt="avatar" />
                )}
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
                  Last login:{" "}
                  {student?.last_login &&
                    moment(student?.last_login).format("MMM. DD, YYYY hh:mm")}
                </div>
              </div>
            </div>
            <div className="user-info">
              <div className="name">{student?.name}</div>
              <div className="email">{student?.email}</div>
            </div>
          </div>
          <div className="goal-details">
            <div className="detail">
              <div className="text">Parent</div>
              <div className="value">
                <Select
                  text="Goal "
                  value={index + 1}
                  options={goals && goals?.map((item, index) => index + 1)}
                  onChange={(val) => setIndex(val - 1)}
                />
              </div>
            </div>
            <div className="detail col">
              <div className="text">Goal Name</div>
              <div className="value">{goal?.name}</div>
            </div>
            <div className="detail">
              <div className="text">Coin Value</div>
              <div className="value">{student?.coin}</div>
            </div>
          </div>
          <div className="details">
            <div className="description">
              <div className="date">
                Completion Date:{" "}
                {goal?.end_date &&
                  moment(new Date(goal?.end_date + " 01:00:00")).format(
                    "MM/DD/YYYY"
                  )}
              </div>
              <div className="text">
                Administration and or teacher identifies students who need more
                intervention support than what the School wide Positive Behavior
                Intervention Support (PBIS) -a framework for supporting
                students’ behavioral, academic, ocial,emotional, and mental
                health can offer.
              </div>
            </div>

            <div className="progress-line">
              <div className="line">
                <div
                  className="progress"
                  style={{
                    width: getProgress(goal?.start_date, goal?.end_date),
                  }}
                />
              </div>
              <div className="text">
                {goal && getProgress(goal?.start_date, goal?.end_date)}
              </div>
            </div>
          </div>
          <div className="btn complete" onClick={() => goal && setOpen(true)}>
            Complete
          </div>
        </div>
        <div className="card">
          <div className="header">
            <div className="left">
              <div className="title">Progress Chart</div>
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
                    {goal &&
                      moment(new Date(goal?.start_date + " 01:00:00")).format(
                        "MM/DD/YYYY"
                      )}
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
                    {goal &&
                      moment(
                        new Date(goals[index]?.end_date + " 01:00:00")
                      ).format("MM/DD/YYYY")}
                  </div>
                  <div className="icon">
                    <XIcon />
                  </div>
                </div>
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
                    <div className="text bold">Status:</div>
                    <div className="text medium">Satisfactory</div>
                  </div>
                </div>
                <div className="details">
                  <div className="text bold">Notes:</div>
                  <div className="text">{select.note}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="records">
            <div className="record-header">
              <div className="btn-group">
                <div
                  className="btn fill"
                  onClick={() => goal && setModalOpen(true)}
                >
                  Update
                </div>
                <div className="btn" onClick={goal && Undo}>
                  Undo
                </div>
              </div>
              <div className="btn" onClick={() => goal && NewRecord()}>
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
                {goal?.records?.map((rec, index) => (
                  <div className="row text-1 medium" key={index}>
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
                    <div className="notes">{rec.note}</div>
                  </div>
                ))}
                <div className="row text-1 medium">
                  <div className="select"></div>
                  <div className="line"></div>
                  <div className="date"></div>
                  <div className="score"></div>
                  <div className="notes"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="modal">
          <div className="card modal-main">
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
      )}

      {modalOpen && (
        <div className="modal">
          <div className="card modal-main">
            <div className="header">
              <div className="title">New Record</div>
              <div className="btn" onClick={NewRecord}>
                Close
              </div>
            </div>
            <div className="record">
              <div className="score">
                <div className="text bold">Score</div>
                <input
                  type="number"
                  className="text"
                  min={0}
                  max={100}
                  value={record?.score}
                  onChange={(e) => handleChangeScore(e.target.value)}
                />
              </div>
              <div className="explain">
                <div className="text bold">Note</div>
                <textarea
                  value={record?.note}
                  onChange={(e) =>
                    setRecord({ ...record, note: e.target.value })
                  }
                  placeholder="Explanation for Coins Earned"
                />
              </div>
            </div>

            <div className="btn-group">
              <div className="btn deny" onClick={() => setModalOpen(false)}>
                Cancel
              </div>
              <div className="btn confirm" onClick={() => addRecord()}>
                Confirm
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
