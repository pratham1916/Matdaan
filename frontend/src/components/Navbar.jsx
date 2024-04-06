import React, { useState, useEffect } from 'react';
import '../Styles/Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [pathname]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        closeMenu();
        navigate('/');
    };

    return (
        <header className={`header ${isOpen ? "open" : ""}`} id='nav-menu'>
            <Link to="/" className="logo">Geo<span> Data</span></Link>
            <nav className={`navbar ${isOpen ? "showMenu" : ""}`}>
                <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
                <Link to="/mapView" className={`nav-link ${pathname === '/mapView' ? 'active' : ''}`} onClick={closeMenu}>Map View</Link>
                <Link to="/upload" className={`nav-link ${pathname === '/upload' ? 'active' : ''}`} onClick={closeMenu}>Upload</Link>

                {isLoggedIn ? (
                    <div className="login-register-in" onClick={handleLogout}>
                        <Link className="nav-link login">Logout</Link>
                    </div>
                ) : (
                    <div className="login-register-in">
                        <Link to="/login" className="nav-link login" onClick={closeMenu}>Login</Link>
                    </div>
                )}
            </nav>
            {isLoggedIn ? (
                <div className="login-register" onClick={handleLogout}>
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
