import React, {useEffect, useState} from 'react'
import HomeTab from "./root-tabs/HomeTab.jsx";
import ManageStaffTab from "./root-tabs/ManageStaffTab.jsx";
import DevelopmentTab from "./root-tabs/DevelopmentTab.jsx";
import TeamAndMissionSelectTab from "./root-tabs/TeamAndMissionSelectTab.jsx";



function InteractionInterface({currentTab,handleStartMission,onListNameClick,selectedIds,fullDataset,fullDevelopmentDataset,itemObtained,itemFor,inventoryItemNo,showInventorySelectBox,handleItemObtained,handleItemAssign,closeInventoryBox,handleClearSelection,handleKickOutClick,handleTeamTransfer,changeDevelopmentStatus,waitRoomList,scoutTeamList,rAndDdeptList,kitchenStaffList,calculateDeptLevel,scoutTeamSkillAggregatePoints,rAndDdeptSkillAggregatePoints,kitchenStaffSkillAggregatePoints,Locations,selectedMission,handleMissionSelect,acquiredResourcesList}) {





    const tabsInfo={
        'waiting_room':['Waiting Room',waitRoomList.length,'Waiting Room',0,50],
        'scout_team':['Scout Team',scoutTeamList.length, 'Scout  Team',calculateDeptLevel(scoutTeamSkillAggregatePoints),20],
        'r&d_dept':['Research And Development Department',rAndDdeptList.length, 'R&D Dept',calculateDeptLevel(rAndDdeptSkillAggregatePoints),10],
        'kitchen_staff':['Kitchen Staff',kitchenStaffList.length, 'Kitchen Staff',calculateDeptLevel(kitchenStaffSkillAggregatePoints),5],
    }
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
                handleStartMission={handleStartMission}
                onListNameClick={onListNameClick}
                selectedIds={selectedIds}
                Locations={Locations}
                selectedMission={selectedMission}
                handleMissionSelect={handleMissionSelect}/>}
            {currentTab==='homeTab' && <HomeTab acquiredResourcesList={acquiredResourcesList}/>}
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
