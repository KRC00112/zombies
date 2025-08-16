import React from 'react'
import {TypeAnimation} from "react-type-animation";

function StaffManagementTabHeader() {
    return (
        <header className="staff-management-tab-header">
            <div className='tab-title-and-resources-display'>
                    <TypeAnimation
                    sequence={['MANAGE STAFF']}
                    wrapper="h1"
                    speed={50}
                    cursor={false}/>
            </div>
        </header>
    )
}

export default StaffManagementTabHeader
