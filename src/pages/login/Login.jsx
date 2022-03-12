import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {Context} from "../../context/Context"
import axios from "axios"
import './login.css'

export default function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const [err,setErr] = useState(false);
  const URL = process.env.REACT_APP_API;
  const {dispatch, isFetching} = useContext(Context) 

  const handleSubmit = async(e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try{
      const res = await axios.post(URL+"/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value

      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
      setErr(false);
    }catch(err){
      dispatch({type: "LOGIN_FAILURE"});
      setErr(true);
    }

  }
  return <div className='login'>
      <span className="loginTitle">LOGIN</span>
      <form className='loginForm' onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" className='loginInput' placeholder='Enter Your Username...' ref={userRef}/>
          <label>Password</label>
          <input type="password" className='loginInput' placeholder='Enter Your Password...' ref={passwordRef}/>
            <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton"> <Link className="link" to='/register'>Register</Link></button>
        {err && <span style={{color: "red", marginTop: "10px"}}>something went wrong.</span>}
  </div>;
}
