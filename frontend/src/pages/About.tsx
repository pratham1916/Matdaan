import React, { useEffect } from 'react';
import "../styles/About.css";
import teamIMG from "../images/Amit.jpg";
import teamIMG1 from "../images/Pratham.jpeg";
import teamIMG2 from "../images/Rohit.jpg";
import teamIMG3 from "../images/Hitesh.jpg";
import aboutimg from "../images/logo.jpg";

const About = () => {

  useEffect(() => {
    const hamBurgerBtn = document.getElementById('hamBurger');
    hamBurgerBtn?.addEventListener('click', function () {
      const responsiveRight = document.querySelector('.responsive');
      hamBurgerBtn.classList.toggle('active');
      if (hamBurgerBtn.classList.contains('active')) {
        responsiveRight.classList.add('active');
      } else {
        responsiveRight.classList.remove('active');
      }
    });

    // Cleanup the event listener on component unmount
    return () => {
      hamBurgerBtn?.removeEventListener('click', function () {
        const responsiveRight = document.querySelector('.responsive');
        hamBurgerBtn.classList.toggle('active');
        if (hamBurgerBtn.classList.contains('active')) {
          responsiveRight.classList.add('active');
        } else {
          responsiveRight.classList.remove('active');
        }
      });
    };
  }, []);

  return (
    <section className='about'>
      <div className="voters-banner"></div>
      <div id="home">
        <div className="home-left">
          <img src={aboutimg} alt="signature" className="avatar-preview img-fluid" />
        </div>
        <div className="home-right">
          <h2 className="home-heading">About Us</h2>
          <p className="home-para">
            <div style={{ textAlign: "justify", marginTop: "10px", fontFamily: "Arial, sans-serif" }}><p><strong>Matdaan</strong> is a mobile based voting platform that allows you to create and manage your own election. Matdaan is much more than a platform - it's a revolution. Matdaan is what mobile banking is to cash transactions, Matdaan is what Whatsapp is to postal department, Matdaan is what mobile share trading is to paper shares trading.</p>
              <p>Today voting means - travelling to a booth, standing there in queue for hours, getting hand inked to vote. Matdaan lets voter vote directly from their mobile, from the comforts of their homes and that also within few seconds.</p>
              <p>If you have the choose between spending Rs. 30,000 Crores, 2 months and 1 Crore man days to manage election with 66% voter turnout Vs spending less than 10% cost, 10% time and 10% effort and still manage 10 times better security and close to 100% voter turnout - what would you choose?</p>
            </div>
          </p>
        </div>
      </div>
      {/* Workflow Section */}
      <div id="workFlow">
        <h2 className="heading">Our Focus</h2>
        <p className="para">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-center">
            <ul style={{ width: 1000, textAlign: "justify", fontFamily: "Arial, sans-serif" }}>
              <li>We are a VOTING focused platform. We are not a market survey tool like Survey Monkey or opinion poll tool like poll daddy. Hence, we are also very focused on SECURITY and AUTHENICATION, unlike market survey or polling platforms where these are not major concern area.</li>
              <li>We are a INDIA focused company. We would first like to make meaningful difference in our country before venturing abroad.</li>
              <li>We are an ETHICS focused organization and would not take short cuts.</li>
              <li>We are an EFFICIENCY focused organization. We believe internet allows us to do most activity in much most cost, time and effort efficient way and its foolish to ignore efficiency.</li>
              <li>We are a CUSTOMER focused organization and both voter and election manager are our customer. We are focused on ensuring that every voter gets his Right2Vote and his experience of voting is very easy and efficient in terms of cost, time and effort required. We are also focused that election holding process for the election manager should be very easy and efficient.</li>
              <li>We are a PROFIT focused business which focuses on bottom-line rather than the topline. We do not understand the current way of doing business where companies worth billions of dollars, to survive, need to beg in front of investors every year. Many people mistake us for a charitable organization, which is not true. Our aim is to do remarkable service to the society but at the same time, we do not want to risk our survival by not focusing on profit.</li>
            </ul>
          </div>
        </p>
        <div className="num-container">
          <div className="num-item"><span>1,40,90,00,000<br />People</span></div>
          <div className="num-item"><span>90% <br />Action Plans</span></div>
          <div className="num-item"><span>****<br />Ratings</span></div>
        </div>
      </div>

      {/* Goal Section */}
      <div id="rules">
        <div className="rules-left">
          <h2>How To Vote</h2>
                <div className="col-lg-3 col-md-6">
                  <div style={{ border: "1px solid orangered" }} className="box featured">
                    <h3>Step 1 :</h3>
                    <ul style={{ fontSize: "16px" }}>
                      <li>Register Yourself</li>
                      <li>Add Valid Name and Email</li>

                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                  <div className="box featured" style={{ border: "1px solid orangered" }}>
                    <h3>Step 2 :</h3>
                    <ul style={{ fontSize: "14px" }}>
                      <li>Find Nominees from Candidate List</li>
                      <li>Go through their Details</li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                  <div className="box featured" style={{ border: "1px solid orangered" }}>
                    <h3>Step 3 :</h3>
                    <ul style={{ fontSize: "15px" }}>
                      <li>Cast your Vote</li>
                      <li>By Tapping Vote Button</li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                  <div className="box featured" style={{ border: "1px solid orangered" }}>
                    <h3>Step 4 :</h3>
                    <ul style={{ fontSize: "16px" }}>
                      <li>Wait for the Result </li>
                      <li><b>Thanks for Your Vote</b></li>
                    </ul>
                  </div>
                </div>
          <a href="../pages/Contact.tsx" className="btn">Contact Us</a>
        </div>
      </div>

      {/* Our Team Section */}
      <div id="our-Team">
        <h2>Our Member</h2>
        <div className="teamContainer">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="our-team">
              <div className="picture">
                <img src={teamIMG} alt="signature" className="avatar-preview img-fluid" />
              </div>
              <div className="team-content">
                <h3 className="name">Amit Pandey</h3>
                <h4 className="title">.NET Developer</h4>
              </div>
              <ul className="social">
                <li><a href="" className="fa fa-facebook" target='_blank' aria-hidden="true"></a></li>
                <li><a href="" className="fa fa-link" target='_blank' aria-hidden="true"></a></li>
                <li><a href="https://www.github.com/in/Amitpandey2001/" target='_blank' className="fa fa-github" aria-hidden="true"></a></li>
                <li><a href="https://www.linkedin.com/in/amit-pandey2001/" target='_blank' className="fa fa-linkedin" aria-hidden="true"></a></li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="our-team">
              <div className="picture">
                <img src={teamIMG1} alt="signature" className="avatar-preview img-fluid" />
              </div>
              <div className="team-content">
                <h3 className="name">Pratham Nemade</h3>
                <h4 className="title">MERN Developer</h4>
              </div>
              <ul className="social">
                <li><a href="" className="fa fa-facebook" target='_blank' aria-hidden="true"></a></li>
                <li><a href="" className="fa fa-link" target='_blank' aria-hidden="true"></a></li>
                <li><a href="https://www.github.com/in/Amitpandey2001/" target='_blank' className="fa fa-github" aria-hidden="true"></a></li>
                <li><a href="https://www.linkedin.com/in/amit-pandey2001/" target='_blank' className="fa fa-linkedin" aria-hidden="true"></a></li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="our-team">
              <div className="picture">
                <img src={teamIMG2} alt="signature" className="avatar-preview img-fluid" />
              </div>
              <div className="team-content">
                <h3 className="name">Rohit Diwate</h3>
                <h4 className="title">.NET Developer</h4>
              </div>
              <ul className="social">
                <li><a href="" className="fa fa-facebook" aria-hidden="true"></a></li>
                <li><a href="" className="fa fa-link" aria-hidden="true"></a></li>
                <li><a href="https://www.github.com/in/Amitpandey2001/" target='_blank' className="fa fa-github" aria-hidden="true"></a></li>
                <li><a href="https://www.linkedin.com/in/amit-pandey2001/" target='_blank' className="fa fa-linkedin" aria-hidden="true"></a></li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="our-team">
              <div className="picture">
                <img src={teamIMG3} alt="signature" className="avatar-preview img-fluid" />
              </div>
              <div className="team-content">
                <h3 className="name">Hitesh Kadukar</h3>
                <h4 className="title">Ethical Hacker</h4>
              </div>
              <ul className="social">
                <li><a href="" className="fa fa-facebook" target='_blank' aria-hidden="true"></a></li>
                <li><a href="" className="fa fa-link" target='_blank' aria-hidden="true"></a></li>
                <li><a href="https://www.github.com/in/Amitpandey2001/" target='_blank' className="fa fa-github" aria-hidden="true"></a></li>
                <li><a href="https://www.linkedin.com/in/amit-pandey2001/" target='_blank' className="fa fa-linkedin" aria-hidden="true"></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default About;
