import { useEffect, useRef, useState } from "react";
import HeaderSPSO from "../components/HeaderSPSO";
import SidebarClone from "./SideBarClone";
import { Outlet, useLocation } from "react-router-dom";
import { useSidebar } from "../providers/SidebarContext";

export default function DefaultLayout(){

    const {visible, TriggerSidebar} = useSidebar()
    const location = useLocation()

    const isRootRoute = location.pathname === "/SPSO"

    return(
        <div 
        className="flex justify-center space-x-3 z-1 drop-shadow-lg [background-image:linear-gradient(-90deg,_#6fb1fc,_#4364f7_50%,_#0052d4)] min-h-screen"
        style={{width:'100%'}}>
            <HeaderSPSO SidebarTrigger={TriggerSidebar} isSidebarVisible={visible}/>
            <SidebarClone visible={visible} setVisible={TriggerSidebar}/>
            {isRootRoute && (
                <div
                className={`${visible? 'pl-[200px]':'pl-[0px]'} font-mono absolute text-white text-4xl font-bold pt-[240px] flex-col space-y-2`}>
                <p className=" text-6xl">Chào mừng Nhựt đã trở lại!</p>
                <p className="text-center text-lg">Cùng quản lý công việc thôi nào!</p>
                </div>
            )}
            <Outlet></Outlet>
        </div>
    )
}