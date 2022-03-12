import { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/singlePost/SinglePost';
import './single.css'

export default function Single() {
  const [screen, setScreen] = useState(window.screen.width)
  useEffect(()=>{
    setScreen(window.screen.width)
  },[])

  return <div className='single'>
      <SinglePost/>
      {screen >= 768 &&  <Sidebar/>}
  </div>;
}
