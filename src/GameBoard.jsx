import './index.css'
import './App.css'
import {useEffect, useRef, useState} from "react";

function GameBoard({quitMissionGameBoard}) {


    const medkit = {
        id: 'medkit',
        name: 'Med Kit',
        type: 'consumable',
        heal: 30,
        ap_consumption: 2,
        description: 'Restores 30 HP'
    };
    const stick = {
        id: 'stick',
        name: 'Wooden Stick',
        type: 'weapon',
        weaponType: 'melee',
        dmg: 8,
        range: 1,
        ap_consumption: 3,
        description: 'A basic melee weapon'
    };
    const gun = {
        id: 'gun',
        name: 'Handgun',
        type: 'weapon',
        weaponType: 'ranged',
        dmg: 20,
        range: 2,
        ammo: 6,
        maxAmmo: 6,
        ap_consumption: 4,
        description: 'Standard issue sidearm'
    };



    let players = [
        { id: 'P1', row: 0, col: 0, imgSrc: 'Soldier.png', inventory: [medkit, stick, gun], AP: 5, HP: 100 },
        { id: 'P2', row: 0, col: 4, imgSrc: 'Soldier.png', inventory: [stick, gun], AP: 3, HP: 80 },
        { id: 'P3', row: 1, col: 6, imgSrc: 'Soldier.png', inventory: [medkit, gun], AP:4, HP: 90 },


    ];

    let enemies = [
        {id:'E1', row:7, col:1, imgSrc:'Orc.png', targetPlayerId:"", AP:20, HP:99, dmg:20, ap_consumption:4},
        {id:'E2', row:7, col:5, imgSrc:'Orc.png', targetPlayerId:"", AP:20, HP:80, dmg:25, ap_consumption:1},
        {id:'E3', row:4, col:3, imgSrc:'Orc.png', targetPlayerId:"", AP:20, HP:66, dmg:20, ap_consumption:3},
    ];
    let arr = [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30, 31, 32],
        [33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48],
        [49, 50, 51, 52, 53, 54, 55, 56],
        [57, 58, 59, 60, 61, 62, 63, 64],
    ];
    const [playerCells, setPlayerCells] = useState(players);
    const [selectedPlayerCellId, setSelectedPlayerCellId] = useState("");
    const selectedPlayer=playerCells.find(obj=>obj.id===selectedPlayerCellId);

    const [enemyCells, setEnemyCells]=useState(enemies);
    const [activeEnemyCellId, setActiveEnemyCellId]=useState("");
    const activeEnemy=enemyCells.find(obj=>obj.id===activeEnemyCellId);

    const [currentActiveItemId, setCurrentActiveItemId]=useState("");
    const [attackableCells, setAttackableCells]=useState([{row:null, col:null}]);

    let currentActiveItem=null;
    if(selectedPlayer){
        currentActiveItem=selectedPlayer.inventory.find(obj=>obj.id===currentActiveItemId.slice(3,));
    }


    let enemyNumInList=useRef(enemyCells.length-1)
    let APCount=useRef(0);

    /*TODO: APCount is causing issues with premature enemy turn trigger(line 31 & 152>=)[SOLVED]*/
    /*TODO: undefined player_to_attack object causes EnemyNavigation to not proceed (handleEndTurn(), EnemyNavigation() , attackPlayer())*/



    useEffect(() => {
        if(activeEnemyCellId==="") return
        const enemyNav=async ()=>{
            try{
                await EnemyNavigation()
            }catch(e){
                console.error("error: ",e)
            }
        }
        enemyNav();
    }, [activeEnemyCellId]);

    useEffect(() => {
        if (currentActiveItem && selectedPlayer) {
            let minRow = selectedPlayer.row - currentActiveItem.range
            let maxRow = selectedPlayer.row + currentActiveItem.range
            let minCol = selectedPlayer.col - currentActiveItem.range
            let maxCol = selectedPlayer.col + currentActiveItem.range
            const cells = [];
            for (let i = minRow; i <= maxRow; i++) {
                for(let j=minCol; j <= maxCol; j++){
                    if(i===selectedPlayer.row && j===selectedPlayer.col){
                        continue;
                    }
                    cells.push({row:i, col:j})
                }
            }
            setAttackableCells(cells);
        }
    }, [selectedPlayer, currentActiveItem]);


    useEffect(() => {
        enemyNumInList.current=enemyCells.length-1;
    }, [enemyCells.length]);




    async function onCellClick(id,row,column){

        playerCells.find((obj)=>{
            if(obj.id===id){
                setSelectedPlayerCellId(obj.id);
                setCurrentActiveItemId("")
                setAttackableCells([{row:null, col:null}])

            }
        })

        if(id && id[0]==="E" && currentActiveItem && selectedPlayer.AP>=currentActiveItem.ap_consumption){
            let clicked_enemy=enemyCells.find((obj)=>obj.id===id);
            let checkIfClickedEnemyInRange=attackableCells.find(obj=>obj.row===clicked_enemy.row && obj.col===clicked_enemy.col);
            if(checkIfClickedEnemyInRange){
                console.log(`${selectedPlayerCellId} attacked ${id}`)
                attackEnemy(id);
            }
        }

        if(id===selectedPlayerCellId){
            setSelectedPlayerCellId("");
            setCurrentActiveItemId("")
        }
        if(id===null && selectedPlayerCellId!=="" && selectedPlayer.AP>0 && currentActiveItemId===""){
            await playerNavigation(id,row,column);
        }

    }

    function attackEnemy(enemyId){
        setPlayerCells(prev=>prev.map(obj =>{
            if(obj.id===selectedPlayerCellId){
                return {...obj, AP:(obj.AP-currentActiveItem.ap_consumption)<0?0:(obj.AP-currentActiveItem.ap_consumption)};
            }
            return obj;
        }))
        setEnemyCells(prev=>prev.map(obj=>{
            if(obj.id===enemyId){
                return {...obj, HP:(obj.HP-currentActiveItem.dmg)<0?0:(obj.HP-currentActiveItem.dmg)};
            }
            return obj;
        }))
        setEnemyCells(prev=>prev.filter(obj=>{
            return obj.HP>0;
        }))
    }

    function attackPlayer(playerId) {

        setEnemyCells(prev =>
            prev.map(obj => {
                if (obj.id === activeEnemyCellId) {
                    return {
                        ...obj,
                        AP: (obj.AP - activeEnemy.ap_consumption) < 0
                            ? 0
                            : (obj.AP - activeEnemy.ap_consumption)
                    };
                }
                return obj;
            })
        );
        let killedPlayerId=null
        setPlayerCells(prev =>
            prev.map(obj => {
                if (obj.id === playerId) {
                    const newHP=(obj.HP - activeEnemy.dmg) < 0 ? 0 : (obj.HP - activeEnemy.dmg);
                    if(newHP===0){
                        killedPlayerId=obj.id;
                    }
                    return {...obj, HP: newHP};
                }
                return obj;
            })
        );

        // if(killedPlayerId){
        //     setEnemyCells(prev=>prev.map(obj => {
        //         if(obj.targetPlayerId===killedPlayerId){
        //             return {...obj, targetPlayerId:""};
        //         }
        //         return obj;
        //     }))
        // }
        //TODO:THE BELOW LINE IS CAUSING BUG
        // setPlayerCells(prev=>prev.filter(obj=>obj.id!==killedPlayerId))
    }


    useEffect(() => {
        const killedPlayers=playerCells.filter((player)=>player.HP===0).map(player=>player.id);
        if (killedPlayers.length === 0) return;
        setEnemyCells(prev=>prev.map(obj => {
            if(killedPlayers.includes(obj.targetPlayerId)){
                return {...obj, targetPlayerId:""}
            }
            return obj;
        }))
        setPlayerCells(prev=>prev.filter(obj=>!killedPlayers.includes(obj.id)))

    }, [playerCells,enemyCells]);


    function handleEndTurn(){

        const alivePlayers = playerCells.filter(p => p.HP > 0);
        if(alivePlayers.length===0)return;

        if(enemyCells.length>0) {



            setSelectedPlayerCellId("")
            setCurrentActiveItemId("")

            APCount.current = 0;
            setEnemyCells(prev => {
                return prev.map(obj => {
                    if (obj.targetPlayerId === "" || !alivePlayers.find(p => p.id === obj.targetPlayerId)) {
                        const rand = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
                        return { ...obj, targetPlayerId: rand.id };
                    }
                    return obj;
                });
            });

            // console.log(`enemy num in lsit: ${enemyNumInList.current}`);
            setActiveEnemyCellId(enemyCells[enemyNumInList.current].id)
        }
        // console.log("=============")
    }


    function onInventoryItemClick(itemId){

        // console.log(currentActiveItemId)
        if(itemId===currentActiveItemId){
            setCurrentActiveItemId("")
        }else{
            setCurrentActiveItemId(itemId)
        }

    }


    function EnemyNavigation(){

        // console.log("players: ",playerCells)
        // console.log(activeEnemy.targetPlayerId)

        // let target_player_exits_check=playerCells.find(obj=>obj.id===activeEnemy.targetPlayerId)
        //
        // if(!target_player_exits_check){
        //    return
        // }
        //

        let player_to_attack=playerCells.find((obj)=>obj.id===activeEnemy.targetPlayerId)

        let currentEnemyRow=activeEnemy.row;
        let currentEnemyCol=activeEnemy.col;
        // console.log("active enemy: ",activeEnemy)
        // console.log("player to attack: ",player_to_attack)
        console.log("enemyCells: ",enemyCells)

        let targetRow = player_to_attack.row;
        let targetCol = player_to_attack.col;
        let enemyAP=activeEnemy.AP
        return new Promise((resolve)=>{
            const interval = setInterval(() => {
                if(enemyAP>0){
                    if(targetRow!==currentEnemyRow){

                        if(targetRow<currentEnemyRow){
                            currentEnemyRow--;
                            enemyAP--;
                        }else if(targetRow>currentEnemyRow) {
                            currentEnemyRow++;
                            enemyAP--;
                        }
                    }else{
                        if(targetCol+1 < currentEnemyCol){
                            currentEnemyCol--;
                            enemyAP--;
                        }else if(targetCol+1 > currentEnemyCol) {
                            currentEnemyCol++;
                            enemyAP--;
                        }
                    }
                }
                if (enemyAP <= 0 ||(currentEnemyRow===targetRow && (currentEnemyCol===targetCol-1||currentEnemyCol===targetCol+1))){
                    if(enemyAP>0) {
                        // console.log("hit player: ",player_to_attack)
                        attackPlayer(player_to_attack.id);

                    }
                    clearInterval(interval);
                    resolve();
                }
                setEnemyCells(prev=>prev.map(obj =>{
                    return obj.id === activeEnemyCellId ? { ...obj, row: currentEnemyRow, col: currentEnemyCol, AP:enemyAP } : obj
                }))

            }, 100);
        }).then( function(){

            enemyNumInList.current-=1;
            if(enemyNumInList.current<0){
                setActiveEnemyCellId("")
                enemyNumInList.current=enemyCells.length-1
                setPlayerCells(prev=>prev.map(obj=>{
                    let currPlayer=players.find(player=>{
                        if(obj.id===player.id){
                            return player;
                        }
                    })
                    return {...obj, AP:currPlayer.AP}
                }))
                return;
            }


            return handleEndTurn();
        })
    }

    function playerNavigation(id,row,column){

        let currentPlayerRow=selectedPlayer.row;
        let currentPlayerCol=selectedPlayer.col;
        let targetRow=row;
        let targetCol=column;
        let playerAP=selectedPlayer.AP
        return new Promise((resolve)=>{
            const interval = setInterval(() => {
                // console.log("running")
                if(playerAP>0){
                    playerAP--;
                    if(targetRow!==currentPlayerRow){
                        if(targetRow<currentPlayerRow){
                            currentPlayerRow--;
                        }else if(targetRow>currentPlayerRow) {
                            currentPlayerRow++;
                        }
                    }else{
                        if(targetCol < currentPlayerCol){
                            currentPlayerCol--;
                        }else if(targetCol > currentPlayerCol) {
                            currentPlayerCol++;
                        }
                    }
                }
                if (playerAP<=0||(currentPlayerRow===targetRow && currentPlayerCol===targetCol)){

                    if(playerAP===0 ){
                        APCount.current+=1;
                    }
                    clearInterval(interval);
                    resolve();
                }
                setPlayerCells(prev=>prev.map(obj =>{
                    return obj.id === selectedPlayerCellId ? { ...obj, row: currentPlayerRow, col: currentPlayerCol, AP:playerAP } : obj
                }))
            }, 100);
        }).then( function(){

            if(APCount.current===playerCells.length){
                setEnemyCells(enemyCells.map(obj=>{
                    let currEnemy=enemies.find(enemy=>{
                        if(obj.id===enemy.id){
                            return enemy;
                        }
                    })

                    return {...obj, AP:currEnemy.AP}

                }))
                return handleEndTurn();
            }
        })
    }

    function Cell({cellNumber,row,column}){
        let imageSrc='';
        let id=null
        playerCells.map((obj)=>{
            if (row===obj.row && column===obj.col){
                imageSrc = obj.imgSrc;
                id=obj.id;
            }
        })
        enemyCells.map((obj)=>{
            if (row===obj.row && column===obj.col){
                imageSrc = obj.imgSrc
                id=obj.id
            }
        })
        let borderCellDesign=''
        if(selectedPlayer && row===selectedPlayer.row && column===selectedPlayer.col){
            borderCellDesign = 'playerSelectBorder'
        }else if(activeEnemy && row===activeEnemy.row && column===activeEnemy.col){
            borderCellDesign = 'enemySelectBorder'
        }else{
            borderCellDesign=''
        }
        if (currentActiveItem) {
            attackableCells.map((obj)=>{
                if(row===obj.row && column===obj.col){
                    borderCellDesign = 'attackLocationsSelectBorder';
                }
            })
        }
        return <div className={`cell ${borderCellDesign}`} title={id} onClick={()=>onCellClick(id,row,column,imageSrc)}>
            {imageSrc===''? `${cellNumber} (${row},${column})` :<img src={`/gameplay_files/${imageSrc}`} alt='cell' />}
        </div>
    }


    let playerAps=playerCells.map(obj=>{
        return <div key={obj.id}>Player {obj.id[1]} | AP: {obj.AP} | HP:{obj.HP}</div>;
    })
    let enemyAps=enemyCells.map((obj)=>{
        return <div key={obj.id}>Enemy {obj.id[1]} | AP: {obj.AP} | HP:{obj.HP}</div>;
    })

    return (
        <div className="board">
            <button className='go-back-button' onClick={quitMissionGameBoard}> Go Back </button>
            <h1>Board</h1>
            <div className='gameplay-area'>
                <ul>{arr.map(( subArr,i) => (
                    <ul key={i} className='board-columns'>{
                        subArr.map((el,j)=> {
                            return <Cell key={el} cellNumber={el} row={i} column={j}/>
                        })
                    }
                    </ul>
                ))}</ul>


                <div className='player-control-pannel'>
                    <div className='players-list'>{playerAps}</div>
                    <button className='end-turn-btn' onClick={()=>{
                        setEnemyCells(enemyCells.map(obj=>{
                            let currEnemy=enemies.find(enemy=>{
                                if(obj.id===enemy.id){
                                    return enemy;
                                }
                            })
                            return {...obj, AP:currEnemy.AP};
                        }))
                        handleEndTurn();
                    }}>END TURN</button>
                    <div>{enemyAps}</div>
                    <div className="inventory-items">
                        {playerCells.map(player=>{
                            if(player.id===selectedPlayerCellId){
                                return player.inventory.map((item)=>{
                                    return <div key={item.id}>
                                        <button className={`inventory-items-btn ${player.id+"-"+item.id===currentActiveItemId? 'active-click':''}`} onClick={()=>onInventoryItemClick(player.id+"-"+item.id)}>
                                            {item.name}
                                        </button>
                                        {item.description}
                                    </div>
                                })
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard




