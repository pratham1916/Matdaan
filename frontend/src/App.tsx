import AllRoutes from './AllRoutes/AllRoutes'
import './App.css'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';

function App() {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("User");
    setIsUser(!!userData);
  }, []);

  return (
    <div className="app">
      {isUser && <Navbar setIsUser={setIsUser} />}
      <AllRoutes setIsUser={setIsUser}/>
    </div>
  );
}

export default App;