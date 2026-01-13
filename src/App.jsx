import './App.css'
import NavBar from "./NavBar.jsx";
import InteractionInterface from "./InteractionInterface.jsx";
import {useState} from "react";
import GameBoard from "./GameBoard.jsx";

function App() {

    const [currentTab, setCurrentTab] = useState('TeamAndMissionSelectionTab');

    const quitMissionGameBoard = () => {
        setCurrentTab('homeTab');
    }

    const handleStartMission=()=>{
        setCurrentTab('GameBoard');
    }


    const handleHomeClick=()=>{

        setCurrentTab('homeTab');

    }

    const handleManageStaffClick=()=>{

        setCurrentTab('staffManagementTab')


    }
    const handleDevelopmentClick=()=>{

        setCurrentTab('developmentTab');


    }
    const handleMissionSelectionClick=()=>{

        setCurrentTab('TeamAndMissionSelectionTab');


    }

  return (
    <div className="page-default-alignment">

        {currentTab==='GameBoard'?<GameBoard quitMissionGameBoard={quitMissionGameBoard}/>:
            <>
                <NavBar
                    onHomeClick={handleHomeClick}
                    onManageStaffClick={handleManageStaffClick}
                    onDevelopmentClick={handleDevelopmentClick}
                    onMissionSelectionClick={handleMissionSelectionClick}
                    currentTab={currentTab}/>
                <InteractionInterface currentTab={currentTab} handleStartMission={handleStartMission}/>
            </>
        }

    </div>
  )
}

export default App
