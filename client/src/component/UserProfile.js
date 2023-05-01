import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import Beginner from "./beginner.jpg";
import Intermediate from "./intermediate.jpg";
import Master from "./master.jpg";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import auth from '../controllers/authentication'
import getCookie from '../controllers/cookieManagement'

export default function UserProfile() {
  
  const [singleUser, setSingleUser] = useState();
  const [rating, setRating] = useState();

  const [name, setName] = useState('')
  const [addr, setAddr] = useState('')
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
    setAddr(response.address)
  }

  useEffect(() => {
    auth()
    getData()
  }, [])
  
 
  
  const Submitfun = async () => {
    const uname = document.getElementById("name").value;
    const add = document.getElementById("address").value;
    const email = document.getElementById('email').value
    const requrl = "http://localhost:5000/user/changeAdd";
    const reqOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ email: email, address: addr })
    }
    const result = await fetch(requrl, reqOptions);
    const response = await result.json();
    if (response.status === 'success') {
        alert("Address Updated successfully...")
        window.location.href='/login'
    }
    else {
        alert("OOPS!!! Something went wrong...")
    }
  }
  
  return (
    <>
  
    <section
    class="bg-dark "
    id="home"
  >
      
        <div>
        <h2 class="section-title mb-40"><span class="text-marked">My </span> <span style={{color:'black'}}>Profile</span></h2>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <div style={{ display: "flex", flexDirection: "row",flexBasis:'50%'}}>
              <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "poppins",
          marginTop: 10,
          flexGrow:1
        }}
      >
        <div
          style={{
            color: "#808080",
            fontFamily: "poppins",
            fontWeight: "600",
             marginLeft:'20px'
          }}
           
        >
          First Name
        </div>
        <div>  
          <input
            title={"First Name"}
            placeholder={"Ex: Nikunj"}
            className="form-control form-inputt"
            value={name} readOnly
            id="name"
           name="name"
          />
        </div>
        </div>
              
                 </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
              <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "poppins",
          marginTop: 10,
          flexGrow:1
        }}
      >
        <div
          style={{
            color: "#808080",
            fontFamily: "poppins",
            fontWeight: "600",
             marginLeft:'20px'
          }}
           
         
        >
          Email
        </div>
                 <div>
                 <input
                 title={"About Me"}
                 placeholder={"I AM student"}
                 value={email} readOnly                 className="form-control form-inputt"
                id="email"
                name="email"
               /></div>
               </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
              <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "poppins",
          marginTop: 10,
          flexGrow:1
        }}
      >
        <div
          style={{
            color: "#808080",
            fontFamily: "poppins",
            fontWeight: "600",
             marginLeft:'20px'
          }}
           
        >
          Gender
        </div>
                <div><input
                title={"Gender"}
                placeholder={"Ex: Male"}
                value={"MALE"}
                className="form-control form-inputt"
                 
                 name="Gender"
                 readOnly
              /></div>
              </div>
              <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "poppins",
          marginTop: 10,
          flexGrow:1
        }}
      >
        <div
          style={{
            color: "#808080",
            fontFamily: "poppins",
            fontWeight: "600",
             marginLeft:'20px'
          }}
           
        >
          DOB
        </div>
                <div style={{ marginLeft: 10 }}>
                  <input
                    title={"DOB"}
                    placeholder={"Ex: 31/10/2000"}
                    value={"10/10/2001"}
                    className="form-control form-inputt"
                   readOnly
                   name="DoB"
                  />
                </div>
                </div>
              </div>
            

              

              <div style={{ display: "flex", flexDirection: "row" }}>
              <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "poppins",
          marginTop: 10,
          flexGrow:1
        }}
      >
        <div
          style={{
            color: "#808080",
            fontFamily: "poppins",
            fontWeight: "600",
             marginLeft:'20px'
          }}
           
        >
        Address
        </div>
                 <div>
                 <input
                 
                 title={"About Me"}
                 placeholder={"I AM student"}
                 value={addr}   name="address" onChange={e => setAddr(e.target.value)}
                 className="form-control form-inputt"
                id="address"
               /></div>
               </div>
              </div>

        
              <div
                style={{
                  marginTop: 20,
                  justifyContent: "end",
                }}
              >
                  <button
      className="button2"
      style={{ width: "fit-content", height: 50 }}
      onClick={Submitfun}
    >Submit</button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
           
              <div
                style={{
                  fontFamily: "poppins",
                  fontSize: 22,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
          <span class="text-marked">Your </span> <span style={{color:'black'}}>Orders</span>
              </div>
              <div
                className="profile w-5 h-5"
                style={{ marginTop: 20, marginBottom: "auto" }}
              >
                <img
                  src='https://media.licdn.com/dms/image/C4E03AQGna1eBe5L77A/profile-displayphoto-shrink_800_800/0/1646320364326?e=1686182400&v=beta&t=fc_QWmsh7yUaSz6YcW5t3XKu3Ab4DwBjfJZ1rfb5JEI'
                  className="w-110 h-110 rounded-circle"
                  height="300px"
                />
              </div>
              <div style={{ marginTop: 50 }}></div>
              <button
                style={{
                  width: "fit-content",
                  paddingLeft: 30,
                  paddingRight: 30,
                  marginBottom: "auto",
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "center",
                  height: 45,
                  borderColor: "#2C5EFF",
                  borderWidth: 1,
                  borderRadius: 5,
                  background: "#ffffff",
                  marginLeft: "auto",
                  marginRight: "auto",
                  boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
                }}
              >
                <div style={{}}>
                <EditOutlinedIcon style={{
                    marginLeft: 10,
                    fontSize: 28,
                    color: "#2C5EFF",
                    paddingTop: 7,
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}/>

                </div>
                <div
                  style={{
                    fontFamily: "poppins",
                    fontWeight: "bold",
                    marginTop: "auto",
                    marginBottom: "auto",
                    color: "#2C5EFF",
                    marginLeft:'10px'
                  }}
                >
                  Edit Picture
                </div>
              </button>
              <div style={{fontFamily: 'poppins', fontWeight: 500, fontSize: 22,marginTop:'15px'}}>Level</div>
              
              <hr className="horizontal-line"></hr>
              
              <div style={{display: "flex", flexDirection: 'row'}}>
                {rating < 200 ? <img style={{ boxShadow: "0px 0px 40px 10px rgba(199,199,199,1)", backgroundColor: '#2C5EFF', width: 70, borderRadius: '50%'}} src={Beginner}/> : rating > 700 ? <img src={Intermediate} style={{backgroundColor: '#2C5EFF', width: 70, borderRadius: '50%'}}/> : <img src={Master} style={{backgroundColor: '#2C5EFF', width: 70, borderRadius: '50%'}}/>}
                <div style={{display: "flex", flexDirection: "column", marginTop: 'auto', marginBottom: 'auto'}}>
                  <div style={{fontFamily: 'poppins', fontWeight: 500, marginTop: "auto", marginBottom: 'auto', marginLeft: 15, fontSize: 22}}>{rating < 200 ? "Beginner" : rating < 700 ? "Intermediate" : "Master"}</div>
                  
                  <div style={{ display: "flex", flexDirection: 'row', marginLeft: 13}}>
                    <StarIcon />
                    <div style={{fontFamily: 'poppins', marginLeft: 5, fontSize: 18,}}>{rating}</div>
                  </div>
                </div>
              </div>
              <div style={{marginTop: 70}}></div>
            </div>
          </div>
        </div>
    </section>
    </>
  );
}