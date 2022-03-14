import {useContext} from "react";
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  };
  return (
    <div className="topbar">
      <div className="left">
        <a href="https://www.linkedin.com/in/baburao-bolla/">
          <i className="icon fab fa-linkedin-in" />
        </a>
        <a href="https://github.com/braojntu">
          <i className="icon fab fa-github" />
        </a>
      </div>
      <div className="mid">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE A BLOG
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="right">
        {user ? (
          <Link to="/settings">
            <img className="image" src={user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem registerText">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <Link className="link" to="/about">
          <i className="hamburger fas fa-bars"></i>
        </Link>
      </div>
    </div>
  );
}
