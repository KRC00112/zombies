import React, {useEffect, useMemo, useState} from 'react'

function DevelopmentScreenController({developmentType}) {

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


    const weaponTabTypesName=['melee','handgun','shotgun','assault_rifle','throwables','heavy_fire_power'];
    const aidTabTypesName=['health','action_points','seeds'];
    const baseTabTypesName=['main_house','perimeter','farm','barracks','training_area','mess','laboratory'];

    const itemTypeName = {
        [weaponTabTypesName[0]]: 'MELEE WEAPONS',
        [weaponTabTypesName[1]]: 'HANDGUNS',
        [weaponTabTypesName[2]]: 'SHOTGUNS',
        [weaponTabTypesName[3]]: 'ASSAULT RIFLES',
        [weaponTabTypesName[4]]: 'THROWABLES',
        [weaponTabTypesName[5]]: 'HEAVY FIRE POWER',
        [aidTabTypesName[0]]: 'HEALTH',
        [aidTabTypesName[1]]: 'ACTION POINTS',
        [aidTabTypesName[2]]: 'SEEDS',
        [baseTabTypesName[0]]: 'MAIN HOUSE',
        [baseTabTypesName[1]]: 'PERIMETER',
        [baseTabTypesName[2]]: 'FARM',
        [baseTabTypesName[3]]: 'BARRACKS',
        [baseTabTypesName[4]]: 'TRAINING AREA',
        [baseTabTypesName[5]]: 'MESS',
        [baseTabTypesName[6]]: 'LABORATORY',
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
                <div className='item-type-name'>{itemTypeName[itemTabType]}</div>
            </div>
            <section className='items-development-box'>
                <ul className='item-type-list'>
                    {itemTabTypesName.map(itemType => (
                        <li><button className={itemTabType===itemType?'item-tab-selected':''} onClick={()=>onItemTabClick(itemType)}>
                            <img src={`${imageSourceBasedOnDept[developmentType]}${itemType}.png`} width='50px' alt={itemType}/>
                        </button></li>
                    ))}

                </ul>
                <section className='items-to-develop'>all items of the specified type</section>

            </section>
        </div>
    )
}

export default DevelopmentScreenController
