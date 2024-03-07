import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import EmailVerification from "../components/Verification/EmailVerification"

function UserVerification() {
    const param = useParams()
    const [validUrl, setValidUrl] = useState(false)

    //checks if the email is verified or not
    useEffect(() => {

        axios.get(`/user/verification`,{params:param,withCredentials: true}).then((res) => {
            if(res.data.success) {
                setValidUrl(true)
            }
            else {
                setValidUrl(false)
            }
        }).catch((error) => {
            console.log(error)
            setValidUrl(false)
        })
    },[param])

    //how it looks like the verification in the web page
    return (
        <EmailVerification validUrl={validUrl}/>
    )
}

export default UserVerification