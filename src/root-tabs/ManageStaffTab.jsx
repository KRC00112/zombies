import React from 'react'
import StaffManagementTabHeader from "../staff-management-components/StaffManagementTabHeader.jsx";
import StaffListAndDetailsController from "../staff-management-components/StaffListAndDetailsController.jsx";
import {useState} from "react";

function ManageStaffTab() {
    const [tab, setTab] = useState('waiting_room');
    const [jsonLocation,setJsonLocation] = useState('waiting_room_members_list');
    const onWaitingRoomTabClick = () => {
        setTab('waiting_room');
        setJsonLocation('waiting_room_members_list')

    }
    const onScoutTeamTabClick = () => {
        setTab('scout_team');
        setJsonLocation('scout_team_members_list')

    }
    const onRandDDeptTabClick = () => {
        setTab('r&d_dept');
        setJsonLocation('r&d_team_members_list')

    }
    const onKitchenStaffTabClick = () => {
        setTab('kitchen_staff');
        setJsonLocation('kitchen_staff_members_list')

    }
    return (
        <div className='management-staff-tab'>
            <StaffManagementTabHeader/>
            <section className='staff-management-tab-body'>

                <ul className='staff-management-tab-list'>
                    <li><button onClick={onWaitingRoomTabClick} className={tab==='waiting_room'?'bg-[#AA076B] text-white':null}>Waiting Room</button></li>
                    <li><button onClick={onScoutTeamTabClick} className={tab==='scout_team'?'bg-[#AA076B] text-white':null}>Scout Team</button></li>
                    <li><button onClick={onRandDDeptTabClick} className={tab==='r&d_dept'?'bg-[#AA076B] text-white':null}>R&D Department</button></li>
                    <li><button onClick={onKitchenStaffTabClick} className={tab==='kitchen_staff'?'bg-[#AA076B] text-white':null}>Kitchen Staff</button></li>
                </ul>
                <StaffListAndDetailsController department={tab} jsonLocation={jsonLocation}/>

            </section>
        </div>
    )
}

export default ManageStaffTab
