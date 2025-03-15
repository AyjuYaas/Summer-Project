import { JSX } from "react";
import { IoDocumentText } from "react-icons/io5";
import DocumentInput from "./DocumentInput";
import Documents from "./Documents";

const DocumentSection = (): JSX.Element => {
  return (
    <div className="bg-[var(--cbg-three)] p-4 w-full rounded-2xl h-120 sm:h-150 text-lg md:text-xl flex flex-col sm:w-80 relative">
      <div className="flex-1 flex flex-col gap-1 w-max items-start justify-center text-[var(--text)] font-bold">
        <div className="flex items-center justify-center gap-1 w-max">
          <IoDocumentText />
          <h1>Documents Section</h1>
        </div>
        <span className="font-medium text-sm">Only upload pdf upto 20mb</span>
      </div>

      <hr className="my-2" />

      <Documents />

      <div className="mt-4">
        <DocumentInput />
      </div>
    </div>
  );
};
export default DocumentSection;
