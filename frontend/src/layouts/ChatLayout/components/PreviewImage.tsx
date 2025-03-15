import { JSX, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  src: string;
  onClose: () => void;
}

const PreviewImage = ({ src, onClose }: Props): JSX.Element => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCLickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleCLickOutside);

    return () => {
      document.removeEventListener("mousedown", handleCLickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 w-full backdrop-blur-xs flex justify-center items-center">
      <div
        className="relative w-max h-auto rounded-4xl flex flex-col gap-5 items-center"
        ref={menuRef}
      >
        <img src={src} alt="image" className="w-120 object-contain bg-white" />
        <button
          className="absolute top-2 right-2 bg-red-600 text-white size-8 text-2xl flex justify-center items-center rounded-full cursor-pointer hover:bg-red-500 transition-colors"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
export default PreviewImage;
