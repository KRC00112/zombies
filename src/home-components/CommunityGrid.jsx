import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const TILE_WIDTH = 100;
const TILE_HEIGHT = 50;
const SCREEN_WIDTH = window.innerWidth;
let x_start = SCREEN_WIDTH/2 - TILE_WIDTH/2;
let y_start = 80;

function DrawTile({imgSrc,x,y}){
    let x_screen = x_start + (x - y) * TILE_WIDTH/2;
    let y_screen = y_start + (x + y) * TILE_HEIGHT/2;
    return <img src={imgSrc} draggable='false' style={{ position: 'absolute', left: `${x_screen}px`, top: `${y_screen}px` }} />
}

function CommunityGrid() {
    let grid = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];


    let fence_Array=[-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13]

    let tile_images=['/tiles/grass.png','/tiles/water.png','/tiles/sand.png']
    return (
        <TransformWrapper
            limitToBounds={false}
            onPanningStop={(ref) => ref.resetTransform(300)}>
            <TransformComponent>
                <div className='canvas' style={{transform: "scale(0.7)", transformOrigin: "top ", marginLeft:'-110px'}}>
                    {/*grid foundation*/}
                    { grid.map((row, i) =>{
                        return  row.map((col, j) =>{

                            return <DrawTile imgSrc={tile_images[grid[j][i]]} x={i} y={j} key={`${j}-${i}`}/>
                        })
                    })}
                    {/*back right perimeter*/}
                    {fence_Array.map((num, index) =>{
                        return <DrawTile imgSrc={'/tiles/fence.png'} x={num} y={-1} key={num}/>

                    })}
                    <DrawTile imgSrc={'/tower.PNG'} x={-1.6} y={-1} />
                    <DrawTile imgSrc={'/tower.PNG'} x={-1.6} y={11} />
                    <DrawTile imgSrc={'/church.PNG'} x={4.7} y={5} />
                    <DrawTile imgSrc={'/tower.PNG'} x={10.4} y={11} />
                    <DrawTile imgSrc={'/tower.PNG'} x={10.4} y={-1} />
                    {/*front left perimeter*/}
                    {fence_Array.map((num, index) =>{
                        return <DrawTile imgSrc={'/tiles/fence.png'} x={num} y={13} key={num}/>

                    })}
                </div>
            </TransformComponent>
        </TransformWrapper>
    )
}

export default CommunityGrid

