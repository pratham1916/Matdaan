import React, { useState, useEffect } from 'react';
import '../Styles/Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { pathname } = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);


    return (
        <header className="header" id='nav-menu'>
            <Link to="/" className="logo">मतदान<span> !</span></Link>
            <nav className={`navbar ${isOpen ? "showMenu" : ""}`}>
                <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
                <Link to="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>About</Link>
                <Link to="/vote" className={`nav-link ${pathname === '/vote' ? 'active' : ''}`} onClick={closeMenu}>Vote</Link>
                <Link to="/result" className={`nav-link ${pathname === '/result' ? 'active' : ''}`} onClick={closeMenu}>Result</Link>
                <Link to="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} onClick={closeMenu}>Contact</Link>

                {isLoggedIn ? (
                    <div className="login-register-in">
                        <Link className="nav-link login">Logout</Link>
                    </div>
                ) : (
                    <div className="login-register-in">
                        <Link to="/login" className="nav-link login" onClick={closeMenu}>Login</Link>
                    </div>
                )}
            </nav>
            {isLoggedIn ? (
                <div className="login-register" >
                    <Link className="nav-link login">Logout</Link>
                </div>
            ) : (
                <div className="login-register">
                    <Link to="/login" className="nav-link login" onClick={closeMenu}>Login</Link>
                </div>
            )}
            <i className='bx bx-menu' id="menu-icon" onClick={toggleMenu}></i>
        </header>
    );
};

export default Navbar;
