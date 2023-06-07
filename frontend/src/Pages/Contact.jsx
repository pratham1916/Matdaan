import React from "react";
import Heading from '../css/Heading.module.css'
import '../css/Contact.css'
import { FiMapPin } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { IoMdContact } from 'react-icons/io';
import styles from '../css/Landing.module.css'

const Contact = () => {
    return (
        <>
        <section className={Heading.sec}>
          <div className={Heading.section_title}>
            <h2>Contact</h2>
            <p>Contact Us</p>
          </div>
          <div class="row mt-5">

            <div class="col-lg-4" data-aos="fade-right">
              <div class="info">
                <div>
                  <div style={{display:"flex"}} class="address">
                    <FiMapPin style={{color:"white",padding:"5px",margin:"7px 10px 0 0 ",borderRadius:"50%", backgroundColor:"#ef6603",fontSize:"30px"}}/>
                    <h4 style={{color:"red",marginTop:"10px"}}>Location:</h4>
                  </div>
                  <p>Nirvachan Sadan, Ashoka Rd, Pandit Pant Marg Area, Sansad Marg Area, New Delhi, Delhi 110001</p>
                </div>

                <div>
                  <div style={{display:"flex"}} class="email">
                    <MdEmail style={{color:"white",padding:"5px",margin:"7px 10px 0 0 ",borderRadius:"50%", backgroundColor:"#ef6603",fontSize:"30px"}}/>
                    <h4 style={{color:"red",marginTop:"10px"}}>Email:</h4>
                  </div>
                  <p>Matdaan01@gmail.com</p>
                </div>

                <div>
                  <div style={{display:"flex"}} class="phone">
                    <IoMdContact style={{color:"white",padding:"5px",margin:"7px 10px 0 0 ",borderRadius:"50%", backgroundColor:"#ef6603",fontSize:"30px"}}/>
                    <h4 style={{color:"red",marginTop:"10px"}}>Contact:</h4>
                  </div>
                  <p style={{fontSize:"17px"}}>9665920869</p>
                </div>
              </div>
            </div>


            <div class="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left">
              <form >
                <div class="row">
                  <div class="col-md-6 form-group">
                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required></input>
                  </div>
                  <div class="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required></input>
                  </div>
                </div>
                <div class="form-group mt-3">
                  <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required></input>
                </div>
                <div class="form-group mt-3">
                  <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div class="text-center"><button style={{marginTop:"20px",padding:"8px 15px",backgroundColor:"whitesmoke"}} className={styles.btn}>Send Message</button></div>
              </form>

            </div>

          </div>
        </section>
        </>
    )
}
export default Contact;