import fetchData from "../../API/fetchData";
import "./sign.css";
import { useNavigate } from "react-router-dom";

const SignInUp = () => {
  const navigate = useNavigate();
  const handleClickSignUp = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const formData = new FormData(form);

    const payload = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetchData("POST", "/auth/signup", payload);
      console.log("Sign up successful!");
    } catch (error) {
      if (error.response?.status === 409) {
        console.error("Email already exists. Please use a different email.");
      } else {
        console.error("An error occurred during sign up:", error);
      }
    }
  };

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
      <div className="welcome">
        <h1>Welcome to SkillForge</h1>
        <p>
          Your one-stop solution for skill development and project management.
        </p>
        Join us to enhance your skills and manage your projects efficiently.
      </div>
      <div className="sign-container">
        <div className="signin-container">
          {/* LOGIN FORM */}
          <p>Already have an account?</p>
          <p>Then sign in:</p>
          <form>
            <input type="text" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button className="sign-button" onClick={handleClickSignIn}>
              sign in
            </button>
          </form>
        </div>
        {/* SIGNUP FORM */}
        <div className="signup-container">
          <p>Don't have an account yet?</p>
          <p>Then sign up:</p>
          <form>
            <input type="text" placeholder="username" name="username" />
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button className="sign-button" onClick={handleClickSignUp}>
              sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
