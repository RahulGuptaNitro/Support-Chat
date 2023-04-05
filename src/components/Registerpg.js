import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from '../emotion_files/Form_emotion';
import { Main } from '../emotion_files/Main_emotion';
import { Toaster } from '../utils/Toaster';

const Registerpg = () => {

  const [open, setOpen] = useState(false);
  const [toastMsg,setToastMsg]=useState("")
  const navigate=useNavigate()

  const headers = {
    'Content-Type': 'application/json',
    "PRIVATE-KEY": "d77f1f5b-7665-438f-ae96-96c978596831",
  }


  function createUser(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    axios.post("https://api.chatengine.io/users/",value,{headers: headers})
    .then(()=>{
      setOpen(open=>{
        setToastMsg("Registration Successful")
        return true
      });
      navigate("/")
    })
  }

  return (
    <Main background={"rgb(247,207,71)"}>
        <FormContainer method={"POST"} height={"70vh"} onSubmit={createUser}>
          <h2><u>REGISTER</u></h2>
          <TextField name="username" size={"small"} type={"text"} placeholder={"Username"}
            style={{width:"20vw",background:"white"}} required/>
          <TextField name="first_name" type={"text"} size={"small"} placeholder={"First Name"}
            style={{width:"20vw",background:"white"}} required/>
          <TextField name="last_name" type={"text"} size={"small"} placeholder={"Last Name"} 
            style={{width:"20vw",background:"white"}} required/>
          <TextField name="secret" type={"password"} size={"small"} placeholder={"Password"}
            style={{width:"20vw",background:"white"}} required/>
          <Button variant="contained" style={{backgroundColor:"rgb(247,207,71)"}} type={"submit"}>Sign Up</Button>
          <Link to={"/"}><Button>Already a User!</Button></Link>
        </FormContainer>
        <Toaster open={open} setOpen={setOpen} msg={toastMsg}/>
    </Main>
  )
}

export default Registerpg