import { useNavigate } from "react-router-dom";
import school from "../assets/hcmut.png"


interface HeaderProps{
    SidebarTrigger: () => void,
    isSidebarVisible: boolean
}

export default function HeaderSPSO({SidebarTrigger, isSidebarVisible}: HeaderProps) {


    return (
      <div 
      className="fixed rounded shadow border-2 flex z-10 bg-white font-mono h-[73px]"
      style={{marginLeft: isSidebarVisible? '205px':'0px',width: isSidebarVisible? '1050px' : '1255px'}}>
        <div className=" flex items-center w-[1255px]">
          <div className="space-x-7 flex items-center ">
              <a href="http://localhost:3000/SPSO">
                <img src={school} alt="school_logo" className="ml-6 size-14"/>
              </a>
              <button 
              type="button" 
              className={`size-10 flex justify-center active:scale-90 items-center font-black px-1 rounded-full  ${isSidebarVisible? 'bg-slate-300': 'bg-white'} ${isSidebarVisible? 'hover:scale-110': 'hover:scale-110'}`} onClick={SidebarTrigger}>
                  <i className="pi pi-bars"/>
              </button>
          </div>
          <div className="flex-grow">
            <p 
            className="text-3xl font-bold"
            style={{marginLeft: isSidebarVisible?'240px': '280px'}}>Phần mềm in ấn thông minh</p>
          </div>
          <button 
          className="flex items-center justify-end p-2 rounded border-[2px] space-x-2 mr-5 font-bold hover:scale-110">
            <i className="pi pi-user"
            style={{}}/>
            <p>Tên SPSO</p>
          </button>
        </div>
      </div>
    );
  }

  