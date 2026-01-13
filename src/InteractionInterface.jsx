import React, {useEffect, useState} from 'react'
import HomeTab from "./root-tabs/HomeTab.jsx";
import ManageStaffTab from "./root-tabs/ManageStaffTab.jsx";
import DevelopmentTab from "./root-tabs/DevelopmentTab.jsx";
import TeamAndMissionSelectTab from "./root-tabs/TeamAndMissionSelectTab.jsx";

function calculateDeptLevel(total_points){

    return Math.min(100, Math.floor(total_points / 60))
}


function InteractionInterface({currentTab,handleStartMission}) {
    const [fullDataset, setFullDataset] = useState([]);

    const waitRoomList=fullDataset.filter((object) => {return object.department==='waiting_room';})
    const scoutTeamList=fullDataset.filter((object) => {return object.department==='scout_team';})
    const rAndDdeptList=fullDataset.filter((object) => {return object.department==='r&d_dept';})
    const kitchenStaffList=fullDataset.filter((object) => {return object.department==='kitchen_staff';})
    const [fullDevelopmentDataset, setFullDevelopmentDataset] = useState([]);

    const [itemFor, setItemFor] = useState({});
    const [inventoryItemNo, setInventoryItemNo] = useState(null);
    const [itemObtained, setItemObtained] = useState(null);
    const [showInventorySelectBox,setShowInventorySelectBox] = useState(false);



    const handleItemObtained = (item) => {
        setItemObtained(item)
    }

    const handleClearSelection=(slotNo, item)=>{

        setFullDataset(fullDataset.map((obj) => {
            if(obj.id===item.id){

                let newArray=[...obj.inventory];
                newArray[slotNo-1]=null;
                return {...obj, inventory:newArray}
            }
           return obj;

        }))

        setItemObtained(null);

    }

    const handleItemAssign =(itemNo, scout)=>{

        setShowInventorySelectBox(!showInventorySelectBox);
        setItemFor(scout);
        setInventoryItemNo(itemNo);


    }

    const closeInventoryBox=()=>{



        setFullDataset(fullDataset.map(obj=>{
                if(obj.id===itemFor.id){

                    let newArray=[...obj.inventory];
                    if(itemObtained) {
                        newArray[inventoryItemNo - 1] = itemObtained;
                    }

                    return {...obj, inventory:newArray}


                }
                return obj;
            }
        ))


        setShowInventorySelectBox(false);
        setItemFor({});
        setItemObtained(null)
        setInventoryItemNo(null);
    }



    const changeDevelopmentStatus=(itemDevelopmentStatus,itemName)=>{
        if(itemDevelopmentStatus!=='unmet_requirements'){
            if(itemDevelopmentStatus==='not_started'){

                setFullDevelopmentDataset(
                    fullDevelopmentDataset.map((obj) => {
                        if (obj.name === itemName) {

                            if(obj.time_to_develop==="instant"){
                                return { ...obj, development_status: "developed" };
                            }

                            return { ...obj, development_status: "developing" };
                        } else {
                            return obj;
                        }
                    })
                );
            }else{
                setFullDevelopmentDataset(
                    fullDevelopmentDataset.map((obj) => {
                        if (obj.name === itemName && obj.development_status!=='developed') {
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

    useEffect(() => {
        setFullDevelopmentDataset(
            fullDevelopmentDataset.map((obj) => {
                if(calculateDeptLevel(rAndDdeptSkillAggregatePoints)>=obj.rd_team_level_required && calculateDeptLevel(scoutTeamSkillAggregatePoints)>=obj.scout_team_level_required && calculateDeptLevel(kitchenStaffSkillAggregatePoints)>=obj.kitchen_staff_level_required){

                    return { ...obj, development_status: "not_started" };
                }else{
                    return { ...obj, development_status: "unmet_requirements" };
                }

            })
        )

    }, [rAndDdeptSkillAggregatePoints,scoutTeamSkillAggregatePoints,kitchenStaffSkillAggregatePoints]);



    const tabsInfo={
        'waiting_room':['Waiting Room',waitRoomList.length,'Waiting Room',0,50],
        'scout_team':['Scout Team',scoutTeamList.length, 'Scout  Team',calculateDeptLevel(scoutTeamSkillAggregatePoints),10],
        'r&d_dept':['Research And Development Department',rAndDdeptList.length, 'R&D Dept',calculateDeptLevel(rAndDdeptSkillAggregatePoints),10],
        'kitchen_staff':['Kitchen Staff',kitchenStaffList.length, 'Kitchen Staff',calculateDeptLevel(kitchenStaffSkillAggregatePoints),5],
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
        <div className='set-width-100 ' style={{overflow: 'hidden'}}>
            {currentTab==='TeamAndMissionSelectionTab' && <TeamAndMissionSelectTab
                fullDataset={fullDataset}
                fullDevelopmentDataset={fullDevelopmentDataset}
                itemFor={itemFor}
                itemObtained={itemObtained}
                inventoryItemNo={inventoryItemNo}
                showInventorySelectBox={showInventorySelectBox}
                handleItemObtained={handleItemObtained}
                handleItemAssign={handleItemAssign}
                closeInventoryBox={closeInventoryBox}
                handleClearSelection={handleClearSelection}
                handleStartMission={handleStartMission}/>}
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
