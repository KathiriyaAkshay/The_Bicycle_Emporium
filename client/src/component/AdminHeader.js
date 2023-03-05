import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
import "./plugins.min.css";
import { NavLink, useLocation } from "react-router-dom";


function AdminHeader() {
    const location=useLocation();
    let pathArray=location.pathname.split('/');
    if (pathArray[1]=='admin') {
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
                    <span>Bicyclee</span>
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
                        to="/admin/Home"
                        id="navbarDropdown"
                        role="button"
                      >
                        Add Cycle
                      </NavLink>
                    </li>

                    <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/admin/updatecycle"
                        id="navbarDropdown"
                        role="button"
                      >
                        Update Cycle
                      </NavLink>
                    </li>

                    <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/admin/removeitem"
                        id="navbarDropdown"
                        role="button"
                      >
                        Remove Cycle
                      </NavLink>
                    </li>

                    

                    <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/admin/liveOrders"
                        id="navbarDropdown"
                        role="button"
                      >
                        Live Orders
                      </NavLink>
                    </li>

                    <li
                      className="nav-item dropdown"
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/admin/deliveredOrders"
                        id="navbarDropdown"
                        role="button"
                      >
                        Delivered Orders
                      </NavLink>
                    </li>

                  
                    

                    <li className="nav-item ">
                      <NavLink className="nav-link " to="/admin/feedbacks">
                       Feedback
                      </NavLink>
                    </li>

                      <li className="nav-item">
                        <NavLink className="nav-link" to="/logoutAdmin">
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

export default AdminHeader;
