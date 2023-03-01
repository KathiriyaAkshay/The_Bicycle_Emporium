import React, { useEffect, useState } from 'react'
import Axios from 'axios'
const UpdateCycle = () => {

    const [status, setstatus] = useState('none')
    const [msgstatus, setMsgstatus] = useState('none')
    const [photo, setPhoto] = useState(null)
    const [item, setItem] = useState()
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

    const deleteImg = async () => {
        const requrl = "http://localhost:5000/items/deleteImg";
        const reqOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ "id": item.public_id })
        }
        const result = await fetch(requrl, reqOptions);
        const response = await result.json();
        console.log(response);
        return response.message
    }

    const SubmitFunction = async () => {
        const name = document.getElementById('name').value
        const price = document.getElementById('price').value
        const category = document.getElementById('category').value
        const quantity = document.getElementById('quantity').value
        const description = document.getElementById('desc').value
        const avail = document.getElementById('avail').checked
        if (!name || !price || !category || !quantity || !description) {
            alert("Fill up every field of form!!! ")
            document.getElementById("name").focus()
        }
        else if (quantity < 0) {
            alert("Enter valid quantity...")
            document.getElementById('quantity').focus()
        }
        else if (price <= 0) {
            alert("Enter valid Price...")
            document.getElementById('price').focus()
        }
        else {
            if (photo !== null) {
                // deleteImg()
                const imageData = new FormData();
                imageData.append("file", photo)
                imageData.append("upload_preset", "p9fooewe")
                const response_cl = await Axios.post('https://api.cloudinary.com/v1_1/rk-cycle-photoes/image/upload', imageData)
                console.log(response_cl);
                if (response_cl) {
                    const requrl = "http://localhost:5000/items/updateCycle";
                    const reqOptions = {
                        method: "PUT",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "id": item._id,
                            "name": name,
                            "price": price,
                            "description": description,
                            "category": category,
                            "photo_available": true,
                            "photourl": response_cl.data.secure_url,
                            "public_id": response_cl.data.public_id,
                            "avail": avail,
                            "quantity": quantity
                        })
                    }
                    const result = await fetch(requrl, reqOptions);
                    const response = await result.json();
                    if (response.status === 'updated') {
                        alert("Cycle Updated successfully 😃!!!")
                        document.getElementById('name').value = ''
                        document.getElementById('price').value = null
                        document.getElementById('category').value = ''
                        document.getElementById('desc').value = ''
                        document.getElementById('photo').value = null

                    }
                    else {
                        alert("Failed to update cycle 😢!!!")
                    }
                }
                else {
                    alert("OOPS!!!something went wrong...😢")
                }
            }
            else {
                const requrl = "http://localhost:5000/items/updateCycle";
                const reqOptions = {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "id": item._id,
                        "name": name,
                        "price": price,
                        "description": description,
                        "category": category,
                        "photo_available": false,
                        "avail": avail,
                        "quantity": quantity
                    })
                }
                const result = await fetch(requrl, reqOptions);
                const response = await result.json();
                if (response.status === 'updated') {
                    alert("Cycle updated successfully 😃!!!")
                    document.getElementById('name').value = ''
                    document.getElementById('price').value = null
                    document.getElementById('category').value = ''
                    document.getElementById('desc').value = ''
                    document.getElementById('photo').value = null

                }
                else {
                    alert("Failed to update cycle 😢!!!")
                }
            }
            setstatus('none')
            document.getElementById('searchName').value = ''

        }
    }

    const searchItem = async () => {
        const name = document.getElementById('searchName').value
        if (name == 'null') {
            alert("Select one cycle from the list...")
        }
        else {
            const requrl = "http://localhost:5000/items/getItemByName";
            const reqOptions = {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ "name": name })
            }
            const result = await fetch(requrl, reqOptions);
            const response = await result.json();
            const item = await response.item;
            setItem(item)
            if (!item) {
                setstatus('none')
                setMsgstatus("block")
            }
            else {
                setMsgstatus("none")
                setstatus('flex')
                // setValues()

                document.getElementById('name').value = item.name
                document.getElementById('price').value = item.price
                document.getElementById('category').value = item.category
                document.getElementById('desc').value = item.description
                document.getElementById('quantity').value = item.quantity
                // document.getElementById('photo').value=item.photo
                document.getElementById('itemphoto').setAttribute('src',item.photo)
                document.getElementById('avail').checked = item.homeAvailability
            }
        }
    }

    return (
        <>
            <div className='Form_title updateHeading'>Update Cycle</div>

            {/* <div style={{ display: "flex" }}>
                <input className="form-control me-2 Input_take searchBar" id='searchName' placeholder="Search By Name" required />
                <button className='btn btn-warning searchButton' onClick={searchItem}>Search</button>
            </div> */}
            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <select className="Input_take searchBar" id="searchName">
                    <option value='null'>--Search Cycle--</option>
                    {
                        cycles.map((val, index) => {
                            return (<option key={index} value={val.name}>{val.name}</option>)
                        })
                    }
                </select>
                <button className='btn btn-warning searchButton' onClick={searchItem}>Search</button>
            </div>

            <div id='errMsgDiv' className='errMsgDiv' style={{ display: msgstatus }}>*Item Not Found!!!</div>
            
            <div className='Reg_formdiv' style={{ display: status, paddingTop: "1rem" }}>
                <div className='regInputDivs'>
                    <img id='itemphoto' width='200px' height='200px' />
                    <div className='Title_divs'>
                        <label htmlFor='name' className='Label'>Name:</label> <br />
                    </div>
                    <input type="text" name="name" id="name" className='Input_take' required autoComplete='off' /><br /> <br />
                </div>
                <div className='regInputDivs'>
                    <label htmlFor="price" className='Label'>Price:</label><br />
                    <input type="number" name="price" id="price" className='Input_take' required /><br /> <br />
                </div>
                <div className='regInputDivs'>
                    <label htmlFor="category" className='Label' style={{ marginRight: '10px' }}>Category:</label>
                    <select name="category" id="category">
                        <option value="cycle_3tyre">3-tyre cycle</option>
                        <option value="cycle_small">small-size cycle</option>
                        <option value="cycle_medium">medium-size cycle</option>
                        <option value="cycle_large">large-size cycle</option>
                    </select>
                    <br /> <br />
                </div>
                <div className='regInputDivs'>
                    <label htmlFor="desc" className='Label'>Description:</label><br />
                    <textarea name="desc" id="desc" cols="30" rows="5" className='Input_take' required ></textarea>
                    <br /> <br />
                </div>

                <div className='regInputDivs'>
                    <label htmlFor="quantity" className='Label'>Enter Quantity:</label><br />
                    <input type="number" name="quantity" id="quantity" className='Input_take' required /><br /> <br />
                </div>
                <div className='regInputDivs'>
                    <label htmlFor="photo" className='Label'>Add Photo:</label><br />
                    <input type="file" name="photo" id="photo" className='Input_take' onChange={(e) => { setPhoto(e.target.files[0]) }} /><br /> <br />
                </div>

                <div className='regInputDivs'>
                    <input type="checkbox" name="avail" id="avail" />
                    <label htmlFor="avail" className='label' style={{ marginLeft: "0.5rem" }}>Show in Homepage.</label>
                </div>
                <div className='SubmitDiv'>
                    <input type="submit" value="Submit" className='regSubmitButtonCss' onClick={SubmitFunction} />
                </div>
                <br />
            </div>
        </>
    )
}

export default UpdateCycle