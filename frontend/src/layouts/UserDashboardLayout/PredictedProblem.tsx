import { JSX, useState } from "react";
import ProblemBar from "./components/ProblemBar";
import ReactLoading from "react-loading";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useUserStore } from "../../store/useUserStore";
import { IoMdAlert } from "react-icons/io";

interface Problems {
  problem: string;
  score: number;
}
interface Props {
  problems: Problems[];
  problemText: string;
}

const PredictedProblem = ({ problems, problemText }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loading } = useUserStore();

  const toggleProblemBar = () => {
    if (!isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-[var(--cbg-one)] rounded-2xl p-10 flex flex-col gap-5 flex-2/3 h-max shadow-xl hover:shadow-2xl">
      <div className="flex flex-col gap-1">
        <span className="font-fancy text-2xl md:text-3xl lg:text-4xl tracking-wider">
          Predicted Problem Category
        </span>
        <span className="text-sm">
          This is an AI-based prediction, not a real diagnosis. For a proper
          check-up, please talk to a therapist.
        </span>
      </div>
      <hr />
      <div>
        <div className="flex flex-col gap-3 text-xl">
          {loading ? (
            <ReactLoading type="bubbles" color="#303b36" />
          ) : problems.length === 0 ? (
            <span>
              <FaHandHoldingHeart className="text-3xl" /> Tell us what you're
              going through, and we'll help categorize it for better
              understanding.
            </span>
          ) : (
            <>
              <span>Here's what the AI thinks based on your input:</span>
              <div className="flex flex-col gap-2 text-lg">
                {problems.map(({ problem, score }, index: number) => (
                  <span
                    key={index}
                    className={`bg-red-300 p-3 min-w-max rounded-2xl`}
                    style={{ width: `${Math.round(score * 100)}%` }}
                  >
                    <span className="font-semibold text-[var(--highlight)]">
                      {problem}:{" "}
                    </span>
                    <span>{(score * 100).toPrecision(4)}% likely</span>
                  </span>
                ))}
              </div>
              <span className="text-sm flex items-center gap-1">
                <IoMdAlert /> These percentages represent the model's confidence
                in identifying potential issues and are not a substitute for
                professional diagnosis.
              </span>
            </>
          )}
        </div>
      </div>
      <div className="h-full flex justify-end items-end">
        {isOpen ? (
          <ProblemBar
            problemText={problemText}
            direction="prediction"
            toggleProblemBar={toggleProblemBar}
          />
        ) : (
          <button
            onClick={toggleProblemBar}
            className="bg-amber-200 hover:bg-amber-300 p-4 font-semibold text-[var(--text)] rounded-2xl cursor-pointer duration-100 text-xl"
          >
            Edit Your Problem
          </button>
        )}
      </div>
    </div>
  );
};
export default PredictedProblem;
