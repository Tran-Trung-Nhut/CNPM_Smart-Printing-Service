import Login from './pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './DefaultLayout';
import ChooseLogin from './pages/ChooseLogin';
import HomeSPSO from './pages/HomeSPSO';
import Student from './pages/Student';
import Printer from './pages/Pritnter';
import Notification from './pages/Notification';
import LearnMore from './pages/LearnMore';
import NotFound from './pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { useRecoilValue } from 'recoil';
import { isLoginAsState } from './state';
import Forbidden from './pages/Forbidden';


function App() {
  const isLoginAs = useRecoilValue(isLoginAsState)
  
  return (
      <Router>
        <Routes>
          <Route path='/' element={<DefaultLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/learn-more' element={<LearnMore/>}/>
            <Route 
            path='/SPSO' 
            element={
              <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={isLoginAs}
              >
              <HomeSPSO/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/student' 
            element={
                  <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={isLoginAs}
              >
              <Student/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/printer' 
            element={
                  <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={isLoginAs}
              >
              <Printer/>
              </ProtectedRoute>
            }/>
            <Route 
            path='/SPSO/notification' 
            element={
                  <ProtectedRoute
                  allowedRoles={["SPSO"]}
                  currentRole={isLoginAs}
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

export default App;
