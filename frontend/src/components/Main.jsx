import React, {useState} from "react";
import Navbar from './Navbar';
import Home from '../Pages/Home';
import About from '../Pages/About';
import AddCandidates from '../Pages/AddCandidates';
import VerifyVoter from '../Pages/VerifyVoter';
import CandidateList from '../Pages/CandidateList';
import AdminResult from '../Pages/AdminResult';
import Vote from '../Pages/Vote';
import UserResult from '../Pages/UserResult';
import Contact from '../Pages/Contact'
import styles from '../css/Main.module.css'
import Footer from './Footer';


const Main = () => {
    const [page, setPage] = useState("Home");
    return (
        <>
        <Navbar setPage={setPage} page={page} />
        <div className={styles.bodyx} style={{width: "99.9%", height: "450px", border:"1px solid white"}}>
            <h1 style={{padding:"100px 0 0 490px ",fontSize:"40px"}}>Welcome to Voting Portal</h1>
            <p style={{margin:"30px 300px 0 370px",fontWeight:"600",textAlign:"justify"}}>Your voices are being heard and you are proving to our ancestors that their struggles were not in vain. Now we have one more thing we need to do to walk in our true power, and that is to vote.</p>
        </div>
        {page === "Home" && <Home/> }
        {page === "About" && <About/> }
        {page === "Add Candidates" && <AddCandidates/> }
        {page === "Verify Voter" && <VerifyVoter/> }
        {page === "Candidate List" && <CandidateList/> }
        {page === "Admin Result" && <AdminResult/> }
        {page === "Vote" && <Vote/> }
        {page === "User Result" && <UserResult/> }
        {page === "Contact" && <Contact/> }
        <Footer/>
        </>
    )
}
export default Main;