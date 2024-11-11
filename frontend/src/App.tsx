import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import MainLayout from './components/MainLayout'; // Import MainLayout
// import { useCookies } from 'react-cookie';

export default function App() {
  const [user, setUser] = useState({ token: null, isSPSO: false, listFiles: [] });
  // const [cookies] = useCookies();

  // useEffect(() => {
  //   const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));

  //   if (!userCredentials) {
  //     setUser({ token: null, isSPSO: false, listFiles: [] });
  //   } else {
  //     setUser({ ...user, ...userCredentials });
  //   }
  // }, [cookies]);

  return (
    // <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainLayout />} /> {/* MainLayout để quản lý các route khác */}
        </Routes>
      </BrowserRouter>
    // </UserContext.Provider>
  );
}
