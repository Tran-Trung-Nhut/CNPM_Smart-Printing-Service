import { useNavigate } from "react-router-dom";
import school from "../assets/hcmut.png"
import { isVisible } from "@testing-library/user-event/dist/utils";

interface HeaderProps{
    SidebarTrigger: () => void,
    isSidebarVisible: boolean
}

export default function HeaderSPSO({SidebarTrigger, isSidebarVisible}: HeaderProps) {


    return (
      <div 
      className="fixed rounded shadow border-2 flex z-10 bg-white font-mono h-[73px]"
      style={{marginLeft: isSidebarVisible? '200px':'0px',width: isSidebarVisible? '1075px' : '1255px'}}>
        <div className=" flex items-center">
          <div className="space-x-7 flex items-center ">
              <img src={school} alt="school_logo" className="ml-6 size-14"/>
              <button 
              type="button" 
              className={`size-10 flex justify-center items-center font-black px-1 rounded-full  ${isSidebarVisible? 'bg-slate-300': 'bg-white'} ${isSidebarVisible? 'hover:scale-110': 'hover:scale-110'}`} onClick={SidebarTrigger}>
                  <i className="pi pi-bars"/>
              </button>
          </div>
          <div className="flex justify-center">
            <p 
            className="text-3xl font-bold"
            style={{marginLeft: isSidebarVisible?'240px': '320px'}}>Phần mềm in ấn thông minh</p>
          </div>
        </div>
        <div className="justify-end items-center flex mr-8">
        </div>
      </div>
    );
  }

  