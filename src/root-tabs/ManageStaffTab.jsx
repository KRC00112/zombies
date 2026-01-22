import StaffManagementTabHeader from "../staff-management-components/StaffManagementTabHeader.jsx";
import StaffListAndDetailsController from "../staff-management-components/StaffListAndDetailsController.jsx";
import {useMemo, useState} from "react";

function ManageStaffTab({handleKickOutClick,handleTeamTransfer,fullDataset,tabsInfo}) {
    const [tab, setTab] = useState('waiting_room');


    const dropDownOptions = ["Alphabetical", "Scouting skills", "R&D skills", "Cooking skills", "Life"];
    const [dropDownValue, setDropDownValue] = useState(dropDownOptions[0]);


    const onSelection=(e)=>{
        setDropDownValue(e.target.value)

    }

    const sortedData= useMemo(() => {
        if(dropDownValue===dropDownOptions[0]){
            return [...fullDataset].sort((a, b) => a.name.localeCompare(b.name));
        }
        if(dropDownValue===dropDownOptions[1]){
            return [...fullDataset].sort((a, b) => b.scoutSkill-a.scoutSkill);
        }
        if(dropDownValue===dropDownOptions[2]){
            return [...fullDataset].sort((a, b) => b.rdSkill-a.rdSkill);
        }
        if(dropDownValue===dropDownOptions[3]){
            return [...fullDataset].sort((a, b) => b.cookingSkill-a.cookingSkill);
        }
        if(dropDownValue===dropDownOptions[4]){
            return [...fullDataset].sort((a, b) => b.life-a.life);
        }

        return fullDataset
       }, [dropDownValue,fullDataset]);


    const onTabClick = (departmentName) => {
        setTab(departmentName);
        if(departmentName === "waiting_room"){
            setDropDownValue(dropDownOptions[0]);
        }if(departmentName === "scout_team"){
            setDropDownValue(dropDownOptions[1]);
        }if(departmentName === "r&d_dept"){
            setDropDownValue(dropDownOptions[2]);
        }if(departmentName === "kitchen_staff"){
            setDropDownValue(dropDownOptions[3]);
        }


    }

    return (
        <div className='management-staff-tab'>
            <StaffManagementTabHeader/>
            <section className='staff-management-tab-body'>
                <ul className='staff-management-department-tab-list'>
                    <li><button onClick={()=>onTabClick('waiting_room')} className={tab==='waiting_room'?'bg-black text-white':''}>Waiting Room</button></li>
                    <li><button onClick={()=>onTabClick('scout_team')} className={tab==='scout_team'?'bg-black text-white':''}>Scout Team</button></li>
                    <li><button onClick={()=>onTabClick('r&d_dept')} className={tab==='r&d_dept'?'bg-black text-white':''}>R&D Department</button></li>
                    <li><button onClick={()=>onTabClick('kitchen_staff')} className={tab==='kitchen_staff'?'bg-black text-white':''}>Kitchen Staff</button></li>
                </ul>
                <StaffListAndDetailsController
                    departmentTab={tab}
                    fullDataset={sortedData}
                    onKickOutClick={handleKickOutClick}
                    onTransferToTeamClick={handleTeamTransfer}
                    handleSelection={onSelection}
                    dropDownValue={dropDownValue}
                    dropDownOptions={dropDownOptions}
                    tabsInfo={tabsInfo}/>
            </section>
        </div>
    )
}

export default ManageStaffTab
