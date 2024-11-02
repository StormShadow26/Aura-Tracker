import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
    const { roomId } = useParams();

    const myMeeting = async (element) => {
        try {
            const appID = 1782393194;
            const serverSecret = "7249274c1935bd33981779cf002cf5dc";

           
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                "user"
            );
            console.log("Generated Kit Token:", kitToken);

            
            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: "Copy Link",
                        url: `${window.location.origin}/room/${roomId}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                turnOnMicrophoneWhenJoining: true,
                turnOnCameraWhenJoining: true,
                showMyCameraToggleButton: true,
                showMyMicrophoneToggleButton: true,
                showAudioVideoSettingsButton: true,
                showScreenSharingButton: true,
                showTextChat: true,
                showUserList: true,
                maxUsers: 50,
                layout: ZegoUIKitPrebuilt.GroupCall, 
                showLayoutButton: true,
            });
        } catch (error) {
            console.error("Error during meeting setup:", error);
            alert("An error occurred while setting up the meeting. Please try again.");
        }
    };

    useEffect(() => {
        const element = document.getElementById("meeting-container");
        if (element) {
            myMeeting(element);
        }
    }, []);

    return (
        <div>
           <div ref={myMeeting}/>
        </div>
    );
};

export default RoomPage;
