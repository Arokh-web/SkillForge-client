const SignInUp = () => {
  return (
    <div>
      <div className="welcome">
        <h1>Welcome to SkillForge</h1>
        <p>
          Your one-stop solution for skill development and project management.
        </p>
        Join us to enhance your skills and manage your projects efficiently.
        <p>
          <button>Learn More</button>
        </p>
      </div>
      <p className="sub-title">Already have an account?</p>
      <p>Then sign in:</p>
      <p>
        <input
          className="input-field-classic"
          type="text"
          placeholder="email"
        />
        <input
          className="input-field-classic"
          type="password"
          placeholder="password"
        />
        <button className="signin-button">sign in</button>
      </p>
    </div>
  );
};

export default SignInUp;
