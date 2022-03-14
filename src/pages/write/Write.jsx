import {useContext, useState, useEffect} from "react";
import "./write.css";
import axios from "axios";
import {Context} from "../../context/Context";
import Select from "react-select";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(
    "https://mcdn.wallpapersafari.com/medium/47/68/KGftsZ.jpg"
  );
  const [catOption, setCatOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select a Category");
  const {user} = useContext(Context);
  const URL = process.env.REACT_APP_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      photo,
      title,
      desc,
      categories: selectedOption,
    };

    try {
      const res = await axios.post(URL + "/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  //Fetch data for category dropdown
  useEffect(() => {
    async function getCategories() {
      const {data} = await axios.get(URL + "/categories");
      const options = data.map((cat) => ({
        value: cat.name,
        label: cat.name,
      }));
      setCatOption(options);
    }
    getCategories();
  }, []);

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
    console.log("Option selected:", e.value);
  };

  console.log("Outside handle: ", selectedOption);

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
          <Select
            options={catOption}
            onChange={handleTypeSelect}
            value={{label: selectedOption, value: selectedOption}}
            label="Single select"
          />
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
