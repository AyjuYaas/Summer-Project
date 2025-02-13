import { MdPersonSearch } from "react-icons/md";
import { IoAccessibility } from "react-icons/io5";
import { GiTalk } from "react-icons/gi";

interface Reasons {
  icon: React.ElementType;
  content: string;
}

const reasons: Reasons[] = [
  {
    icon: MdPersonSearch,
    content: "Browse and match with qualified therapists worldwide",
  },
  {
    icon: IoAccessibility,
    content: "Access therapy from the comfort of your home",
  },
  {
    icon: GiTalk,
    content:
      "Choose from different communication options: chat, call, or video sessions",
  },
];

export default reasons;
