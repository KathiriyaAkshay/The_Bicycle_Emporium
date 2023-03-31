import React from 'react'

const OrderItem_admin = (props) => {
    

    {/* name photo address quantity amount and date */ }
    return (
        <div className='orderMain'>
            <div className="orderPhoto">
                <img src={props.photoUrl} width="300rem" height="175rem" alt="item_photo" />
            </div>
            <div className="orderUserDescription">
                <div className='orderDescriptionItem orderDescriptionItem-name' style={{color:'black'}} >Name: {props.userName}</div>
                <div className='orderDescriptionItem orderDescriptionItem-name' style={{color:'black'}} >Email: {props.userEmail}</div>
            </div>
            <div className="orderDescription">
                <div className='orderDescriptionItem orderDescriptionItem-name' style={{color:'black'}} >Item Name: {props.name}</div>
                <div className='orderDescriptionItem' style={{color:'black'}} >Quantity: {props.quantity}</div>
                <div className='orderDescriptionItem' style={{color:'black'}} >Paid Amount: ₹{props.total_amount}</div>
                <div className='orderDescriptionItem' style={{color:'black'}} >Address: {props.address}</div>
                <div className='orderDescriptionItem' style={{color:'black'}} >Order Date: {(new Date(props.orderDate)).toString()}</div>
                {
                    props.buttonDecide
                        ? <div className='orderDescriptionItem' style={{color:'black'}} >Delivery Date: {(new Date(props.deliveryDate)).toString()}</div>
                        : <button type="button" className="btn btn-light" onClick={() => props.deliverOrder(props.userEmail, props.id, props.orderDate)} style={{color:'black'}} > Mark as Delivered</button>

                }
            </div>
        </div>
    )

}

export default OrderItem_admin