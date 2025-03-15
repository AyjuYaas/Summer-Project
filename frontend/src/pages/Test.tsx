import { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(1);

  function increaseValue() {
    setCount(count + 1);
    console.log(count);
  }
  return (
    <div className="text-2xl">
      <nav className="fixed bg-red-300 w-full text-center">This is Navbar</nav>
      <div className="h-800 w-full bg-amber-300"></div>
    </div>
  );
};
export default Test;
