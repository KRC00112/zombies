import React from 'react'

function HomeScreenController() {
    return (
        <div className="home-screen">
            <div className='cycling-button'>
                <button>next house</button>
                <button>next fence</button>
                <button>next practice range</button>
            </div>

            <Canvas />

        </div>

    )
}


function Canvas(){
    return (
        <div className='canvas-container'>s</div>
    )
}

export default HomeScreenController
