import React from "react";
import Heading from '../css/Heading.module.css'
import '../css/Home.css'

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
                                <div><p><strong>Matdaan</strong> is a mobile based voting platform that allows you to create and manage your own election. Matdaan is much more than a platform - it's a revolution. Matdaan is what mobile banking is to cash transactions, Matdaan is what Whatsapp is to postal department, Matdaan is what mobile share trading is to paper shares trading.</p>
                                    <p>Today voting means - travelling to a booth, standing there in queue for hours, getting hand inked to vote. Matdaan lets voter vote directly from their mobile, from the comforts of their homes and that also within few seconds.</p>
                                    <p>If you have the choose between spending Rs. 30,000 Crores, 2 months and 1 Crore man days to manage election with 66% voter turnout Vs spending less than 10% cost, 10% time and 10% effort and still manage 10 times better security and close to 100% voter turnout - what would you choose?</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <img class="" src={require('../img/how.jpg')} />
                            </div>
                        </div>
                    </div>

                        {/*-----------------------------------------New Section------------------------------------------------ */}

                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 content">
                        <div class="row"><h2>Our Focus</h2>
                            <div class="col-lg-5 col-md-4 col-sm-12 col-12 text-center">
                                <img class="" style={{ width: 550, height: 450 }} src={require('../img/focus_mission.jpg')} />
                            </div>
                            <div style={{ width: 750 }} class="col-lg-6 col-md-6 col-sm-12 col-12 text-center">
                                <ul>
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
                                <div class="box" data-aos="zoom-in">
                                    <h3>Free</h3>
                                    <h4><sup>$</sup>0<span> / month</span></h4>
                                    <ul>
                                        <li>Aida dere</li>
                                        <li>Nec feugiat nisl</li>
                                        <li>Nulla at volutpat dola</li>
                                        <li class="na">Pharetra massa</li>
                                        <li class="na">Massa ultricies mi</li>
                                    </ul>
                                    <div class="btn-wrap">
                                        <a href="#" class="btn-buy">Buy Now</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6 mt-4 mt-md-0">
                                <div class="box featured" data-aos="zoom-in" data-aos-delay="100">
                                    <h3>Business</h3>
                                    <h4><sup>$</sup>19<span> / month</span></h4>
                                    <ul>
                                        <li>Aida dere</li>
                                        <li>Nec feugiat nisl</li>
                                        <li>Nulla at volutpat dola</li>
                                        <li>Pharetra massa</li>
                                        <li class="na">Massa ultricies mi</li>
                                    </ul>
                                    <div class="btn-wrap">
                                        <a href="#" class="btn-buy">Buy Now</a>
                                    </div>
                                </div>
                            </div>

                        <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
                            <div class="box" data-aos="zoom-in" data-aos-delay="200">
                            <h3>Developer</h3>
                            <h4><sup>$</sup>29<span> / month</span></h4>
                            <ul>
                                <li>Aida dere</li>
                                <li>Nec feugiat nisl</li>
                                <li>Nulla at volutpat dola</li>
                                <li>Pharetra massa</li>
                                <li>Massa ultricies mi</li>
                            </ul>
                            <div class="btn-wrap">
                                <a href="#" class="btn-buy">Buy Now</a>
                            </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
                            <div class="box" data-aos="zoom-in" data-aos-delay="300">
                            <span class="advanced">Advanced</span>
                            <h3>Ultimate</h3>
                            <h4><sup>$</sup>49<span> / month</span></h4>
                            <ul>
                                <li>Aida dere</li>
                                <li>Nec feugiat nisl</li>
                                <li>Nulla at volutpat dola</li>
                                <li>Pharetra massa</li>
                                <li>Massa ultricies mi</li>
                            </ul>
                            <div class="btn-wrap">
                                <a href="#" class="btn-buy">Buy Now</a>
                            </div>
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
                            <div class="col-lg-2 col-md-4 d-flex align-items-stretch">
                                <div class="member" data-aos="fade-up">
                                    <div class="member-img">
                                        <div class="social">
                                            <a href="#"><i class="fa-brands fa-github"></i></a>
                                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div class="member-info">
                                        <img style={{ width: 150, height: 150 }} src={require('../img/logo512.png')} />
                                        <h4>Dr. Archana Potnurwar</h4>
                                        <span>Guide</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-4 d-flex align-items-stretch">
                                <div class="member" data-aos="fade-up">
                                    <div class="member-img">
                                        <div class="social">
                                            <a href="#"><i class="fa-brands fa-github"></i></a>
                                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div class="member-info">
                                        <img style={{ width: 150, height: 150 }} src={require('../img/logo512.png')} />
                                        <h4>Pratham Nemade</h4>
                                        <span>Developer</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-4 d-flex align-items-stretch">
                                <div class="member" data-aos="fade-up" data-aos-delay="100">
                                    <div class="member-img">
                                        <div class="social">
                                            <a href="#"><i class="fa-brands fa-github"></i></a>
                                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div class="member-info">
                                        <img style={{ width: 150, height: 150 }} src={require('../img/Amit.jpg')} />
                                        <h4>Amit Pandey</h4>
                                        <span>Developer</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-4 d-flex align-items-stretch">
                                <div class="member" data-aos="fade-up" data-aos-delay="200">
                                    <div class="member-img">
                                        <div class="social">
                                            <a href="#"><i class="fa-brands fa-github"></i></a>
                                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div class="member-info">
                                        <img style={{ width: 150, height: 150 }} src={require('../img/Rohit.jpg')} />
                                        <h4>Rohit Diwate</h4>
                                        <span>Developer</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-4 d-flex align-items-stretch">
                                <div class="member" data-aos="fade-up" data-aos-delay="300">
                                    <div class="member-img">
                                        <div class="social">
                                            <a href="#"><i class="fa-brands fa-github"></i></a>
                                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div class="member-info">
                                        <img style={{ width: 150, height: 150 }} src={require('../img/Hitesh.jpg')} />
                                        <h4>Hitesh Kadukar</h4>
                                        <span>Developer</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-4 d-flex align-items-stretch">
                                <div class="member" data-aos="fade-up" data-aos-delay="300">
                                    <div class="member-img">
                                        <div class="social">
                                            <a href="#"><i class="fa-brands fa-github"></i></a>
                                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div class="member-info">
                                        <img style={{ width: 150, height: 150 }} src={require('../img/logo512.png')} />
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