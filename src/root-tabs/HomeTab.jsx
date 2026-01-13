import React from 'react'
import HomeTabHeader from "../home-components/HomeTabHeader.jsx";
import DevelopmentScreenController from "../development-components/DevelopmentScreenController.jsx";
import HomeScreenController from "../home-components/HomeScreenController.jsx";

function HomeTab() {
    return (
        <div className='home-tab bg-black'>
            <HomeTabHeader />
            <section className='home-tab-body'>

                <HomeScreenController/>
            </section>
        </div>
    )
}

export default HomeTab
