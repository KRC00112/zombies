import React from 'react'
import HomeTabHeader from "../home-components/HomeTabHeader.jsx";
import DevelopmentScreenController from "../development-components/DevelopmentScreenController.jsx";
import HomeScreenController from "../home-components/HomeScreenController.jsx";
import {Snowfall} from "react-snowfall";

function HomeTab({acquiredResourcesList}) {
    return (
        <div className='home-tab bg-black'>
            <HomeTabHeader />


            <section>


                <HomeScreenController acquiredResourcesList={acquiredResourcesList}/>
            </section>
        </div>
    )
}

export default HomeTab
