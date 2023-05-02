import React, { useEffect, useState } from 'react'
import getCookie from '../controllers/cookieManagement';
import SingleOrder from './SingleOrder';

import Header from "./component/Header";
const ShowOrders = () => {

  const [orders, setOrders] = useState([{}])

  const getOrders = async () => {
    const token = getCookie('jwtoken');
    const reqUrl = 'http://localhost:5000/order/getOrdersByEmail';
    const reqOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token, status: true })
    }
    const result = await fetch(reqUrl, reqOptions);
    const response = await result.json()
    if (response.orders === "error") {
      alert("Oops!!! something went wrong. Refresh and try again...");
    }
    else {
      setOrders(response.orders);
      console.log(response.orders);
    }
  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
    <Header />
    <section
    class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
    id="home"
  >
  <h2 class="section-title mb-40"><span class="text-marked">Previous </span> <span style={{color:'black'}}>Orders</span></h2>
      <div className="orders">
        {/* name photo address quantity amount and date */}
        {
          orders.map((val, index) => {
            return (
              <SingleOrder key={index} photoUrl={val.photoUrl} id={val.item_id} name={val.item_name} address={val.address} quantity={val.quantity} total_amount={val.total_amount} orderDate={val.orderDate} deliveryDate={val.deliveryDate} buttonDecide={val.deliveryStatus} />
            )
          })
        }
      </div>
    </section>
    </>
  )
}

export default ShowOrders                 
