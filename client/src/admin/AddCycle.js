import React, { useState } from 'react'
import Axios from 'axios';
const AddCycle = () => {
  const [photo, setPhoto] = useState()


  const SubmitFunction = async () => {
    // const file = document.querySelector('input[type="file"]');

    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const category = document.getElementById('category').value
    const description = document.getElementById('desc').value
    const quantity = document.getElementById('quantity').value
    const avail = document.getElementById('avail').checked
    
    if (!name || !price || !category || !description || !quantity || !avail) {
      alert("Fill up all the details properly...")
      document.getElementById('name').focus()        
    }
    else if (quantity < 0) {
      alert("Enter valid quantity...")
      document.getElementById('quantity').focus()        
    }
    else if(price<=0){
        alert("Enter valid Price...")
      document.getElementById('price').focus()          
    }
    else {
      const imageData = new FormData();
      imageData.append("file", photo)
      imageData.append("upload_preset", "y2aad8e9")
      const response_cl = await Axios.post('https://api.cloudinary.com/v1_1/dfxxtg839/image/upload', imageData)
      console.log(response_cl);
      if (response_cl) {
        const requrl = "http://localhost:5000/items/addCycle";
        const reqOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "name": name,
            "price": price,
            "description": description,
            "category": category,
            "photourl": response_cl.data.secure_url,
            "public_id": response_cl.data.public_id,
            "avail": avail,
            "quantity": quantity
          })
        }
        const result = await fetch(requrl, reqOptions);
        const response = await result.json();
        if (response.status === 'added') {
          alert("Cycle added successfully 😃!!!")
          document.getElementById('name').value = ''
          document.getElementById('price').value = null
          document.getElementById('category').value = ''
          document.getElementById('desc').value = ''
          document.getElementById('photo').value = null

        }
        else {
          alert("Failed to add cycle 😢!!!")
        }
      }
      else {
        alert("OOPS!!!something went wrong...😢")
      }
    }
  }
  return (
    <>
      <div className='Reg_formdiv'>
        <div className='Form_title'>Add Cycle</div>

        <div className='regInputDivs'>
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
          <input type="file" name="photo" id="photo" className='Input_take' onChange={(e) => { setPhoto(e.target.files[0]) }} required /><br /> <br />
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

export default AddCycle