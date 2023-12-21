import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook,faInstagram,faYoutube } from "@fortawesome/free-brands-svg-icons"
import '../../CSS/contact.css'

function App()
{
    return(
        <div className="contact">
            <FontAwesomeIcon icon={faFacebook} className="gap"/>
            <FontAwesomeIcon icon={faInstagram} className="gap"/>
            <FontAwesomeIcon icon={faYoutube} className="gap"/>
        </div>
    )
}

export default App