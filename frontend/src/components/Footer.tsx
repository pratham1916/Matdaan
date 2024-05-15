import '../styles/Footer.css';

interface FooterProps {
    setIsUser: (value: boolean) => void;
}

const Footer = ({ setIsUser }: FooterProps) => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h1><span>मतदान !</span></h1>
                    <p>Voting is the expression of our commitment to ourselves, one another, this country, and this world.</p>
                </div>
                <div className="footer-links">
                    <div className="link-section">
                        <h4>Services</h4>
                        <p>Register to Vote</p>
                        <p>Check Registration</p>
                        <p>Election Dates</p>
                        <p>Voter Education</p>
                    </div>
                    <div className="link-section">
                        <h4>About</h4>
                        <p>Our Mission</p>
                        <p>FAQ</p>
                        <p>Contact</p>
                        <p>Support</p>
                    </div>
                    <div className="link-section">
                        <h4>Legal</h4>
                        <p>Terms of Use</p>
                        <p>Privacy Policy</p>
                        <p>Accessibility</p>
                    </div>
                    <div className="link-section">
                        <h4>Follow</h4>
                        <div><p><i className="fa-brands fa-instagram"></i></p><span>Instagram</span></div>
                        <div><p><i className="fa-brands fa-twitter"></i></p><span>Twitter</span></div>
                        <div><p><i className="fa-brands fa-facebook"></i></p><span>Facebook</span></div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer-info">
                <p>© 2024 Election Board. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
