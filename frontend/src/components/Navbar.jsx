import React, { useState,useEffect } from 'react';
import styles from '../css/Navbar.module.css'
import {Button} from 'antd'
 import isMenuAllowed from './utils';

const navbutton = {color:"Black",borderRadius:"20px",fontWeight:"600"}


const Navbar = ({setPage, page}) => {
    return (
        <div className={styles.header}>

    <div class="logo">
        <h1><a style={{textDecoration:"none",color:"white"}} href="#">मतदान !</a></h1>
    </div>  

    <div style={{display: "flex", gap: "10px"}}>
            <Button style={{...navbutton}} onClick={()=>setPage("Home")}>Home</Button>
            {isMenuAllowed("About") && <Button onClick={()=>setPage("About")}>About</Button>}
            {isMenuAllowed("Add Candidates") && <Button style={{...navbutton}} onClick={()=>setPage("Add Candidates")}>Add Candidates</Button>}
            {isMenuAllowed("Verify Voter") && <Button style={{...navbutton}} onClick={()=>setPage("Verify Voter")}>Verify Voter</Button>}
            {isMenuAllowed("Candidate List") && <Button style={{...navbutton}} onClick={()=>setPage("Candidate List")}>Candidate List</Button>}
            {isMenuAllowed("Admin Result") && <Button style={{...navbutton}} onClick={()=>setPage("Admin Result")}>Result</Button>}
            {isMenuAllowed("Vote") && <Button style={{...navbutton}} onClick={()=>setPage("Vote")}>Vote</Button>}
            {isMenuAllowed("User Result") && <Button style={{...navbutton}} onClick={()=>setPage("User Result")}>Result</Button>}
            {isMenuAllowed("Contact") && <Button style={{...navbutton}} onClick={()=>setPage("Contact")}>Contact</Button>}
            <Button style={{...navbutton}}>Logout</Button>
        </div> 
            

        </div>
    )
};

export default Navbar;