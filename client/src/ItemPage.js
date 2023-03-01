import React, { useState } from 'react'
import getCookie from './controllers/cookieManagement'
import displayRazorpay from './controllers/buyItem'
import DeleteIcon from '@mui/icons-material/Delete';

const ItemPage = (props) => {

    // const  [status, setStatus] = useState("flex")
    const itemPage = () => {
        window.location.href = './showItem?p=' + props.id
    }
    const rating = (num) => {
        let s = '';
        for (let i = 0; i < Math.floor(num); i++) {
            s = s + "⭐"
        }
        for (let i = num; i < 5; i++) {
            s = s + "⛤"
        }
        return s
    }
    const deleteFromWishlist = async () => {
        const token = getCookie("jwtoken")
        const reqUrl = 'http://localhost:5000/user/addtoWishlist';
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id: props.id, token: token, action: false })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json();
        if (response.status === "successRemove") {
            alert("Item removed from wishlist...")
            // setStatus("none")
            window.location.href = '/wishlist'
        }
        else {
            alert("OOPS!!!something went wrong😢. Try again")
        }
    }


    // function loadScript(src) {
    //     return new Promise((resolve) => {
    //         const script = document.createElement("script");
    //         script.src = src;
    //         script.onload = () => {
    //             resolve(true);
    //         };
    //         script.onerror = () => {
    //             resolve(false);
    //         };
    //         document.body.appendChild(script);
    //     });
    // }

    // async function displayRazorpay(id) {
    //     const res = await loadScript(
    //         "https://checkout.razorpay.com/v1/checkout.js"
    //     );

    //     if (!res) {
    //         alert("Razorpay SDK failed to load. Are you online?");
    //         return;
    //     }

    //     let token = getCookie("rkToken")
    //     let reqUrl = 'http://localhost:5000/order/getDetails';
    //     let reqOptions = {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //         body: JSON.stringify({ id: id, token: token })
    //     }
    //     let result = await fetch(reqUrl, reqOptions);
    //     let response = await result.json();

    //     if (!response) {
    //         alert("Server error. Are you online?");
    //         return;
    //     }

    //     const options = {
    //         key: "rzp_test_rkVGR1MWhLUKz0", // Enter the Key ID generated from the Dashboard
    //         amount: response.amount * 100,
    //         currency: 'INR',
    //         name: "Ecommerce Cycle selling",
    //         description: "Test Transaction",
    //         handler: async function (response) {
    //             // const data = {
    //             //     razorpayPaymentId: response.razorpay_payment_id,
    //             //     razorpayOrderId: response.razorpay_order_id,
    //             //     razorpaySignature: response.razorpay_signature,
    //             // };

    //             reqUrl = 'http://localhost:5000/order/placeOrder';
    //             reqOptions = {
    //                 method: "POST",
    //                 headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //                 body: JSON.stringify({ id: id, token: token, quantity:5, address:"address", paymentID:response.razorpay_payment_id })
    //             }
    //             result = await fetch(reqUrl, reqOptions);
    //             response = await result.json();
    //             if (response.status === 'success') {
    //                 alert("Order Placed...");
    //             }
    //             else {
    //                 alert("Oops!!!Something went wrong...");
    //             }
    //             // const result = await axios.post("http://localhost:5000/payment/success", data);

    //             // alert(result.data.msg);
    //             alert("Payment successful...")
    //         },
    //         prefill: {
    //             name: response.username,
    //             email: response.email,
    //             contact: response.contact,
    //         },
    //         theme: {
    //             color: "#61dafb",
    //         },
    //         "modal": {
    //             "ondismiss": function () {
    //                 alert("Payment failed...")
    //             }
    //         }
    //     };

    //     const paymentObject = new window.Razorpay(options);
    //     paymentObject.open();
    // }

    const submitFunc = (id) => {
        const quantity = document.getElementById('quantity').value;
        if (quantity > 0) {
            const address = prompt("Enter the address:")
            if (!address) {
                alert("Enter valid address...")
            }
            else {
                displayRazorpay(id, quantity, address)
            }
        }
        else {
            alert("Enter valid quantity...")
        }
    }


    return (
        <>
            <div className='wishlistItem' /*style={{display:status}}*/>
                <div><img src={props.photo} width="300rem" height="175rem" alt="itemphoto" /></div>
                <div className='wishlistItemInfo'>
                    <div className="wishlistItemName">{props.name}</div>
                    <div className='wishlistItemPrice'>Price: ₹{props.price}</div>
                    <div className='wishlistItemRating'>Rating:  {rating(props.rating)} ({props.rating} stars)</div>
                    <div className='wishlistItemDesc'>description: {props.description}</div>
                </div>
                <div className='buttonsDiv' style={{ marginTop: "1rem", marginLeft: "4rem" }}>
                    <button type="button" className="btn btn-light" onClick={itemPage} >Show Item</button>

                    <button type="button" className="btn btn-light btnDelete" onClick={deleteFromWishlist} ><DeleteIcon /></button>
                    {
                        props.quantity === 0 || !props.quantity
                            ? <p style={{ color: "red", marginTop: "2rem", fontSize: '1.15rem' }}>*Currently Unvailable</p>
                            :
                            <div>
                                <br />
                                <div className='quantityInputDiv'>

                                    <label className='Label quantityLabel' style={{marginRight:"0.5rem",fontSize:"1.1rem"}} htmlFor="email">Quantity:</label>
                                    <input className='Input_take quantityInput' type="number" style={{width:'6.5rem'}} name="quantity" id="quantity" required />
                                </div>
                                <br />
                                <button type="button" className="btn btn-primary" onClick={() => submitFunc(props.id)}>Buy it now</button>
                            </div>
                        // : <button type="button" className="btn btn-primary" style={{ marginLeft: "2rem" }} onClick={() => displayRazorpay(props.id)}>Buy it now</button>
                        // : <button type="button" className="btn btn-primary" style={{ marginLeft:"2rem"}} onClick={()=>buyItem(props.id)}>Buy it now</button>
                        // : <button type="button" className="btn btn-primary" style={{ marginLeft:"2rem"}} onClick={()=>window.location.href='payment'}>Buy it now</button>
                    }
                </div>
            </div>
            <hr className='hrwhite' /*style={{display:status}}*/ />
        </>
    )
}

export default ItemPage