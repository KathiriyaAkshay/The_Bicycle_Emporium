import React, { useEffect, useState } from 'react'
import getCookie from './controllers/cookieManagement'
import ItemPage from './ItemPage'
import Header from "./component/Header";
const Wishlist = () => {
    const [items, setItems] = useState([])

    const fetchItems = async () => {
        const token = getCookie('jwtoken')
        let requrl = "http://localhost:5000/user/getWishlist";
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ token: token })
        }
        let result = await fetch(requrl, reqOptions);
        let response = await result.json();
        const itemIds = response.itemIds;

        await itemIds.map(async (val) => {
            requrl = "http://localhost:5000/items/getItems";
            reqOptions = {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ id: val.item })
            }
            result = await fetch(requrl, reqOptions);
            response = await result.json();
            if (response.item !== null) {
                setItems(prevVal => {
                    return [...prevVal, response.item]
                })
            }
        })


        // await setItems(response.items);
    }
    // console.log(items);

    useEffect(() => {
        fetchItems()
    }, [])
    return (
        <>
        <Header />
        <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
      >
            <div className="mainWishlistDiv">
                <h2 className='headingWishList' style={{color:'black'}}>Wishlist Items</h2>
                {
                    items.length !== 0
                        ? items.map((val, index) => {
                            return (
                                <ItemPage key={index} id={val._id} photo={val.photo} name={val.name} price={val.price} description={val.description} rating={val.rating} quantity={val.quantity} />
                            )
                        })
                        : <div className='noItemMsg'>NO items Added...</div>
                }
            </div>
            </section>
        </>
    )
}

export default Wishlist