import Login from './pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './SPSO/DefaultLayout';
import Student from './pages/Student';
import { SidebarProvider } from './providers/SidebarContext';
import StudentHistory from './pages/StudentHistory';
import Printer from './pages/Printer';
import PrinterHistory from './pages/PrinterHistory';
import Notifications from './pages/Notification';


function App() {
  
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/SPSO' element={<DefaultLayout/>}>
            <Route path='students' element={<Student/>}/>
            <Route path='printers' element={<Printer/>}/>
            <Route path='printers-printing-history' element={<PrinterHistory/>}/>
            <Route path='students-printing-history' element={<StudentHistory/>}/>
            <Route path='notifications' element={<Notifications/>}/>
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
