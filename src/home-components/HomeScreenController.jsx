import CommunityGrid from "./CommunityGrid.jsx";
import {Snowfall} from "react-snowfall";
import React from "react";

function HomeScreenController({acquiredResourcesList}) {
    return (
        <div className="home-screen">
            <Snowfall
                // Changes the snowflake color
                color="white"
                // Applied to the canvas element
                // Controls the number of snowflakes that are created (default 150)
                snowflakeCount={400}
                style={{zIndex: 2}}

            />

            <ul className='resources-display'>
                {acquiredResourcesList.map(obj=>{
                    return <li key={obj.name}>{obj.name}: {obj.amount}</li>
                })}
            </ul>
            <CommunityGrid/>
        </div>
    )
}
export default HomeScreenController
