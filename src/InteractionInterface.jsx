import React, {useEffect, useState} from 'react'
import HomeTab from "./root-tabs/HomeTab.jsx";
import ManageStaffTab from "./root-tabs/ManageStaffTab.jsx";
import DevelopmentTab from "./root-tabs/DevelopmentTab.jsx";

function calculateDeptLevel(total_points){

    return Math.min(100, Math.floor(total_points / 60))
}


function InteractionInterface({currentTab}) {
    const [fullDataset, setFullDataset] = useState([]);

    const waitRoomList=fullDataset.filter((object) => {return object.department==='waiting_room';})
    const scoutTeamList=fullDataset.filter((object) => {return object.department==='scout_team';})
    const rAndDdeptList=fullDataset.filter((object) => {return object.department==='r&d_dept';})
    const kitchenStaffList=fullDataset.filter((object) => {return object.department==='kitchen_staff';})
    const [fullDevelopmentDataset, setFullDevelopmentDataset] = useState([]);




    const changeDevelopmentStatus=(itemDevelopmentStatus,itemName)=>{
        console.log(itemName);
        if(itemDevelopmentStatus!=='unmet_requirements'){
            if(itemDevelopmentStatus==='not_started'){

                setFullDevelopmentDataset(
                    fullDevelopmentDataset.map((obj) => {
                        if (obj.name === itemName) {
                            return { ...obj, development_status: "developing" };
                        } else {
                            return obj;
                        }
                    })
                );
            }else{
                setFullDevelopmentDataset(
                    fullDevelopmentDataset.map((obj) => {
                        if (obj.name === itemName) {
                            return { ...obj, development_status: "not_started" };
                        } else {
                            return obj;
                        }
                    })
                );
            }


        }

    }
    useEffect(()=>{

        fetch(`/all_developments.json`)
            .then((res) => {
                if(!res.ok) {
                    return
                }
                return res.json()
            })
            .then((data) => setFullDevelopmentDataset(data))
            .catch((err) => console.log(err));
    },[])


    const scoutTeamSkillAggregatePoints=scoutTeamList.reduce((accu,currentVal)=>{
        accu=accu+currentVal.scoutSkill
        return accu;
    },0)
    const rAndDdeptSkillAggregatePoints=rAndDdeptList.reduce((accu,currentVal)=>{
        accu=accu+currentVal.rdSkill
        return accu;
    },0)
    const kitchenStaffSkillAggregatePoints=kitchenStaffList.reduce((accu,currentVal)=>{
        accu=accu+currentVal.cookingSkill
        return accu;
    },0)


    const tabsInfo={
        'waiting_room':['Waiting Room',waitRoomList.length,'Waiting Room',0],
        'scout_team':['Scout Team',scoutTeamList.length, 'Scout  Team',calculateDeptLevel(scoutTeamSkillAggregatePoints)],
        'r&d_dept':['Research And Development Department',rAndDdeptList.length, 'R&D Dept',calculateDeptLevel(rAndDdeptSkillAggregatePoints)],
        'kitchen_staff':['Kitchen Staff',kitchenStaffList.length, 'Kitchen Staff',calculateDeptLevel(kitchenStaffSkillAggregatePoints)],
    }




    const handleKickOutClick=(memberId)=>{
        setFullDataset(fullDataset.filter(member=>member.id !== memberId))
    }

    const handleTeamTransfer=(memberId,departmentName)=>{

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
    useEffect(()=>{

        fetch(`/all_depts.json`)
            .then((res) => res.json())
            .then((data) => setFullDataset(data))
    },[])

    return (
        <div className='set-width-100 '>
            {currentTab==='homeTab' && <HomeTab />}
            {currentTab==='staffManagementTab' && <ManageStaffTab
                handleKickOutClick={handleKickOutClick}
                handleTeamTransfer={handleTeamTransfer}
                fullDataset={fullDataset}
                tabsInfo={tabsInfo}/>}

            {currentTab==='developmentTab' && <DevelopmentTab
                rAndDLevel={tabsInfo['r&d_dept'][3]}
                scoutTeamLevel={tabsInfo['scout_team'][3]}
                kitchenStaffLevel={tabsInfo['kitchen_staff'][3]}
                fullDevelopmentDataset={fullDevelopmentDataset}
                changeDevelopmentStatus={changeDevelopmentStatus}/>}
        </div>
    )
}

export default InteractionInterface
