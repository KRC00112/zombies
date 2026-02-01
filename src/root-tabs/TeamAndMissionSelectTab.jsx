import React, {useEffect, useState} from 'react'
import ListBox from "../generic-components/ListBox.jsx";
import ProgressBar from "@ramonak/react-progress-bar";
import MapAndSelector from "../generic-components/MapAndSelector.jsx";
import {TypeAnimation} from "react-type-animation";





function TeamAndMissionSelectTab({fullDataset,fullDevelopmentDataset,itemFor, itemObtained, inventoryItemNo, showInventorySelectBox, handleItemObtained, handleItemAssign, closeInventoryBox,handleClearSelection,handleStartMission,onListNameClick,selectedIds, Locations,selectedMission,handleMissionSelect}) {
    const ScoutTeamData=[...fullDataset].sort((a, b) => b.scoutSkill-a.scoutSkill).filter(member => member.department === "scout_team");



    useEffect(()=>{
        console.log(selectedIds);
    },[selectedIds])


    return (
        <div className='mission-select-screen'>
            {showInventorySelectBox &&
                <InventoryWeaponsSelectBox
                    fullDevelopmentDataset={fullDevelopmentDataset}
                    itemFor={itemFor}
                    inventoryItemNo={inventoryItemNo}
                    closeInventoryBox={closeInventoryBox}
                    handleItemObtained={handleItemObtained}
                    itemObtained={itemObtained}
                    handleClearSelection={handleClearSelection}/>}
            <div className='team-selection-and-mission-start'>
                <section className='team-members-and-mission-select-section'>
                    <ListBox listTypeLabel={"Pick Your Team"} list={ScoutTeamData} selectedItemId={selectedIds} handleListItemClick={onListNameClick} showAP={true}/>
                    <div className='header-and-map-and-missions'>
                        <div className='select-mission-header'><TypeAnimation

                            sequence={['SELECT A MISSION:']}
                            wrapper="h1"
                            speed={70}
                            cursor={false}/>
                        </div>
                         <MapAndSelector Locations={Locations} selectedMission={selectedMission} handleMissionSelect={handleMissionSelect}/>
                        <div className='mission-name-and-description'>
                            <div className='mission-name'>{Locations.find(obj=>obj.id===selectedMission).name.toUpperCase()}</div>
                            <div className='mission-desc'>{Locations.find(obj=>obj.id===selectedMission).desc}</div>
                        </div>

                    </div>
                    </section>
                <div className='team-members-and-start'>
                    <div className='selected-members-showcase'>
                        <SelectedTeamMember memberId={selectedIds[0]} list={ScoutTeamData} handleItemAssign={handleItemAssign}/>
                        <SelectedTeamMember memberId={selectedIds[1]} list={ScoutTeamData} handleItemAssign={handleItemAssign}/>
                        <SelectedTeamMember memberId={selectedIds[2]} list={ScoutTeamData} handleItemAssign={handleItemAssign}/>
                        <SelectedTeamMember memberId={selectedIds[3]} list={ScoutTeamData} handleItemAssign={handleItemAssign}/>
                        <SelectedTeamMember memberId={selectedIds[4]} list={ScoutTeamData} handleItemAssign={handleItemAssign}/>
                        <SelectedTeamMember memberId={selectedIds[5]} list={ScoutTeamData} handleItemAssign={handleItemAssign}/>
                    </div>
                    <button className={`mission-start-btn ${selectedIds.length>0?'fill-enabled':''}`} role="button" onClick={handleStartMission} disabled={selectedIds.length<=0}>
                        <span className="text">START MISSION</span>
                    </button>

            </div>
            </div>


        </div>
    )
}

function SelectedTeamMember({memberId, list, handleItemAssign}){


    let member=null;
    if(memberId) {
        member = list.length > 0 && list.find(obj => memberId === obj.id)
    }
    return(<div className='selected-scout-profile'>
            <div className='scout-face'>
                <div className='scout-face-and-name'>
                    <img className={member?`border-2 border-solid`:``} src={member? import.meta.env.BASE_URL + member.profileLocation:import.meta.env.BASE_URL + "/staff-profiles/default_black.png"} width='90px' draggable='false'/>
                    <p>{member?member.name.slice(0,member.name.indexOf(" ")):"--"}</p>
                    <p>AP: {member? 7+Math.floor((member?.scoutSkill)/12) : "--"}</p>
                </div>
                <ProgressBar
                    className='life-in-mission'
                    completed={member?member.life:0}
                    height="5px"
                    borderRadius="0"
                    labelAlignment="left"
                    bgColor="#d11010"
                    customLabel=" "
                    labelColor="#ffffff"
                    labelClassName="progress-bar-label life-label"
                    maxCompleted={200}
                    baseBgColor="#8f8d8d"
                    isLabelVisible={false}
                    animateOnRender={false}
                    transitionDuration="0s"
                />
            </div>
            <ul className='scout-inventory'>
                <li><button className={member && member?.inventory && member?.inventory[0]!==null?'item-in-inventory':''} onClick={()=>member?.id && handleItemAssign(1,member)}>{(member && member?.inventory && member?.inventory[0]!==null)? member?.inventory[0].name : "item 1"}</button></li>
                <li><button className={member && member?.inventory && member?.inventory[1]!==null?'item-in-inventory':''} onClick={()=>member?.id && handleItemAssign(2,member)}>{(member && member?.inventory && member?.inventory[1]!==null)? member?.inventory[1].name : "item 2"}</button></li>
                <li><button className={member && member?.inventory && member?.inventory[2]!==null?'item-in-inventory':''} onClick={()=>member?.id && handleItemAssign(3,member)}>{(member && member?.inventory && member?.inventory[2]!==null)? member?.inventory[2].name : "item 3"}</button></li>
            </ul>
        </div>
    );

}

function InventoryWeaponsSelectBox({fullDevelopmentDataset,itemFor,inventoryItemNo,closeInventoryBox,handleItemObtained,itemObtained,handleClearSelection}){

    const [selectedTab, setSelectedTab] = useState('weapons');

    const melee_weapons=fullDevelopmentDataset.filter(obj=>obj.subtype==='MELEE_WEAPONS' && obj.development_status==='developed');
    const handguns=fullDevelopmentDataset.filter(obj=>obj.subtype==='HANDGUNS' && obj.development_status==='developed');
    const shotguns=fullDevelopmentDataset.filter(obj=>obj.subtype==='SHOTGUNS' && obj.development_status==='developed');
    const throwables=fullDevelopmentDataset.filter(obj=>obj.subtype==='THROWABLES' && obj.development_status==='developed');
    const health=fullDevelopmentDataset.filter(obj=>obj.subtype==='HEALTH' && obj.development_status==='developed');
    const action_points=fullDevelopmentDataset.filter(obj=>obj.subtype==='ACTION_POINTS' && obj.development_status==='developed');




    let itemNoInWords='';
    if(inventoryItemNo===1){
        itemNoInWords='first'
    }else if(inventoryItemNo===2){
        itemNoInWords='second'
    }else if(inventoryItemNo===3){
        itemNoInWords='third'
    }


    return (
        <div className='inventory-items-select-container'>
            <div className='inventory-items-select-container-title'><div>Set {itemFor.name}'s {itemNoInWords} Item</div>
                <button className='close-inventory-items-select-container' onClick={closeInventoryBox}>X</button>
            </div>
            <ul className='inventory-items-select-list'>
                <li><button onClick={()=>setSelectedTab('weapons')}  className={selectedTab==='weapons'?'active-tab':'inventory-items-inactive-tab'}>Weapons</button></li>
                <li ><button onClick={()=>setSelectedTab('aid')} className={selectedTab==='aid'?'active-tab':'inventory-items-inactive-tab'}>Aid</button></li>
            </ul>
            {selectedTab==='weapons'?
                <div className='all-developed-items'>
                    {melee_weapons.length>0 && <ItemCategory selectedTab={selectedTab} itemCategory="Melee Weapons" itemList={melee_weapons} handleItemObtained={handleItemObtained} itemObtained={itemObtained} itemFor={itemFor} />}
                    {handguns.length>0 && <ItemCategory selectedTab={selectedTab} itemCategory="Handguns" itemList={handguns} handleItemObtained={handleItemObtained} itemObtained={itemObtained} itemFor={itemFor}/>}
                    {shotguns.length>0 && <ItemCategory selectedTab={selectedTab} itemCategory="Shotguns" itemList={shotguns} handleItemObtained={handleItemObtained} itemObtained={itemObtained} itemFor={itemFor}/>}
                    {throwables.length>0 && <ItemCategory selectedTab={selectedTab} itemCategory="Throwables" itemList={throwables} handleItemObtained={handleItemObtained} itemObtained={itemObtained} itemFor={itemFor}/>}

                </div>:
                <div className='all-developed-items'>
                    {health.length>0 && <ItemCategory selectedTab={selectedTab} itemCategory="Health" itemList={health} handleItemObtained={handleItemObtained} itemObtained={itemObtained} itemFor={itemFor}/>}
                    {action_points.length>0 && <ItemCategory selectedTab={selectedTab} itemCategory="Action Points" itemList={action_points} handleItemObtained={handleItemObtained} itemObtained={itemObtained} itemFor={itemFor}/>}
                </div>
            }

            <div className='clear-selection-btn-and-label'><input type='radio' className='clear-selection-btn' name='item' onChange={()=>handleClearSelection(inventoryItemNo,itemFor)}/> <label>Clear Selection</label></div>

        </div>

    )


}

function ItemCategory({selectedTab, itemCategory, itemList, handleItemObtained}){
    const [showTable, setShowTable] = useState(false);
    return (
        <div className='item-category'>
            <div className='item-category-heading' onClick={()=>setShowTable(!showTable)}><h3>{itemCategory}</h3>
                <button className={`item-category-expand-collapse-btn ${showTable && 'after-click'}`}>
                    &gt;
                </button>
            </div>
            {showTable &&
                <table className='items-table'>
                    <tbody>


                    {selectedTab==='aid'? <tr>
                            <th>Select</th>
                            <th>Name</th>
                            <th>AP Cost</th>
                            {itemCategory==='Action Points'?<th>AP Recovery</th>:<th>Health Recovery</th>}
                        </tr>:
                        <tr>
                            <th>Select</th>
                            <th>Name</th>
                            <th>AP Cost</th>
                            <th>damage</th>
                            <th>Ammo</th>
                        </tr>}


                    {itemList.map((item) => (
                        <tr key={item.id}>



                            <td><input type='radio' id={item.id} name='item'  onChange={()=>handleItemObtained(item)}/></td>
                            <td>{item.name}</td>
                            <td>{item.ap_consumption}</td>
                            {selectedTab==='weapons'?<td>{item.dmg}</td>:''}
                            {selectedTab==='weapons'?<td>{item.ammo===undefined?'-':item.ammo}</td>:''}
                            {selectedTab==='aid' && itemCategory==='Health'?<td>{item.health_recovered}</td>:''}
                            {selectedTab==='aid' && itemCategory==='Action Points'?<td>{item.ap_recovered}</td>:''}

                        </tr>
                    ))}
                    </tbody>
                </table>}

        </div>


    );
}

export default TeamAndMissionSelectTab
