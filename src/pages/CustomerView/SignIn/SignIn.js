const SignIn = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
