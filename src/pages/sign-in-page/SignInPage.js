import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./SignInPage.css";
import { BsArrowUpRight } from "react-icons/bs";
import { authContext } from "../../context/authContext";
import { Loader } from "../../components";

function SignInPage() {
  const { loginWithCredentials } = useContext(authContext);
  const { state } = useLocation();
  const [isSignInProgress, setIsSignInProgress] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function signinHandler() {
    setIsSignInProgress(true);
    const response = await loginWithCredentials(email, password);
    if (response.success) {
      history.push(state?.from ? state.from : "/");
    }
    setIsSignInProgress(false);
  }

  console.log({ state });

  return (
    <div className="signin">
      <h1>Sign in to RWatch</h1>
      <div className="signin__inputContainer">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="signin__input"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="signin__input"
        />
      </div>
      {isSignInProgress && <Loader />}
      {!isSignInProgress && (
        <button className="signin__btn" onClick={signinHandler}>
          Sign in
        </button>
      )}
      <div>
        Do not have an RStore account?{" "}
        <Link to="/signup">
          Create yours now <BsArrowUpRight />{" "}
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
