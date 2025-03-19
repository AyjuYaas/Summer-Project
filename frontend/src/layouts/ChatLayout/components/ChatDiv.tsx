import { JSX } from "react";
import Header from "./Header";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const ChatDiv = (): JSX.Element => {
  return (
    <div className="flex flex-col bg-third-bg sm:flex-2 max-w-250 w-full rounded-2xl h-150 justify-between relative">
      <Header />

      {/* Messages  */}
      <Messages />

      <MessageInput />
    </div>
  );
};
export default ChatDiv;
