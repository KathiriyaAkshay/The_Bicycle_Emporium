import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./css/main.css"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
const Login = () => {
  const navigate = useNavigate();
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    window.document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }




  const submitFun = async () => {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (name === '' || email === '' || password === '') {
      alert("Enter details properly!!!")
      document.getElementById("name").focus();
    }
    else if (email === "19it440@bvmengineering.ac.in") {
      if (name === 'Admin' && password === 'Admin@1234') {
        sessionStorage.setItem("type", 'Admin');
        // navigate('/admin/Home')
        window.location.href = '/admin/Home'
      }
      else {
        alert("Email not available!!!")
        document.getElementById("email").focus();
      }
    }
    else {
      const requrl = "http://localhost:5000/user/verifyUser";
      const reqOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email": email, "password": password, "name": name })
      }
      const result = await fetch(requrl, reqOptions);
      const response = await result.json();
      if (response.status === "success") {

        setCookie("jwtoken", response.token, 0.5)
        alert("User Login Successfully!!!")
        navigate('/')
        window.location.reload(false);
      }
      else if (response.status === "failed") {
        alert("Invalid Credentials !!!")
        document.getElementById("password").focus();

      }
      else if (response.status === "NotFound") {
        alert("User Not Found with the Email id!!!")
        navigate("/register")
      }
    }

  }

  const showPass = () => {
    const password = document.getElementById('password')
    const checkbox = document.getElementById('show')
    if (checkbox.checked)
      password.type = "text"
    else
      password.type = "password"
  }
  return (
    <>
      <div className="Login_division">
        <div className='formdiv'>
          <div className='Form_title'>Login </div>
          <div>

            {/* <div className='inputDivs'>
              <label htmlFor="mode">Select type:</label>
              <select name="mode" id="mode">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div> */}
            <div className='inputDivs'>
              <div className="Icon_title">
                <span className='icons'><DriveFileRenameOutlineIcon /></span>
                <label htmlFor='name' className='Label'>Name:</label> <br />
              </div>
              <input className='Input_take' type="text" name="name" id="name" required /><br />

            </div>

            <div className='inputDivs'>
              <div className="Icon_title">
                <span className='icons'><EmailIcon /></span>
                <label className='Label' htmlFor="email">Email:</label><br />
              </div>
              <input className='Input_take' type="email" name="email" id="email" required /><br />
            </div>

            <div className='inputDivs'>
              <div className="Icon_title">
                <span className='icons'><LockIcon /></span>
                <label className='Label' htmlFor="password">Password:</label><br />
              </div>
              <input className='Input_take' type="password" name="password" id="password" required /><br />
              <div className='ShowPassDiv'>
                <input type="checkbox" className='checkBox' id='show' name='show' onClick={showPass} />
                <label htmlFor="show" className='Label_ShowPass'> Show Password</label>
              </div>
              <br />
            </div>
            <div className='inputDivs'>
              <input className='SubmitButtonCss' type="button" value="Submit" onClick={submitFun} />
            </div>

            <br /><br />
            <a className='Anchor_tag' href="/register">Don't have an account? Register here!</a><br />
            <a className='Anchor_tag' href="/forgotPassword">Forgot password?</a>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login