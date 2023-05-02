import React from 'react'
import "./css/main.css"
import {
  Button,
  Grid,
} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import CommentIcon from '@mui/icons-material/Comment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import auth from './controllers/authentication'
import getCookie from './controllers/cookieManagement'
import Header from "./component/Header";

const Contact = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const getData = async () => {
    const token = getCookie('jwtoken')
    const reqUrl = 'http://localhost:5000/user/getInfo';
    const reqOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token: token })
    }
    const result = await fetch(reqUrl, reqOptions);
    const response = await result.json();
    setName(response.name)
    setEmail(response.email)
  }
  useEffect(() => {
    auth()
    getData()
  }, [])


  const Submitfun = async () => {
    const uname = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
    if (uname === '' || email === '' || comment === '') {
      alert("Enter all the details properly...")
      document.getElementById("name").focus();
    }
    else {
      const requrl = "http://localhost:5000/user/feedback";
      const reqOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ "email": email, "feedback": comment, "name": uname , "date":Date.now()})
      }

      const result = await fetch(requrl, reqOptions);
      const response = await result.json();
      // console.log(response);
      if (response.status === "success") {
        alert("Feedback Added successfully!!!")
        window.location.href = "/";
      }
    }
  }

  return (
    <div><Header />
    <>
    <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
      >
      
      <h2 class="section-title mb-40">
      <span class="text-marked">Reach</span> <span style={{color:'black'}}>Us</span>
    </h2>
        <div className='maindiv'>
          <div className='infodiv'>
            <div>
              <span className='icons' style={{color:'black'}}><EmailIcon /></span>
              <a href="mailto:unofficial.the.bicycle.emporium@gmail.com" style={{color:'black'}}>unofficial.the.bicycle.emporium@gmail.com</a>
            </div>
            <div>
              <span className='icons' style={{color:'black'}}><LocalPhoneIcon /></span>

              <span style={{color:'black'}}>6351273627</span>
            </div>
            <div>
              <span className='icons' style={{color:'black'}}><EmailIcon /> Address:</span><br />
              <p style={{color:'black'}}>
                BVM Engineering college. <br />
                Vallabh Vidyanagar <br />
                Anand, Gujarat 388120 <br />
                India. <br />
              </p>
              <iframe title='BVM' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620177.101232328!2d70.97264662612587!3d23.978249498846345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e74c03b7749%3A0xab364c66fd4834c!2sBirla%20Vishvakarma%20Mahavidyalaya%20(BVM)!5e0!3m2!1sen!2sin!4v1670959120083!5m2!1sen!2sin" width="450vh" height="250vh"></iframe>
              <br /><br />
              <a href="https://www.google.co.in/maps/place/Birla+Vishvakarma+Mahavidyalaya+(BVM)/@22.5525136,72.923825,17z/data=!4m12!1m6!3m5!1s0x395e4e74c03b7749:0xab364c66fd4834c!2sBirla+Vishvakarma+Mahavidyalaya+(BVM)!8m2!3d22.5525136!4d72.923825!3m4!1s0x395e4e74c03b7749:0xab364c66fd4834c!8m2!3d22.5525136!4d72.923825?hl=en&authuser=0">
                  {/* <a href="https://www.google.co.in/maps/place/Birla+Vishvakarma+Mahavidyalaya+(BVM)/@22.5525136,72.9216363,17z/data=!3m1!4b1!4m5!3m4!1s0x395e4e74c03b7749:0xab364c66fd4834c!8m2!3d22.5525136!4d72.923825?hl=en&authuser=0"> */}
              <button className='gdb-font' style={{color:'black'}}>Get Direction</button>
              </a>
            </div>
          </div>
          <div className='reachusdiv'>
            <div>
              <div>
                <span className='icons' style={{color:'black'}}><DriveFileRenameOutlineIcon /></span>
                <label htmlFor='name' className='Label' style={{color:'black'}}>Name:</label> <br />
                <input type="text" name="name" id="name" size="40" className='Input_take' value={name} readOnly /><br /> <br />
              </div>
              <div className='ContactinputDivs'>
                <span className='icons' style={{color:'black'}}><EmailIcon /></span>
                <label htmlFor="email" className='Label' style={{color:'black'}}>Email:</label><br />
                <input type="email" name="email" style={{color:'black'}} id="email" size="40" className='Input_take' value={email} readOnly /><br /> <br />
              </div>
              <div>
                <span className='icons' style={{color:'black'}}><CommentIcon /></span>
                <br />
                <textarea rows={10} cols={60} type="text" className='Input_take' style={{color:'black'}} placeholder='Enter the suggestions/query/feedback...' name="feedback" id="comment" required /><br /> <br />
              </div>
              <div className="justify-content align-center  mt-3 ">
              <div className="w-100" style={{ textAlign: 'center' }}>
                <Button variant="contained" style={{ height: "41px", boxShadow: "2px -1px 32px 0px rgba(44,94,255,0.36)" }} value="Submit" onClick={Submitfun} className=" search-bar-button  m-auto ">
                Submit
              </Button>
              </div>
            </div>
              <br />
              <a href="/login" style={{color:'black'}}>Already have an account? Login here!</a><br />
            </div>
          </div>
        
      </div>
      </section>
    </>
    </div>
  )
}

export default Contact