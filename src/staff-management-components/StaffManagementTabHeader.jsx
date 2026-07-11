import React from 'react'
import {TypeAnimation} from "react-type-animation";

function StaffManagementTabHeader({foodPercent}) {
    return (
        <header className="staff-management-tab-header">
            <div className='tab-title-display'>
                    <TypeAnimation
                    sequence={['MANAGE STAFF']}
                    wrapper="h1"
                    speed={50}
                    cursor={false}/>
            </div>
            <div>FOOD: {Math.floor(foodPercent()/5)}/50</div>
        </header>
    )
}

export default StaffManagementTabHeader
