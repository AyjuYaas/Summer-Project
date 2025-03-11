import { JSX } from "react";
import Header from "./components/Header";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";

const ChatLayout = (): JSX.Element => {
  return (
    <div className="inset-0 -z-10 h-[calc(100vh-6rem)] w-full bg-[var(--primary-bg)] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] flex justify-center items-center p-2">
      <div className="flex flex-col flex-1 overflow-auto bg-[var(--third-bg)] p-4 md:px-10 max-w-250 rounded-2xl h-full justify-between">
        <Header />

        {/* Messages  */}
        <Messages />

        <MessageInput />
      </div>
    </div>
  );
};
export default ChatLayout;
