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
import { useRecoilValue } from 'recoil';
import { isLoginAsState } from './state';
import Forbidden from './pages/Forbidden';

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

function App() {
  const isLoginAs = useRecoilValue(isLoginAsState)
  
  return (
      <Router>
        <Routes>
          <Route path='/' element={<DefaultLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/SPSO' element={<HomeSPSO/>}/>
            <Route path='/SPSO/student' element={<Student/>}/>
            <Route path='/SPSO/printer' element={<Printer/>}/>
            <Route path='/buypaper' element={<BuyPaper/>}/>
            <Route path='/choose' element={<ChoosePrinter/>}/>
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
