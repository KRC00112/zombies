import React, {useEffect} from 'react'
import StaffManagementTabHeader from "../staff-management-components/StaffManagementTabHeader.jsx";
import StaffListAndDetailsController from "../staff-management-components/StaffListAndDetailsController.jsx";
import {useState} from "react";

function ManageStaffTab() {
    const [tab, setTab] = useState('waiting_room');
    const [fullDataset, setFullDataset] = useState([]);
    useEffect(()=>{

        fetch(`/all_depts.json`)
            .then((res) => res.json())
            .then((data) => setFullDataset(data))
    },[])
    const onWaitingRoomTabClick = () => {
        setTab('waiting_room');


    }
    const onScoutTeamTabClick = () => {
        setTab('scout_team');


    }
    const onRandDDeptTabClick = () => {
        setTab('r&d_dept');


    }
    const onKitchenStaffTabClick = () => {
        setTab('kitchen_staff');

    }

    const handleKickOutClick=(memberId)=>{
        setFullDataset(fullDataset.filter(member=>member.id !== memberId))
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
                <StaffListAndDetailsController departmentTab={tab} fullDataset={fullDataset} onKickOutClick={handleKickOutClick}/>

            </section>
        </div>
    )
}

export default ManageStaffTab
