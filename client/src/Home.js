import React from 'react'
import { useEffect, useState } from "react";
import auth from './controllers/authentication'
import CycleCard from './component/CycleCard';
const Home = () => {
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
      <div className='MainHomeDiv'>
        <div className='MainHeadingHome'>E-COMMERCE CYCLE SELLING WEBSITE</div>
        <div className='HomeImgDiv'>
          <img src="cycle_photo.jpg"  alt="Photo" draggable="false" onDragStart={()=>{return false}} />
          <p>E commerce website for cycle selling.</p>
        </div>
        <div className='MainCardDiv'>

          {
            items.map((item, index) => {
              // if((index+1)%3===0)
              //   return (<span className='SubCardDiv'><CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} /><br /></span>)
              // return <span className='SubCardDiv'><CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} /></span>
              return <div key={index} className='SubCardDiv' onClick={() => itemPage(item._id)} style={{ gridRowStart: Math.floor(index / 3) + 1, gridColumnStart: (index % 3) + 1, height: "30rem" }}> <CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} buttonStatus={true} /></div>
            })
          }

        </div>
      </div>
    </>
  )

}

export default Home