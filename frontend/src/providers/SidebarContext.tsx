import { createContext, ReactNode, useContext, useState } from "react";

interface SidebarContextProps{
    visible: boolean;
    TriggerSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const SidebarProvider = ({ children }: {children: ReactNode}) =>{
    const [visible, setVisible] = useState<boolean>(false)

    const TriggerSidebar =  () =>{
        setVisible((previsible) => !previsible)
    }

    return (
        <SidebarContext.Provider value={{visible, TriggerSidebar}}>
            {children}
        </SidebarContext.Provider>
    )

    
}

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
      throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
  };