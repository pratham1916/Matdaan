import "../styles/Contact.css"
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
      var parent = this.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      var parent = this.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

    // Cleanup function to remove event listeners
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []);
  return (

    <section className="contact" id="contact">
      <div className="voters-banner"></div>
      <div className="container">
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Contact for help !</h3>
            <p className="text">
              Matdaan is happy to help you about all the issues and doubts regarding voting and elections. Feel free to ask anything.
            </p>

            <div className="info">
              <div className="information">
                <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;<p>Nagpur, Maharashtra, India</p>
              </div>
              <div className="information">
                <i className="fas fa-envelope"></i>&nbsp;&nbsp;<p>matdaan@gmail.com</p>
              </div>
              <div className="information">
                <i className="fas fa-phone"></i>&nbsp;&nbsp;<p>999-888-7777</p>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form action="index.html" autocomplete="off">
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input type="text" name="name" className="input" />
                <label>Username</label>
                <span>Username</span>
              </div>
              <div className="input-container">
                <input type="email" name="email" className="input" />
                <label>Email</label>
                <span>Email</span>
              </div>
              <div className="input-container">
                <input type="tel" name="phone" className="input" />
                <label>Phone</label>
                <span>Phone</span>
              </div>
              <div className="input-container textarea">
                <textarea name="message" className="input"></textarea>
                <label>Message</label>
                <span>Message</span>
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
