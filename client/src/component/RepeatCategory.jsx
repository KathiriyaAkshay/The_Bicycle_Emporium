import React from 'react'
import './categories.css'

const RepeatCategory = (props) => {
  return (
    <>
    
      <div className="products container ">
            <div className="product ">
                <div className="top d-flex">
                    <img src={props.imgsrc} alt="img" />
                    <div className="icon d-flex">
                        <i className='bx bxs-heart'></i>
                    </div>
                </div>

                <div className="bottom">
                    <div className="d-flex">
                        <h4>{props.title}</h4>
                        <a href="" className="btn cart-btn">Add To Cart</a>
                    </div>

                    <div className="d-flex aa">
                        <div className="price">${props.price}</div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RepeatCategory
