import { JSX, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { IoMdSend, IoMdClose } from "react-icons/io";
import { PiFilePdfFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { useMessageStore } from "../../../store/useMessageStore";
import { MdOutlineScheduleSend } from "react-icons/md";

const DocumentInput = (): JSX.Element => {
  const { id } = useParams<{ id?: string }>();
  const { sendDocument, loadSendingDocument } = useMessageStore();

  const [text, setText] = useState<string>("");
  const [pdfPreview, setPdfPreview] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null); // Store the file object
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Validate file type (must be a PDF)
    if (file && !file.type.startsWith("application/pdf")) {
      toast.error("Please select a PDF file");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setPdfFile(file); // Store the file object
    }
  };

  const removePdf = () => {
    setPdfPreview("");
    setPdfFile(null); // Clear the file object
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !pdfPreview) return;

    try {
      const payload = {
        pdf: pdfPreview,
        pdfName: pdfFile?.name || "",
        description: text,
      };

      sendDocument(payload.pdf, payload.pdfName, payload.description, id || ""); // Uncomment and use your sendMessage function
      setText("");
      setPdfPreview("");
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message: ", error);
    }
  };

  return (
    <div className="">
      {pdfPreview ? (
        <div className="mb-3 flex flex-col items-start gap-2 w-full ">
          <div className="relative">
            <div className="w-20 h-20 flex items-center justify-center bg-red-200 rounded-lg border border-zinc-700">
              <PiFilePdfFill className="text-3xl text-[#2f4858]" />
            </div>
            <button
              onClick={removePdf}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center size-10 bg-red-700 hover:bg-red-600 cursor-pointer text-white"
              type="button"
            >
              <IoMdClose className="text-lg" />
            </button>
          </div>
          <div>
            <p className="text-xs text-[#2f4858] break-all">{pdfFile?.name}</p>
          </div>
          <div className="flex w-full gap-2">
            <input
              type="text"
              className="w-full bg-white p-2 rounded-lg text-sm placeholder:text-xs"
              placeholder="Short Description about the pdf"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className={`rounded-full size-10 flex justify-center items-center duration-100 ${
                !text.trim() && !pdfPreview
                  ? "cursor-not-allowed text-zinc-400"
                  : "text-main-text hover:bg-[#2f4858] hover:text-white cursor-pointer"
              }`}
              disabled={!text.trim() && !pdfPreview}
              onClick={handleSubmit}
            >
              <IoMdSend className="text-2xl" />
            </button>
          </div>
        </div>
      ) : (
        <form className="relative flex gap-2 items-center justify-center w-full">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handlePdfChange}
          />

          <button
            type="button"
            className={`sm:flex rounded-lg w-full size-10 p-1 justify-center items-center text-white duration-100 text-center ${
              loadSendingDocument
                ? "cursor-not-allowed bg-zinc-600"
                : "bg-[#2f4858] hover:bg-[#816d89] cursor-pointer"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            {loadSendingDocument ? (
              <div className="flex justify-center items-center gap-2">
                <MdOutlineScheduleSend className="text-2xl" />
                <span className="text-center">Sending..</span>
              </div>
            ) : (
              "Upload a PDF"
            )}
          </button>
        </form>
      )}
    </div>
  );
};
export default DocumentInput;
