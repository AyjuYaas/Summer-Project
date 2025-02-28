import { JSX } from "react";

interface Qualification {
  label: string;
  value: string;
}

interface Prop {
  option: Qualification;
}

const QualificationLabel = ({ option }: Prop): JSX.Element => {
  return (
    <div>
      <div className="bg-[var(--footer-bg)] text-green-50 px-5 py-2">
        {option.label}
      </div>
    </div>
  );
};

export default QualificationLabel;
