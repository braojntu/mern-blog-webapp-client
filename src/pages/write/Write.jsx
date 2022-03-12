import {useContext, useState, useEffect} from "react";
import "./write.css";
import axios from "axios";
import {Context} from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(
    "https://cdn.wallpapersafari.com/38/54/m41owu.jpg"
  );
  const [cat, setCat] = useState("");
  const [catdd, setCatDD] = useState([]);
  const [distinct, setDistinct] = useState([]);
  const {user} = useContext(Context);
  const URL = process.env.REACT_APP_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      photo,
      title,
      desc,
      categories: cat.toLowerCase(),
    };
    try {
      const res = await axios.post(URL + "/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  //Fetch data for category dropdown
  useEffect(() => {
    const fetchCatDD = async () => {
      const response = await axios.get(URL + "/categories");
      setCatDD(response.data);
    };
    fetchCatDD();
  }, []);

  useEffect(() => {
    var lookup = [];
    catdd.forEach((dd) => {
      if (!(dd.name in lookup) && dd.name !== "") {
        lookup.push(dd.name);
      }
    });
    let unique = lookup.filter((item, i, ar) => ar.indexOf(item) === i);
    setDistinct(unique);
  }, [catdd]);

  return (
    <div className="blog-cont">
      <img className="blogCoverImg" src={photo} alt="" />
      <form className="blogForm" onSubmit={handleSubmit}>
        <div className="imageURLContainer">
          <label className="imgLabel" htmlFor="">
            Blog Image URL:
          </label>
          <input
            className="imageURL"
            type="text"
            value={photo}
            placeholder="Image Address"
            onChange={(e) => setPhoto(e.target.value)}
          />
          <button className="Submit" type="submit">
            Publish
          </button>
        </div>
        <div className="category">
          <select
            placeholder="Choose a category"
            onChange={(e) => setCat(e.target.value)}
          >
            {distinct.map((c) => {
              return (
                <option value={c.name} key={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
    
        <div className="title-cont">
          <input
            type="text"
            placeholder="Blog Title"
            className="title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="content-cont">
          <textarea
            placeholder="Start writing your blog..."
            type="text"
            className="content"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
