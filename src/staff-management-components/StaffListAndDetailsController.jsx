import {useState, useEffect, useMemo} from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import ListBox from "../generic-components/ListBox.jsx";

function StaffListAndDetails({departmentTab,fullDataset,onKickOutClick,onTransferToTeamClick,handleSelection,dropDownValue,dropDownOptions,tabsInfo}) {

    const tabs_list=['scout_team','r&d_dept','kitchen_staff','waiting_room'];
    let membersList = useMemo(() => {
        return fullDataset.filter(member => member.department === departmentTab);
    }, [fullDataset, departmentTab]);

    const [selectedId, setSelectedId] = useState(null);
    const selectedMember=membersList.find(member=>member.id===selectedId);
    const [skipReset, setSkipReset] = useState(false);

    const onListNameClick=(member)=>{
        setSelectedId(member.id)
    }

    const resetToFirstMemberOfList=() => {
        if(skipReset===false){
            setSelectedId(membersList[0]?.id);
        }

    }
    useEffect(()=>resetToFirstMemberOfList(), [membersList,skipReset]);

    useEffect(()=>setSkipReset(false),[departmentTab])

    const afterSelectedMemberManipulation=()=>{
        setSelectedId(membersList.indexOf(selectedMember)>0?  membersList[membersList.indexOf(selectedMember)-1].id:membersList[1]?.id)
        setSkipReset(true);
    }

    return (
        <div className='main-management-container '>
            <div className='department-name-and-level-and-head-count'>
                <div className='department-name'>{tabsInfo[departmentTab][0]}</div>
                <div className='level-and-member-count'>

                    {departmentTab==='r&d_dept'?<div>Lvl.{tabsInfo[departmentTab][3]}</div>:null}
                    {departmentTab==='scout_team'?<div>Lvl.{tabsInfo[departmentTab][3]}</div>:null}
                    {departmentTab==='kitchen_staff'?<div>Lvl.{tabsInfo[departmentTab][3]}</div>:null}
                    <div className='member-count'>
                        <img src={import.meta.env.BASE_URL + '/icons/head.png'} width='20px' draggable='false'/>:   {membersList.length}/{tabsInfo[departmentTab][4]}
                    </div>

                </div>
            </div>

            <div className='staff-Details'>
                <div className='members-list-view'>
                    <div className='sort-drop-down' style={{visibility:membersList.length>1?'visible':'hidden'}}>
                        <label htmlFor="drop-down-selection-box" className='text-white'>Sort By:</label>
                        <select
                            onChange={(e) =>{handleSelection(e);setSkipReset(false)}}
                            value={dropDownValue}
                            className="drop-down-selection-box">
                            {dropDownOptions.map((option, idx) => (
                                <option key={idx} className='drop-down-option text-black '>{option}</option>
                            ))}
                        </select>
                    </div>
                 <ListBox listTypeLabel={"Names"} list={membersList} selectedItemId={selectedId} handleListItemClick={onListNameClick}/>
                </div>

                <div className='member-profile-image-box'>
                    <img className={membersList.length>0 ?`border-5 border-solid border-white`:``}  src={membersList.length > 0 ?  import.meta.env.BASE_URL + selectedMember?.profileLocation : import.meta.env.BASE_URL + "/staff-profiles/default.png"}
                         width='270px' draggable='false'/>
                </div>

                <div className='members-stats-box'>
                    {/*<div>{JSON.stringify(selectedMember)}</div>*/}
                    <div className="life-and-base-ap">
                        <ProgressBar
                            className='life'
                            completed={membersList.length>0?selectedMember?.life:0}
                            height="100%"
                            borderRadius="0"
                            labelAlignment="left"
                            bgColor="#d11010"
                            customLabel="LIFE"
                            labelColor="#ffffff"
                            labelClassName="progress-bar-label life-label"
                            maxCompleted={200}
                            baseBgColor="#e2e2dd60"
                            isLabelVisible={true}
                        />
                        <div className='base-ap'>
                            <label className='base-ap-label'>ACTION POINTS:</label>
                            <div className='base-ap-value'>{membersList.length>0 && selectedMember?7+Math.floor((selectedMember?.scoutSkill)/12):'--'}</div>
                        {/*for every 12 points in the scout skill, add one point to the base value. if scout skill=48 ap value=7+1+1+1+1*/}
                        </div>
                    </div>
                    <div className='skill-progress-bars'>

                        <ProgressBar
                            completed={membersList.length>0?selectedMember?.scoutSkill:0}
                            customLabel="scouting skills"
                            height="50px"
                            borderRadius="0"
                            labelAlignment="left"
                            bgColor="#FFFFFF"
                            labelClassName="progress-bar-label"
                            labelColor="#000000"
                            baseBgColor="#e2e2dd60"
                            isLabelVisible={true}
                        />
                        <ProgressBar
                            completed={membersList.length>0?selectedMember?.rdSkill:0}
                            customLabel="r&d skills"
                            height="50px"
                            borderRadius="0"
                            bgColor="#ffffff"
                            labelAlignment="left"
                            labelClassName="progress-bar-label"
                            labelColor="#000000"
                            baseBgColor="#e2e2dd60"
                            isLabelVisible={true}
                        />
                        <ProgressBar
                            completed={membersList.length>0?selectedMember?.cookingSkill:0}
                            customLabel="cooking skills"
                            height="50px"
                            bgColor="#ffffff"
                            borderRadius="0"
                            labelAlignment="left"
                            labelClassName="progress-bar-label"
                            labelColor="#000000"
                            baseBgColor="#e2e2dd60"
                            isLabelVisible={true}
                        />


                    </div>

                </div>
            </div>
            {membersList.length>0 && selectedMember?.name?
                <div className='staff-operations'>
                    <button className='kick-out-button' onClick={()=>{
                        onKickOutClick(selectedMember.id);
                        afterSelectedMemberManipulation()
                    }}>Kick out {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))}</button>
                    <ul className='transfer-buttons'>
                        {tabs_list.map((tab)=>(
                            <li key={tab}>
                            {departmentTab!==tab?<button disabled={tabsInfo[tab][1]>=tabsInfo[tab][4]} className={tabsInfo[tab][1]>=tabsInfo[tab][4]?'disabled':''} onClick={()=>{
                                onTransferToTeamClick(selectedMember.id, tab)
                                afterSelectedMemberManipulation()

                            }}>Transfer {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))} to {tabsInfo[tab][2]} {tabsInfo[tab][1]>=tabsInfo[tab][4]?"[FULL]":`[${tabsInfo[tab][1]}/${tabsInfo[tab][4]}]`}   </button>:null}
                        </li>
                        ))}
                    </ul>
                </div>:null}
        </div>
    )
}
export default StaffListAndDetails
