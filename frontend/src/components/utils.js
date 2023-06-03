import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

let isAdmin = null;

const checkAdmin = async() => {
    const user = await JSON.parse(localStorage.getItem("matdaan"));
    if (user) {
        isAdmin = user.isAdmin;
    } else {
        isAdmin = null
    }
    isLoggedIn()
}
const isLoggedIn = () => {
    if (isAdmin != null) return <Outlet/>;
    else  <Navigate to="/home"/>;
}

const isMenuAllowed  = (x) => {
    let permission;
    if (isAdmin) {
        permission = ["Add Candidates", "Verify Voter", "Candidate List", "Admin Result"].includes(x);
    } else if (!isAdmin) {
        permission = ["Contact", "Vote", "User Result", "About"].includes(x);
    }
    return permission;
}

export {isMenuAllowed , checkAdmin, isLoggedIn};