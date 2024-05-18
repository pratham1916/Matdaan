import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import PrivateRoute from './PrivateRoutes';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import UserVote from "../pages/UserVote";
import UserResult from "../pages/UserResult";
import AdminResult from "../pages/AdminResult";
import VerifyVoters from "../pages/VerifyVoters";
import Candidate from "../pages/Candidate";

interface AllRoutesProps {
    setIsUser: (value: boolean) => void;
}

const AllRoutes = ({ setIsUser }: AllRoutesProps) => {
    const isUser = localStorage.getItem("User");

    return (
        <Routes>
            <Route path="/" element={isUser ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm setIsUser={setIsUser} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
            <Route path="/userVote" element={<PrivateRoute><UserVote /></PrivateRoute>} />
            <Route path="/userResult" element={<PrivateRoute><UserResult /></PrivateRoute>} />
            <Route path="/verifyVoters" element={<PrivateRoute><VerifyVoters /></PrivateRoute>} />
            <Route path="/CandidateInfo" element={<PrivateRoute><Candidate /></PrivateRoute>} />
            <Route path="/adminResult" element={<PrivateRoute><AdminResult /></PrivateRoute>} />
        </Routes>
    );
}

export default AllRoutes;
