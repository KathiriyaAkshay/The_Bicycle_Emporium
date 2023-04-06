import React, { useState,useEffect } from 'react'
import CycleCard from './component/CycleCard';

const Categories = () => {

    const [items, setItems] = useState([{}])
    
    useEffect(() => {
      getData()
    }, [])
    const getData = async(event) => {
        let category=''
        if(!event)
            category='cycle_3tyre'
        else{
            category=event.target.id
        }
        const reqUrl = "http://localhost:5000/items/getCategory";
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ category: category })
        }
        const result = await fetch(reqUrl, reqOptions);
        const response = await result.json();
        setItems(response.items)
    }
    const itemPage = (id) => {
        window.location.href = './showItem?p=' + id
    }
    return (
        <>
        <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
      >  
       
            <div className="categoriesButtonDiv">
                <a className='categoryLinks' style={{ gridColumnStart: 1 }}><button type="button" id="cycle_3tyre" className="btn"  onClick={getData}>With support wheel cycle</button></a>
                <a className='categoryLinks' style={{ gridColumnStart: 2 }}><button type="button" id="cycle_small" className="btn"  onClick={getData}>Small cycles</button></a>
                <a className='categoryLinks' style={{ gridColumnStart: 3 }}><button type="button" id="cycle_medium" className="btn" onClick={getData}>Medium cycles</button></a>
                <a className='categoryLinks' style={{ gridColumnStart: 4 }}><button type="button" id="cycle_large" className="btn"  onClick={getData}>Large cycles</button></a>
            </div>
            
            <div className='MainCardDiv'>
                {
                    items.map((item, index) => {
                        return <div key={index} className='SubCardDiv categorySubCards' onClick={() => itemPage(item._id)} style={{ gridRowStart: Math.floor(index / 3) + 1, gridColumnStart: (index % 3) + 1, height: "30rem" }}> <CycleCard name={item.name} price={item.price} rating={item.rating} imagename={item.photo} buttonStatus={false} /></div>
                    })
                }

            </div>
          
      
            </section>
        </>
    )
}

export default Categories