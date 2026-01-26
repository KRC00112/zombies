import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {Snowfall} from "react-snowfall";

const TILE_WIDTH = 100;
const TILE_HEIGHT = 50;
const SCREEN_WIDTH = window.innerWidth;
let x_start = (SCREEN_WIDTH/2-TILE_WIDTH/2)+500;
let y_start = -80;

function DrawTile({imgSrc,x,y, width}){
    let x_screen = x_start + (x - y) * TILE_WIDTH/2;
    let y_screen = y_start + (x + y) * TILE_HEIGHT/2;
    return <img src={imgSrc} draggable='false' width={width} style={{  position: 'absolute', left: `${x_screen}px`, top: `${y_screen}px`}} />
}

function CommunityGrid() {
    let grid = [
        [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
        [12,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],

        [12,0,0,0,0,0,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,7,10,10,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,7,10,11,10,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,12],
        [12,0,0,0,0,0,7,10,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,1,0,0,0,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],

        [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,9,9,2,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,8,10,11,2,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,10,11,10,10,0,3,7,7,5,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,1,10,10,10,10,11,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,10,0,0,0,0,0,0,0,0,0,0,1,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,11,11,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,0,0,0,0,0,0,0,0,1,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,11,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,11,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,10,11,0,0,0,0,0,0,0,0,0,0,0,0,0,12],

        [12,0,0,0,1,0,0,0,1,0,0,0,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,1,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,11,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],

        [12,0,0,0,0,7,10,10,6,0,0,0,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,7,10,11,10,10,6,0,0,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,7,10,10,6,0,0,0,0,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],

        [12,0,1,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
        [12,0,0,0,0,0,0,0,0,0,0,0,0,10,10,11,0,0,0,0,0,0,0,0,0,0,0,0,1,12],
        [12,12,12,12,12,12,12,12,12,12,12,12,12,10,10,10,12,12,12,12,12,12,12,12,12,12,12,12,12,12]
    ];







    let left_facing_fence_Array = Array.from({ length: 30 }, (_, i) => i - 0);
    let right_facing_fence_Array = Array.from({ length: 31 }, (_, i) => i - 1);


    let tile_images=['/tiles/snow.png',
        '/tiles/snow_with_some_grass.png',
        '/tiles/black_patch_ground_backright_corner_border.png',
        '/tiles/black_patch_ground_frontleft_corner_border.png',
        '/tiles/black_patch_ground_backleft_corner_border.png',
        '/tiles/black_patch_ground_frontright_corner_border.png',
        '/tiles/black_patch_partial_ground_frontright_border.png',
        '/tiles/black_patch_partial_ground_frontleft_border.png',
        '/tiles/black_patch_partial_ground_backleft_border.png',
        '/tiles/black_patch_partial_ground_backright_border.png',
        '/tiles/black_patch.png',
        '/tiles/black_patch_with_some_snow.png',
        '/tiles/snow_border.png',


        '/tiles/sand.png']
    return (
        <TransformWrapper
            limitToBounds={false}
            onPanningStop={(ref) => ref.resetTransform(300)}>
            <TransformComponent>


                <div className='canvas' style={{transform:'scale(0.66)', transformOrigin: 'top left', marginLeft:'20px'}}>
                    {/*grid foundation*/}
                    { grid.map((row, j) =>{
                        return  row.map((col, i) =>{

                            return <DrawTile imgSrc={tile_images[col]} x={i} y={j} key={`${i}-${j}`}/>
                        })
                    })}
                    {/*back right perimeter*/}
                    {left_facing_fence_Array.map((num, index) =>{
                        return <DrawTile imgSrc={'/tiles/fence_face_left.png'} x={num} y={-1} key={num}/>

                    })}
                    {/*back left perimeter*/}
                    {right_facing_fence_Array.map((num, index) =>{
                        return <DrawTile imgSrc={'/tiles/fence_face_right.png'} x={0} y={num} key={num}/>

                    })}
                    {/*<DrawTile imgSrc={'/tower.PNG'} x={-1.6} y={-1} />*/}
                    {/*<DrawTile imgSrc={'/tower.PNG'} x={-1.6} y={11} />*/}
                    <DrawTile imgSrc={'/house_hi.png'} x={9.3} y={10} />
                    {/*<DrawTile imgSrc={'/tower.PNG'} x={10.4} y={11} />*/}
                    {/*<DrawTile imgSrc={'/tower.PNG'} x={10.4} y={-1} />*/}

                    {/*/!*front right perimeter*!/*/}
                    {right_facing_fence_Array.map((num, index) =>{



                        return <DrawTile imgSrc={'/tiles/fence_face_right.png'} x={29} y={num} key={num}/>

                    })}
                    {/*/!*front left perimeter*!/*/}
                    {left_facing_fence_Array.map((num, index) =>{

                        if ([13,14,15].includes(num)){
                            return null;
                        }


                        return <DrawTile imgSrc={'/tiles/fence_face_left.png'} x={num} y={29} key={num}/>

                    })}
                </div>
            </TransformComponent>
        </TransformWrapper>
    )
}

export default CommunityGrid

