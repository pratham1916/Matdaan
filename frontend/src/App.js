import { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './components/Landing'; 
import Main from './components/Main'

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("matdaan"));
    const currentPath = window.location.pathname;
    if (user) {
      if (currentPath === '/') {
        navigate('/home');
      }
    } else if (currentPath === '/home') {
      navigate('/');
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/home' element={<Main />} />
      </Routes>
    </>
  );
}

export default App;