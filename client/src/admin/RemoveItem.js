import React, { useEffect, useState } from 'react'

const RemoveItem = () => {
    const [cycles, setCycles] = useState([])
    const getNames = async () => {
        const requrl = "http://localhost:5000/items/searchNames";
        const reqOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        }
        const result = await fetch(requrl, reqOptions);
        const response = await result.json();
        setCycles(response.cycles)
    }
    useEffect(()=>{getNames()},[])

    const deleteImg = async (id) => {
        const requrl = "http://localhost:5000/items/deleteImg";
        const reqOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ "id": id })
        }
        const result = await fetch(requrl, reqOptions);
        const response = await result.json();
        console.log(response.message);
        return response.message
    }

    const deleteItem = async () => {
        const name = document.getElementById('searchName').value

        if (name == 'null') {
            alert("Select one cycle from the list...")
        }
        else {
            const requrl = "http://localhost:5000/items/deleteCycle";
            const reqOptions = {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ "name": name })
            }
            const result = await fetch(requrl, reqOptions);
            const response = await result.json();
            if(response.status==='success'){
                deleteImg(response.public_id)
                alert("Item removed successfully...")
            }
            else if(response.status==="NOTFound"){
                alert("Item is not exists...")
            }
            else{
                alert("Something went wrong!!! Try again...")
            }
        }
    }
    return (
        <>
            <div className='Form_title updateHeading'>Remove Cycle Permanently</div>
            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <select className="Input_take searchBar" id="searchName">
                    <option value='null'>--Search Cycle--</option>
                    {
                        cycles.map((val, index) => {
                            return (<option key={index} value={val.name}>{val.name}</option>)
                        })
                    }
                </select>
                <button className='btn btn-danger searchButton' onClick={deleteItem}>Delete</button>
            </div>

        </>
    )
}

export default RemoveItem