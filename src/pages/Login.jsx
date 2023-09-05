import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { error, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginEvent = (e) => {
    e.preventDeafult();
    let userCredentials = { name, password };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setName("");
        setPassword("");
        navigate("/");
      }
    });
  };
  return (
    <form className="form-group custom-form" onSubmit={handleLoginEvent}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        className="form-control"
        required
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="form-control"
        required
      />
      <button
        type="submit"
        className="btn btn-success my-5"
        style={{ width: "100%" }}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};

export default Login;
