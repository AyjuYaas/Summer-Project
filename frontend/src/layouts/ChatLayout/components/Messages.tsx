import ReactLoading from "react-loading";
import { PiEmptyFill } from "react-icons/pi";
import { FaAngleDoubleDown } from "react-icons/fa";
import { format } from "date-fns";
import { JSX, useEffect, useRef, useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useParams } from "react-router-dom";
import PreviewImage from "./PreviewImage";

const Messages = (): JSX.Element => {
  const { getMessages, messages, loading, hasMore, sent } = useMessageStore();
  const [loadMore, setLoadMore] = useState<number>(1);
  const { id } = useParams<{ id?: string }>();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [openImage, setOpenImage] = useState<string>("");
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  // Fetch messages on mount and when loadMore changes
  useEffect(() => {
    if (id && hasMore) {
      getMessages(id, useMessageStore.getState().cursor);
    }
  }, [getMessages, hasMore, id, loadMore]);

  // Smooth scroll to the bottom
  const scrollToBottom = (smooth: boolean = true) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  // Scroll to bottom on initial load and message sent
  useEffect(() => {
    if (loadMore === 1) scrollToBottom(false);
    if (!showScrollButton) scrollToBottom(true);
  }, [loadMore, messages, showScrollButton]);

  useEffect(() => {
    scrollToBottom(true); // Smooth scroll on message sent
  }, [sent]);

  // Handle scroll events
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;

      // Show scroll button when not at the bottom
      setShowScrollButton(
        container.scrollHeight - container.scrollTop >
          container.clientHeight + 100
      );

      // Load more messages when scrolled to the top
      if (container.scrollTop === 0 && hasMore && !loading) {
        const previousScrollHeight = container.scrollHeight;
        setLoadMore((prev) => prev + 1);

        // Preserve scroll position after fetching
        const observer = new MutationObserver(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - previousScrollHeight;
          observer.disconnect();
        });
        observer.observe(container, { childList: true, subtree: true });
      }
    }
  };

  return (
    <div
      className="h-full min-h-40 flex flex-col overflow-y-auto scrollbar pb-2"
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      {/* Loading Spinner on Initial Load */}
      {loading && loadMore === 1 ? (
        <div className="self-center my-auto flex flex-col gap-2 items-center justify-center">
          <ReactLoading type="spin" color="#303b36" />
          <span>Loading Messages, please wait...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="self-center my-auto flex flex-col gap-2 items-center justify-center text-xl">
          <PiEmptyFill className="text-4xl text-main-text" />
          <span>No messages yet. Start a conversation!</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Message List */}
          {messages.map((message, index: number) => (
            <div
              key={index}
              className={`flex flex-col px-4 ${
                message.receiver === id ? "items-end" : "items-start"
              }`}
            >
              {/* Image Message */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Message"
                  className={`size-30 rounded-lg border-2 border-[#45646d] mb-1 cursor-pointer object-contain w-max bg-white ${
                    message.receiver === id ? "self-end" : "self-start"
                  }`}
                  onClick={() => setOpenImage(message.image || "")}
                />
              )}

              {/* Text Message */}
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

              {/* Message Timestamp */}
              <span className="text-[0.7rem] px-1">
                {format(new Date(message.createdAt), "MMM d, yyyy h:mm a")}
              </span>
            </div>
          ))}
          {/* Scroll to Bottom Button */}

          {showScrollButton && (
            <button
              onClick={() => scrollToBottom(true)}
              className="absolute bottom-15 left-1/2 transform -translate-1/2 p-2 bg-[#2f4858] text-white rounded-full shadow-lg hover:bg-[#1c2f3b] transition duration-300 z-10 cursor-pointer"
            >
              <FaAngleDoubleDown size={19} />
            </button>
          )}
        </div>
      )}

      {/* Image Preview Modal */}
      {openImage && (
        <PreviewImage src={openImage} onClose={() => setOpenImage("")} />
      )}
    </div>
  );
};

export default Messages;
