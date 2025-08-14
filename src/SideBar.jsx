import React from 'react'

function SideBar({onHomeClick,onManageStaffClick,onDevelopmentClick,currentTab}) {



    return (
            <ul className='side-bar'>
                <li><button className={currentTab==='homeTab'?"bg-[#a448f7] text-white font-bold":null} onClick={onHomeClick}>Home</button></li>
                <li><button className={currentTab==='staffManagementTab'?"bg-[#a448f7] text-white font-bold":null} onClick={onManageStaffClick}>Manage Staff</button></li>
                <li><button className={currentTab==='developmentTab'?"bg-[#a448f7] text-white font-bold":null} onClick={onDevelopmentClick}>Development</button></li>
            </ul>
    )
}

export default SideBar
