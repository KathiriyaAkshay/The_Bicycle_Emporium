import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import "../css/main.css";
import "./plugins.min.css";


function Header() {
  const location = useLocation();
  const [scho, setscho] = useState({ display: "none" });
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
      <header className="grip-header sticky">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link style={{ textDecoration: "none" }} to="/">
                  <a className="navbar-brand" href="#index.php">
                    {/* <img
            className="logo"
            src="https://www.sih.gov.in/img1/SIH2022-white-logo.png"/> */}
            <span><img src={require("./logo.jpg")} alt="logo" className='logo' /></span>
                    <span style={{fontSize:'medium'}}>The Bicycle Emporium</span>
                  </a>
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navTrigger"
                  aria-controls="navTrigger"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="show fe fe-menu"></span>
                  <span className="hidden fe fe-x"></span>
                </button>

                <div
                  className="collapse navbar-collapse spec"
                  id="navTrigger"
              
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                      <NavLink className="nav-link" to="/">
                        Home
                      </NavLink>
                    </li>

                    <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/categories"
                        id="navbarDropdown"
                      >
                        Categories
                      </NavLink>

                      </li>

                      <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/error"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        Orders
                      </NavLink>

                      <div
                        className="dropdown-menu  "
                        aria-labelledby="navbarDropdown"
                      >
                    
                        <NavLink
                          to="/wishlist"
                          className=" dropdown-item"
                        >
                        Wishlist
                        </NavLink>

                        <NavLink
                          to="/showOrders"
                          className=" dropdown-item"
                        >
                        Show Orders
                        </NavLink>

                        <NavLink
                          to="/previousOrders"
                          className=" dropdown-item"
                        >
                        Prev Orders
                        </NavLink>
                      </div>
                    </li>


                     
                      <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/about"
                        id="navbarDropdown"
                      >
                       About Community
                      </NavLink>

                      </li>

                      <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/contact"
                        id="navbarDropdown"
                      >
                        Contact
                      </NavLink>

                      </li>




                      <li className="nav-item">
                      <NavLink className="nav-link" to="/logout">
                        LogOut
                      </NavLink>
                    </li>
                   
                  
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  )
                      }
}

export default Header;
