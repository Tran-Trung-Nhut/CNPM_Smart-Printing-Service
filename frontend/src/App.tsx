import Login from './pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './DefaultLayout';
import ChooseLogin from './pages/ChooseLogin';
import HomeSPSO from './pages/HomeSPSO';
import Student from './pages/Student';
import Printer from './pages/Pritnter';
import BuyPaper from './pages/BuyPaper';
import ChoosePrinter from './pages/ChoosePrinter';


function App() {
  
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
          </Route>
          <Route path='/login-as' element={<ChooseLogin/>}/>
          <Route path='/login' element={<Login/>}/>

        </Routes>
      </Router>
  );
}

export default App;
