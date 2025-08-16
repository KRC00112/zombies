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
    const onTabClick = (departmentName) => {
        setTab(departmentName);

    }

    const handleKickOutClick=(memberId)=>{
        setFullDataset(fullDataset.filter(member=>member.id !== memberId))
    }

    const handleTeamTransfer=(memberId,departmentName)=>{
        // const object=fullDataset.find(obj=>obj.id===memberId)
        // setFullDataset(f=>f.filter(member=>member!== object))
        // setFullDataset(f=>[...f,{...object,department:departmentName}])

        console.log(memberId, departmentName);
        setFullDataset(
            fullDataset.map((obj) => {
                if (obj.id === memberId) {
                    return { ...obj, department: departmentName };
                } else {
                    return obj;
                }
            })
        );
    }
    return (
        <div className='management-staff-tab'>
            <StaffManagementTabHeader/>
            <section className='staff-management-tab-body'>

                <ul className='staff-management-tab-list'>
                    <li><button onClick={()=>onTabClick('waiting_room')} className={tab==='waiting_room'?'bg-[#AA076B] text-white':null}>Waiting Room</button></li>
                    <li><button onClick={()=>onTabClick('scout_team')} className={tab==='scout_team'?'bg-[#AA076B] text-white':null}>Scout Team</button></li>
                    <li><button onClick={()=>onTabClick('r&d_dept')} className={tab==='r&d_dept'?'bg-[#AA076B] text-white':null}>R&D Department</button></li>
                    <li><button onClick={()=>onTabClick('kitchen_staff')} className={tab==='kitchen_staff'?'bg-[#AA076B] text-white':null}>Kitchen Staff</button></li>
                </ul>
                <StaffListAndDetailsController
                    departmentTab={tab}
                    fullDataset={fullDataset}
                    onKickOutClick={handleKickOutClick}
                    onTransferToTeamClick={handleTeamTransfer}/>
            </section>
        </div>
    )
}

export default ManageStaffTab
