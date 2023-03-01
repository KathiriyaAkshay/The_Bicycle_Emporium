import React from 'react'
import getCookie from '../controllers/cookieManagement'

const SingleOrder = (props) => {

    const cancelOrder = async (id, orderDate,quantity) => {
        let confirmation = window.confirm("Are you sure, you want to cancel this order...")
        if (confirmation) {
            const token = getCookie('jwtoken');
            const reqUrl = 'http://localhost:5000/order/cancelOrder';
            const reqOptions = {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ token, id, orderDate, quantity })
            }
            const result = await fetch(reqUrl, reqOptions);
            const response = await result.json()
            if (response.status === 'success') {
                alert("Order cancelled successfully...")
                window.location.reload();
            }
            else {
                alert("Oops!!! something went wrong...")
            }
        }
    }

    {/* name photo address quantity amount and date */ }
    return (
        <div className='orderMain'>
            <div className="orderPhoto">
                <img src={props.photoUrl} width="300rem" height="175rem" alt="item_photo" />
            </div>
            <div className="orderDescription">
                <div className='orderDescriptionItem orderDescriptionItem-name'>Name: {props.name}</div>
                <div className='orderDescriptionItem'>Quantity: {props.quantity}</div>
                <div className='orderDescriptionItem'>Paid Amount: ₹{props.total_amount}</div>
                <div className='orderDescriptionItem'>Address: {props.address}</div>
                <div className='orderDescriptionItem'>Order Date: {(new Date(props.orderDate)).toString()}</div>
                {
                    props.buttonDecide
                        ? <div><div className='orderDescriptionItem'>Delivery Date: {(new Date(props.deliveryDate)).toString()}</div><button type="button" className="btn btn-light" onClick={() => { window.location.href = `/showItem?p=${props.id}` }}>Show Item</button></div>
                        : <button type="button" className="btn btn-light" onClick={() => cancelOrder(props.id, props.orderDate, props.quantity)}>Cancel Order</button>

                }
            </div>
        </div>
    )
}

export default SingleOrder