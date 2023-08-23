import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/Icons/Logo.svg";
import { ReactComponent as StudentIcon } from "../assets/Icons/Student.svg";
import { ReactComponent as GoalIcon } from "../assets/Icons/Goals.svg";
import { ReactComponent as MessageIcon } from "../assets/Icons/Messages.svg";
import { ReactComponent as RewardsIcon } from "../assets/Icons/Rewards.svg";
import { ReactComponent as TrackingIcon } from "../assets/Icons/Tracking.svg";
import { ReactComponent as BiArrow } from "../assets/Icons/Bi Arrow.svg";
import { ReactComponent as BarsCode } from "../assets/Icons/bars-solid.svg";
import { ReactComponent as XIcon } from "../assets/Icons/X.svg";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ServerURL from "../utils/ServerURL";

import CookieUtil from "../utils/CookieUtil";
import Constants from "../utils/constants";
import CommonUtil from "../utils/CommonUtil";
import ApiConnector from "../utils/ApiConnector";
import SocketActions from "../utils/SocketActions";
import { UserSelect, UserTypeSelect } from "./MessageSelect";
import axios from "axios";

let socket = new WebSocket(
  ServerURL.WS_BASE_URL + `/ws/users/${CommonUtil.getUserId()}/chat/`
);
let typingTimer = 0;
let isTypingSignalSent = false;

const Layout = ({ children, role, show, setShow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("student");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [chatUser, setChatUser] = useState();
  const [onlineUserList, setOnlineUserList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const logout = async () => {
    localStorage.clear();
    CookieUtil.deleteCookie(Constants.ACCESS_PROPERTY);
    CookieUtil.deleteCookie(Constants.REFRESH_PROPERTY);
    navigate("/login");
  };

  const getChatMessageClassName = (userId) => {
    return CommonUtil.getUserId() === userId ? "message mime" : "message other";
  };

  const fetchChatUser = async () => {
    const url = `/chats/?user=${CommonUtil.getUserId()}`;
    const chatUsers = await ApiConnector.sendGetRequest(url);
    const formatedChatUser = await CommonUtil.getFormatedChatUser(
      chatUsers,
      onlineUserList
    );
    setChatUsers(formatedChatUser);
    setUsers(formatedChatUser?.filter((item) => item.role === type));
    setChatUser(formatedChatUser?.filter((item) => item.role === type)[0]);
  };

  const fetchChatMessage = async () => {
    const currentChatId = chatUser?.roomId;
    if (currentChatId) {
      const url = `/chats/${currentChatId}/messages/?limit=20&offset=0`;
      const chatMessages = await ApiConnector.sendGetRequest(url);
      setMessages(chatMessages);
    }
  };

  /* eslint-disable */
  useEffect(() => {
    if (CookieUtil.getCookie(Constants.ACCESS_PROPERTY)) {
      axios
        .get(ServerURL.BASE_URL + "/users/?id=" + user.id)
        .then((res) => {
          setAllUsers(res.data);
        })
        .catch(() => console.error("error"));
    }
  }, [location.pathname]);

  const handleChangeShow = () => {
    if (user?.role === "student") setType("teacher");
    fetchChatUser();
    setShow(true);
  };

  useEffect(() => {
    fetchChatUser();
  }, [location.pathname]);

  useEffect(() => {
    fetchChatMessage();
    connectSocket();
  }, [chatUser?.roomId]);

  const handleChangeType = (val) => {
    setUsers(chatUsers?.filter((item) => item.role === val));
    setChatUser(chatUsers?.filter((item) => item.role === val)[0]);
  };

  const handleKeyUp = () => {
    if (text !== "") {
      setFilterUser(
        allUsers.filter((item) =>
          item.name.toLowerCase().startsWith(text.toLowerCase())
        )
      );
    } else {
      setFilterUser([]);
    }
  };

  /* eslint-enable */
  const connectSocket = () => {
    socket = new WebSocket(
      ServerURL.WS_BASE_URL + `/ws/users/${CommonUtil.getUserId()}/chat/`
    );

    socket.onclose = () => {
      setTimeout(connectSocket, 1000);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const chatId = chatUser?.roomId;
      const userId = CommonUtil.getUserId();
      if (chatId === data.roomId) {
        if (data.action === SocketActions.MESSAGE) {
          data["userImage"] = ServerURL.BASE_URL + data.userImage;
          setMessages((prevState) => {
            let messagesState = JSON.parse(JSON.stringify(prevState));
            messagesState.results.unshift(data);
            return messagesState;
          });
          setTyping(false);
        } else if (
          data.action === SocketActions.TYPING &&
          data.user !== userId
        ) {
          setTyping(data.typing);
        }
      }
      if (data.action === SocketActions.ONLINE_USER) {
        setOnlineUserList(data.userList);
      }
    };
  };

  const messageSubmitHandler = async (event) => {
    event.preventDefault();
    if (inputMessage) {
      try {
        socket.send(
          JSON.stringify({
            action: SocketActions.MESSAGE,
            message: inputMessage,
            user: CommonUtil.getUserId(),
            roomId: chatUser?.roomId,
          })
        );
      } catch (err) {
        console.error(err);
      }
    }
    setInputMessage("");
  };

  const sendTypingSignal = async (typing) => {
    try {
      socket.send(
        JSON.stringify({
          action: SocketActions.TYPING,
          typing: typing,
          user: CommonUtil.getUserId(),
          roomId: chatUser?.roomId,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const chatMessageTypingHandler = (event) => {
    if (event.keyCode !== Constants.ENTER_KEY_CODE) {
      if (!isTypingSignalSent) {
        sendTypingSignal(true);
        isTypingSignalSent = true;
      }
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        sendTypingSignal(false);
        isTypingSignalSent = false;
      }, 3000);
    } else {
      clearTimeout(typingTimer);
      isTypingSignalSent = false;
    }
  };

  const fetchChatUsers = async (user) => {
    const url = `/chats/?user=${CommonUtil.getUserId()}`;
    const chatUsers = await ApiConnector.sendGetRequest(url);
    const formatedChatUser = await CommonUtil.getFormatedChatUser(
      chatUsers,
      onlineUserList
    );
    setChatUsers(formatedChatUser);
    setType(user.role);
    setUsers(formatedChatUser?.filter((item) => item.role === user?.role));
    const cUser = formatedChatUser?.filter(
      (item) => item.name === user.name
    )[0];
    setChatUser(cUser);
    if (location.pathname.startsWith("/message")) {
      setShow(false);
      return navigate(`/message/${cUser.roomId}`);
    }
    return setShow(true);
  };

  const addMember = async (item) => {
    const user = chatUsers?.find((user) => user.name === item.name);
    if (user) {
      setChatUser(user);
      setType(user.role);
      if (location.pathname.startsWith("/message")) {
        setShow(false);
        return navigate(`/message/${user.roomId}`);
      }
      return setShow(true);
    }

    const userId = CommonUtil.getUserId();
    const memberId = item.id;
    let requestBody = {
      members: [memberId, userId],
      type: "DM",
    };
    await ApiConnector.sendPostRequest(
      "/chats/",
      JSON.stringify(requestBody),
      true,
      false
    );
    await fetchChatUsers(item);
  };

  const selectUser = async (item) => {
    await addMember(item);
    fetchChatMessage();
    setText("");
  };

  return (
    <>
      {location.pathname !== "/login" ? (
        <>
          <div className={open ? "navbar active" : "navbar"}>
            <div className="icon" onClick={() => setOpen(false)}>
              <XIcon />
            </div>
            <Link to="/">
              <div className="logo">
                <Logo />
              </div>
            </Link>

            {role === "teacher" && (
              <div className="navmenu">
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  <div className="text">Dashboard</div>
                </Link>
                <Link
                  to="/students"
                  className={
                    location.pathname.startsWith("/student") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Students</div>
                </Link>
                <Link
                  to={"/parents"}
                  className={
                    location.pathname.startsWith("/parent") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Parents</div>
                </Link>
                <Link
                  to="/goals"
                  className={
                    location.pathname.startsWith("/goal") ? "active" : ""
                  }
                >
                  <GoalIcon />
                  <div className="text">Goals</div>
                </Link>
                <Link
                  to="/messages"
                  className={
                    location.pathname.startsWith("/message") ? "active" : ""
                  }
                >
                  <MessageIcon />
                  <div className="text">Messages</div>
                </Link>
                <Link
                  to="/rewards"
                  className={
                    location.pathname.startsWith("/reward") ? "active" : ""
                  }
                >
                  <RewardsIcon />
                  <div className="text">Rewards</div>
                </Link>
                <Link
                  to="/tracking"
                  className={location.pathname === "/tracking" ? "active" : ""}
                >
                  <TrackingIcon />
                  <div className="text">Tracking</div>
                </Link>
              </div>
            )}
            {role === "parent" && (
              <div className="navmenu">
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  <div className="text">Dashboard</div>
                </Link>

                <Link
                  to="/goals"
                  className={
                    location.pathname.startsWith("/goal") ? "active" : ""
                  }
                >
                  <GoalIcon />
                  <div className="text">Goals</div>
                </Link>

                <Link
                  to="/tracking"
                  className={location.pathname === "/tracking" ? "active" : ""}
                >
                  <TrackingIcon />
                  <div className="text">Tracking</div>
                </Link>
                <Link
                  to="/students"
                  className={
                    location.pathname.startsWith("/student") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Students</div>
                </Link>
                <Link
                  to="/messages"
                  className={
                    location.pathname.startsWith("/message") ? "active" : ""
                  }
                >
                  <MessageIcon />
                  <div className="text">Messages</div>
                </Link>
              </div>
            )}
            {role === "student" && (
              <div className="navmenu">
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  <div className="text">Dashboard</div>
                </Link>
                <Link
                  to="/goals"
                  className={
                    location.pathname.startsWith("/goal") ? "active" : ""
                  }
                >
                  <GoalIcon />
                  <div className="text">Goals</div>
                </Link>
                <Link
                  to="/progress"
                  className={
                    location.pathname.startsWith("/progress") ? "active" : ""
                  }
                >
                  <TrackingIcon />
                  <div className="text">My Progress</div>
                </Link>
                <Link
                  to="/messages"
                  className={
                    location.pathname.startsWith("/message") ? "active" : ""
                  }
                >
                  <MessageIcon />
                  <div className="text">Messages</div>
                </Link>
                <Link
                  to="/rewards"
                  className={
                    location.pathname.startsWith("/reward") ? "active" : ""
                  }
                >
                  <RewardsIcon />
                  <div className="text">Rewards</div>
                </Link>
              </div>
            )}
            {role === "admin" && (
              <div className="navmenu">
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  <div className="text">Dashboard</div>
                </Link>
                <Link
                  to="/students"
                  className={
                    location.pathname.startsWith("/student") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Students</div>
                </Link>
                <Link
                  to="/parents"
                  className={
                    location.pathname.startsWith("/parent") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Parents</div>
                </Link>
                <Link
                  to="/teachers"
                  className={
                    location.pathname.startsWith("/teacher") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Teachers</div>
                </Link>
                <Link
                  to="/schools"
                  className={
                    location.pathname.startsWith("/school") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Schools</div>
                </Link>
                {/* <Link
                  to="/messages"
                  className={location.pathname === "/messages" ? "active" : ""}
                >
                  <MessageIcon />
                  <div className="text">Messages</div>
                </Link> */}
                <Link
                  to="/rewards"
                  className={
                    location.pathname.startsWith("/reward") ? "active" : ""
                  }
                >
                  <RewardsIcon />
                  <div className="text">Rewards</div>
                </Link>
                <Link
                  to="/tracking"
                  className={location.pathname === "/tracking" ? "active" : ""}
                >
                  <TrackingIcon />
                  <div className="text">Tracking</div>
                </Link>
              </div>
            )}
            {role === "school" && (
              <div className="navmenu">
                <div className="school-logo">
                  <div className="image">
                    <img
                      src={ServerURL.BASE_URL + user.image}
                      alt="SchoolLogo"
                    />
                  </div>
                  <div className="name">{user.name}</div>
                </div>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  <div className="text">Dashboard</div>
                </Link>
                <Link
                  to="/students"
                  className={
                    location.pathname.startsWith("/student") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Students</div>
                </Link>
                <Link
                  to="/parents"
                  className={
                    location.pathname.startsWith("/parent") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Parents</div>
                </Link>
                <Link
                  to="/teachers"
                  className={
                    location.pathname.startsWith("/teacher") ? "active" : ""
                  }
                >
                  <StudentIcon />
                  <div className="text">Teachers</div>
                </Link>
                {/* <Link
                  to="/messages"
                  className={location.pathname === "/messages" ? "active" : ""}
                >
                  <MessageIcon />
                  <div className="text">Messages</div>
                </Link> */}
                <Link
                  to="/rewards"
                  className={
                    location.pathname.startsWith("/reward") ? "active" : ""
                  }
                >
                  <RewardsIcon />
                  <div className="text">Rewards</div>
                </Link>
                <Link
                  to="/tracking"
                  className={location.pathname === "/tracking" ? "active" : ""}
                >
                  <TrackingIcon />
                  <div className="text">Tracking</div>
                </Link>
              </div>
            )}
            <div className="logout" onClick={logout}>
              Sign Out
            </div>
          </div>
          <div className="main">
            <div className="top">
              <div className="topbar">
                <div className="search">
                  <div className="icon" onClick={() => setOpen(true)}>
                    <BarsCode />
                  </div>
                  <div className="search">
                    <input
                      className="small-text"
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyUp={handleKeyUp}
                      placeholder="Type a new message"
                    />
                    <div className="search-icon">
                      <div className="icon" />
                    </div>
                    {text !== "" && (
                      <div className="select">
                        {filterUser.map((item, index) => (
                          <div
                            className="user"
                            key={index}
                            onClick={() => selectUser(item)}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="circles">
                  <div className="circle first" />
                  <div className="circle second" />
                </div>
              </div>
              {location.pathname !== "/messages" &&
                role !== "admin" &&
                role !== "school" &&
                !show && (
                  <div
                    className="messagebar"
                    onClick={() => handleChangeShow()}
                  >
                    <div className="text bold">Message</div>
                    <Link to="/messages">
                      <div className="btn">
                        <BiArrow />
                      </div>
                    </Link>
                  </div>
                )}
            </div>
            {children}
          </div>
          {location.pathname !== "/messages" &&
            role !== "admin" &&
            role !== "school" &&
            show && (
              <div className="message-sidebar">
                <div className="title" onClick={() => setShow(false)}>
                  Messages
                </div>

                <div className="chat-container">
                  <div className="users">
                    <div className="user-group">
                      <UserTypeSelect
                        type={type}
                        onChange={(val) => handleChangeType(val)}
                      />
                      <UserSelect
                        user={chatUser}
                        users={users}
                        onChange={(val) => setChatUser(val)}
                      />
                    </div>
                    <Link to="/messages">
                      <div className="btn">
                        <BiArrow />
                      </div>
                    </Link>
                  </div>
                  <div className="messages">
                    {typing && (
                      <div className="chat-message-left chat-bubble mb-1">
                        <div className="typing">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                    )}
                    {messages["results"]?.map((message, index) => (
                      <div
                        key={index}
                        className={getChatMessageClassName(message.user)}
                      >
                        <div className="name">
                          {message.userName}
                          <div className="text-muted">
                            {CommonUtil.getTimeFromDate(message.timestamp)}
                          </div>
                        </div>
                        <div className="detail">
                          <div className="avatar">
                            <img
                              src={message.userImage}
                              alt={message.userName}
                              width="30"
                              height="30"
                            />
                          </div>
                          <div className="text">{message.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={messageSubmitHandler}>
                    <div className="chat">
                      <input
                        type="text"
                        placeholder="Type a new message"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyUp={chatMessageTypingHandler}
                        autoComplete="off"
                      />
                      <div className="btn">
                        <div className="icon message" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Layout;
