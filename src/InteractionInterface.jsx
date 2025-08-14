import React from 'react'
import HomeTab from "./root-tabs/HomeTab.jsx";
import ManageStaffTab from "./root-tabs/ManageStaffTab.jsx";
import DevelopmentTab from "./root-tabs/DevelopmentTab.jsx";
function InteractionInterface({currentTab}) {
    return (
        <div className='set-width-100 '>
            {currentTab==='homeTab' && <HomeTab />}
            {currentTab==='staffManagementTab' && <ManageStaffTab />}
            {currentTab==='developmentTab' && <DevelopmentTab />}
        </div>
    )
}

export default InteractionInterface
