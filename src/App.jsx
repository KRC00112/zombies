import './App.css'
import NavBar from "./NavBar.jsx";
import InteractionInterface from "./InteractionInterface.jsx";
import {useEffect, useRef, useState} from "react";
import GameBoard from "./GameBoard.jsx";


function calculateDeptLevel(total_points){

    return Math.min(100, Math.floor(total_points / 60))
}

const Locations = [
    { id:'M1', name:'Find Survivors', desc:'Faint signals hint someone endured the collapse.', top:'50', left:'45', cellPositions:[{row:0,col:1},{row:1,col:2},{row:0,col:3},{row:1,col:4},{row:0,col:5},{row:1,col:6}], rewards:{ resources:[{name:'water',amount:40},{name:'cloth',amount:20},{name:'medicine',amount:12},{name:'seeds',amount:25}], max_survivors:2 }},
    { id:'M2', name:'Find Supplies', desc:'Abandoned stockpiles may still remain untouched.', top:'45', left:'47', cellPositions:[{row:0,col:1},{row:1,col:2},{row:0,col:3},{row:1,col:4},{row:0,col:5},{row:1,col:6}], rewards:{ resources:[{name:'wood',amount:45},{name:'metal',amount:30},{name:'wire',amount:15},{name:'glass',amount:10},{name:'fuel',amount:12}], max_survivors:1 }},
    { id:'M3', name:'Investigate the Abandoned Mine', desc:'Investigate disturbances reported by passing scouts.', top:'38', left:'34', cellPositions:[{row:0,col:1},{row:1,col:2},{row:0,col:3},{row:1,col:4},{row:0,col:5},{row:1,col:6}], rewards:{ resources:[{name:'stone',amount:60},{name:'cement',amount:25},{name:'chemicals',amount:18},{name:'gunpowder',amount:12},{name:'electronics',amount:8}], max_survivors:1 }}
];


const acquiredResources = [
    { name: "wood", amount: 4, reserved: 0 },
    { name: "metal", amount: 3, reserved: 0 },
    { name: "gunpowder", amount: 6, reserved: 0 },
    { name: "electronics", amount: 2, reserved: 0 },
    { name: "cloth", amount: 6, reserved: 0 },
    { name: "glass", amount: 3, reserved: 0 },
    { name: "fuel", amount: 5, reserved: 0 },
    { name: "medicine", amount: 2, reserved: 0 },
    { name: "alcohol", amount: 4, reserved: 0 },
    { name: "chemicals", amount: 7, reserved: 0 },
    { name: "water", amount: 9, reserved: 0 },
    { name: "sugar", amount: 5, reserved: 0 },
    { name: "seeds", amount: 8, reserved: 0 },
    { name: "soil", amount: 6, reserved: 0 },
    { name: "cement", amount: 3, reserved: 0 },
    { name: "stone", amount: 9, reserved: 0 },
    { name: "wire", amount: 2, reserved: 0 },
    { name: "livestock", amount: 1, reserved: 0 }
];


function App() {

    const [currentTab, setCurrentTab] = useState('homeTab');
    const [selectedIds, setSelectedIds] = useState([]);

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
    const [selectedMission, setSelectedMission] = useState('M1');
    const [acquiredResourcesList, setAcquiredResourcesList] = useState(acquiredResources);
    let baseDevelopmentDataset=useRef([]);
    const handleMissionSelect=(missionName)=>{
        setSelectedMission(missionName);
    }





    const addReward=(resources,survivors)=>{
        setAcquiredResourcesList(prev=>prev.map(obj=>{
            const resource=resources.find(res=>res.name===obj.name)
            if(obj.name===resource?.name){

                   return {...obj, amount:obj.amount+resource?.amount};
                }
                return obj;
            })
        );

        setFullDataset(prev=>prev.map(obj=>{
            const survivor=survivors.find(sur=>sur.id===obj.id)
                if(obj.id===survivor?.id){
                    return {...obj, department:"waiting_room"};
                }
                return obj;

            })
        );
    }

    const permanentlyDiscardSelectedPlayers=()=>{
        setFullDataset(prev=>prev.filter(obj=>(!selectedIds.includes(obj.id))))
    }


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

        setShowInventorySelectBox(true);
        setItemFor(scout);
        setInventoryItemNo(itemNo);


    }

    const closeInventoryBox=()=>{



        setFullDataset(fullDataset.map(obj=>{
                if(obj.id===itemFor.id){

                    let newArray=[...obj.inventory];
                    if(itemObtained) {
                        newArray[inventoryItemNo-1]=itemObtained;
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

                            if(obj.time_to_develop==="0m"){
                                return { ...obj, development_status: "developed" };
                            }

                            return { ...obj, development_status: "developing" };
                        } else {
                            return obj;
                        }
                    })
                );


                setAcquiredResourcesList(prev=>prev.map(obj=>{

                    const item=fullDevelopmentDataset.find(i=>i.name===itemName);
                    const itemResource=item.resources.find(res=>res.name===obj.name);
                    if(obj.name===itemResource?.name){
                        return {...obj, amount:obj.amount-itemResource?.amount};
                    }
                    return obj;

                }))


            }else{
                setFullDevelopmentDataset(
                    fullDevelopmentDataset.map((obj) => {
                        if (obj.name === itemName && obj.development_status!=='developed') {
                            const item=baseDevelopmentDataset.current.find(i=>i.name===obj.name);
                            return { ...obj, development_status: "not_started", time_to_develop:item?.time_to_develop};
                        } else {
                            return obj;
                        }
                    })
                );
                setAcquiredResourcesList(prev=>prev.map(obj=>{

                    const item=fullDevelopmentDataset.find(i=>i.name===itemName);
                    const itemResource=item.resources.find(res=>res.name===obj.name);
                    if(obj.name===itemResource?.name){
                        return {...obj, amount:obj.amount+itemResource?.amount};
                    }
                    return obj;

                }))


            }


        }

    }
    useEffect(()=>{

        fetch(import.meta.env.BASE_URL + `/all_developments.json`)
            .then((res) => {
                if(!res.ok) {
                    return
                }
                return res.json()
            })
            .then((data) => {setFullDevelopmentDataset(data);baseDevelopmentDataset.current=data})
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

        fetch(import.meta.env.BASE_URL + `/all_depts.json`)
            .then((res) => res.json())
            .then((data) => setFullDataset(data))
    },[])




    useEffect(() => {




        setFullDevelopmentDataset(
            fullDevelopmentDataset.map((obj) => {


                const skillsMet= calculateDeptLevel(rAndDdeptSkillAggregatePoints)>=obj.rd_team_level_required
                    && calculateDeptLevel(scoutTeamSkillAggregatePoints)>=obj.scout_team_level_required
                    && calculateDeptLevel(kitchenStaffSkillAggregatePoints)>=obj.kitchen_staff_level_required



                const resourcesMet=obj.resources.every(res=>{
                        const resourceAtHand=acquiredResourcesList.find(obj=>obj.name===res.name);
                        return res.amount <= resourceAtHand.amount;

                    })

                if(!skillsMet){
                    //putting resources back if department skills don't meet
                    if(obj.development_status==="developing"){
                        setAcquiredResourcesList(prev=>prev.map(atHandRes=>{
                            const item=fullDevelopmentDataset.find(i=>i.development_status==="developing")
                            const itemResource=item.resources.find(res=>res.name===atHandRes.name);
                            if(atHandRes.name===itemResource?.name){
                                return {...atHandRes, amount:atHandRes.amount+itemResource?.amount};
                            }
                            return atHandRes;
                        }))
                    }
                    if(obj.development_status==="developed"){
                        return obj;
                    }
                    return { ...obj, development_status: "unmet_requirements" };
                }
                if(obj.development_status==="developed" || obj.development_status==="developing"){
                    return obj;
                }
                if(skillsMet && resourcesMet){
                    return { ...obj, development_status: "not_started" };
                }
                return { ...obj, development_status: "unmet_requirements" };
            })
        )

    }, [rAndDdeptSkillAggregatePoints,scoutTeamSkillAggregatePoints,kitchenStaffSkillAggregatePoints,acquiredResourcesList]);




    const onListNameClick=(member)=>{


        if (selectedIds.includes(member.id)) {
            return setSelectedIds(selectedIds.filter(id => id !== member.id));
        }
        if(selectedIds.length<6) {
            return setSelectedIds([...selectedIds, member.id])
        }
    }


    const quitMissionGameBoard = (quitType) => {


        if(quitType==="gameOver") {
            setFullDevelopmentDataset(prev => prev.map((obj) => {
                if (obj.development_status === 'developing') {
                    return {...obj, time_to_develop: `${Number(obj.time_to_develop[0]) - 1}m`,}
                }
                return obj;
            }))
            setFullDevelopmentDataset(prev => prev.map((obj) => {
                if (obj.development_status === 'developing' && obj.time_to_develop === '0m') {
                    return {...obj, development_status: "developed"}
                }
                return obj;
            }))
            setCurrentTab('homeTab');
        }
        else{
            setCurrentTab('homeTab');
        }

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

        {currentTab==='GameBoard'?<GameBoard
                quitMissionGameBoard={quitMissionGameBoard}
                mappedDataset={fullDataset.filter(obj=>selectedIds.includes(obj.id))}
                mappedMission={Locations.find(obj=>obj.id===selectedMission)}
                unassignedDataset={fullDataset.filter(obj=>obj.department==="unassigned")}
                addReward={addReward}
                permanentlyDiscardSelectedPlayers={permanentlyDiscardSelectedPlayers}/>:
            <>
                <NavBar
                    onHomeClick={handleHomeClick}
                    onManageStaffClick={handleManageStaffClick}
                    onDevelopmentClick={handleDevelopmentClick}
                    onMissionSelectionClick={handleMissionSelectionClick}
                    currentTab={currentTab}/>
                <InteractionInterface currentTab={currentTab}
                                      handleStartMission={handleStartMission}
                                      onListNameClick={onListNameClick}
                                      selectedIds={selectedIds}
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
                                      handleKickOutClick={handleKickOutClick}
                                      handleTeamTransfer={handleTeamTransfer}
                                      changeDevelopmentStatus={changeDevelopmentStatus}
                                      waitRoomList={waitRoomList}
                                      scoutTeamList={scoutTeamList}
                                      rAndDdeptList={rAndDdeptList}
                                      kitchenStaffList={kitchenStaffList}
                                      calculateDeptLevel={calculateDeptLevel}
                                      scoutTeamSkillAggregatePoints={scoutTeamSkillAggregatePoints}
                                      rAndDdeptSkillAggregatePoints={rAndDdeptSkillAggregatePoints}
                                      kitchenStaffSkillAggregatePoints={kitchenStaffSkillAggregatePoints}
                                      Locations={Locations}
                                      selectedMission={selectedMission}
                                      handleMissionSelect={handleMissionSelect}
                                      acquiredResourcesList={acquiredResourcesList}/>
            </>
        }

    </div>
  )
}

export default App
