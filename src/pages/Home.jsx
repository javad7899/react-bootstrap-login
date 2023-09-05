import { useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  }
  const [user, setUser] = useState(getUser());
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <>
      {user ? (
        <>
          <h4>WellCome</h4>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" className="btn btn-primary">Login</Link>
      )}
    </>
  );
};

export default Home;
