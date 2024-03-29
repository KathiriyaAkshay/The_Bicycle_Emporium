import React, { useEffect, useState } from "react";
import "./css/home.css";
import url from "./images/bicycle.png";
import getCookie from "./controllers/cookieManagement";
// importing all files
import Card from "./component/Card/card";
import Footer from "./component/footer/footer1";
import { Link } from "react-router-dom";
import Header from "./component/Header";
import auth from "./controllers/authentication";
import CycleCard from "./component/CycleCard";

function HomeMain() {
  
  const [items, setitems] = useState([{}]);
  let status = 0;

  const fetchItems = async () => {
    const requrl = "http://localhost:5000/items/getHomeItems";
    const reqOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    };
    const result = await fetch(requrl, reqOptions);
    const response = await result.json();
    setitems(response.items);
    status = 1;
    checkStatus();
  };
 
  const [searchinput, searchinputUpdate] = useState("");

  const filter2 = () => {
    let temp = [...items];

    if (searchinput != "") {
      temp = temp.filter((ele) => {
        return ele.name.toLowerCase().includes(searchinput.toLowerCase());
      });
    }

    console.log("---r---");
    console.log(temp);
    setitems(temp);

    // sessionStorage.setItem('searchinput', searchinput);
    // setFlag("true");
  };
  const [option, setOption] = useState();
  const [rating, setRating] = useState();
  const [typee, setTypee] = useState();

  function handleChange(event) {
    setOption(event.target.value);
  }
  function handleChange2(event) {
    setRating(event.target.value);
  }
  function handleChange3(event) {
    setTypee(event.target.value);
  }
  const filterfun = () => {
    let temp = [...items];
console.log(temp)
console.log(option)
console.log(rating)
console.log(typee)
if(option==='male' && rating==='7' && typee==='gear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_3tyre';
  })
  console.log(temp);
}else if(option==='male' && rating==='13' && typee==='gear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_large';
  })
  console.log(temp);
}else if(option==='male' && rating==='19' && typee==='gear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_medium';
  })
  console.log(temp);
}else if(option==='female' && rating==='7' && typee==='gear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_small';
  })
  console.log(temp);
}else if(option==='female' && rating==='13' && typee==='gear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_small';
  })
  console.log(temp);
}else if(option==='female' && rating==='19' && typee==='gear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_medium';
  })
  console.log(temp);
}else if(option==='male' && rating==='7' && typee==='nongear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_3tyre';
  })
  console.log(temp);
}else if(option==='male' && rating==='13' && typee==='nongear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_large';
  })
  console.log(temp);
}else if(option==='male' && rating==='19' && typee==='nongear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_3tyre';
  })
  console.log(temp);
}else if(option==='female' && rating==='7' && typee==='nongear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_small';
  })
  console.log(temp);
}else if(option==='female' && rating==='13' && typee==='nongear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_medium';
  })
  console.log(temp);
}else if(option==='female' && rating==='19' && typee==='nongear'){
  temp = temp.filter((ele)=>{
    console.log(ele);
    return ele.category === 'cycle_large';
  })
  console.log(temp);
} 
setitems(temp);
  };

  useEffect(() => {
    // auth();
    async function getFunction() {
      await fetchItems();
    }
    getFunction();
  }, []);
  const checkStatus = () => {
    console.log(status);
  };

  const itemPage = (id) => {
    let token = getCookie('jwtoken')
    if(token!=='NOTEXIST'){
    window.location.href = "./showItem?p=" + id;
    }else{
      window.location.href = "/login";
    }
  };
  return (
    <>
      {/* header  */}
      <Header />
      <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
      >
        <div class="container headertop">
          <div class="d-sm-flex align-items-center justify-content-between head">
            <div className="left">
              <h1>
                <span class="text-warning">
                  Welcome to The Bicycle Emporium !!
                </span>
              </h1>
              <p class="lead my-4 ">
                Providing a convenient and efficient platform for customers
                within the local region to browse and purchase bicycles.
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

            <a href="#" className="right">
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
            <select onChange={handleChange}>
              <option value="na">Gender</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </select>
            <select onChange={handleChange2}>
              <option value="3" selected>
                Select Age
              </option>
              <option value="7">6-12 years</option>
              <option value="13">12-18 years</option>
              <option value="19">18+ years</option>
            </select>
            <select onChange={handleChange3}>
            <option value="nothing" selected>
                Select Gear
              </option>
              <option value="gear">Gear</option>
              <option value="nongear">Non-Gear</option>
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
        <div className="row">
          {items.map((item, index) => {
            // if((index+1)%3===0)
            //   return (<span className='SubCardDiv'><CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} /><br /></span>)
            // return <span className='SubCardDiv'><CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} /></span>
            return (
              <div
                key={index}
                className="SubCardDiv"
                onClick={() => itemPage(item._id)}
                style={{
                  gridRowStart: Math.floor(index / 3) + 1,
                  gridColumnStart: (index % 3) + 1,
                  height: "30rem",
                }}
              >
                {" "}
                <CycleCard
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  imagename={item.photo}
                  buttonStatus={true}
                />
              </div>
            );
          })}
        </div>
        </div>

      </section>

      <Footer />
    </>
  );
}

export default HomeMain;