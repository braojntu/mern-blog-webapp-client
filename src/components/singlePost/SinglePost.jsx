import {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Context} from "../../context/Context";
import "./singlePost.css";
import Select from "react-select";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [cat, setCat] = useState("");
  const [catOption, setCatOption] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [updateMode, setUpdateMode] = useState(false);
  const URL = process.env.REACT_APP_API;

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(URL + "/posts/" + path);
      setPost(response.data);
      setTitle(response.data.title);
      setDesc(response.data.desc);
      setPhoto(response.data.photo);
      setCat(response.data.categories);
      setSelectedOption(response.data.categories);
    };
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(URL + "/posts/" + path, {
        data: {username: user.username},
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      if (title === "") {
        console.log("title can not be empty.");
        return;
      }
      await axios.put(URL + "/posts/" + path, {
        username: user.username,
        title,
        desc,
        photo,
        categories: selectedOption,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  //Fetch data for category dropdown
  useEffect(() => {
    async function getCategories() {
      const {data} = await axios.get(URL + "/categories");
      const option = data.map((cat) => ({
        value: cat.name,
        label: cat.name,
      }));
      setCatOption(option);
    }
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
    console.log("Option selected:", e.value);
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img src={photo} alt="" className="singlePostImg" />
        {!updateMode && (
          <Link to={`/?cat=${cat}`} className="link singlePostCat">
            <b>{cat}</b>
          </Link>
        )}

        {updateMode && (
          <input
            type="text"
            value={photo}
            placeholder="Image URL"
            className="singlePostTitleInput"
            onChange={(e) => setPhoto(e.target.value)}
          />
        )}
        {updateMode && (
          <Select
            options={catOption}
            onChange={handleTypeSelect}
            value={{label: selectedOption, value: selectedOption}}
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            placeholder="Title"
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>
    </div>
  );
}
