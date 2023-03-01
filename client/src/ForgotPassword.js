import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email'

const ForgotPassword = () => {
    const [showEmailBlock, setShowEmailBlock] = useState('block')
    const [showOtpBlock, setShowOtpBlock] = useState('none')
    const [showPasswordBlock, setShowPasswordBlock] = useState('none')
    const [otp, setOtp] = useState(null)

    const submitFun = async () => {
        const email = document.getElementById('email').value
        const requrl = "http://localhost:5000/user/sendMail";
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ email: email })
        }
        const result = await fetch(requrl, reqOptions);
        const response = await result.json();
        if (response.code === 'error') {
            alert("User not found with this Email ID...")
        }
        else {
            setShowEmailBlock('none')
            setShowOtpBlock('block')
            setOtp(response.code)
        }
    }

    const submitOtp = () => {
        const userOtp = document.getElementById('otp').value
        if (otp == userOtp) {
            setShowPasswordBlock('block')
            setShowOtpBlock('none')
        }
        else {
            alert("otp is wrong....")
        }
    }

    const showPass = (field) => {
        if (field === 'password') {
            const password = document.getElementById('password')
            const checkbox = document.getElementById('showpass')
            if (checkbox.checked)
                password.type = "text"
            else
                password.type = "password"
        }
        else if (field === 'cpassword') {
            const cpassword = document.getElementById('cpassword')
            const checkbox = document.getElementById('showcpass')
            if (checkbox.checked)
                cpassword.type = "text"
            else
                cpassword.type = "password"
        }
    }


    const updatePass = async () => {
        const pass = document.getElementById("password").value
        const cpass = document.getElementById("cpassword").value
        if (!pass || !cpass) {
            alert("Enter the password field correctly...")
            document.getElementById('password').focus()
        }
        else if (pass !== cpass) {
            alert("Password not matched...")
            document.getElementById('password').focus()
        }
        else {
            const email = document.getElementById('email').value
            const requrl = "http://localhost:5000/user/changePW";
            const reqOptions = {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ email: email, password: pass })
            }
            const result = await fetch(requrl, reqOptions);
            const response = await result.json();
            if (response.status === 'success') {
                alert("Password Updated successfully...")
                window.location.href='/login'
            }
            else {
                alert("OOPS!!! Something went wrong...")
            }
        }
    }
    return (
        <>
            <div className="Login_division">
                <div className='formdiv'>
                    <div className='Form_title'>Change Password </div>
                    <div>

                        <div className='inputDivs' style={{ display: showEmailBlock }}>
                            <div className="Icon_title">
                                <span className='icons'><EmailIcon /></span>
                                <label className='Label' htmlFor="email">Email:</label><br />
                            </div>
                            <input className='Input_take' type="email" name="email" id="email" required /><br />
                        </div>
                        <div className='inputDivs' style={{ display: showEmailBlock }}>
                            <input className='SubmitButtonCss' type="button" value="Submit" onClick={submitFun} />
                        </div>


                        <div className='inputDivs' style={{ display: showOtpBlock }}>
                            <div className="Icon_title">
                                <span className='icons'><LockIcon /></span>
                                <label className='Label' htmlFor="otp">Enter Otp:</label><br />
                            </div>
                            <input className='Input_take' type="text" name="otp" id="otp" required /><br />
                            <br />
                        </div>
                        <div className='inputDivs' style={{ display: showOtpBlock }}>
                            <input className='SubmitButtonCss' type="button" value="Submit" onClick={submitOtp} />
                        </div>


                        <div className='inputDivs' style={{ display: showPasswordBlock }}>
                            <div className="Icon_title">
                                <span className='icons'><LockIcon /></span>
                                <label className='Label' htmlFor="password">Password:</label><br />
                            </div>
                            <input className='Input_take' type="password" name="password" id="password" required /><br />
                            <div className='ShowPassDiv' style={{ marginTop: '0.7rem' }}>
                                <input type="checkbox" className='checkBox' id='showpass' name='show' onClick={() => { showPass('password') }} />
                                <label htmlFor="showpass" className='Label_ShowPass'> Show Password</label>
                            </div>
                            <br />
                        </div>
                        <div className='inputDivs' style={{ display: showPasswordBlock }}>
                            <div className="Icon_title">
                                <span className='icons'><LockIcon /></span>
                                <label className='Label' htmlFor="cpassword">Re-enter Password:</label><br />
                            </div>
                            <input className='Input_take' type="password" name="cpassword" id="cpassword" required /><br />
                            <div className='ShowPassDiv' style={{ marginTop: '0.7rem' }}>
                                <input type="checkbox" className='checkBox' id='showcpass' name='show' onClick={() => { showPass('cpassword') }} />
                                <label htmlFor="showcpass" className='Label_ShowPass'> Show Password</label>
                            </div>
                            <br />
                        </div>
                        <div className='inputDivs' style={{ display: showPasswordBlock }}>
                            <input className='SubmitButtonCss' type="button" value="Submit" onClick={updatePass} />
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword