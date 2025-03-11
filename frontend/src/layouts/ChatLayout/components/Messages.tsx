import ReactLoading from "react-loading";
import { PiEmptyFill } from "react-icons/pi";
import { format } from "date-fns";
import { JSX, useEffect, useRef, useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useParams } from "react-router-dom";
import PreviewImage from "./PreviewImage";

const Messages = (): JSX.Element => {
  const { messages, getMessages, loading } = useMessageStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id?: string }>();

  const [openImage, setOpenImage] = useState<string>("");

  const handleImageClick = (src: string) => {
    setOpenImage(src);
  };

  useEffect(() => {
    if (id) {
      getMessages(id);
    }
  }, [getMessages, id]);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full min-h-40 flex flex-col-reverse overflow-auto scrollbar pr-1 mb-4">
      {loading ? (
        <div className="self-center my-auto flex flex-col gap-2 items-center justify-center">
          <ReactLoading type="spin" color="#303b36" />
          <span>Loading Messages, please wait..</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="self-center my-auto flex flex-col gap-2 items-center justify-center text-xl">
          <PiEmptyFill className="text-4xl text-[var(--text)]" />
          <span className="my-auto">No messages yet, Start conversation.</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((message, index: number) => (
            <div
              key={index}
              className={`flex flex-col ${
                message.receiver === id ? "items-end" : "items-start"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt={message.image}
                  className={`size-30 rounded-lg border-1 mb-1 cursor-pointer object-contain w-max ${
                    message.receiver === id ? "self-end" : "self-start"
                  }`}
                  onClick={() => handleImageClick(message.image || "")}
                />
              )}
              {message.text && (
                <span
                  className={`p-3 rounded-xl w-max max-w-50 sm:max-w-80 md:max-w-100 lg:max-w-120 ${
                    message.receiver === id
                      ? "bg-[#2f4858] text-white"
                      : "bg-[#618182] text-white"
                  }`}
                >
                  {message.text}
                </span>
              )}

              <span className="text-[0.7rem] px-1">
                {format(new Date(message.createdAt), "MMM d, yyyy h:mm a")}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {openImage && (
        <PreviewImage src={openImage} onClose={() => setOpenImage("")} />
      )}
    </div>
  );
};

export default Messages;
