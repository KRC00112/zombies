import {useState, useEffect, useMemo} from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

function StaffListAndDetails({departmentTab,fullDataset,onKickOutClick,onTransferToTeamClick,handleSelection,dropDownValue,dropDownOptions}) {
    const tabs_list=['scout_team','r&d_dept','kitchen_staff','waiting_room'];

    const waitRoomList=fullDataset.filter((object) => {return object.department==='waiting_room';})
    const scoutTeamList=fullDataset.filter((object) => {return object.department==='scout_team';})
    const rAndDdeptList=fullDataset.filter((object) => {return object.department==='r&d_dept';})
    const kitchenStaffList=fullDataset.filter((object) => {return object.department==='kitchen_staff';})

    const tabsAndTeamCount={
        'waiting_room':[waitRoomList.length,'Waiting Room'],
        'scout_team':[scoutTeamList.length, 'Scout  Team'],
        'r&d_dept':[rAndDdeptList.length, 'R&D Dept'],
        'kitchen_staff':[kitchenStaffList.length, 'Kitchen Staff'],
    }
    const departmentTitleNames={

        'waiting_room':'Waiting Room',
        'scout_team':'Scout Team',
        'r&d_dept':'Research And Development Department',
        'kitchen_staff':'Kitchen Staff',
    }


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

    const aggregateSkillPointsOfDept=useMemo(()=>membersList.reduce((accu,currentVal)=>{

        switch(departmentTab){
            case 'r&d_dept':
                accu=accu+currentVal.rdSkill
                break;
            case 'scout_team':
                accu=accu+currentVal.scoutSkill
                break;
            case 'kitchen_staff':
                accu=accu+currentVal.cookingSkill
                break;
            default:
                return accu;
        }
        return accu;
    },0),[membersList,departmentTab]);

    const afterSelectedMemberManipulation=()=>{
        setSelectedId(membersList.indexOf(selectedMember)>0?  membersList[membersList.indexOf(selectedMember)-1].id:membersList[1]?.id)
        setSkipReset(true);
    }

    return (
        <div className='main-management-container '>
            <div className='department-name-and-level-and-head-count'>
                <div className='department-name'>{departmentTitleNames[departmentTab]}</div>
                <div className='level-and-member-count'>
                    {departmentTab!=='waiting_room'?<div>Lvl.{aggregateSkillPointsOfDept}</div>:null}
                    <div className='member-count'>
                        <img src='/icons/head.png' width='20px' draggable='false'/>:   {membersList.length}/20
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
                    <div className='members-list-box'>
                        <div className='members-list-box-heading'>Names</div>
                        <ul className='members-list'>
                            {membersList.map((member) => (
                                <li key={member.id}
                                    className={`${member.id === selectedMember?.id ? "selected bg-[#61045F] text-white font-bold" : ''} member-list-names`}>
                                    <button onClick={() => onListNameClick(member)}>{member.name}</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className='member-profile-image-box'>
                    <img src={membersList.length > 0 ? selectedMember?.profileLocation : "/staff-profiles/default.png"}
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
                            <div className='base-ap-value'>{membersList.length>0?7+Math.floor((selectedMember?.scoutSkill)/12):0}</div>
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
                            {departmentTab!==tab?<button onClick={()=>{
                                onTransferToTeamClick(selectedMember.id, tab)
                                afterSelectedMemberManipulation()
                            }}>Transfer {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))} to {tabsAndTeamCount[tab][1]} [{tabsAndTeamCount[tab][0]}/20]</button>:null}
                        </li>
                        ))}
                    </ul>
                </div>:null}
        </div>
    )
}
export default StaffListAndDetails
