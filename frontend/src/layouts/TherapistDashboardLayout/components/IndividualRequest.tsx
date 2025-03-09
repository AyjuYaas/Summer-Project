import { JSX } from "react";

interface Props {
  id: string;
  image: string;
  name: string;
}

const IndividualRequest = ({ id, image, name }: Props): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-5 items-center mb-5 hover:bg-[#bba79c] p-3 rounded-xl transition-colors duration-200 cursor-pointer">
      <div className="flex items-center self-start gap-3">
        <img
          src={image}
          alt={`${name}'s avatar`}
          className="size-12 object-cover rounded-full border-2 border-black"
        />
        <h2 className="font-semibold  text-xl">{name}</h2>
      </div>
    </div>
  );
};
export default IndividualRequest;
