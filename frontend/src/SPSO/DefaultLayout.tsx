import { useEffect, useRef, useState } from "react";
import HeaderSPSO from "./HeaderSPSO";
import SidebarClone from "./SideBarClone";
import { Outlet } from "react-router-dom";
import { useSidebar } from "../providers/SidebarContext";

export default function DefaultLayout(){

    const {visible, TriggerSidebar} = useSidebar()

    return(
        <div 
        className="flex justify-center space-x-3 z-1 drop-shadow-lg [background-image:linear-gradient(-90deg,_#6fb1fc,_#4364f7_50%,_#0052d4)]"
        style={{width:'100%', height: '100%'}}>
            <HeaderSPSO SidebarTrigger={TriggerSidebar} isSidebarVisible={visible}/>
            <SidebarClone visible={visible} setVisible={TriggerSidebar}/>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}