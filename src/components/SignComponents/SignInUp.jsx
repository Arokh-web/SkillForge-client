import fetchData from "../../API/fetchData";
import "./sign.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/contexts";

const SignInUp = () => {
  const navigate = useNavigate();
  const [expandedSignUp, setExpandedSignUp] = useState(false);
  const {
    user,
    setUser,
    setIsAuthenticated,
    setCheckSession,
    isAuthenticated,
  } = useAuthContext();

  // SIGNUP HANDLER
  const handleClickSignUp = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const formData = new FormData(form);

    const payload = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: "user", // Default role for new users
    };

    try {
      console.log("Payload:", payload);
      console.log("Sending sign up request...");
      const res = await fetchData("POST", "/auth/signup", payload);
      console.log("Sign up response:", res);
      setUser(res);
      setIsAuthenticated(true);
      setCheckSession(true);
      navigate("/dashboard"); // Redirect to dashboard after successful sign up
      console.log("Sign up successful!");
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("Email already exists. Please use a different email.");
      } else {
        console.error("An error occurred during sign up:", error);
      }
    }
  };

  const handleExpandSignUp = () => {
    setExpandedSignUp(!expandedSignUp);
  };

  // SIGNIN HANDLER
  const handleClickSignIn = async (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    console.log("Form Data:", form);
    const formData = new FormData(form);

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("Payload:", payload);

    try {
      const res = await fetchData("POST", "/auth/signin", payload);
      console.log("Sign in successful!");
      setUser(res);
      setCheckSession(true);
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirect to dashboard after successful sign in
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Invalid email or password. Please try again.");
      } else {
        console.error("An error occurred during sign in:", error);
      }
    }
  };

  return (
    <div>
      <div className="welcome-container">
        <p>
          Your one-stop solution for skill development and project management.
        </p>
        Join us to enhance your skills and manage your projects efficiently.
      </div>
      <div className="sign-container">
        <div className="signin-container">
          {/* LOGIN FORM */}

          <p>Please sign in to get access to your projects:</p>
          <form className="flex flex-col items-center">
            <input type="text" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button className="sign-button" onClick={handleClickSignIn}>
              sign in
            </button>
          </form>
        </div>

        {/* SIGNUP FORM */}
        {expandedSignUp && (
          <div className="signup-container">
            <p>Don't have an account yet?</p>
            <p>Then sign up:</p>
            <form className="flex flex-col items-center">
              <input type="text" placeholder="username" name="username" />
              <input type="email" placeholder="email" name="email" />
              <input type="password" placeholder="password" name="password" />
              <button className="sign-button" onClick={handleClickSignUp}>
                sign up
              </button>
            </form>
          </div>
        )}
        <div>
          <button
            className="sign-button toggle-button"
            onClick={handleExpandSignUp}
          >
            {expandedSignUp
              ? "Already have an Account? Then sign in!"
              : "Dont' have an account? Sign up!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
