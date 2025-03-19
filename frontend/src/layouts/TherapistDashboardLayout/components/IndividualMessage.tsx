import { JSX } from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  image: string;
  name: string;
}

const IndividualMessage = ({ id, image, name }: Props): JSX.Element => {
  return (
    <Link to={`/chat/${id}`}>
      <div className="flex gap-3 items-center mb-5 hover:bg-[#aabbae] p-2 rounded-xl transition-colors duration-200">
        <img
          src={image}
          alt={`${name}'s avatar`}
          className="size-12 object-cover rounded-full border-2 bg-white"
        />
        <h2 className="font-semibold text-main-text text-xl">{name}</h2>
      </div>
    </Link>
  );
};
export default IndividualMessage;
