import { JSX } from "react";

const LoginForm = (): JSX.Element => {
  return (
    <div>
      <h1>
        Login to <span>Thera</span>Find
      </h1>

      <a href="#">Login with Google</a>
      <form action="">
        <label htmlFor="email">Email:</label>
        <input type="text" id="name" />
      </form>
    </div>
  );
};
export default LoginForm;
