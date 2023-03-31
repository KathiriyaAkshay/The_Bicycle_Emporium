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
            <div style={{width:"100%",height:"100%"}}>
                <h2 className='headingOrders' style={{color:'black'}} >Delivered Orders</h2>
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
        </>
    )
}

export default DeliveredOrder