import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation } from "react-router-dom";


const AdminNavigationBar = () => {
  const location=useLocation();
  let pathArray=location.pathname.split('/');
  if (pathArray[1]=='admin') {
    return (
      <>
        <nav className="navbar sticky-top navbar-expand-lg NavBarMain">
          <div className='maindiv_logo'>
            <span><img src={require("./logo.jpg")} alt="logo" className='logo' /></span>
            <span className='LogoDiv'></span>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> 
  

          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{height:"100%",marginTop:"auto"}}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/admin/Home" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Add cycle</NavLink>
              </li>
              <li>
                <NavLink to="/admin/updatecycle" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Update cycle</NavLink>
              </li>
              <li>
                <NavLink to="/admin/removeitem" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Remove Cycle</NavLink>
              </li>
              <li>
                <NavLink to="/admin/liveOrders" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Live Orders</NavLink>
              </li>
              <li>
                <NavLink to="/admin/deliveredOrders" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Delivered Orders</NavLink>
              </li>
              <li>
                <NavLink to="/admin/feedbacks" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Feedbacks</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/logoutAdmin" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Logout</NavLink>
              </li>
              
            </ul>
          </div>
        </nav>
      </>
    )
  }
  else {
    return (
      <>
        <nav className="navbar sticky-top navbar-expand-lg" >
        <div className='maindiv_logo'>
            {/* <span><img src="logo.jpg" alt="logo" className='logo' /></span>
             */}
            <span><img src={require("./logo.jpg")} alt="logo" className='logo' /></span>

            <span className='LogoDiv'>E-COMMERCE CYCLE SELLING WEBSITE</span>
          </div>
        </nav>
      </>
    )
  }
}

export default AdminNavigationBar