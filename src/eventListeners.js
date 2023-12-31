import { buildMainScreen, showBotBoard, displayGameResults } from "./components/gameboardUI"
import { createBot, p1 } from './index'

// rotated = vertical
// not rotated = horizontal


// DRAG N DROP
function applyDragDrop(board) {
    allowRotate()

    function dragStartHandler(event) {
        console.log("dragging", event.target.id, "...")
        event.dataTransfer.setData("text", `${event.target.id},${event.target.dataset.length}, ${event.target.dataset.rotated}`)
    }

    function dragOverHandler(event) {
        event.preventDefault()
    }

    function dropHandler(event) {
        function populateNextBox(boxElement, repeat, isRotated) {
            if (repeat === 0) return;
            
            boxElement.classList.add(shipName, "dropped")
            board.positionShip(boxElement.dataset.x, boxElement.dataset.y, shipName)
            repeat --

            if (isRotated) {
                const x = Number(boxElement.dataset.x)
                const nextDiv = document.querySelector(`[data-x="${x+1}"][data-y="${boxElement.dataset.y}"]`)
                populateNextBox(nextDiv, repeat, isRotated)
            } else {
                populateNextBox(boxElement.nextSibling, repeat, isRotated)
            }
        }

        function removeFromShipyard(shipName) {
            const ship = document.querySelector(`#${shipName}`)
            ship.classList.remove("rotatable")
            ship.style.display = 'none'
            ship.setAttribute('draggable', 'false')
        }

        function isValidDropZone(event, shipLength, isRotated) {

            function getIndexBasedOnShipRotation(event) {
                if (isRotated) return Number(event.target.dataset.x)
                return Number(event.target.dataset.y)
            }
            
            function areEmptySlots(boxElement, shipLength, index, isRotated) {
                if (boxElement.classList.contains("dropped")) return false
                if (boxElement === null) return false

                if (shipLength === 1) return true

                let nextBoxElement;

                if (isRotated) {
                    const x = Number(boxElement.dataset.x)
                    nextBoxElement = document.querySelector(`[data-x="${x+1}"][data-y="${boxElement.dataset.y}"]`)
                } else {
                    const y = Number(boxElement.dataset.y)
                    nextBoxElement = document.querySelector(`[data-x="${boxElement.dataset.x}"][data-y="${y+1}"]`)
                }
                shipLength--
                return areEmptySlots(nextBoxElement, shipLength, index, isRotated)
            }

            const index = getIndexBasedOnShipRotation(event)

            const validIndices = (index + (shipLength - 1)) <= 9
            if (!validIndices) return false

            const emptySlots = areEmptySlots(event.target, shipLength, index, isRotated)
            return emptySlots
        }

        event.preventDefault()
        let [shipName, shipLength, isRotated] = event.dataTransfer.getData("text").split(',')

        isRotated =  isRotated === " false" ? false : true

        if (isValidDropZone(event, shipLength, isRotated)) {
            event.target.classList.add(shipName, "dropped")
            populateNextBox(event.target, shipLength, isRotated)
            removeFromShipyard(shipName)
            board.numOfShipsReady++
            toggleResetShipsBtn()

            // if all ships are positioned on the board, then allow user to start the game
            if (board.numOfShipsReady === 5) {
                toggleBeginBattleBtn()
            }
        }
        event.target.classList.remove("hovered")
    }

    function isOccupiedBox(event) {
        return event.target.classList.contains("dropped")
    }

    function dragLeaveHandler(event) {
        event.target.classList.remove("hovered")
    }

    function dragEnterHandler(event) {
        if (!isOccupiedBox(event)) {
            event.target.classList.add("hovered")
        }
    }

    // Identify draggable ships
    const ships = document.querySelectorAll('.ship') 
    const boxes = document.querySelectorAll('.box')


    ships.forEach(ship => {
        ship.addEventListener("dragstart", event => dragStartHandler(event))
        // ship.addEventListener("drag", event => draggingHandler(event))
        // ship.addEventListener("dragend", event => dragEndHandler(event))
    })

    boxes.forEach(box => {
        box.addEventListener("dragenter", event => dragEnterHandler(event))
        box.addEventListener("dragover", event => dragOverHandler(event))
        box.addEventListener("dragleave", event => dragLeaveHandler(event))
        box.addEventListener("drop", event => dropHandler(event))
    })

}

function allowRotate() {
    const rotatableShips = document.querySelectorAll('.rotatable')

    rotatableShips.forEach(ship => {
        ship.addEventListener('click', e => rotateShip(e, e.target.dataset.length))
    })


    function rotateShip(e, shipLength) {
        
        if (e.target.dataset.rotated === "true") {
            e.target.style.width = `calc(var(--shipBoxSize) * ${shipLength})`
            e.target.style.height = "var(--shipBoxSize)"
            e.target.style.writingMode = "horizontal-tb";
            e.target.dataset.rotated = "false"

        } else {
            e.target.style.width = "var(--shipBoxSize)"
            e.target.style.height = `calc(var(--shipBoxSize) * ${shipLength})`
            e.target.style.writingMode = "vertical-lr";
            e.target.dataset.rotated = "true"
        }
    }
}

function toggleBeginBattleBtn() {
    const btn = document.querySelector('button.beginBattle')
    const shipYard = document.querySelector('.shipyard');
    const introHeading = document.querySelector('.introHeading');
    introHeading.innerText = 'Press Start to Begin.'
    shipYard.style.display = 'none'

    if (!btn.style.display) {
        btn.style.display = 'flex'
        allowGameStart(btn)
    }
    else { btn.style.display = 'none'}
}

function toggleResetShipsBtn(){
    const btn = document.querySelector('button.resetShipyard')

    if (btn.style.display) {
        btn.style.display = 'flex'
        resetShips(btn)
    }
    else { btn.style.display = 'none'}
}


function resetShips(btn) {
    btn.addEventListener('click', e => {
        location.reload()
    })
}

function allowGameStart(btn) {
    btn.addEventListener('click', e => {
        buildMainScreen()
        const bot = createBot()
        // start with players turn
        allowPlayerAttack(p1, bot)
    })
}

function allowTakingTurns(p1, bot, turn, prevTurn){
    console.log('current turn:', turn);

    function checkIfAllShipsSunk(){
        const p1Ships = p1.board.areAllShipsSunk();
        const botShips = bot.board.areAllShipsSunk();
        return p1Ships || botShips
    }

    if (checkIfAllShipsSunk() === false) {
        if (turn === "p1"){
            enableBotBoardEvents();        
        } else if (turn === "bot"){
            setTimeout(() => allowBotAttack(p1, bot), 200);
        }
        
    } else {
        setTimeout(() => displayGameResults(prevTurn), 500);
        const main = document.querySelector('.main');
        main.style.opacity = '0.2'
    }
}

function switchTurns(p1, bot, previousTurn){
    if (previousTurn === "p1") {
        disableBotBoardEvents();
        allowTakingTurns(p1, bot, "bot", previousTurn);
    } else if (previousTurn === "bot"){
        allowTakingTurns(p1, bot, "p1", previousTurn);
    }
}

// testing function to show where enemy ships is for development
function displayBotShips(bot){
    showBotBoard(bot);
}

// function to display ship[s that have sunk 
function updateSunkShips(turn, graveYard, sunkShips){
    const ships = turn.board.getAllShips();
    console.log (ships);
    for (let ship of ships){
        if (ship.sunk && !sunkShips.includes(ship.name)) {
            const shipElement = document.createElement('div');
            sunkShips.push(ship.name);
            shipElement.innerText = ship.name.toUpperCase();
            graveYard.appendChild(shipElement);
        }
    }

    console.log(sunkShips)
}


function allowPlayerAttack(p1, bot) {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box')
    const bGraveYard = document.querySelector('.bSunkShips');
    let botSunkShips = []

    boxes.forEach(box => {
        // hover
        box.addEventListener('mouseover', e => {
            e.target.style.borderColor = 'red';
            e.target.style.cursor = 'crosshair';
        })

        // mouse hover leaves
        box.addEventListener('mouseleave', e => {
            e.target.style.borderColor = ''
        })

        // attack is made
        box.addEventListener('click', e => {
            console.log(e)
            const coords = [Number(e.target.dataset.x), Number(e.target.dataset.y)]

            const attackFeedback = p1.attackEnemy(coords, bot.board)
            console.log(attackFeedback)
            if (attackFeedback === "It's a miss!") {
                e.target.classList.add('miss')
            } else if (attackFeedback === "It's a hit!") {
                e.target.classList.add('hit')
            }

            updateSunkShips(bot, bGraveYard, botSunkShips)

            e.target.classList.add('permanentlyDisabled')
            switchTurns(p1, bot, 'p1')
        })
    })
}


function allowBotAttack(p1, bot) {
    const pGraveYard = document.querySelector('.pSunkShips');
    let sunkShips = []


    const coordsArr = bot.getCoordinates();
    const attackFeedback = bot.attackEnemy(coordsArr, p1.board);
    console.log(attackFeedback);
    const boxElem = document.querySelector(`[data-x="${coordsArr[0]}"][data-y="${coordsArr[1]}"]`);

    if (attackFeedback === "invalid attack"){
        allowBotAttack(p1, bot)
    }
    else {
        if (attackFeedback === "It's a miss!") {
            boxElem.classList.add("miss")
        } else if (attackFeedback === "It's a hit!") {
            pGraveYard.innerText = ''
            boxElem.classList.add('hit')
            updateSunkShips(p1, pGraveYard, sunkShips);
        }
        switchTurns(p1, bot, 'bot');
    }

}

function disableBotBoardEvents() {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box');
    boxes.forEach(box => {
        if (!box.classList.contains('permanentlyDisabled')) {
            box.classList.add('disabled');
        }
    })
}

function enableBotBoardEvents() {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box');
    boxes.forEach(box => {
        box.classList.remove('disabled');
    })
}



export { applyDragDrop, displayBotShips }

