import { styled } from '@mui/material';
import React from 'react'
import Form from './Form';
import Logo from "./../../images/YourStay_Logo.png";


const MainDiv = styled("div")(({ theme }) => ({
    background: theme.palette.primary.darker,
    backgroundSize: "cover",
    display:"flex",
    alignItems:"center",
    justifyContent:'center',
    // height:"100vh",
    width:"100%",
    
  }));

  const FormDiv = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    maxWidth:"600px",
    // maxHeight:"500px",
    padding:"40px",
    borderRadius:"10px",
    position: "relative",
  }));

  const LogoDiv = styled("div")(({ theme }) => ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    marginBottom:"20px",
    "& img":{
      height:"75px",
      width:"320px",
      position: "absolute",
      top:"-38px"
    }
  }));

const Register = () => {
  return (
    <MainDiv>
        <FormDiv>
          <LogoDiv>
          <img src={Logo} alt="Logo" />
          </LogoDiv>

            <Form />
        </FormDiv>
    </MainDiv>
  )
}

export default Register