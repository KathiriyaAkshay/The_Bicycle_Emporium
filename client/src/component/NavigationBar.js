import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation } from "react-router-dom";


const NavigationBar = () => {
  const location = useLocation();
  const getCookie = (cookie_name) => {
    const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
    try {
      return document.cookie.match(re)[0];	// Will raise TypeError if cookie is not found
    } catch {
      return "NOTEXIST";
    }
  }
  let pathArray = location.pathname.split('/');
  const token = getCookie("jwtoken")
  if (token !== "NOTEXIST" && pathArray[1] !== 'admin') {
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ height: "100%", marginTop: "auto" }}>
            <ul className="navbar-nav" style={{ width: "100%" }}>
              <li className="navTitle active ">
                <NavLink to="/" className="nav-link navItem Homelink" style={({ isActive }) =>
                  isActive
                    // ? { color: 'black', backgroundColor: '#C8C6C6' }
                    ? { color: 'black', backgroundColor: 'white' }
                    : { color: 'white', background: '#2c3333' }
                }>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/wishlist" className="navItem nav-link" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Wishlist</NavLink>
              </li>

              {/* <li class="nav-item dropdown bg-light">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Your orders
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="nav-item">
                    <NavLink to="/showOrders" className="navItem nav-link" style={({ isActive }) =>
                      isActive
                        ? { color: 'black', backgroundColor: '#C8C6C6' }
                        : { color: 'white', background: '#2c3333' }
                    }>Show Orders</NavLink>
                  </li>
                  <li><NavLink to="/wishlist" className="navItem nav-link" style={({ isActive }) =>
                    isActive
                      ? { color: 'black', backgroundColor: '#C8C6C6' }
                      : { color: 'white', background: '#2c3333' }
                  }>Wishlist</NavLink></li>

                </ul>
              </li> */}

              <li className="nav-item">
                <NavLink to="/showOrders" className="navItem nav-link" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Show Orders</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/previousOrders" className="navItem nav-link" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Previous Orders</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link navItem" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>About community</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="navItem nav-link" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>Contact Us</NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink to="/logout" className="navItem nav-link" style={({ isActive }) =>
                  isActive
                    ? { color: 'black', backgroundColor: '#C8C6C6' }
                    : { color: 'white', background: '#2c3333' }
                }>
                Logout</NavLink> 
              </li>*/}
              <li className="nav-item navLinkRightSide">
                <NavLink to="/logout" className="navItem nav-link" style={{ color: "black" }}>
                  Logout</NavLink>
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

export default NavigationBar