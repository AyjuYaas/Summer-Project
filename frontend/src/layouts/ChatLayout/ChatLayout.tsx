import { JSX } from "react";
import ChatDiv from "./components/ChatDiv";
import DocumentSection from "./components/DocumentSection";

const ChatLayout = (): JSX.Element => {
  return (
    <div className="inset-0 -z-10 h-max pb-20 sm:pb-0 sm:h-[calc(100vh-6rem)] w-full bg-[var(--primary-bg)] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] flex justify-center items-center">
      <div className="w-full h-max mt-10 sm:mt-0 sm:mb-0 sm:h-[calc(100%-0.5rem)] flex flex-col sm:flex-row gap-5 justify-center items-center  p-2">
        <DocumentSection />
        <ChatDiv />
      </div>
    </div>
  );
};
export default ChatLayout;
