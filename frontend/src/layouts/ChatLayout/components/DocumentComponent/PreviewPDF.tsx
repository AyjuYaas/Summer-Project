import { JSX, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import ReactLoading from "react-loading";

interface Props {
  src: string;
  onClose: () => void;
  name: string;
}

const PreviewPDF = ({ src, onClose, name }: Props): JSX.Element => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Ensure correct file download with the .pdf extension
  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = name || "document.pdf"; // Ensure the .pdf extension
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="fixed z-100 inset-0 w-full backdrop-blur-sm flex justify-center items-center">
      <div
        className="relative w-full h-full flex flex-col gap-5 items-center bg-footer-bg p-10"
        ref={menuRef}
      >
        {/* Header with Close and Download */}
        <div className="flex w-full justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">PDF Preview</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
            >
              <FaFileDownload className="text-lg" />
            </button>
            <button
              onClick={onClose}
              className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
            >
              <IoMdClose className="text-lg" />
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <ReactLoading type="spin" color="#ffffff" height={50} width={50} />
            <span className="ml-4 text-white">Loading PDF.. </span>
            <span className="text-white text-lg">
              If loading takes more time, close and reopen
            </span>
          </div>
        )}

        {/* PDF Preview */}
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(
            src
          )}&embedded=true`}
          className={`w-full h-full rounded-lg ${loading ? "hidden" : ""}`}
          title="PDF Preview"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default PreviewPDF;
