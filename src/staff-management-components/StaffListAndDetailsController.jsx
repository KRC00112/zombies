import {useState, useEffect, useMemo} from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

function StaffListAndDetails({departmentTab,fullDataset,onKickOutClick,onTransferToTeamClick}) {
    const [membersList, setMembersList] = useState([]);
    const [detailsOfMember, setDetailsOfMember] = useState({});
    const scoutTeamCount=fullDataset.filter(obj => {

        return obj.department==='scout_team'

    }).length;

    const waitingRoomCount=fullDataset.filter(obj => {

        return obj.department==='waiting_room'

    }).length;

    const rAndDdeptCount=fullDataset.filter(obj => {

        return obj.department==='r&d_dept'

    }).length;

    const kitchenStaffCount=fullDataset.filter(obj => {

        return obj.department==='kitchen_staff'

    }).length;

    const onListNameClick=(member)=>{
        setDetailsOfMember(member)
    }
    const resetToFirstMemberOfList=() => {
        if(membersList.length>0){
            setDetailsOfMember(membersList[0]);
        }
    }

    useEffect(()=>resetToFirstMemberOfList(), [membersList]);

    useEffect(() => {
        let temp=[]
        if(departmentTab==='waiting_room'){
            temp=fullDataset.filter((object) => {
                return object.department==='waiting_room';
            })
        }
        if(departmentTab==='scout_team'){
            temp=fullDataset.filter((object) => {
                return object.department==='scout_team';
            })
        }
        if(departmentTab==='r&d_dept'){
            temp=fullDataset.filter((object) => {
                return object.department==='r&d_dept';
            })
        }
        if(departmentTab==='kitchen_staff'){
            temp=fullDataset.filter((object) => {
                return object.department==='kitchen_staff';
            })
        }

        setMembersList(temp)
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
                accu=0;
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
                        <li key={member.id} className={`${member.id===detailsOfMember.id?"selected bg-[#61045F] text-white font-bold":''} member-list-names`}>
                            <button onClick={()=>onListNameClick(member)}>{member.name}</button>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className='member-profile-image-box'>
                    <img src={membersList.length>0?detailsOfMember.profileLocation:"/staff-profiles/default.png"} width='270px' draggable='false'/>
                </div>
                <div className='members-stats-box'>
                    {/*<div>{JSON.stringify(detailsOfMember)}</div>*/}
                    <div className="life">
                        <ProgressBar
                            className='life'
                            completed={membersList.length>0?detailsOfMember.life:0}
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
                            completed={membersList.length>0?detailsOfMember.scoutSkill:0}
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
                            completed={membersList.length>0?detailsOfMember.rdSkill:0}
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
                            completed={membersList.length>0?detailsOfMember.cookingSkill:0}
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
            {membersList.length>0 && detailsOfMember.name?
                <div className='staff-operations'>
                    <button className='kick-out-button' onClick={()=>onKickOutClick(detailsOfMember.id)}>Kick out {detailsOfMember.name.substring(0,detailsOfMember.name.indexOf(" "))}</button>
                    <div className='transfer-buttons'>
                        {departmentTab!=='scout_team'?<button className='transfer' onClick={()=>onTransferToTeamClick(detailsOfMember.id,'scout_team')}>Transfer {detailsOfMember.name.substring(0,detailsOfMember.name.indexOf(" "))} to Scout team[{scoutTeamCount}/20]</button>:null}
                        {departmentTab!=='r&d_dept'?<button className='transfer' onClick={()=>onTransferToTeamClick(detailsOfMember.id,'r&d_dept')}>Transfer {detailsOfMember.name.substring(0,detailsOfMember.name.indexOf(" "))} to R&D[{rAndDdeptCount}/20]</button>:null}
                        {departmentTab!=='kitchen_staff'?<button className='transfer' onClick={()=>onTransferToTeamClick(detailsOfMember.id,'kitchen_staff')}>Transfer {detailsOfMember.name.substring(0,detailsOfMember.name.indexOf(" "))} to Kitchen[{kitchenStaffCount}/20]</button>:null}
                        {departmentTab!=='waiting_room'?<button className='transfer' onClick={()=>onTransferToTeamClick(detailsOfMember.id,'waiting_room')}>Transfer {detailsOfMember.name.substring(0,detailsOfMember.name.indexOf(" "))} to Waiting Room[{waitingRoomCount}/20]</button>:null}
                    </div>
                </div>:null}


        </div>
    )
}

export default StaffListAndDetails
