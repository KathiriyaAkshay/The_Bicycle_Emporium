import React, { useState } from 'react'
import "./css/main.css"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

const Register = () => {
  var navigate = useNavigate()
  const [divs, setdivs] = useState('block')
  const [otp, setOtp] = useState()
  const [showOtpBlock, setShowOtpBlock] = useState('none')

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    window.document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  const showPass = (field) => {
    if (field === 'password') {
      const password = document.getElementById('password')
      const checkbox = document.getElementById('showpass')
      if (checkbox.checked)
        password.type = "text"
      else
        password.type = "password"
    }
    else if (field === 'cpassword') {
      const cpassword = document.getElementById('cpassword')
      const checkbox = document.getElementById('showcpass')
      if (checkbox.checked)
        cpassword.type = "text"
      else
        cpassword.type = "password"
    }
  }

  const sendOtp = async () => {
    const email = document.getElementById('email').value
    const requrl = "http://localhost:5000/user/verifyEmail";
    const reqOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email: email })
    }
    const result = await fetch(requrl, reqOptions);
    const response = await result.json();
    if (response.code === 'error') {
      alert("Something went wrong!!! please try again...")
      document.getElementById('email').focus();
    }
    else {
      setdivs('none')
      setShowOtpBlock('block')
      setOtp(response.code)
    }
  }
  const registerFunction = async () => {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value

    const password = document.getElementById("password").value
    const cpassword = document.getElementById("cpassword").value
    const userOtp = document.getElementById("otp").value

    if (otp == userOtp) {
      if (name === '' || email === '' || password === '' || cpassword === '') {
        alert("Enter details properly!!!")
        document.getElementById("name").focus();
      }
      else if (cpassword !== password) {
        alert("Password doesn't Matched!!!")
        document.getElementById("password").value = '';
        document.getElementById("cpassword").value = '';
        document.getElementById("password").focus();
      }
      else {
        const reqUrl = "http://localhost:5000/user/createUser";
        const reqOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "name": name, "email": email, "password": password })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json();
        if (response.status === 'success') {
          setCookie("jwtoken", response.token, 0.5)
          alert("User Signed in Successfully!!!")
          navigate('/')
          window.location.reload(false);
        }
        else if (response.status === 'failed') {
          alert("Account already exists!!!")
          navigate('/login')
        }
      }
    }
    else {
      alert("Email verification failed!!!Otp is wrong...")
    }
  }

  const registerGFunction = async (details) => {
    console.log(details.name);
    console.log(details.email);
    const reqUrl = "http://localhost:5000/user/createUser";
    const reqOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name": details.name, "email": details.email, "password": "google123" })
    }
    const result = await fetch(reqUrl, reqOptions);
    const response = await result.json();
    if (response.status === 'success') {
      setCookie("jwtoken", response.token, 0.5)
      alert("User Signed in Successfully!!!")
      navigate('/')
      window.location.reload(false);
    }
    else if (response.status === 'failed') {
      alert("Account already exists!!!")
      navigate('/login')
    }
  }

  return (
    <>
      <div className='Reg_formdiv'>
        <div className='Form_title'>Registration</div>

        <div className='regInputDivs' style={{ display: divs }}>
          <div className='Title_divs'>
            <span className='icons'><DriveFileRenameOutlineIcon /></span>
            <label htmlFor='name' className='Label'>Name:</label> <br />
          </div>
          <input type="text" name="name" id="name" className='Input_take' required /><br /> <br />
        </div>
        <div className='regInputDivs' style={{ display: divs }}>
          <span className='icons'><EmailIcon /></span>
          <label htmlFor="email" className='Label'>Email:</label><br />
          <input type="email" name="email" id="email" className='Input_take' required /><br /> <br />
        </div>

        <div className='regInputDivs' style={{ display: divs }}>
          <span className='icons'><LockIcon /></span>
          <label htmlFor="password" className='Label'>Password:</label><br />
          <input type="password" name="password" id="password" className='Input_take' required /><br />
          <div className="ShowPassDivReg"><input type="checkbox" id='showpass' name='show' className='checkBox' onClick={() => showPass("password")} />    <label htmlFor="showpass" className='Label_ShowPass'> Show Password</label></div>
        </div>
        <div className='regInputDivs' style={{ display: divs }}>
          <span className='icons'><LockIcon /></span>
          <label htmlFor="cpassword" className='Label'>Confirm password:</label><br />
          <input type="password" name="cpassword" id="cpassword" className='Input_take' required /><br />
          <input type="checkbox" id='showcpass' name='show' className='checkBox' onClick={() => showPass("cpassword")} />    <label htmlFor="showcpass" className='Label_ShowPass'> Show Password</label>
        </div>
        <div className='SubmitDiv' style={{ display: divs }}>
          <input type="submit" value="Submit" className='regSubmitButtonCss' onClick={sendOtp} />
        </div>
        <div  style={{ 'float':'none',
          'position':'static',
          'display':'block',
          'margin':'auto',
          'width':'max-content' }}>
          <GoogleOAuthProvider clientId="996507416949-h17vfj5ig72jgkhvqqcv6a1e1mt5sq4v.apps.googleusercontent.com">


            <GoogleLogin
              onSuccess={credentialResponse => {
                const details = jwt_decode(credentialResponse.credential);
                console.log(credentialResponse);
                console.log(details);
                registerGFunction(details);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
        </div>
        <a style={{ display: divs }} className='Anchor_tag' href="/login">Already have an account? Login here!</a><br />

        <div className='inputDivs' style={{ display: showOtpBlock }}>
          <div className="Icon_title">
            <span className='icons'><LockIcon /></span>
            <label className='Label' htmlFor="otp">Enter Otp:</label><br />
          </div>
          <input className='Input_take' type="text" name="otp" id="otp" required /><br />
          <br />
        </div>
        <div className='inputDivs' style={{ display: showOtpBlock, marginBottom: "2rem" }}>
          <input className='SubmitButtonCss' type="button" value="Submit" onClick={registerFunction} />
        </div>
      </div>
    </>
  )
}
export default Register