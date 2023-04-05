import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { FormContainer } from '../emotion_files/Form_emotion';
import { Main } from '../emotion_files/Main_emotion';
import { userData, userPass } from '../store/userstore';
import { Toaster } from '../utils/Toaster';

const Loginpg = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const [toastMsg,setToastMsg]=useState("")

  function logUser(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    sessionStorage.setItem("userName",value.username)
    sessionStorage.setItem("userPass",value.secret)
    const headers = {
        "Project-ID":"b7fe8748-3f5f-4f7f-9c54-70037f2b0fcf",
        "User-Name":value.username,
        "User-Secret":value.secret
    }
    axios.get("https://api.chatengine.io/users/me/",{headers: headers})
    .then((res)=>{
      dispatch(userData(res.data));
      dispatch(userPass(value.secret));
      setOpen(open=>{
        setToastMsg("Login Successful")
        return true
      });
      navigate("/home");
    })
    .catch((error) => {
      setOpen(open=>{
        setToastMsg("Invalid Credentials")
        return true
      });
    });
  }


  return (
    <Main background={"rgb(247,207,71)"}>
        <FormContainer onSubmit={logUser}>
          <h2><u>LOGIN</u></h2>
          <TextField name="username" type={"text"} size={"small"} placeholder={"Username"} 
            style={{width:"20vw",background:"white"}} required/>
          <TextField name="secret" type={"password"} size={"small"} placeholder={"Password"} 
            style={{width:"20vw",background:"white"}} required/>
          <Button variant="contained" style={{backgroundColor:"rgb(247,207,71)"}} type={"submit"}>Sign In</Button>
          <Link to={"/register"}><Button>Create Account</Button></Link>
          <Toaster open={open} setOpen={setOpen} msg={toastMsg}/>
        </FormContainer>
    </Main>
  )
}

export default Loginpg