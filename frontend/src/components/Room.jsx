import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Room = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleCreateRoom = useCallback(() => {
        console.log(value);
        navigate(`/room/${value}`);
    }, [navigate, value]); // Add 'value' and 'navigate' as dependencies

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Room Code"
            />
            <button onClick={handleCreateRoom}>Join</button>
        </div>
    );
};

export default Room;
