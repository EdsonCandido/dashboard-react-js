import { useEffect } from "react";
import { FaMicrophoneSlash, FaPhoneSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import "./index.css";

const Video = () => {
  const socket = io("http://localhost:5555");

  // Ver com Albert o socket io
  // const crateRomm = () =>{}
  useEffect(() => {
    console.log(socket);
    // crateRomm()
    socket.emit("connection", { data: { a: "algo" } });
  }, []);

  const navigate = useNavigate();
  const returnToCall = () => {
    localStorage.clear();
    socket.disconnect();
    navigate("/call");
  };

  return (
    <div className="container__video">
      <div className="video__wrapper">
        <div className="video__input1"></div>
        <div className="video__input2"></div>
        <div className="video__input3"></div>
      </div>

      <div className="btn__video">
        <FaMicrophoneSlash id="muteTwo" />
        <FaPhoneSlash id="closeTwo" onClick={() => returnToCall()} />
      </div>
    </div>
  );
};

export default Video;
