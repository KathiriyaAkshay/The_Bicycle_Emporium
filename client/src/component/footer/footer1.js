import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  const [ql, setql] = useState({ "max-height": "0px" });
  const [ns, setns] = useState({ "max-height": "0px" });
  const [is, setis] = useState({ "max-height": "0px" });
  const [rs, setrs] = useState({ "max-height": "0px" });
  const [ex, setex] = useState({ "max-height": "0px" });
  const [width, setwid] = useState(window.innerWidth);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout((element) => {}, 0);
    // alert(props.index);
  }, []);

  return (
    <>
      <footer className="footer nav-folderized">
        <div className="container ">
        <div className=" c a address-f footer-address-main">
        <div className=" b footer-adress">
          <i class="fa fa-map-marker"></i>

          {/* <h5>India</h5> */}
          <p>
            BVM Engineering College, V.V.Nagar <br />
            Anand, Gujarat 380010
          </p>
        </div>
        <div className="b footer-awards">
          <h5>Contact Us</h5>
          <div class="footer-center">
            <div>
              <i class="fa fa-phone"></i>
              <p style={{ margin: "auto" }}>+91 6351273626</p>
            </div>
            <div>
              <i class="fa fa-envelope"></i>
              <p>
                <a href="mailto:support@company.com">the.bicycle.emporium@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="b footer-social home-social">
          <h5>Follow us on</h5>

          <ul class="footer-icons">
            <li>
              <a href="#">
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
        <div className="col-md-12 col-sm-12">
          <hr />
        </div>
        
          <div className="col-md-12 col-sm-12 col-xs-12 copy-right text-center">
          <p>
            <span>
              © 2022
              <a href="#" target="_new">
                The Bicycle Emporium
              </a>
              All rights reserved.
            </span>
          </p>
        </div>

    </footer>

    <script src="../js/start.js"></script>
    <script src="../js/mmenu-light.js"></script>
   </>
  );
}

export default Footer;
