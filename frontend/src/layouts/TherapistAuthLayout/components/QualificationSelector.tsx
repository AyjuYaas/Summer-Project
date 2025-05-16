import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import qualificationData from "../data/qualification-data";

interface QualificationSelectorProps {
  qualifications: string[];
  onAddQualification: (value: string) => void;
  onRemoveQualification: (index: number) => void;
}

const QualificationSelector: FC<QualificationSelectorProps> = ({
  qualifications,
  onAddQualification,
  onRemoveQualification,
}) => {
  return (
    <div className="mb-5 text-md">
      <div className="mb-2">
        <label className="block text-md font-medium text-highlight ml-0.5">
          Qualification
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {qualifications.map((qual, index) => (
          <div
            key={index}
            className="bg-[#2f4858] text-white px-3 py-1 rounded-md flex items-center text-base"
          >
            {qual}
            <button
              type="button"
              onClick={() => onRemoveQualification(index)}
              className="ml-2 text-xs bg-red-600 rounded-full p-1 cursor-pointer hover:bg-red-700 duration-100"
            >
              <IoMdClose size={10} />
            </button>
          </div>
        ))}
      </div>

      <div className="relative">
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              onAddQualification(value);
            }
            e.target.value = ""; // reset select after choosing
          }}
          className="block w-full px-3 py-3 border border-button-border rounded-md focus:outline-1 appearance-none text-gray-500"
          defaultValue=""
        >
          <option value="" disabled className="text-sm bg-cbg-five">
            Select a qualification...
          </option>
          {qualificationData.map((category) => (
            <optgroup
              label={category.label}
              key={category.label}
              className="text-sm bg-cbg-five text-black"
            >
              {category.items.map((item) => (
                <option
                  value={item.value}
                  key={item.value}
                  disabled={qualifications.includes(item.value)}
                  className="text-sm"
                >
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default QualificationSelector;
