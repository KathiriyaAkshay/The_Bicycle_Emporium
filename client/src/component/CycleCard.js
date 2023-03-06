import React from 'react'
// import { useState } from 'react'
const CycleCard = (props) => {
    const rating = (num) => {
        let s = '';
        for (let i = 0; i < Math.floor(num); i++) {
            s = s + "⭐"
        }
        for (let i = num; i < 5; i++) {
            s = s + "✩"
        }
        return s
    }
    return (
        <>
            <img className="card-img-top SubCardDiv-img" src={props.imagename} alt="Card image photo" />
            <div className="card-body CardBody">
                <h5 className="card-title" style={{color:"black"}}>Name: {props.name}</h5>
                <p className="card-text" style={{color:"black"}}>Price: ₹{props.price}</p>
                <p style={{color:"black"}}>Ratings: {rating(props.rating)} ({props.rating} stars)</p>
                {
                    props.buttonStatus
                    ?<button className="btn btn-secondary">Show more</button>
                    :<button  className="btn btn-light">Show more</button>
                }
            </div>
        </>
    )
}

export default CycleCard