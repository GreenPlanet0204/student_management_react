import React, { useEffect, useState } from "react";
import { ReactComponent as MessageIcon } from "../../assets/Icons/Messages.svg";
import Avatar from "../../assets/Images/avatar.jpg";
import axios from "axios";
import { API_URL } from "../../utils";

export const Messages = () => {
  const profile = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState({
    user: profile.user,
    room: "",
    message: "",
  });
  const [student, setStudent] = useState({});
  const [user, setUser] = useState();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Chat();
    }
  };

  useEffect(() => {
    axios
      .get(API_URL + "/room/?user=" + profile.user)
      .then((res) => setRooms([...res.data.data, res.data.data_2]));

    axios
      .get(API_URL + "/student/?id=" + profile.id)
      .then((res) => setStudent(res.data));
  }, []);

  const handleChange = async (other) => {
    const filter = rooms.filter((item) => item.user_1 === other.user);
    const filter2 = rooms.filter((item) => item.user_2 === other.user);
    if (filter.length > 0) {
      setRoom(filter[0].id);
    } else if (filter2.length > 0) {
      setRoom(filter2.id);
    } else {
      const data = {
        user_1: profile.user,
        user_2: other.user,
      };
      try {
        const res = await axios.post(API_URL + "/room/", data);
        setRooms([...room, res.data]);
        setRoom(res.data?.id);
      } catch {
        console.log("error");
      }
    }
  };

  const Chat = () => {
    console.log("message", message);
    setMessage("");
  };

  return (
    <div className="container messages">
      <div className="card messages">
        <div className="messages">
          <div className="title">Messages</div>
          <div className="chat-messages">
            <div className="message mime">
              <div className="name">Me</div>
              <div className="detail">
                <div className="avatar">
                  <img src={Avatar} alt="Avatar" />
                </div>
                <div className="text"></div>
              </div>
            </div>
            <div className="message other">
              <div className="name">(Student)Johannes Brown</div>
              <div className="detail">
                <div className="avatar">
                  <img src={Avatar} alt="Avatar" />
                </div>
                <div className="text"></div>
              </div>
            </div>
          </div>
          <div className="chat">
            <input
              type="text"
              placeholder="Type a new message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="icon" onClick={() => Chat()}>
              <MessageIcon />
            </div>
          </div>
        </div>
        <div className="users">
          <div className="part">
            <div className="title">Teacher</div>

            <div className="col">
              {student.teachers?.map((teacher, index) => (
                <div
                  className="item"
                  onClick={() => handleChange(teacher)}
                  key={index}
                >
                  <div className="avatar">
                    <img src={API_URL + teacher.image} alt="Avatar" />
                  </div>
                  <div className="detail">
                    <div className="name">{teacher.name}</div>
                    <div className="action">
                      <div className="status">
                        {teacher.status === "active" ? (
                          <div className="circle green" />
                        ) : (
                          <div className="circle red" />
                        )}
                        <div className="text">{teacher.status}</div>
                      </div>
                      <div
                        className={
                          teacher.action === "message+"
                            ? "action message plus"
                            : "action " + teacher.action
                        }
                      >
                        {teacher.action}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="part">
            <div className="title">Parents</div>
            <div className="col">
              {student.parents?.map((parent, index) => (
                <div
                  className="item"
                  key={index}
                  onClick={() => handleChange(parent)}
                >
                  <div className="avatar">
                    <img src={API_URL + parent.image} alt="Avatar" />
                  </div>
                  <div className="detail">
                    <div className="name">{parent.name}</div>
                    <div className="action">
                      <div className="status">
                        {parent.status === "active" ? (
                          <div className="circle green" />
                        ) : (
                          <div className="circle red" />
                        )}
                        <div className="text">{parent.status}</div>
                      </div>
                      <div
                        className={
                          parent.action === "message+"
                            ? "action message plus"
                            : "action " + parent.action
                        }
                      >
                        {parent.action}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
