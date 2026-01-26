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

    let tile_images=['/tiles/grass.png','/tiles/water.png','/tiles/sand.png']
    return (
        <TransformWrapper
            limitToBounds={false}
            onPanningStop={(ref) => ref.resetTransform(300)}>
            <TransformComponent>
                <div className='canvas' style={{transform: "scale(0.6)", transformOrigin: "top"}}>
                    { grid.map((row, i) =>{
                        return  row.map((col, j) =>{

                            return <DrawTile imgSrc={tile_images[grid[j][i]]} x={i} y={j} key={`${j}-${i}`}/>
                        })
                    })}
                    <DrawTile imgSrc={'/tiles/fence.png'} x={-1} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={0} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={1} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={2} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={3} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={4} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={5} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={6} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={7} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={8} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={9} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={10} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={11} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={12} y={-1} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={13} y={-1} />

                    <DrawTile imgSrc={'/tower.PNG'} x={-1.6} y={-1} />
                    <DrawTile imgSrc={'/tower.PNG'} x={-1.6} y={11} />
                    <DrawTile imgSrc={'/church.PNG'} x={4.7} y={5} />
                    <DrawTile imgSrc={'/tower.PNG'} x={10.4} y={11} />
                    <DrawTile imgSrc={'/tower.PNG'} x={10.4} y={-1} />

                    <DrawTile imgSrc={'/tiles/fence.png'} x={-1} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={0} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={1} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={2} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={3} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={4} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={5} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={6} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={7} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={8} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={9} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={10} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={11} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={12} y={13} />
                    <DrawTile imgSrc={'/tiles/fence.png'} x={13} y={13} />

                </div>
            </TransformComponent>
        </TransformWrapper>
    )
}

export default CommunityGrid

