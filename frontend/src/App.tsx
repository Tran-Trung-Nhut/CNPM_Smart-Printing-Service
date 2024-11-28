import Login from './pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './DefaultLayout';
import ChooseLogin from './pages/ChooseLogin';
import HomeSPSO from './pages/HomeSPSO';
import Student from './pages/Student';
import Printer from './pages/Printer';
import BuyPaper from './pages/BuyPaperHistory';
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
import PrintingConfiguration from './pages/PrintingConfiguration';
import PrintingComplete from './pages/PrintingComplete';
import BuyPaperHistory from './pages/BuyPaperHistory';

export default function App() {
  const [user, setUser] = useRecoilState(userState)
  const isLoginAs = useRecoilValue(isLoginAsState)
  
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
            <Route 
            path='/buy-paper-history'
            element={
              <ProtectedRoute
                  allowedRoles={["student"]}
                  currentRole={user.role}
              >
              <BuyPaperHistory/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/choose-printer'  
            element={
              <ProtectedRoute
                  allowedRoles={["student"]}
                  currentRole={user.role}
              >
              <HomeSPSO/>
              </ProtectedRoute>
            }/>
            <Route path='/learn-more' element={<LearnMore/>}/>
            <Route 
            path='/printhistory'  
            element={
              <ProtectedRoute
                  allowedRoles={["student"]}
                  currentRole={user.role}
              >
              <PrintHistory/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/print'  
            element={
              <ProtectedRoute
                  allowedRoles={["student"]}
                  currentRole={user.role}
              >
              <PrintUpload/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/print-config'
            element={
              <ProtectedRoute
                  allowedRoles={["student"]}
                  currentRole={user.role}
              >
              <PrintingConfiguration/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/print-complete' 
            element={
              <ProtectedRoute
                  allowedRoles={["student"]}
                  currentRole={user.role}
              >
              <PrintingComplete/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO' 
            element={
              <ProtectedRoute
                  allowedRoles={["spso"]}
                  currentRole={user.role}
              >
              <HomeSPSO/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/student' 
            element={
                  <ProtectedRoute
                  allowedRoles={["spso"]}
                  currentRole={user.role}
              >
              <Student/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/printer' 
            element={
                  <ProtectedRoute
                  allowedRoles={["spso"]}
                  currentRole={user.role}
              >
              <Printer/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/notification' 
            element={
                  <ProtectedRoute
                  allowedRoles={["spso"]}
                  currentRole={user.role}
              >
              <Notification/>
              </ProtectedRoute>
            }/>
          </Route>
          <Route path='/login-as' element={<ChooseLogin/>}/>
          <Route path='/login' element={
              <ProtectedRoute
                  allowedRoles={["student","spso"]}
                  currentRole={isLoginAs}
              >
              <Login/>
              </ProtectedRoute>
            }/>
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}
