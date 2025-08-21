import React, {useEffect, useMemo, useState} from 'react'
import {TypeAnimation} from "react-type-animation";

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

    const melee_weapons_list = [
        {"id":1,"name":"stick","resources":{"wood":2},"rd_team_level_required":0,"kitchen_staff_level_required":0,"scout_team_level_required":0,"time_to_develop":"instant"},
        {"id":2,"name":"knife","resources":{"metal":3,"wood":1},"rd_team_level_required":2,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"1 mission"},
        {"id":3,"name":"bo staff","resources":{"wood":4,"cloth":1},"rd_team_level_required":2,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"1 mission"},
        {"id":4,"name":"machete","resources":{"metal":5,"wood":2},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"2 missions"},
        {"id":5,"name":"spear","resources":{"wood":3,"metal":2},"rd_team_level_required":2,"kitchen_staff_level_required":1,"scout_team_level_required":2,"time_to_develop":"2 missions"},
        {"id":6,"name":"warhammer","resources":{"metal":6,"wood":3},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":7,"name":"katana","resources":{"metal":8,"cloth":2},"rd_team_level_required":5,"kitchen_staff_level_required":1,"scout_team_level_required":3,"time_to_develop":"4 missions"},
        {"id":8,"name":"dagger","resources":{"metal":2,"cloth":1},"rd_team_level_required":1,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"instant"},
        {"id":9,"name":"club","resources":{"wood":3},"rd_team_level_required":1,"kitchen_staff_level_required":0,"scout_team_level_required":0,"time_to_develop":"instant"},
        {"id":10,"name":"halberd","resources":{"metal":7,"wood":4},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"4 missions"},
        {"id":11,"name":"scythe","resources":{"metal":6,"wood":3},"rd_team_level_required":4,"kitchen_staff_level_required":1,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":12,"name":"battle axe","resources":{"metal":7,"wood":2},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"4 missions"},
        {"id":13,"name":"flail","resources":{"metal":5,"wood":2,"cloth":1},"rd_team_level_required":4,"kitchen_staff_level_required":1,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":14,"name":"rapier","resources":{"metal":6,"cloth":1},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":15,"name":"morning star","resources":{"metal":6,"wood":2},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":16,"name":"claymore","resources":{"metal":9,"wood":3},"rd_team_level_required":6,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"5 missions"}
    ];




    const handguns_list = [
        {"id":1,"name":"M1911","resources":{"metal":8,"wood":2,"gunpowder":5},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"2 missions"},
        {"id":2,"name":"SOCOM","resources":{"metal":10,"electronics":2,"gunpowder":6},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":3,"name":"Mk22","resources":{"metal":9,"wood":1,"gunpowder":5},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"2 missions"}
    ];

    const shotguns_list = [
        {"id":1,"name":"Remington 870","resources":{"metal":12,"wood":3,"gunpowder":8},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"3 missions"},
        {"id":2,"name":"Mossberg 590","resources":{"metal":14,"wood":3,"gunpowder":9},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"3 missions"},
        {"id":3,"name":"SPAS-12","resources":{"metal":16,"electronics":2,"gunpowder":10},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":4,"time_to_develop":"4 missions"}
    ];

    const assault_rifles_list = [
        {"id":1,"name":"AK-47","resources":{"metal":18,"wood":3,"gunpowder":12},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":4,"time_to_develop":"4 missions"},
        {"id":2,"name":"M16A4","resources":{"metal":20,"electronics":3,"gunpowder":14},"rd_team_level_required":6,"kitchen_staff_level_required":0,"scout_team_level_required":4,"time_to_develop":"5 missions"},
        {"id":3,"name":"FN SCAR-L","resources":{"metal":22,"electronics":4,"gunpowder":15},"rd_team_level_required":6,"kitchen_staff_level_required":0,"scout_team_level_required":5,"time_to_develop":"5 missions"}
    ];

    const throwables_list = [
        {"id":1,"name":"Frag Grenade","resources":{"metal":4,"gunpowder":6},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"2 missions"},
        {"id":2,"name":"Smoke Grenade","resources":{"metal":3,"chemicals":4},"rd_team_level_required":2,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"1 mission"},
        {"id":3,"name":"Molotov Cocktail","resources":{"glass":1,"cloth":1,"fuel":2},"rd_team_level_required":1,"kitchen_staff_level_required":0,"scout_team_level_required":0,"time_to_develop":"instant"}
    ];

    const heavy_fire_power_list = [
        {"id":1,"name":"M2 Browning","resources":{"metal":30,"electronics":5,"gunpowder":20},"rd_team_level_required":7,"kitchen_staff_level_required":0,"scout_team_level_required":5,"time_to_develop":"6 missions"},
        {"id":2,"name":"RPG-7","resources":{"metal":20,"electronics":3,"gunpowder":18,"fuel":5},"rd_team_level_required":6,"kitchen_staff_level_required":0,"scout_team_level_required":5,"time_to_develop":"5 missions"},
        {"id":3,"name":"M224 Mortar","resources":{"metal":35,"electronics":6,"gunpowder":25},"rd_team_level_required":8,"kitchen_staff_level_required":0,"scout_team_level_required":6,"time_to_develop":"7 missions"}
    ];

    const health_list = [
        {"id":1,"name":"First Aid Kit","resources":{"cloth":2,"medicine":2,"alcohol":1},"rd_team_level_required":1,"kitchen_staff_level_required":1,"scout_team_level_required":0,"time_to_develop":"instant"},
        {"id":2,"name":"Medpack","resources":{"cloth":3,"medicine":3,"alcohol":2},"rd_team_level_required":2,"kitchen_staff_level_required":2,"scout_team_level_required":0,"time_to_develop":"1 mission"},
        {"id":3,"name":"Field Surgery Kit","resources":{"cloth":5,"medicine":5,"metal":2},"rd_team_level_required":3,"kitchen_staff_level_required":3,"scout_team_level_required":1,"time_to_develop":"2 missions"}
    ];

    const action_points_list = [
        {"id":1,"name":"Adrenaline Shot","resources":{"chemicals":3,"medicine":2,"alcohol":1},"rd_team_level_required":2,"kitchen_staff_level_required":1,"scout_team_level_required":0,"time_to_develop":"1 mission"},
        {"id":2,"name":"Stimulant Pills","resources":{"chemicals":2,"medicine":1},"rd_team_level_required":2,"kitchen_staff_level_required":1,"scout_team_level_required":0,"time_to_develop":"instant"},
        {"id":3,"name":"Energy Drink","resources":{"water":1,"chemicals":1,"sugar":1},"rd_team_level_required":1,"kitchen_staff_level_required":1,"scout_team_level_required":0,"time_to_develop":"instant"}
    ];

    const seeds_list = [
        {"id":1,"name":"Wheat Seeds","resources":{"seeds":5,"soil":1},"rd_team_level_required":1,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"instant"},
        {"id":2,"name":"Corn Seeds","resources":{"seeds":6,"soil":1},"rd_team_level_required":1,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"instant"},
        {"id":3,"name":"Soybean Seeds","resources":{"seeds":7,"soil":1},"rd_team_level_required":2,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"1 mission"}
    ];

    const main_house_list = [
        {"id":1,"name":"Command Center","resources":{"wood":20,"metal":15,"electronics":5,"cement":10},"rd_team_level_required":6,"kitchen_staff_level_required":0,"scout_team_level_required":4,"time_to_develop":"5 missions"},
        {"id":2,"name":"Living Quarters","resources":{"wood":15,"metal":10,"stone":10},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":3,"name":"Armory","resources":{"metal":20,"wood":10,"cement":8},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"4 missions"}
    ];

    const perimeter_list = [
        {"id":1,"name":"Watchtower","resources":{"wood":15,"metal":5,"stone":5},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"2 missions"},
        {"id":2,"name":"Barbed Wire Fence","resources":{"metal":8,"wire":6,"wood":4},"rd_team_level_required":2,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"1 mission"},
        {"id":3,"name":"Searchlights","resources":{"metal":5,"electronics":3,"glass":2},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"2 missions"}
    ];

    const farm_list = [
        {"id":1,"name":"Vegetable Patch","resources":{"seeds":10,"wood":5,"water":5},"rd_team_level_required":2,"kitchen_staff_level_required":0,"scout_team_level_required":1,"time_to_develop":"1 mission"},
        {"id":2,"name":"Chicken Coop","resources":{"wood":12,"metal":4,"livestock":5},"rd_team_level_required":2,"kitchen_staff_level_required":1,"scout_team_level_required":1,"time_to_develop":"2 missions"},
        {"id":3,"name":"Irrigation System","resources":{"metal":8,"wood":6,"water":10},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"}
    ];

    const barracks_list = [
        {"id":1,"name":"Basic Barracks","resources":{"wood":15,"stone":10,"metal":5},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"2 missions"},
        {"id":2,"name":"Officer Quarters","resources":{"wood":20,"metal":10,"stone":15},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"3 missions"},
        {"id":3,"name":"Elite Barracks","resources":{"metal":25,"stone":20,"wood":15},"rd_team_level_required":6,"kitchen_staff_level_required":0,"scout_team_level_required":4,"time_to_develop":"5 missions"}
    ];

    const training_area_list = [
        {"id":1,"name":"Shooting Range","resources":{"wood":10,"metal":10,"stone":5},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":2,"name":"Obstacle Course","resources":{"wood":12,"stone":8},"rd_team_level_required":3,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"2 missions"},
        {"id":3,"name":"Combat Simulation Room","resources":{"metal":20,"electronics":8,"cement":10},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":4,"time_to_develop":"4 missions"}
    ];

    const mess_list = [
        {"id":1,"name":"Dining Hall","resources":{"wood":12,"stone":10,"kitchenware":5},"rd_team_level_required":2,"kitchen_staff_level_required":2,"scout_team_level_required":0,"time_to_develop":"2 missions"},
        {"id":2,"name":"Kitchen","resources":{"wood":8,"metal":6,"kitchenware":8},"rd_team_level_required":2,"kitchen_staff_level_required":2,"scout_team_level_required":0,"time_to_develop":"1 mission"},
        {"id":3,"name":"Food Storage","resources":{"wood":10,"stone":8,"metal":4},"rd_team_level_required":1,"kitchen_staff_level_required":1,"scout_team_level_required":0,"time_to_develop":"1 mission"}
    ];

    const laboratory_list = [
        {"id":1,"name":"Chemistry Lab","resources":{"metal":10,"glass":5,"chemicals":5,"electronics":4},"rd_team_level_required":4,"kitchen_staff_level_required":0,"scout_team_level_required":2,"time_to_develop":"3 missions"},
        {"id":2,"name":"Biotech Lab","resources":{"metal":12,"glass":6,"electronics":5,"medicine":5},"rd_team_level_required":5,"kitchen_staff_level_required":0,"scout_team_level_required":3,"time_to_develop":"4 missions"},
        {"id":3,"name":"Weapons Research Lab","resources":{"metal":20,"electronics":10,"chemicals":8},"rd_team_level_required":7,"kitchen_staff_level_required":0,"scout_team_level_required":4,"time_to_develop":"6 missions"}
    ];



    const itemTypeName = {
        [weaponTabTypesName[0]]: ['MELEE WEAPONS',melee_weapons_list],
        [weaponTabTypesName[1]]: ['HANDGUNS',handguns_list],
        [weaponTabTypesName[2]]: ['SHOTGUNS',shotguns_list],
        [weaponTabTypesName[3]]: ['ASSAULT RIFLES',assault_rifles_list],
        [weaponTabTypesName[4]]: ['THROWABLES',throwables_list],
        [weaponTabTypesName[5]]: ['HEAVY FIRE POWER',heavy_fire_power_list],
        [aidTabTypesName[0]]: ['HEALTH',health_list],
        [aidTabTypesName[1]]: ['ACTION POINTS',action_points_list],
        [aidTabTypesName[2]]: ['SEEDS',seeds_list],
        [baseTabTypesName[0]]: ['MAIN HOUSE',main_house_list],
        [baseTabTypesName[1]]: ['PERIMETER',perimeter_list],
        [baseTabTypesName[2]]: ['FARM',farm_list],
        [baseTabTypesName[3]]: ['BARRACKS',barracks_list],
        [baseTabTypesName[4]]: ['TRAINING AREA',training_area_list],
        [baseTabTypesName[5]]: ['MESS',mess_list],
        [baseTabTypesName[6]]: ['LABORATORY',laboratory_list]
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
                        {itemTypeName[itemTabType][1].map((item) => (

                            <li key={item.id}>

                                <ItemCard
                                    itemName={item.name}
                                    itemRandDlevelReq={item.rd_team_level_required}
                                    itemKitchenStaffReq={item.kitchen_staff_level_required}
                                    itemScoutTeamReq={item.scout_team_level_required}
                                    itemDevelopmentTime={item.time_to_develop}/>
                            </li>
                        ))}
                    </ul>

                </section>

            </section>
        </div>
    )
}
function ItemCard({itemName, itemRandDlevelReq, itemKitchenStaffReq, itemScoutTeamReq, itemDevelopmentTime}) {
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
                <div className='department-reqs'>
                    <div>R&D Lvl Req: {itemRandDlevelReq}</div>
                    <div>K.Staff Lvl Req: {itemKitchenStaffReq}</div>
                    <div>S.Team Lvl Req: {itemScoutTeamReq}</div>
                </div>
                <button className='start-development-btn'>START DEVELOPMENT</button>

            </div>
        </div>
    );

}

export default DevelopmentScreenController
