import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Dropdown, Modal } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import "../styles/Navbar.css";

interface NavbarProps {
    setIsUser: (value: boolean) => void;
}

const Navbar = ({ setIsUser }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const userData = localStorage.getItem("User");
    const user = userData ? JSON.parse(userData) : null;
    const isAdmin = user && user.role === 'admin';
    const isUser = user && user.role === 'user';

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.pageYOffset > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showLogoutModal = () => setLogoutModalVisible(true);
    const handleCancelLogout = () => setLogoutModalVisible(false);

    const handleConfirmLogout = () => {
        localStorage.removeItem("User");
        localStorage.removeItem("token");
        navigate('/login');
        setIsUser(false);
    };

    const userMenu = (
        <Menu className="user-menu">
            <Menu.Item key="1" icon={<UserOutlined />} className="user-menu-item">
                <div className="user-details">
                    {user && (
                        <>
                            <div className="user-detail"><strong>Full Name: </strong>{user.fullname}</div>
                            <div className="user-detail"><strong>Email: </strong>{user.email}</div>
                            <div className="user-detail"><strong>Phone Number: </strong>{user.phone}</div>
                            <div className="user-detail"><strong>Voter Id: </strong>{user.voterId}</div>
                        </>
                    )}
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2" icon={<LogoutOutlined />} onClick={showLogoutModal} className="logout-menu-item">
                <strong>Logout</strong>
            </Menu.Item>
        </Menu>
    );

    return (
        <header className={`navbar-header ${isMenuOpen ? "navbar-open" : ""} ${isScrolled ? "navbar-sticky" : ""}`} id='nav-menu'>
            <Link to="/" className="navbar-logo" onClick={closeMenu}>मतदान !</Link>
            <nav className={`navbar ${isMenuOpen ? "navbar-expanded" : ""}`}>
                <Link to="/home" className={`navbar-link ${location.pathname === "/home" ? "active" : ""}`} onClick={closeMenu}>Home</Link>
                {isUser && (
                    <>
                        <Link to="/about" className={`navbar-link ${location.pathname === "/about" ? "active" : ""}`} onClick={closeMenu}>About</Link>
                        <Link to="/UserVote" className={`navbar-link ${location.pathname === "/UserVote" ? "active" : ""}`} onClick={closeMenu}>Vote</Link>
                        <Link to="/UserResult" className={`navbar-link ${location.pathname === "/UserResult" ? "active" : ""}`} onClick={closeMenu}>Result</Link>
                        <Link to="/contact" className={`navbar-link ${location.pathname === "/contact" ? "active" : ""}`} onClick={closeMenu}>Contact</Link>
                    </>
                )}
                {isAdmin && (
                    <>
                        <Link to="/verifyVoters" className={`navbar-link ${location.pathname === "/verifyVoters" ? "active" : ""}`} onClick={closeMenu}>Verify Voters</Link>
                        <Link to="/addCandidate" className={`navbar-link ${location.pathname === "/addCandidate" ? "active" : ""}`} onClick={closeMenu}>Add Candidate</Link>
                        <Link to="/candidateList" className={`navbar-link ${location.pathname === "/candidateList" ? "active" : ""}`} onClick={closeMenu}>Candidate List</Link>
                        <Link to="/adminResult" className={`navbar-link ${location.pathname === "/adminResult" ? "active" : ""}`} onClick={closeMenu}>Admin Result</Link>
                    </>
                )}
                <Dropdown overlay={userMenu} className="user-dropdown" placement="bottom">
                    <a className="dropdown-link" onClick={e => e.preventDefault()}>
                        <i className="fa-solid fa-user-tie"></i>
                    </a>
                </Dropdown>
            </nav>
            <i className="fa-solid fa-bars navbar-menu-icon" onClick={toggleMenu}></i>
            <Modal
                title="Confirm Logout"
                style={{ top: 50 }}
                visible={logoutModalVisible}
                onOk={handleConfirmLogout}
                onCancel={handleCancelLogout}
                okText="Logout"
                cancelText="Cancel"
            >
                Are you sure you want to logout?
            </Modal>
        </header>
    );
};

export default Navbar;
