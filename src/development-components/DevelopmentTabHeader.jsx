import React from 'react'
import {TypeAnimation} from "react-type-animation";

function DevelopmentTabHeader({rAndDLevel, scoutTeamLevel, kitchenStaffLevel}) {
    return (
        <header className="development-tab-header">

            <div className='tab-title-display'>
                <TypeAnimation
                    sequence={['DEVELOPMENT']}
                    wrapper="h1"
                    speed={50}
                    cursor={false}/>
            </div>

            <div className='department-levels'>
                <div>R&D Dept Lvl: {rAndDLevel} </div>
                <div>Scout Team Lvl:{scoutTeamLevel}</div>
                <div>Kitchen Staff Lvl: {kitchenStaffLevel}</div>
            </div>

        </header>
    )
}

export default DevelopmentTabHeader
