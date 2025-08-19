import './App.css'
import SideBar from "./SideBar.jsx";
import InteractionInterface from "./InteractionInterface.jsx";
import {useState} from "react";

function App() {

    const [currentTab, setCurrentTab] = useState('homeTab');

    const handleHomeClick=()=>{

        setCurrentTab('homeTab');

    }

    const handleManageStaffClick=()=>{

        setCurrentTab('staffManagementTab')


    }
    const handleDevelopmentClick=()=>{

        setCurrentTab('developmentTab');


    }

  return (
    <div className="page-default-alignment">
        <SideBar
            onHomeClick={handleHomeClick}
            onManageStaffClick={handleManageStaffClick}
            onDevelopmentClick={handleDevelopmentClick}
            currentTab={currentTab}/>
        <InteractionInterface currentTab={currentTab}/>
    </div>
  )
}

export default App
