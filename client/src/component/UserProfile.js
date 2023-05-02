
import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import getCookie from '../controllers/cookieManagement';

const UserProfile= () => {
  const [singleUser, setSingleUser] = useState({});
  // const [rating, setRating] = useState();
  // const [orders, setOrders] = useState([{}])
  const [addr, setAddr] = useState('')
const [namee1,setnamee1] = useState('')
  const getUser = async () => {
    const token = getCookie('jwtoken');
    const reqUrl = 'http://localhost:5000/user/getUser';
    const reqOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token, status: true })
    }
    const result = await fetch(reqUrl, reqOptions);
    const response = await result.json()
    if (response.user === "error") {
      alert("Oops!!! something went wrong. Refresh and try again...");
    }
    else {
      setSingleUser(response.user);
      console.log(response.user);
    }
    setAddr(response.user.address)
    setnamee1(response.user.name)
  }
  // getUser()
  useEffect(() => {
    getUser()
  }, [])



  const submitFunctions = async()=>{
    const name = document.getElementById("username").value
    
    const email = document.getElementById("email").value
    console.log(email)
    const gender = document.getElementById("gender").value
    const dob = document.getElementById("dob").value
    const address = document.getElementById("address").value
    console.log(address)
    if (name === '' || email === '') {
      alert("Enter details properly!!!")
      document.getElementById("name").focus();
    }else {
      const reqUrl = "http://localhost:5000/user/updateUser";
      const reqOptions = {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": name, "email": email, "gender": gender, "dob":dob, "address":address })
      }
      const result = await fetch(reqUrl, reqOptions);
      const response = await result.json();
      console.log(name)
      if (response.status === 'success') {
        alert("User Updated in Successfully!!!")
        window.location.href='/'
      }
      else if (response.status === 'failed') {
        alert("Update failed!!!")
      }
    }
    console.log("IT is work")
    getUser()
  }

  return (
    <>
      <section class="bg-dark " id="home">
        <div>
          <h2 class="section-title mb-40">
            <span class="text-marked">My </span>{" "}
            <span style={{ color: "black" }}>Profile</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexBasis: "50%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "poppins",
                    marginTop: 10,
                    flexGrow: 1,
                  }}
                >
                  <div 
                    style={{
                      color: "#808080",
                      fontFamily: "poppins",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    User Name
                  </div>
                  <div>
                    <input id="username" type="text"
                      title={"First Name"}
                      placeholder={singleUser.name}
                      value={namee1}   name="name" onChange={e => setnamee1(e.target.value)}
                      className="form-control form-inputt"
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
                    flexGrow: 1,
                  }}
                >
                  <div 
                    style={{
                      color: "#808080",
                      fontFamily: "poppins",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    Email Id
                  </div>
                  <div>
                    <input id="email"
                      title={"About Me"}
                      placeholder={"I AM student"}
                      value={singleUser.email}
                      className="form-control form-inputt"
                      name="AboutMe"
                    readOnly/>
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
                    flexGrow: 1,
                  }}
                >
                  <div 
                    style={{
                      color: "#808080",
                      fontFamily: "poppins",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    Gender
                  </div>
                  <div>
                    <input type="text" id="gender"
                      title={"Gender"}
                      placeholder={"Ex: Male"}
                      value={singleUser.gender}
                      className="form-control form-inputt"
                      name="Gender"
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "poppins",
                    marginTop: 10,
                    flexGrow: 1,
                  }}
                >
                  <div 
                    style={{
                      color: "#808080",
                      fontFamily: "poppins",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    DOB
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    <input id="dob"
                      title={"DOB"}
                      placeholder={"Ex: 31/10/2000"}
                      value={singleUser.dob}
                      className="form-control form-inputt"
                      name="DoB"
                    readOnly/>
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
                    flexGrow: 1,
                  }}
                >
                  <div 
                    style={{
                      color: "#808080",
                      fontFamily: "poppins",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    Address
                  </div>
                  <div>
                    <input id="address" type="text"
                      title={"About Me"}
                      value={addr}   name="address" onChange={e => setAddr(e.target.value)}

                      className="form-control form-inputt"
                    />
                  </div>
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
                  onClick={submitFunctions}
                >
                  Update
                </button>
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
                className="profile w-5 h-5"
                style={{ marginTop: 20, marginBottom: "auto" }}
              >
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  className="w-110 h-110 rounded-circle"
                  height="300px"
                />
              </div>
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
                  <EditOutlinedIcon
                    style={{
                      marginLeft: 10,
                      fontSize: 28,
                      color: "#2C5EFF",
                      paddingTop: 7,
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "poppins",
                    fontWeight: "bold",
                    marginTop: "auto",
                    marginBottom: "auto",
                    color: "#2C5EFF",
                    marginLeft: "10px",
                  }}
                >
                  Edit Picture
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfile ;