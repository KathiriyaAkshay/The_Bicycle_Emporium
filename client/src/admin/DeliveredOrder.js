import React, { useState, useEffect } from 'react'
import OrderItem_admin from './OrderItem_admin'
const DeliveredOrder = () => {
    const [orders, setOrders] = useState([{}])

    const getOrders = async () => {
        const reqUrl = 'http://localhost:5000/order/getOrdersAdmin';
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ status: true })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json();
        if (response.status === "success") {
            setOrders(response.orders)
        }
        else {
            alert("Oops!!! something went wrong...")
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <>
        <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
        style={{height:'600px'}}
      >        
            <div style={{width:"100%",height:"100%"}}>
            <h2 class="section-title mb-40"><span class="text-marked">Delivered </span> <span style={{color:'black'}}>Orders</span></h2>
                <div className="orders">
                    {
                        orders.map((val, index) => {
                            return <OrderItem_admin userName={val.username} userEmail={val.email} key={index} photoUrl={val.photoUrl} id={val.item_id} name={val.item_name} address={val.address} quantity={val.quantity} total_amount={val.total_amount} orderDate={val.orderDate} deliveryDate={val.deliveryDate} buttonDecide={true} />
                        })
                    }
                </div>
                {/* <div className='footerButtons'>
                    <button className='previousOrders'>previous</button>
                    <button className='nextOrders'>next</button>
                </div> */}
            </div>
            </section>
        </>
    )
}

export default DeliveredOrder