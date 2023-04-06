import React from "react";
import { useEffect } from "react";
import auth from './controllers/authentication'
import "./css/main.css"
const About = () => {
  useEffect(() => { auth() }, [])


  return (
    <>
    <section
    class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
    id="home"
  >
  
  

      <div className="AboutDiv">
      <h2 class="section-title mb-40">
      <span class="text-marked">About</span> <span style={{color:'black'}}>Community__</span>
      </h2>
        <div className="MainAboutDiv">
          <div className="aboutLogoDiv"><img src="logo_named_removedbg.png"  alt="logo" className="AboutLogo" /></div>
          {/* <div className="aboutLogoDiv"><img src="logo_named.jpg" alt="logo" className="AboutLogo"/></div> */}
          <div className="aboutInfoDiv" style={{color:'black'}}>
              <h4>Business Information:  </h4>
              <p className="biheading" style={{color:'black'}}>The Bicycle Emporium</p>
              we are the group of people ,selling the cycle virtually.
            <br />
            <h4 style={{color:'black'}}>Products and Services offered:</h4>
            <p style={{color:'black'}}>we are the team of developers developing  Bicycle selling website. And trying to improve our wesite...</p>
          </div>

        </div>
      </div>
      </section>
    </>
  )
}
export default About