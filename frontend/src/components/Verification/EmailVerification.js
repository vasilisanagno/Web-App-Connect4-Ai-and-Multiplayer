import React from "react"
import './EmailVerification.css'
import { Link } from "react-router-dom"
import { gradientStyle } from "../../style/styles"

//component for the email verification to verify the user in the signup procedure
function EmailVerification(props) {

    return (
        <div className="emailVerify" style={gradientStyle}>
            {props.validUrl ? <div>
                <img src="/success.png" alt="Email is verified successfully!"/>
                <h1>Email verified successfully!</h1>
                <Link to="/login">
                    <button className="emailVerifyButton">Login</button>
                </Link>
            </div> : <h1>404 Not Found!</h1>}
        </div>
    )
}

export default EmailVerification