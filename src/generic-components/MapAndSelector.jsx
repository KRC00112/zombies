import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {useRef, useState} from "react";
import PulsingMarker from "./PulsingMarker.jsx";






const goToMission = (setTransform, id, mapRef,mapContainerRef,Locations) => {
    const mission = Locations.find(l => l.id === id);
    if (!mission || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const containerRect = mapContainerRef.current.getBoundingClientRect();

    const imageWidth = rect.width;
    const imageHeight = rect.height;

    const x = (mission.left / 100) * imageWidth;
    const y = (mission.top / 100) * imageHeight;

    setTransform(-x + containerRect.width / 2, -y + containerRect.height / 2, 2, 800);
};

const MissionsList = ({setTransform, mapRef,mapContainerRef,handleMissionSelect, selectedMission, Locations  }) => (
    <div className='mission-list-div'>
        <ul className='missions-list'>
            {Locations.map(obj => {
                return <li className={`mission-list-item ${selectedMission===obj.id?'mission-list-item-active':''}`} key={obj.id}>
                    <button className='mission-list-item-btn' onClick={() => {goToMission(setTransform, obj.id, mapRef,mapContainerRef,Locations);handleMissionSelect(obj.id)}}>{obj.name}</button><
                /li>
            })}
        </ul>
    </div>

);

function MapAndSelector({Locations,selectedMission,handleMissionSelect}) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);


    return (
        <TransformWrapper
            panning={{ disabled: true }}
            pinch={{ disabled: true }}
            doubleClick={{ disabled: true }}
            wheel={{ disabled: true }}
            zoomAnimation={{ disabled: false }}
            initialScale={2}
            initialPositionX={-200}
            initialPositionY={-310}
            limitToBounds={false}
        >
            {(utils) => (

                    <div className='map-and-missions'>

                        <div className="map-window" ref={mapContainerRef}>
                            <TransformComponent>
                                <img ref={mapRef} src={import.meta.env.BASE_URL + "/map/world_map.png"} alt="map" width='9216px' style={{color:"white"}}/>


                                {Locations.map(location => {
                                    return <PulsingMarker key={location.id} selectedMission={selectedMission} top={Math.round(location.top)} left={Math.round(location.left)} locationId={location.id} />
                                })}


                            </TransformComponent>
                        </div>
                        <MissionsList {...utils}  mapRef={mapRef} mapContainerRef={mapContainerRef} handleMissionSelect={handleMissionSelect} selectedMission={selectedMission} Locations={Locations}/>




                    </div>


            )}
        </TransformWrapper>

    )
}

export default MapAndSelector
