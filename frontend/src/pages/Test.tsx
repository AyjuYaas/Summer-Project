import { useState } from "react";

const Test = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  function changeLoginStatus() {
    setLoginStatus(!loginStatus);
  }

  return (
    <div className="p-10 text-3xl font-bold flex flex-col gap-5">
      <p>{loginStatus ? "Welcome User" : "Please Login"}</p>
      <p>{loginStatus && "How are You?"}</p>
      <button onClick={changeLoginStatus} className="bg-red-200">
        {loginStatus ? "logout" : "login"}
      </button>
    </div>
  );
};
export default Test;
