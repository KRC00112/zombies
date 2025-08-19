import React from 'react'
import {TypeAnimation} from "react-type-animation";

function DevelopmentTabHeader() {
    return (
        <header className="development-tab-header">
            <div className='tab-title-display'>
                <TypeAnimation
                    sequence={['DEVELOPMENT']}
                    wrapper="h1"
                    speed={50}
                    cursor={false}/>
            </div>
        </header>
    )
}

export default DevelopmentTabHeader
