function ListBox({listTypeLabel, list, selectedItemId, handleListItemClick,showAP}){


    if(Array.isArray(selectedItemId)){

        // const selectedItem=list.find(member=>member.id===selectedItemId);
        return (
            <div className='members-list-box'>
                <div className='members-list-box-heading'>{listTypeLabel}</div>
                <ul className='members-list'>
                    {list.map((member) => (
                        <li key={member.id}
                            className={` member-list-names ${selectedItemId.find(obj=>obj===member.id)? "selected bg-white text-black font-bold" : ''}`}>
                            <button onClick={() => handleListItemClick(member)}>{member.name}</button>
                            {/*<div className='pr-5'>{showAP && `AP: ${7+Math.floor((member?.scoutSkill)/12)}`}</div>*/}
                        </li>
                    ))}
                </ul>
            </div>
        )

    }


    const selectedItem=list.find(member=>member.id===selectedItemId);
    return (
        <div className='members-list-box'>
            <div className='members-list-box-heading'>{listTypeLabel}</div>
            <ul className='members-list'>
                {list.map((member) => (
                    <li key={member.id}
                        className={` member-list-names ${member.id === selectedItem?.id ? "selected bg-white text-black font-bold" : ''}`}>
                        <button onClick={() => handleListItemClick(member)}>{member.name}</button>
                        {/*<div>{showAP && `AP: ${7+Math.floor((member?.scoutSkill)/12)}`}</div>*/}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListBox
