import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css'
import axios from "axios"
import { useLocation } from 'react-router-dom';


export default function Home() {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()
  const URL = process.env.REACT_APP_API;

  useEffect(() =>{
    const fetchPosts = async () =>{
     const response = await axios.get(URL+"/posts"+search)
     setPosts(response.data);
    }
    fetchPosts();
  },[search])

  const [screen, setScreen] = useState(window.screen.width)
  useEffect(()=>{
    setScreen(window.screen.width)
  },[])
  return (
  <>
  <Header/>
  <div className="home">
      <Posts posts={posts}/>
      {screen >= 768 &&  <Sidebar/>}
  </div>
  </>
  )}
