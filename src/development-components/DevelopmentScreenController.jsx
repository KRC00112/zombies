import React, {useEffect, useMemo, useState} from 'react'
import {TypeAnimation} from "react-type-animation";

const resourceList=['alcohol', 'cement', 'chemicals', 'cloth', 'electronics', 'fuel', 'glass',
    'gunpowder', 'kitchenware', 'livestock', 'medicine', 'metal', 'seeds', 'soil',
    'stone', 'sugar', 'tools', 'water', 'wire', 'wood']

function DevelopmentScreenController({developmentType,rAndDLevel,scoutTeamLevel,kitchenStaffLevel,fullDevelopmentDataset,changeDevelopmentStatus}) {

    const DevelopmentTypeTitleNames={

        'weapon':'Weapons Development',
        'aid':'Aid Development',
        'base':'Base Development',
    }
    const imageSourceBasedOnDept={
        'weapon':'/icons/weapon-icons/white-weapon-icons/',
        'aid':'/icons/aid-icons/white-aid-icons/',
        'base':'/icons/base-icons/white-base-icons/',

    }


    const weaponTabTypesName=['melee','handgun','shotgun','throwables'];
    const aidTabTypesName=['health','action_points','seeds'];
    const baseTabTypesName=['the_house','perimeter','farm','training_area'];



    const melee_weapons_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'MELEE_WEAPONS';
    });

    const handguns_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'HANDGUNS';
    });

    const shotguns_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'SHOTGUNS';
    });

    const throwables_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'THROWABLES';
    });

    const health_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'HEALTH';
    });

    const action_points_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'ACTION_POINTS';
    });

    const seeds_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'SEEDS';
    });

    const the_house_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'THE_HOUSE';
    });

    const perimeter_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'PERIMETER';
    });

    const farm_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'FARM';
    });

    const training_area_list = fullDevelopmentDataset.filter(record => {
        return record.subtype === 'TRAINING_AREA';
    });




    const itemTypeName = {
        [weaponTabTypesName[0]]: ['MELEE WEAPONS',melee_weapons_list],
        [weaponTabTypesName[1]]: ['HANDGUNS',handguns_list],
        [weaponTabTypesName[2]]: ['SHOTGUNS',shotguns_list],
        [weaponTabTypesName[3]]: ['THROWABLES',throwables_list],
        [aidTabTypesName[0]]: ['HEALTH',health_list],
        [aidTabTypesName[1]]: ['ACTION POINTS',action_points_list],
        [aidTabTypesName[2]]: ['SEEDS',seeds_list],
        [baseTabTypesName[0]]: ['THE HOUSE',the_house_list],
        [baseTabTypesName[1]]: ['PERIMETER',perimeter_list],
        [baseTabTypesName[2]]: ['FARM',farm_list],
        [baseTabTypesName[3]]: ['TRAINING AREA',training_area_list],

    }



    const itemTabTypesName=useMemo(()=>{

        if(developmentType==='weapon'){
            return weaponTabTypesName
        }
        else if(developmentType==='aid'){
            return aidTabTypesName
        }
        else if(developmentType==='base'){
            return baseTabTypesName
        }


        },[developmentType])

    const [itemTabType, setItemTabType] = useState(itemTabTypesName[0]);
    function onItemTabClick(itemTabTypeName) {
        setItemTabType(itemTabTypeName)

    }

    useEffect(() => {

        setItemTabType(itemTabTypesName[0])

    }, [developmentType]);

    return (
        <div className='main-development-container '>
            <div className='development-type-name-and-item-type'>
                <div className='development-type-name'>{DevelopmentTypeTitleNames[developmentType]}</div>
                <div className='item-type-name'>{itemTypeName[itemTabType][0]}</div>
            </div>
            <section className='items-development-box'>
                <ul className='item-type-list'>
                    {itemTabTypesName.map(itemType => (
                        <li key={itemType}><button className={itemTabType===itemType?'item-tab-selected':''} onClick={()=>onItemTabClick(itemType)}>
                            <img src={`${imageSourceBasedOnDept[developmentType]}${itemType}.png`} width='50px' alt={itemType}/>
                        </button></li>
                    ))}

                </ul>
                <section className='items-to-develop'>
                    <ul className='items-to-develop-list'>
                        {itemTypeName[itemTabType][1]?.map((item) => (

                            <li key={`${itemTabType}-${item.id}`}>

                                <ItemCard
                                    itemName={item.name}
                                    itemRandDlevelReq={item.rd_team_level_required}
                                    itemKitchenStaffReq={item.kitchen_staff_level_required}
                                    itemScoutTeamReq={item.scout_team_level_required}
                                    itemDevelopmentTime={item.time_to_develop}
                                    itemApCost={item.ap_consumption}
                                    itemDesc={item.description}
                                    itemDmg={item.dmg}
                                    itemHealthRecovery={item.health_recovered}
                                    itemApRecovery={item.ap_recovered}
                                    itemResources={item.resources}
                                    itemDevelopmentStatus={item.development_status}
                                    rAndDLevel={rAndDLevel}
                                    scoutTeamLevel={scoutTeamLevel}
                                    kitchenStaffLevel={kitchenStaffLevel}
                                    changeDevelopmentStatus={changeDevelopmentStatus}
                                    fullDevelopmentDataset={fullDevelopmentDataset}/>
                            </li>
                        ))}
                    </ul>

                </section>

            </section>
        </div>
    )
}


function ItemCard({itemName, itemRandDlevelReq, itemKitchenStaffReq, itemScoutTeamReq, itemApCost,itemDesc,itemDmg,itemHealthRecovery,itemApRecovery,itemResources,itemDevelopmentStatus,rAndDLevel,scoutTeamLevel,kitchenStaffLevel,changeDevelopmentStatus}) {
    const [showReqs,setShowReqs] = useState(false)


    // useEffect(()=>{
    //     if(rAndDLevel>=itemRandDlevelReq && scoutTeamLevel>=itemScoutTeamReq && kitchenStaffLevel>=itemKitchenStaffReq){
    //         setFullDevelopmentDataset(
    //             fullDevelopmentDataset.map((obj) => {
    //                 if (obj.id === itemName) {
    //                     return { ...obj, development_status: "not_started" };
    //                 } else {
    //                     return obj;
    //                 }
    //             })
    //         );
    //     }
    // },[rAndDLevel,scoutTeamLevel,kitchenStaffLevel])


    let itemCardButtonTextName=''
    let itemCardButtonClassName=''
    if(itemDevelopmentStatus==='not_started'){
        itemCardButtonTextName='START DEVELOPMENT'
        itemCardButtonClassName='item-card-btn'
    }else if(itemDevelopmentStatus==='developing'){
        itemCardButtonTextName='CANCEL DEVELOPMENT'
        itemCardButtonClassName='item-card-btn-developing'
    }else if(itemDevelopmentStatus==='unmet_requirements'){
        itemCardButtonTextName='CAN\'T DEVELOP YET'
        itemCardButtonClassName='item-card-btn-unmet-requirements'
    }


    return (
        <div className='item-card'>
            <img className='item-picture' src='/vite.svg' width='100px'/>
            <div className='item-details'>
            <TypeAnimation
                key={itemName}
                sequence={[itemName]}
                wrapper="h1"
                speed={60}
                className='item-name'
                cursor={false}/>

            {showReqs && <div className='item-req'>

                <button className='close-show-req-btn' onClick={()=>setShowReqs(false)}><span>&#8592; </span>Go Back</button>
                <div className='all-requirements'>
                    <div className='level-requirements'>
                        <div>R&d Lvl: {itemRandDlevelReq}</div>
                        <div>Scout Team Lvl: {itemScoutTeamReq}</div>
                        <div>Kit.Staff Lvl: {itemKitchenStaffReq}</div>
                    </div>
                    <hr/>
                    <ul className='items-resources-requirements'>
                        {resourceList.map(item => (
                            itemResources[item]>0?<li key={item}>
                                {item[0].toUpperCase()+item.slice(1)}: {itemResources[item]}
                            </li>:null
                            ))
                        }
                    </ul>
                </div>
            </div>}
            {!showReqs&& <div className='item-desc'>

                <div >
                    {itemApCost?<div>AP Consumed: {itemApCost}</div>:null}
                    {itemDmg?<div>Damage: {itemDmg}</div>:null}
                    {itemHealthRecovery?<div>Health Recovery: {itemHealthRecovery}</div>:null}
                    {itemApRecovery?<div>AP Recovery: {itemApRecovery}</div>:null}
                    <div>{itemDesc}</div>

                </div>
                <div className='start-development-and-see-reqs-btn'>
                    <button className='item-card-btn' onClick={()=>setShowReqs(true)}>SEE REQUIREMENTS</button>
                    <button className={itemCardButtonClassName} onClick={()=>changeDevelopmentStatus(itemDevelopmentStatus,itemName)}>{itemCardButtonTextName}</button>
                </div>
                </div>}
            </div>
        </div>
    );

}

export default DevelopmentScreenController
