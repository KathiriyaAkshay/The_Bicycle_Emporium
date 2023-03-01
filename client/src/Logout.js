import React from 'react'
import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
const Logout =() => {

  const getCookie = (cookie_name) =>{
    const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
    try{
      return document.cookie.match(re)[0];	// Will raise TypeError if cookie is not found
    }catch{
      return "NOTEXIST";
    }
  }
  

  // const navigate=useNavigate()
  const LogoutFunction=async()=>{
    const reqUrl = "http://localhost:5000/user/logout";
    const token=getCookie('jwtoken');
    if(token==='NOTEXIST'){
        window.location.href='/login'
    }
    const reqOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({ "jwtoken":token})
    }
    document.cookie = "jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const result = await fetch(reqUrl, reqOptions)
    const response = await result.json()
    console.log(response.status === "success");
    if (response.status === "success") {
        sessionStorage.removeItem('token')
        window.location.href='/login'    
        // navigate('/login')
        // window.location.reload(false);

    }
  }

  useEffect(()=>{LogoutFunction()}, [])

  return(
      <div className='showMsg'>LogOut...</div>
  );
}

export default Logout