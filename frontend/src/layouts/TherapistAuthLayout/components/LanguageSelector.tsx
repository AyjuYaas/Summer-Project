import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import languages from "../data/language.data";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onAddLanguage: (language: string) => void;
  onRemoveLanguage: (index: number) => void;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({
  selectedLanguages,
  onAddLanguage,
  onRemoveLanguage,
}) => {
  return (
    <div className="mb-5 text-md">
      <div className="mb-2">
        <label className="block text-md font-medium text-highlight ml-0.5">
          Languages Preferred
        </label>
      </div>

      {/* Selected languages chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedLanguages.map((language, index) => (
          <div
            key={`${language}-${index}`}
            className="bg-[#2f4858] text-white px-3 py-1 rounded-md flex items-center text-sm"
          >
            {language}
            <button
              type="button"
              onClick={() => onRemoveLanguage(index)}
              className="ml-2 text-xs bg-red-600 rounded-full p-1 cursor-pointer hover:bg-red-700 duration-100"
              aria-label={`Remove ${language}`}
            >
              <IoMdClose size={10} />
            </button>
          </div>
        ))}
      </div>

      {/* Language dropdown */}
      <div className="relative">
        <select
          onChange={(e) => {
            const language = e.target.value;
            if (language && !selectedLanguages.includes(language)) {
              onAddLanguage(language);
            }
            e.target.value = "";
          }}
          className="block w-full px-3 py-3 border border-button-border rounded-md focus:outline-1 appearance-none text-gray-500"
          defaultValue=""
          disabled={selectedLanguages.length >= 5} // Optional limit
        >
          <option value="" disabled className="text-sm bg-cbg-five">
            {selectedLanguages.length > 0
              ? "Add another language..."
              : "Select languages you can speak..."}
          </option>

          {languages
            .filter((lang) => !selectedLanguages.includes(lang))
            .map((language) => (
              <option
                value={language}
                key={language}
                className="text-sm bg-cbg-five text-black"
              >
                {language}
              </option>
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

      {selectedLanguages.length >= 5 && (
        <p className="text-xs text-gray-500 mt-1">
          Maximum 5 languages selected
        </p>
      )}
    </div>
  );
};

export default LanguageSelector;
