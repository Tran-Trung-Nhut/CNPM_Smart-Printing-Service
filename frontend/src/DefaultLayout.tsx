import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function DefaultLayout(){

    const location = useLocation()


    return(
        <div className="z-1 min-h-screen flex flex-col [background-image:linear-gradient(-90deg,_#6fb1fc,_#4364f7_50%,_#0052d4)]"> 
            <Header/>
            <Outlet />
            <Footer/>
        </div>
    )
}