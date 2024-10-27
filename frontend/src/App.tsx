import { useState } from 'react';
import Login from './pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './SPSO/DefaultLayout';
import Student from './pages/Student';
import { SidebarProvider } from './providers/SidebarContext';
import StudentHistory from './pages/StudentHistory';

function App() {
    return (
        <SidebarProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/SPSO" element={<DefaultLayout />}>
                        <Route path="students" element={<Student />} />
                        <Route path="printers" element />
                        <Route path="printers-printing-history" element />
                        <Route path="students-printing-history" element={<StudentHistory />} />
                        <Route path="informs" element />
                    </Route>
                </Routes>
            </Router>
        </SidebarProvider>
    );
}

export default App;
