import React from 'react'

function HomeTabHeader({baseLevel}) {
    return (
        <header className='home-header'>
            <div className='home-title'>
                <span>Your Community</span>
                <span> level:{baseLevel}</span>
            </div>

            <div className='user-name-handle'>xyz@gmail.com</div>
        </header>
    )
}

export default HomeTabHeader
