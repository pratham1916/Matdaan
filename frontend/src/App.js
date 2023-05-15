
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'; 
import Main from './components/Main'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
