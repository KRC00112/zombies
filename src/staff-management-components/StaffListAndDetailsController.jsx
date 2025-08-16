import {useState, useEffect, useMemo} from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

function StaffListAndDetails({departmentTab,fullDataset,onKickOutClick,onTransferToTeamClick}) {

    const waitRoomList=fullDataset.filter((object) => {return object.department==='waiting_room';})
    const scoutTeamList=fullDataset.filter((object) => {return object.department==='scout_team';})
    const rAndDdeptList=fullDataset.filter((object) => {return object.department==='r&d_dept';})
    const kitchenStaffList=fullDataset.filter((object) => {return object.department==='kitchen_staff';})
    const scoutTeamCount=scoutTeamList.length;
    const waitingRoomCount=waitRoomList.length;
    const rAndDdeptCount=rAndDdeptList.length;
    const kitchenStaffCount=kitchenStaffList.length;

    const [membersList, setMembersList] = useState(waitRoomList);
    const [selectedId, setSelectedId] = useState(0);
    const selectedMember=membersList.find(member=>member.id===selectedId);


    const onListNameClick=(member)=>{
        setSelectedId(member.id)
    }
    const resetToFirstMemberOfList=() => {
        if(membersList.length>0){
            setSelectedId(membersList[0].id);
        }
    }

    useEffect(()=>resetToFirstMemberOfList(), [membersList]);

    useEffect(() => {
        if(departmentTab==='waiting_room'){
            setMembersList(waitRoomList)
        }
        else if(departmentTab==='scout_team'){
            setMembersList(scoutTeamList)
        }
        else if(departmentTab==='r&d_dept'){
            setMembersList(rAndDdeptList)
        }
        else if(departmentTab==='kitchen_staff'){
            setMembersList(kitchenStaffList)
        }

    }, [departmentTab,fullDataset]);

    const getDepartmentDisplayName=()=>{

        switch (departmentTab){

            case 'waiting_room':
                return 'Waiting Room'
            case 'scout_team':
                return 'Scout Team'
            case 'r&d_dept':
                return 'Research And Development Department'
            case 'kitchen_staff':
                return 'Kitchen Staff'
            default:
                return ''
        }

    }

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

    return (
        <div className='main-management-container '>
            <div className='department-name-and-head-count'>
                <div className='department-name'>{getDepartmentDisplayName()}</div>
                <div className='level-and-member-count'>
                    {departmentTab!=='waiting_room'?<div>Lvl.{aggregateSkillPointsOfDept}</div>:null}
                    <div className='member-count'>
                        <img src='/icons/head.png' width='20px' draggable='false'/>:   {membersList.length}/20
                    </div>

                </div>
            </div>
            <div className='staff-Details'>
                <div className='members-list-box'>
                    <div className='members-list-box-heading'>Names</div>
                    <ul className='members-list'>
                        {membersList.map((member)=> (
                        <li key={member.id} className={`${member.id===selectedMember?.id?"selected bg-[#61045F] text-white font-bold":''} member-list-names`}>
                            <button onClick={()=>onListNameClick(member)}>{member.name}</button>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className='member-profile-image-box'>
                    <img src={membersList.length>0?selectedMember?.profileLocation:"/staff-profiles/default.png"} width='270px' draggable='false'/>
                </div>
                <div className='members-stats-box'>
                    {/*<div>{JSON.stringify(selectedMember)}</div>*/}
                    <div className="life">
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
                    <button className='kick-out-button' onClick={()=>onKickOutClick(selectedMember.id)}>Kick out {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))}</button>
                    <div className='transfer-buttons'>
                        {departmentTab!=='scout_team'?<button onClick={()=>onTransferToTeamClick(selectedMember.id,'scout_team')}>Transfer {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))} to Scout team[{scoutTeamCount}/20]</button>:null}
                        {departmentTab!=='r&d_dept'?<button onClick={()=>onTransferToTeamClick(selectedMember.id,'r&d_dept')}>Transfer {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))} to R&D[{rAndDdeptCount}/20]</button>:null}
                        {departmentTab!=='kitchen_staff'?<button onClick={()=>onTransferToTeamClick(selectedMember.id,'kitchen_staff')}>Transfer {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))} to Kitchen[{kitchenStaffCount}/20]</button>:null}
                        {departmentTab!=='waiting_room'?<button onClick={()=>onTransferToTeamClick(selectedMember.id,'waiting_room')}>Transfer {selectedMember.name.substring(0,selectedMember.name.indexOf(" "))} to Waiting Room[{waitingRoomCount}/20]</button>:null}
                    </div>
                </div>:null}


        </div>
    )
}

export default StaffListAndDetails
