import { JSX } from "react";

interface Props {
  image: string;
  name: string;
}

const WelcomeUser = ({ image, name }: Props): JSX.Element => {
  return (
    <div className="text-3xl lg:text-4xl flex flex-col md:flex-row justify-center text-[var(--text)] font-semibold items-center gap-5">
      <img
        src={image}
        alt="profile-pic"
        className="size-30 rounded-full bg-white"
      />
      <div className="flex flex-col justify-center items-center md:items-start">
        <span>Welcome,</span>
        <span className="font-fancy tracking-wider">{name}</span>
      </div>
    </div>
  );
};
export default WelcomeUser;
