import React, { useState,useEffect } from 'react';
import styles from '../css/Navbar.module.css'
import {Button} from 'antd'
 import isMenuAllowed from './utils';

const Navbar = ({setPage, page}) => {
    return (
        <div className={styles.header}>

    <div class="logo">
        <h1><a href="#">मतदान !</a></h1>
    </div>  

    <div style={{display: "flex", gap: "10px"}}>
            <Button onClick={()=>setPage("Home")}>Home</Button>
            {isMenuAllowed("About") && <Button onClick={()=>setPage("About")}>About</Button>}
            {isMenuAllowed("Add Candidates") && <Button onClick={()=>setPage("Add Candidates")}>Add Candidates</Button>}
            {isMenuAllowed("Verify Voter") && <Button onClick={()=>setPage("Verify Voter")}>Verify Voter</Button>}
            {isMenuAllowed("Candidate List") && <Button onClick={()=>setPage("Candidate List")}>Candidate List</Button>}
            {isMenuAllowed("Admin Result") && <Button onClick={()=>setPage("Admin Result")}>Result</Button>}
            {isMenuAllowed("Vote") && <Button onClick={()=>setPage("Vote")}>Vote</Button>}
            {isMenuAllowed("User Result") && <Button onClick={()=>setPage("User Result")}>Result</Button>}
            {isMenuAllowed("Contact") && <Button onClick={()=>setPage("Contact")}>Contact</Button>}
            <Button>Logout</Button>
        </div> 
            

        </div>
    )
};

export default Navbar;