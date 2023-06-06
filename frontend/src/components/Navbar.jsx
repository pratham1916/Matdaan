import React, { useState,useEffect } from 'react';
import styles from '../css/Navbar.module.css'
import {Button} from 'antd'
import {useNavigate} from 'react-router-dom'


const navbutton = {color:"Black",borderRadius:"20px",fontWeight:"600"}
const active = {background: "#EF6603", color:"white", borderRadius:"20px",fontWeight:"600"};


const Navbar = ({setPage, page}) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState();
    const [activeButton, setActiveButton] = useState('');

    const checkAdmin = async (x) => {
        let isAdmin;
        const user = await JSON.parse(localStorage.getItem("matdaan"));
        console.log(isAdmin);
        if (user) {
            setIsAdmin(user.isAdmin);
        }
    };

    const isMenuAllowed = (x) => {
        let permission;
        if (isAdmin) {
            permission = ["Add Candidates", "Verify Voter", "Candidate List", "Admin Result"].includes(x);
        } else if (!isAdmin) {
            permission = ["Contact", "Vote", "User Result", "About"].includes(x);
        }
        return permission;
    };

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
        setPage(buttonName);
    };

    const isButtonActive = (buttonName) => {
        return activeButton === buttonName ? active : navbutton;
    };
    useEffect(() => {
        checkAdmin();
        handleClick("Home");
    },[])



    return (
        <div className={styles.header}>

            <h1><h3 style={{textDecoration:"none",color:"white", paddingLeft: "50px",fontSize:"30px",fontWeight:"600"}}>मतदान !</h3></h1>  

            <div style={{display: "flex", gap: "10px",paddingRight:"65px"}}>
                <Button style={ isButtonActive('Home') } onClick={()=>handleClick("Home")}>Home</Button>
                {isMenuAllowed("Add Candidates") && <Button style={isButtonActive("Add Candidates")} onClick={()=>handleClick("Add Candidates")}>Add Candidates</Button>}
                {isMenuAllowed("Verify Voter") && <Button style={isButtonActive("Verify Voter")} onClick={()=>handleClick("Verify Voter")}>Verify Voter</Button>}
                {isMenuAllowed("Candidate List") && <Button style={isButtonActive("Candidate List")} onClick={()=>handleClick("Candidate List")}>Candidate List</Button>}
                {isMenuAllowed("Admin Result") && <Button style={isButtonActive("Admin Result")} onClick={()=>handleClick("Admin Result")}>Result</Button>}
                {isMenuAllowed("Vote") && <Button style={isButtonActive("Vote")} onClick={()=>handleClick("Vote")}>Vote</Button>}
                {isMenuAllowed("User Result") && <Button style={isButtonActive("User Result")} onClick={()=>handleClick("User Result")}>Result</Button>}
                {isMenuAllowed("Contact") && <Button style={isButtonActive("Contact")} onClick={()=>handleClick("Contact")}>Contact</Button>}
                <Button style={{...navbutton}} onClick={() => { localStorage.removeItem("matdaan"); navigate("/");} }>Logout</Button>
            </div> 
        </div>
    )
};

export default Navbar