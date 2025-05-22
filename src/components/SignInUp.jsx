const SignInUp = () => {
  return (
    <div>
      <p>Already have an account?</p>
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
