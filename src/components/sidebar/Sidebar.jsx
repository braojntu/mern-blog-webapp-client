import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./sidebar.css";
import mern from "../images/mern.png";

export default function Sidebar() {
  const [cat, setCat] = useState([]);
  const [distinct, setDistinct] = useState([]);
  const URL = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchCat = async () => {
      const response = await axios.get(URL + "/categories");
      setCat(response.data);
    };
    fetchCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    var lookup = [];
    cat.forEach((p) => {
      //let lower = (p.categories).toLowerCase()
      if (!(p.name in lookup) && p.name !== "") {
        lookup.push(p.name);
      }
    });
    let unique = lookup.filter((item, i, ar) => ar.indexOf(item) === i);
    setDistinct(unique);
  }, [cat]);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT BLOG</span>
        <img className="mern" src={mern} alt="mern" />
        <p>This blog is build with React, Nodejs and MongoDB</p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {distinct.map((p) => (
            <Link to={`/?cat=${p}`} className="link" key={p}>
              <li className="sidebarListItem">{p}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocials">
          <a href="https://www.linkedin.com/in/baburao-bolla/">
            <i className="sidebarIcon fab fa-linkedin-in" />
          </a>
          <a href="https://github.com/braojntu">
            <i className="sidebarIcon fab fa-github" />
          </a>
        </div>
      </div>
    </div>
  );
}
