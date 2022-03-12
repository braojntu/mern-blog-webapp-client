import { useContext, useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './settings.css'
import {Context} from "../../context/Context"
import axios from 'axios';


export default function Settings() {
    const {user, dispatch} = useContext(Context)
    const  [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [photo,setPhoto] = useState(user.profilePic)
    const [success, setSuccess] = useState(false)
    const [nocred, setNocred] = useState(false) 
    const URL = process.env.REACT_APP_API;

    const handleSubmit =async (e) =>{
        if(email=== "" || password === "")
        {
            setNocred(true);
            return
        }
        setNocred(false);
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username: user.username,
            profilePic:photo,
            email,
            password
        }
        try{
            const res = await axios.put(URL+"/users/"+user._id, updatedUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload:res.data})
        }catch(err){
            dispatch({type: "UPDATE_FAILURE"})
        }
    }

    const handleDelete = async () =>{
        try{
        await axios.delete(URL+"/users/"+user._id,{
            data:{userId: user._id}})
            handleLogout();
        }catch(err){}
    }
    const handleLogout = () =>{
        dispatch({type: "LOGOUT"});
      }

      const [screen, setScreen] = useState(window.screen.width)
      useEffect(()=>{
        setScreen(window.screen.width)
      },[])

  return <div className='settings'>
      <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span onClick={handleDelete} className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form  className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={photo} alt="" />
                </div>
                <input type="text" value={photo}  onChange={e => setPhoto(e.target.value)} />
                <label>Username</label>
                <input type="text" value={user.username} readOnly/>
                <label>Email</label>
                <input type="email" value={email}  onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className='settingsSubmit' type='submit'>Update</button>
                {success && <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been Updated.</span>}
                {nocred && <span style={{color: "red", textAlign: "center", marginTop: "20px"}}>Credentials cannot be empty.</span>}
            </form>
      </div>
      {screen >= 768 &&  <Sidebar/>}
     
  </div>;
}
