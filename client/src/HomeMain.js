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

   
  const [searchinput, searchinputUpdate] = useState("");

  const filter2 = () => {
    let temp = [...items];

    if (searchinput != "") {
      temp = temp.filter((ele) => {
        return ele.name.toLowerCase().includes(searchinput.toLowerCase());
      });
    }

  // if (tagList != "" && tag != "") {
  //     temp = temp.filter((ele) => {
  //       return ele.Tags.includes(tag);
  //     });
  //   }

  //   if (tagList != "" && lang != "") {
    
  //     temp = temp.filter((ele) => {
  //       return ele.Tags.includes(lang);
  //     });
  //   }

  //   if (tagList != "" && timeframe != "") {
     
  //     temp = temp.filter((ele) => {
  //       console.log(ele.Date.getFullYear);
  //       return ele.Date.getFullYear === timeframe;
  //     });
  //   }


    console.log("---r---");
    console.log(temp);
    setitems(temp);

    // sessionStorage.setItem('searchinput', searchinput);
    // setFlag("true");
  };

  const [option,setOption] = useState()
  const [rating,setRating] = useState()
  const [type,setType] = useState()

function handleChange(event){
    setOption(event.target.value)
}
function handleChange2(event){
  setRating(event.target.value)
}
function handleChange3(event){
  setType(event.target.value)
}
const filterfun = () =>{
  let temp = [...items];

  if (option != "") {
       temp = temp.filter((ele) => {
        return ele.category.includes(option);
       });
      }

      if (rating != "") {
        temp = temp.filter((ele) => {
         return ele.rating.includes(rating);
        });
       }
console.log(type);
       if (type != "") {
        temp = temp.filter((ele) => {
          console.log("i'm insidee")
          return ele.homeAvailability.type;
        });
      }
      console.log("hey i'm outside'");
      
      console.log(temp);
      setitems(temp);
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
              	Providing a convenient and efficient platform for customers within the local region to browse and purchase bicycles.
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
                value={searchinput}
                onChange={(e) => searchinputUpdate(e.target.value)}
              />
              <button
                class="btn btn-dark btn-lg"
                type="button"
                onClick={filter2}
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
            onChange={handleChange}
            >
              <option value="cycle_3tyre">cycle_3tyre</option>
              <option value="cycle_small" selected>small-size cycle</option>
              <option value="cycle_medium">medium-size cycle</option>
              <option value="cycle_large" selected>large-size cycle</option>
            </select>
            <select
            onChange={handleChange2}
            >
              <option value="3" selected>Rating Above 3</option>
              <option value="4">Rating Above 4</option>
              <option value="5">Rating Above 5</option>
            </select>
            <select
            onChange={handleChange3}
            >
              <option value="" >Home Availability</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            <button
              class="btn btn-dark btn-lg  applyfilt"
              type="button"  
              onClick={filterfun}
              >
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
