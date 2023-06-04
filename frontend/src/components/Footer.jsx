import React from "react";
import '../css/Footer.css'
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () =>{
    return(
    <>
        <footer id="footer">
            <div class="container">
                <h3>मतदान !</h3>
                <p>चाहे नर हो या हो नारी,मतदान है सबकी जिम्मेदारी।</p>
                <div class="social-links">
                    <a href="#"><FaGithub /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaFacebook /></a>
                </div>
            </div>
        </footer>
    </>
    )
}
export default Footer;  