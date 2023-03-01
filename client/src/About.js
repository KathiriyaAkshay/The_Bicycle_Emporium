import React from "react";
import { useEffect } from "react";
import auth from './controllers/authentication'

const About = () => {
  useEffect(() => { auth() }, [])


  return (
    <>
      <div className="AboutDiv">
        <div className="Form_title AboutTitle" >
          About Community
        </div>
        <div className="MainAboutDiv">
          <div className="aboutLogoDiv"><img src="logo_named_removedbg.png" alt="logo" className="AboutLogo" /></div>
          {/* <div className="aboutLogoDiv"><img src="logo_named.jpg" alt="logo" className="AboutLogo"/></div> */}
          <div className="aboutInfoDiv">
              <h4>Business Information:  </h4>
              <p className="biheading">E-commerce cycle selling website </p>
              we are the group of three persons,selling the cycle virtually.
            <br />
            <h4>Products and Services offered:</h4>
            <p>we are the team of developers developing E-commerce cycle selling website. And trying to improve our wesite...</p>
          </div>

        </div>
      </div>
    </>
  )
}
export default About