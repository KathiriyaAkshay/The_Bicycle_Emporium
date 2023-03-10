import React, { useState } from 'react';
import {
  Button,
  Grid,
} from '@mui/material';
import loginJD from '../images/b1.png';
import loginJD2 from '../images/2.png';
import Axios from 'axios';
import "./add.css"
import url from "../images/bicycle.png";

const AddCycle2 = () => {
  
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
      {/* <Link to="/">
        <Button color="inherit">Home</Button>
      </Link>
      <Link to="/appointment">
        <Button color="inherit">Appointment</Button>
      </Link> */}

      <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
      >
        <div class="container headertop">
          <div class="d-sm-flex align-items-center justify-content-between head">
            <div className="left">
              
        <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="section-title mb-40">
              <span class="text-marked">Add</span> <span style={{color:'black'}}>Products__</span>
            </h2>
          </div>
        </div>
       </div>
        <div className="container " style={{ fontFamily: 'poppins', marginLeft: '30px' }}>
        <div className=" p-3 ">
        
            <>
            <form  >
            <div className="form-group row">
              <label
                for="name"
                style={{color:'black', textAlign: 'left', }}
                className="col-sm-2 col-form-label downn "
              >
                Name:
              </label>
              <div className="col-sm-10">
                <input
                type="text" name="name" id="name"
                  style={{color:'black', paddingLeft: 8, paddingRight: 8 }}
                  className="form-control form-input"
                  placeholder="Enter Your Full Name.."
                  required
                />
              </div>
            </div>
    
            <div className="form-group row">
              <label
                for="price"
                style={{color:'black', textAlign: 'left', }}
                className="col-sm-2 col-form-label downn "
              >
                Price:
              </label>
              <div className="col-sm-10">
                <input
                  style={{color:'black', paddingLeft: 8, paddingRight: 8 }}
                  type="number"
                  className="form-control form-input"
                  name="price" 
                  id="price"
                  placeholder="Enter Your bicycle price"
                  required
                />
              </div>
            </div>
    
            <div className="form-group row">
            <label
                for="category"
                style={{ color:'black', textAlign: 'left', }}
                className="col-sm-2 col-form-label downn "
              >
                Category:
              </label>
              <div className="col-sm-10">
            <select name="category" id="category" className=" form-select" style={{marginTop:'10px',color:'black', width:'90%',marginLeft:'20px',paddingLeft: 8, paddingRight: 8 }}>
              <option value="cycle_3tyre">3-tyre cycle</option>
              <option value="cycle_small">small-size cycle</option>
              <option value="cycle_medium">medium-size cycle</option>
              <option value="cycle_large">large-size cycle</option>
            </select>
            </div>
          </div>

            <div className="form-group row" style={{color:'black', marginTop: -10 }}>
              <label style={{ textAlign: 'left'}} for="desc" className="col-sm-2 downn col-form-label">
                Description
              </label>
            <div className="col-sm-10">
                <textarea className="form-control f-textarea"
                  placeholder="Description"
                  rows="3"
                  name="desc"
                  id="desc" 
                  style={{color:'black', paddingLeft: 8, paddingRight: 8 }}
                  required></textarea>
              </div>
            </div>
    
            <div className="form-group row">
              <label
                for="quantity"
                style={{color:'black',textAlign: 'left', }}
                className="col-sm-2 col-form-label downn "
              >
                quantity:
              </label>
              <div className="col-sm-10">
                <input
                  style={{color:'black', paddingLeft: 8, paddingRight: 8 }}
                  className="form-control form-input"
                  placeholder="Enter Your bicycle quantity"
                  required
                  type="number"
                  name="quantity"
                  id="quantity"
                />
              </div>
            </div>   
            
            <div className="form-group row">
              <label
                for="name"
                style={{color:'black',textAlign: 'left', }}
                className="col-sm-2 col-form-label downn "
              >
                Add Photo:
              </label>
              <div className="col-sm-10">
                <input type="file" name="photo" id="photo"  style={{ paddingLeft: 8, paddingRight: 8 }} 
                onChange={(e) => { setPhoto(e.target.files[0]) }} 
                className="form-control form-input"  placeholder="Enter Photo"
                />
              </div>
            </div>

            <div className="form-group row tempchanges" >
            <div>
            <label htmlFor="avail" className='label' style={{color:'black', marginLeft: "0.5rem",  textAlign: 'left'}}>Show in Homepage.</label>
            </div>
            <div>
            <input type="checkbox" name="avail" id="avail"
                />
                </div>
            </div>  

           
            <div className="justify-content align-center  mt-3 ">
              <div className="w-100" style={{ textAlign: 'center' }}>
                <Button variant="contained" style={{ height: "41px", boxShadow: "2px -1px 32px 0px rgba(44,94,255,0.36)" }} onClick={SubmitFunction} className=" search-bar-button  m-auto ">
                Add Your Product
              </Button>
              </div>
            </div>
          </form>
        </>       

        </div>
           
           
          
        </div>
            </div>

            <a href="https://svgshare.com/s/gH0" className="right" style={{width:'50%'}}>
              <img class="img-fluid  d-none d-sm-block" src={url} title="" />
            </a>
          </div>
        </div>
      </section>
       
    </>
  );
};

export default AddCycle2;
