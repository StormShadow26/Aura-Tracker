import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import studyImage from "./Study.png"; // Update this path to where your study.png is located
import "./Room.css";

const Room = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleCreateRoom = useCallback(() => {
        console.log(value);
        navigate(`/room/${value}`);
    }, [navigate, value]);

    return (
        <div className="page-wrapper18">
            <div className="room-container18">
                <div className="content18">
                    <h1 id="heading18">Interactive Study Sessions</h1>
                    <h2 id="subheading18">Collaborate with Peers in Real-Time</h2>
                    <p id="description18">
                        Join a room to engage in interactive study sessions with friends or classmates. Share knowledge, solve problems together, and make learning a fun, collaborative experience!
                    </p>
                    <input
                        id="room-input18"
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter Room Code"
                    />
                    <button id="join-button18" onClick={handleCreateRoom}>Join Room</button>
                </div>
                <div className="image-container18">
                    <img id="study-image18" src={studyImage} alt="Study" />
                </div>
            </div>
        </div>
    );
};

export default Room;
