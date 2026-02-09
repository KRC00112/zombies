import React from 'react'

function NavBar({onHomeClick,onManageStaffClick,onDevelopmentClick,onMissionSelectionClick,currentTab}) {



    return (

            <ul className='nav-bar'>
                <li><button className={currentTab==='TeamAndMissionSelectionTab'?"selected bg-white text-black font-bold":''} onClick={onMissionSelectionClick}>Missions</button></li>
                <li><button className={currentTab==='homeTab'?"selected bg-white text-black font-bold":''} onClick={onHomeClick}>Home</button></li>
                <li><button className={currentTab==='staffManagementTab'?"selected bg-white text-black font-bold":''} onClick={onManageStaffClick}>Manage Staff</button></li>
                <li><button className={currentTab==='developmentTab'?"selected bg-white text-black font-bold":''} onClick={onDevelopmentClick}>Development</button></li>
            </ul>
    )
}

export default NavBar
