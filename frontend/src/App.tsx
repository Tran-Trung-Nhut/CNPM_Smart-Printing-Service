import Login from './pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './DefaultLayout';
import ChooseLogin from './pages/ChooseLogin';
import HomeSPSO from './pages/HomeSPSO';
import Student from './pages/Student';
import Printer from './pages/Printer';
import BuyPaper from './pages/BuyPaper';
import ChoosePrinter from './pages/ChoosePrinter';
import Notification from './pages/Notification';
import LearnMore from './pages/LearnMore';
import NotFound from './pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginAsState, userState } from './state';
import Forbidden from './pages/Forbidden';
import { useEffect, useState } from 'react';
import PrintUpload from './pages/PrintUpload';
import PrintHistory from './pages/PrintHistory';

export default function App() {
  const isLoginAs = useRecoilValue(isLoginAsState)
  const [user, setUser] = useRecoilState(userState)
  
  useEffect(() => {
    const userDataString = sessionStorage.getItem('userData');
    const userData =  userDataString ? JSON.parse(userDataString) : null

    if(userData){
      setUser(userData)
    }
  }, [])


  return (
      <Router>
        <Routes>
          <Route path='/' element={<DefaultLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/SPSO' element={<HomeSPSO/>}/>
            <Route path='/SPSO/student' element={<Student/>}/>
            <Route path='/SPSO/printer' element={<Printer/>}/>
            <Route path='/buypaper' element={<BuyPaper/>}/>
            <Route path='/choose-printer' element={<ChoosePrinter/>}/>
            <Route path='/learn-more' element={<LearnMore/>}/>
            <Route path='/printhistory' element={<PrintHistory/>}/>
            <Route path='/print' element={<PrintUpload/>}/>
            <Route 
            path='/SPSO' 
            element={
              <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={user?.role || ''}
              >
              <HomeSPSO/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/student' 
            element={
                  <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={user?.role || ''}
              >
              <Student/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/printer' 
            element={
                  <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={user?.role || ''}
              >
              <Printer/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/notification' 
            element={
                  <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={user?.role || ''}
              >
              <Notification/>
              </ProtectedRoute>
            }/>
          </Route>
          <Route path='/login-as' element={<ChooseLogin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}
