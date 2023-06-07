import React from "react";
import Heading from '../css/Heading.module.css'
import '../css/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Home = () => {
    return (
        <>
        <section>

            {/*--------------------------------------About Section------------------------  */}
            <section className={Heading.sec}>
                <div className={Heading.section_title}>
                    <h2>About</h2>
                    <p>Who are we</p>
                </div>

                <section id="teams" class="teams">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 content">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-center">
                                <div style={{textAlign:"justify", marginTop:"10px",fontFamily:"Arial, sans-serif"}}><p><strong>Matdaan</strong> is a mobile based voting platform that allows you to create and manage your own election. Matdaan is much more than a platform - it's a revolution. Matdaan is what mobile banking is to cash transactions, Matdaan is what Whatsapp is to postal department, Matdaan is what mobile share trading is to paper shares trading.</p>
                                    <p>Today voting means - travelling to a booth, standing there in queue for hours, getting hand inked to vote. Matdaan lets voter vote directly from their mobile, from the comforts of their homes and that also within few seconds.</p>
                                    <p>If you have the choose between spending Rs. 30,000 Crores, 2 months and 1 Crore man days to manage election with 66% voter turnout Vs spending less than 10% cost, 10% time and 10% effort and still manage 10 times better security and close to 100% voter turnout - what would you choose?</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <img src={require('../img/how.jpg')} />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
                        {/*-----------------------------------------New Section------------------------------------------------ */}
                    <section className={Heading.sec}>
                        <div className={Heading.section_title}>
                            <h2>Our Focus</h2>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12 content">
                            <div class="row">
                                <div class="col-lg-5 col-md-4 col-sm-12 col-12 text-center">
                                    <img class="" style={{ width: 550, height: 450 }} src={require('../img/focus_mission.jpg')} />
                                </div>
                                <div  class="col-lg-6 col-md-6 col-sm-12 col-12 text-center">
                                    <ul style={{ width: 730 , textAlign:"justify",fontFamily:"Arial, sans-serif"}}>
                                        <li>We are a VOTING focused platform. We are not a market survey tool like Survey Monkey or opinion poll tool like poll daddy. Hence, we are also very focused on SECURITY and AUTHENICATION, unlike market survey or polling platforms where these are not major concern area.</li>
                                        <li>We are a INDIA focused company. We would first like to make meaningful difference in our country before venturing abroad.</li>
                                        <li>We are an ETHICS focused organization and would not take short cuts.</li>
                                        <li>We are an EFFICIENCY focused organization. We believe internet allows us to do most activity in much most cost, time and effort efficient way and its foolish to ignore efficiency.</li>
                                        <li>We are a CUSTOMER focused organization and both voter and election manager are our customer. We are focused on ensuring that every voter gets his Right2Vote and his experience of voting is very easy and efficient in terms of cost, time and effort required. We are also focused that election holding process for the election manager should be very easy and efficient.</li>
                                        <li>We are a PROFIT focused business which focuses on bottom-line rather than the topline. We do not understand the current way of doing business where companies worth billions of dollars, to survive, need to beg in front of investors every year. Many people mistake us for a charitable organization, which is not true. Our aim is to do remarkable service to the society but at the same time, we do not want to risk our survival by not focusing on profit.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    
            {/* --------------------------------------How to Vote----------------------------------- */}
            <section className={Heading.sec}>
                <div className={Heading.section_title}>
                    <h2>How To Vote</h2>
                    <p>Rules To vote</p>
                </div>
                <section id="pricing" class="pricing">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-md-6">
                                <div style={{border:"1px solid orangered"}} class="box featured">
                                    <h3>Step 1 :</h3>
                                    <ul style={{fontSize:"16px"}}>
                                        <li>Register Yourself</li>
                                        <li>Add Valid Name and Email</li>
                                        
                                    </ul>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6 mt-4 mt-md-0">
                                <div class="box featured" style={{border:"1px solid orangered"}}>
                                    <h3>Step 2 :</h3>
                                    <ul style={{fontSize:"14px"}}>
                                        <li>Find Nominees from Candidate List</li>
                                        <li>Go through their Details</li>
                                    </ul>
                                </div>
                            </div>

                        <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
                            <div class="box featured" style={{border:"1px solid orangered"}}>
                                <h3>Step 3 :</h3>
                                <ul style={{fontSize:"15px"}}>
                                    <li>Cast your Vote</li>
                                    <li>By Tapping Vote Button</li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
                            <div class="box featured" style={{border:"1px solid orangered"}}>
                                <h3>Step 4 :</h3>
                                <ul style={{fontSize:"16px"}}>
                                    <li>Wait for the Result </li>
                                    <li><b>Thanks for Your Vote</b></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>

            {/*---------------------------------- Team ----------------------------------------- */}

            <section className={Heading.sec}>
                <div className={Heading.section_title}>
                    <h2>Team</h2>
                    <p>Our Hadrworking Team</p>
                </div>
                <section id="team" class="team">
                    <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div class="member" data-aos="fade-up">
                            <div class="member-img">
                            <img src={require('../img/Pratham.jpeg')} class="img-fluid" alt=""/>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/pratham-nemade-56131a207/"><FaLinkedin style={{fontSize:"23px",color:"white"}}/></a>
                                <a href="https://github.com/pratham1916"><FaGithub style={{fontSize:"23px",color:"white"}}/></a>
                               
                            </div>
                            </div>
                            <div class="member-info">
                            <h4>Pratham Nemade</h4>
                            <span>Developer</span>
                            </div>
                        </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div class="member" data-aos="fade-up" data-aos-delay="100">
                            <div class="member-img">
                            <img src={require('../img/Rohit.jpg')} class="img-fluid" alt=""/>
                            <div class="social">
                                <a href="https://www.linkedin.com/mwlite/in/rohit-diwate-659476225"><FaLinkedin style={{fontSize:"23px",color:"white"}}/></a>
                                <a href="https://github.com/Rohitdi08"><FaGithub style={{fontSize:"23px",color:"white"}}/></a>
                            </div>
                            </div>
                            <div class="member-info">
                            <h4>Rohit Diwate</h4>
                            <span>Developer</span>
                            </div>
                        </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div class="member" data-aos="fade-up" data-aos-delay="200">
                            <div class="member-img">
                            <img src={require('../img/Amit.jpg')} class="img-fluid" alt=""/>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/amitpandey2001"><FaLinkedin style={{fontSize:"23px",color:"white"}}/></a>
                                <a href="https://www.github.com/Amitpandey2001"><FaGithub style={{fontSize:"23px",color:"white"}}/></a>
                            </div>
                            </div>
                            <div class="member-info">
                            <h4>Amit Pandey</h4>
                            <span>Developer</span>
                            </div>
                        </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div class="member" data-aos="fade-up" data-aos-delay="300">
                            <div class="member-img">
                            <img src={require('../img/Hitesh.jpg')} class="img-fluid" alt=""/>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/hitesh-kadukar-993253220/"><FaLinkedin style={{fontSize:"23px",color:"white"}}/></a>
                                <a href="https://github.com/Hitesh2751"><FaGithub style={{fontSize:"23px",color:"white"}}/></a>
                            </div>
                            </div>
                            <div class="member-info">
                            <h4>Hitesh Kadukar</h4>
                            <span>Developer</span>
                            </div>
                        </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div class="member" data-aos="fade-up" data-aos-delay="300">
                            <div class="member-img">
                            <img src={require('../img/atul.jpeg')} class="img-fluid" alt=""/>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/atul-a-gupta"><FaLinkedin style={{fontSize:"23px",color:"white"}}/></a>
                                <a href="https://github.com/atulgupta05"><FaGithub style={{fontSize:"23px",color:"white"}}/></a>
                            </div>
                            </div>
                            <div class="member-info">
                            <h4>Atul Gupta</h4>
                            <span>Developer</span>
                            </div>
                        </div>
                        </div>

                        </div>
                    </div>
                </section>
            </section>
        </section>
        </>
    )
}

export default Home;