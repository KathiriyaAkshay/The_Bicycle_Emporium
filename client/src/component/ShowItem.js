import React from 'react'
import { useEffect, useState } from 'react';
import getCookie from '../controllers/cookieManagement'
import displayRazorpay from '../controllers/buyItem';
import Header from './Header';

const ShowItem = () => {

    let token = getCookie('jwtoken')
    console.log(token)
    const url_string = window.location;
    const url = new URL(url_string);
    const id = url.searchParams.get('p');

    const [item, setItem] = useState({})
    const [wishlistStatus, setWishlistStatus] = useState(false)
    const [singleUser, setSingleUser] = useState({});

    const checkStatus = async () => {
        const reqUrl = 'http://localhost:5000/user/checkWishlist';
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id: item._id, token: token })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json();
        if (response.status === 'yes') {
            setWishlistStatus(true)
        }
        else {
            setWishlistStatus(false)
        }
    }
    checkStatus();
    const getData = async () => {
        const reqUrl = 'http://localhost:5000/items/getItems';
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id: id })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json()
        if (response.item == null) {
            alert('Oops!!! Something went wrong...')
            window.location.href = '/'
        }
        setItem(response.item)
    }


    const addtoWishlist = async (action) => {
        const reqUrl = 'http://localhost:5000/user/addtoWishlist';
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id: item._id, token: token, action: action })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json();
        if (response.status === "successAdd") {
            alert("Item added to wishlist!!!")
        }
        else if (response.status === "successRemove") {
            alert("Item removed from wishlist...")
        }
        else {
            alert("OOPS!!!something went wrong😢. Try again")
        }
        checkStatus()
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
    const getUser = async () => {
        const token = getCookie('jwtoken');
        const reqUrl = 'http://localhost:5000/user/getUser';
        const reqOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({ token, status: true })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json()
        if (response.user === "error") {
          alert("Oops!!! something went wrong. Refresh and try again...");
        }
        else {
          setSingleUser(response.user);
          console.log(response.user);
        }
      }

      useEffect(() => {
        getData()
        getUser()
    }, [])
    const submitFunc = async(id) => {
       
        
        const quantity = document.getElementById('quantity').value;
        if (quantity > 0) {
            const address = prompt("Enter the address:", singleUser.address);
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
            <Header/>
            <div className='MainItemDiv '>
                
                <div className='photoDiv'><img src={item.photo} alt="Item Photo" width='600rem' height="400rem" /></div>
                    
                <div className='itemInfoDiv'>
                    <div className="itemNameHeading" style={{color:'black'}}>{item.name}</div>
                    <div className='itemPriceHeading'style={{color:'black'}}>Price: ₹{item.price}</div>
                    <br />
                    <div className='ratingHeading'style={{color:'black'}}>Rating:  {rating(item.rating)} ({item.rating} stars)</div>
                    <div className='descriptionItem' style={{color:'black'}}>description: <br /><p>{item.description}</p></div>
                    <div className='buttonsDiv'>
                        <button type="button" className="btn btn-light" onClick={() => addtoWishlist(!wishlistStatus)}>{
                            wishlistStatus ? "Remove from wishlist" : "♡ Add to wishlist"

                        }</button>
                        {
                            item.quantity === 0 || !item.quantity
                                ? <p style={{ color: "red", marginTop: "2rem", fontSize: '1.15rem' }}>*Currently Unvailable</p>
                                :
                                <div>
                                    <br />
                                    <div className='quantityInputDiv'>

                                        <label className='Label quantityLabel' htmlFor="email" style={{color:'black'}}>Quantity:</label>
                                        <input className='Input_take quantityInput' type="number" name="quantity" id="quantity" required />
                                    </div>
                                    <button type="button" className="button2" style={{width:'175px'}} onClick={() => submitFunc(item._id)}> Buy it now</button>
                                    {/* <button type="button" className="btn btn-primary" onClick={() => displayRazorpay(item._id)}>Buy it now</button> */}
                                </div>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default ShowItem
// category
// :
// "cycle_small"
// description
// :
// "asdn"
// homeAvailability
// :
// true
// name
// :
// "cycle1"
// photo
// :
// "https://res.cloudinary.com/rk-cycle-photoes/image/upload/v1665430787/yu2g9exc2bxojkz1ikpl.jpg"
// price
// :
// 1234
// public_id
// :
// "yu2g9exc2bxojkz1ikpl"
// rating
// : 
