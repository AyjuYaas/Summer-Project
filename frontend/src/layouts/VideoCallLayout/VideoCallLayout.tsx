import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";

import { Track } from "livekit-client";
import { useEffect } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import { useNavigate } from "react-router-dom"; // useHistory for navigation
import ReactLoading from "react-loading";

export default function VideoCallLayout() {
  const { videoToken, loadToken } = useMessageStore();
  const { listenToVideoCall, stopListeningToVideoCall } = useMessageStore();
  const navigate = useNavigate();

  useEffect(() => {
    stopListeningToVideoCall();
    return () => {
      listenToVideoCall();
    };
  }, [listenToVideoCall, stopListeningToVideoCall]);

  const handleCallExit = () => {
    navigate(-1);
  };

  return loadToken ? (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center">
      <ReactLoading type="spin" color="#303b36" />
      <h1 className="text-xl text-[#303b36] font-extrabold">Loading...</h1>
    </div>
  ) : (
    <LiveKitRoom
      video={true}
      audio={true}
      token={videoToken}
      serverUrl={import.meta.env.VITE_API_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100vh" }}
      onDisconnected={handleCallExit} // Listen for call exit and trigger window close
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
