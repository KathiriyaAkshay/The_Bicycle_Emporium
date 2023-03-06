import React, { useEffect, useState } from "react";
import "./css/home.css";
import url from "./images/bicycle.png";


// importing all files
import Card from "./component/Card/card";
import Footer from "./component/footer/footer1";
import ServiceFaqM from "./component/Faq/ServiceFaqM";
import { Link } from "react-router-dom";
import Header from "./component/Header";
import auth from './controllers/authentication'
import CycleCard from './component/CycleCard';

function HomeMain() {

  const [items, setitems] = useState([{}])
  let status = 0;

  const fetchItems = async () => {
    const requrl = "http://localhost:5000/items/getHomeItems";
    const reqOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    }
    const result = await fetch(requrl, reqOptions);
    const response = await result.json();
    setitems(response.items);
    status = 1
    checkStatus()
  }

  useEffect(() => {
    auth();
    async function getFunction() {
      await fetchItems();
    }
    getFunction()
  }, [])
  const checkStatus = () => {
    console.log(status);
  }

  const itemPage = (id) => {
    window.location.href = './showItem?p=' + id
  }

  
  return (
    <>
      {/* header  */}
   
      <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
      >
        <div class="container headertop">
          <div class="d-sm-flex align-items-center justify-content-between head">
            <div className="left">
              <h1>
                <span class="text-warning">Welcome to The Bicycle Emporium !!</span>
              </h1>
              <p class="lead my-4 ">
              We are one of the biggest bicycle-families in the world. Our services include all types of repair, search of a perfect bike for every customer, sport events organization and much more. Join our community and become a part of the bike-family.
              </p>
              <p class="lead my-4 ">
                Find your best Bicycle and take advantage of it.
              </p>
              <Link to="/ViewAllBicycles">
                <button
                  class=" button2"
                  data-bs-toggle="modal"
                  data-bs-target="#Enroll"
                >
                  All Bicyclee
                </button>
              </Link>
            </div>

            <a href="https://svgshare.com/s/gH0" className="right">
              <img class="img-fluid  d-none d-sm-block" src={url} title="" />
            </a>
          </div>
        </div>
      </section>
      {/* Bicycle details filters */}
      <section class="bg-primary text-light p-5">
        <div class="container">
          <div class="d-md-flex justify-content-around align-items-center">
            <h3 class="mb-3 mb-md-0 cc">Search Bicycle</h3>

            <div class="input-group news-input">
              <input
                type="text"
                class="form-control"
                placeholder="Bicycle Name"
                
              />
              <button
                class="btn btn-dark btn-lg"
                type="button"
                
              >
                Search
              </button>
            </div>
          </div>
          <div className="filter">
            <div>
              <h3>Filter : </h3>
            </div>
            <select
              
            >
              <option>Without Gear</option>
              <option selected>Geared</option>
            </select>
            <select
              
            >
              <option>For-Child</option>
              <option selected>For-Men</option>
              <option selected>For-Women</option>
            </select>
            <select
             
            >
              <option selected>All</option>
              <option>2y old</option>
              <option>8y old</option>
              <option>18y old</option>
            </select>
            <button
              class="btn btn-dark btn-lg  applyfilt"
              type="button"  >
              Apply
            </button>
          </div>
        </div>
      </section>

      <section class="" id="services">
        <h1 class="section-title text-center">All Bicycles</h1>
        <div class="container">
        {
          items.map((item, index) => {
            // if((index+1)%3===0)
            //   return (<span className='SubCardDiv'><CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} /><br /></span>)
            // return <span className='SubCardDiv'><CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} /></span>
            return <div key={index} className='SubCardDiv' onClick={() => itemPage(item._id)} style={{ gridRowStart: Math.floor(index / 3) + 1, gridColumnStart: (index % 3) + 1, height: "30rem" }}> <CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} buttonStatus={true} /></div>
          })
        }
        
           
        </div>
        <div class="container ">
          <div className=" col-md-12 ml-0 ml-lg-3 my-2 my-lg-0 text-center">
            <Link style={{ textDecoration: "none" }} to="/ViewAllBicycles">
              <a className=" button2 " href="#">
                view more
              </a>
            </Link>
          </div>
        </div>
      </section>
      {/* Bicycle card end  */}

      {/* Faq starts  */}
      
      {/* faq ends  */}
      <Footer />
    </>
  );
}

export default HomeMain;
