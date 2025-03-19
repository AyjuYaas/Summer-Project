import { JSX, useRef, useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useParams } from "react-router-dom";

import { IoMdSend, IoMdClose, IoMdImage } from "react-icons/io";
import toast from "react-hot-toast";

const MessageInput = (): JSX.Element => {
  const { id } = useParams<{ id?: string }>();
  const { sendMessage } = useMessageStore();

  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      sendMessage(text, imagePreview, id || "");
      setText("");
      setImagePreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message: ", error);
    }
  };

  return (
    <div className="px-4 pb-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center size-10 bg-[#2f4858] cursor-pointer text-white"
              type="button"
            >
              <IoMdClose className="text-lg" />
            </button>
          </div>
        </div>
      )}
      <form
        className="relative flex gap-2 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full bg-white p-3 rounded-lg"
          placeholder="Write your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`sm:flex rounded-full size-10 p-1 justify-center items-center cursor-pointer hover:bg-[#2f4858] hover:text-white duration-100 text-center ${
            imagePreview ? "text-emerald-500" : "text-main-text"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <IoMdImage className="text-2xl" />
        </button>

        <button
          type="submit"
          className={`rounded-full size-10 flex justify-center items-center duration-100 ${
            !text.trim() && !imagePreview
              ? "cursor-not-allowed text-zinc-400"
              : "text-main-text hover:bg-[#2f4858] hover:text-white cursor-pointer"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
