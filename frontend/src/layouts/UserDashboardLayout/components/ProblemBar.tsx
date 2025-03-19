import { JSX, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useUserStore } from "../../../store/useUserStore";

interface Props {
  problemText: string;
  toggleProblemBar: () => void;
}

const ProblemBar = ({ problemText, toggleProblemBar }: Props): JSX.Element => {
  const [problems, setProblems] = useState<string>(problemText || "");

  const { updateProblem, loading } = useUserStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    updateProblem(problems);
    toggleProblemBar();
    e.preventDefault();
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCLickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        toggleProblemBar();
      }
    };

    document.addEventListener("mousedown", handleCLickOutside);

    return () => {
      document.removeEventListener("mousedown", handleCLickOutside);
    };
  }, [toggleProblemBar]);

  const wordCount = problems
    .split(/\s+/) // Split by whitespace
    .filter((word) => word.length > 0).length; // Filter out empty strings

  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 h-screen w-full backdrop-blur-xs flex justify-center items-center self-center justify-self-center">
      <div
        className="relative w-200 min-h-100 h-auto bg-cbg-two px-8 py-10 rounded-4xl"
        ref={menuRef}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 mb-10">
            <label
              htmlFor="problems"
              className="flex flex-col text-xl md:text-3xl"
            >
              <span>Enter</span>
              <span className="font-fancy tracking-wider">Your Problem</span>
              <span className="text-base">
                Describe your problem in detail,{" "}
                <span className="font-semibold text-highlight-two">
                  in more than 20 words
                </span>
                , for the therapist to properly understand and system to
                classify more accurately
              </span>
            </label>
            <textarea
              id="problems"
              name="problems"
              rows={5}
              cols={5}
              value={problems}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setProblems(e.target.value)
              }
              placeholder="Enter the problem you're experiencing in detail"
              className="bg-white rounded-xl p-5 text-xl"
            ></textarea>
          </div>
          <button
            type="submit"
            className={`absolute bottom-5 right-6 size-12 text-2xl flex justify-center items-center rounded-full cursor-pointer ${
              loading
                ? "cursor-not-allowed bg-gray-500"
                : "bg-amber-400 hover:bg-amber-500"
            }`}
          >
            <IoSend />
          </button>
        </form>
        <div>
          <span>Words: {wordCount}</span>
        </div>
        <button
          className="absolute top-10 right-6 bg-main-text text-white size-8 text-2xl flex justify-center items-center rounded-full cursor-pointer"
          onClick={toggleProblemBar}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
export default ProblemBar;
