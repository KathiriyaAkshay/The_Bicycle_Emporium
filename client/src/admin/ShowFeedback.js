import React, { useState, useEffect } from 'react'
const ShowFeedback = () => {
    const [feedbacksArray, setFeedbacksArray] = useState([])
    const getFeedbacks = async () => {
        const requrl = "http://localhost:5000/user/getfeedbacks";
        const reqOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        }
        const result = await fetch(requrl, reqOptions);
        const response = await result.json();
        // console.log(response.feedbacksArray);
        setFeedbacksArray(response.feedbacksArray)
    }
    useEffect(() => {
        getFeedbacks()
    }, [])

    const Feedback = (props) => {
        return (
            <>
            
                <div className='wishlistItem' id='#home'>
                    <div className='wishlistItemInfo'>
                        <div className="wishlistItemName" style={{color:'black'}}>Email: {props.email}</div>
                        <div className="wishlistItemName" style={{color:'black'}}>Name: {props.name}</div>
                        <div className='wishlistItemDesc' style={{color:'black'}} >Feedbacks: <br /><br />
                            {props.feedbacks.map((val, index) => {
                                return (
                                    <div key={index}>
                                        <p className='feedbackMsg' style={{marginBottom:"0px", color:'black'}} > {val.feedback}</p>
                                        <div className='wishlistItemDesc' style={{marginTop:"0px",marginBottom:"1.5rem",color:'black'}} >Timestamp: {(new Date(val.date)).toString()}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='SubmitButtonCss'><input type='button' onClick={() => { window.location.href = `mailto:${props.email}?subject=subject: Reply for Feedback of RK cycle` }} value='Reply' /></div>
                    </div>
                </div>
                <hr className='hrwhite' /*style={{display:status}}*/ />
            </>
        )
    }


    return (
        <>
            {
                feedbacksArray.map((val, index) => {
                    return (<Feedback key={index} email={val.email} name={val.name} feedbacks={val.feedbacks} />)
                })
            }
        </>
    )
}

export default ShowFeedback