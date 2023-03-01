import getCookie from "./cookieManagement";
const auth = async () => {
    const requrl = "http://localhost:5000/user/auth";
    let token=getCookie('jwtoken')
    
    if(token === "NOTEXIST"){
        window.location.href = "/login"
    }
    const reqOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({'token':token})
        
    }
    const result = await fetch(requrl, reqOptions);
    const response = await result.json();
    
    if (response.status === "no") {
        // navigate('/login')
        window.location.href = "/login"
        // return true;
    }
}

export default auth;