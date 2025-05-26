import ReactLoading from "react-loading";
import { PiEmptyFill } from "react-icons/pi";
import { FaAngleDoubleDown } from "react-icons/fa";
import { format } from "date-fns";
import { JSX, useEffect, useRef, useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useParams } from "react-router-dom";
import PreviewImage from "./PreviewImage";
import { useInfiniteScroll } from "./useInfiniteScroll"; // adjust path if needed

const Messages = (): JSX.Element => {
  const { getMessages, messages, loading, hasMore, sent } = useMessageStore();
  const [loadMore, setLoadMore] = useState<number>(1);
  const { id } = useParams<{ id?: string }>();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const hasInitialScrolled = useRef(false);
  const [openImage, setOpenImage] = useState<string>("");
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  // Load messages on mount and when loadMore changes
  useEffect(() => {
    if (id && hasMore) {
      getMessages(id, useMessageStore.getState().cursor);
    }
  }, [getMessages, hasMore, id, loadMore]);

  // Scroll to bottom (initial or when sent)
  const scrollToBottom = (smooth: boolean = true) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  // On first load only
  useEffect(() => {
    if (!hasInitialScrolled.current && messages.length > 0) {
      scrollToBottom(false);
      hasInitialScrolled.current = true;
    }
  }, [messages]);

  // Auto-scroll to bottom only if already near bottom
  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom(true);
    }
  }, [messages, showScrollButton]);

  // Scroll on new sent message
  useEffect(() => {
    scrollToBottom(true);
  }, [sent]);

  // Scroll listener to toggle scroll-to-bottom button
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      setShowScrollButton(
        container.scrollHeight - container.scrollTop >
          container.clientHeight + 100
      );
    }
  };

  // Infinite scroll for older messages
  useInfiniteScroll(topSentinelRef, () => {
    if (hasMore && !loading) {
      const container = messagesContainerRef.current;
      const previousScrollHeight = container?.scrollHeight || 0;
      setLoadMore((prev) => prev + 1);

      // Maintain scroll position after new data loads
      const observer = new MutationObserver(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - previousScrollHeight;
        }
        observer.disconnect();
      });
      if (container) {
        observer.observe(container, { childList: true, subtree: true });
      }
    }
  });

  return (
    <div
      className="h-full min-h-40 flex flex-col overflow-y-auto scrollbar pb-2 relative"
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
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
        <div className="flex flex-col gap-2 relative">
          {/* Top Sentinel for infinite scroll */}
          <div ref={topSentinelRef}></div>

          <div className="relative flex flex-col gap-2">
            {messages.map((message, index: number) => (
              <div
                key={index}
                className={`flex flex-col px-4 ${
                  message.receiver === id ? "items-end" : "items-start"
                }`}
              >
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

            {/* Scroll to Bottom Button */}
            {/* ← Sticky Scroll-to-Bottom Button */}
            {showScrollButton && (
              <button
                onClick={() => scrollToBottom(true)}
                className="sticky bottom-4 self-center p-2 bg-[#2f4858] text-white rounded-full shadow-md hover:bg-[#1c2f3b] transition duration-300 z-10 cursor-pointer"
                aria-label="Scroll to bottom"
              >
                <FaAngleDoubleDown className="size-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {openImage && (
        <PreviewImage src={openImage} onClose={() => setOpenImage("")} />
      )}
    </div>
  );
};

export default Messages;
