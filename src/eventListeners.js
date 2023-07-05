import { buildMainScreen } from "./components/gameboardUI"
import { createBot, attack } from './index'
import { Player } from './factories/playerFactory'

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

            // if all ships are positioned on the board, then allow user to start the game
            if (board.numOfShipsReady === 5) toggleBeginBattleBtn()
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
            e.target.dataset.rotated = "false"

        } else {
            e.target.style.width = "var(--shipBoxSize)"
            e.target.style.height = `calc(var(--shipBoxSize) * ${shipLength})`
            e.target.dataset.rotated = "true"
        }
    }
}

function toggleBeginBattleBtn() {
    const btn = document.querySelector('button.beginBattle')
    if (!btn.style.display) {
        btn.style.display = 'flex'
        allowGameStart(btn)
    }
    else { btn.style.display = 'none'}
}

function resetShips() {
    // display ships again
    // allow draggable 
    // empty the board array
    // empty the board grid
    // hide begin battle button
}

function allowGameStart(btn) {
    btn.addEventListener('click', e => {
        buildMainScreen()
        createBot()
    })

}

// testing function to show where enemy ships is for development
function displayBotShips(bot){
    console.log(bot.viewBoard())
    const botBoard = document.querySelector('.bBoard .boardGrid')

    for (let i = 0; i < bot.viewBoard().length; i++) {
        for (let j = 0; j < bot.viewBoard()[i].length; j++) {
            const value = bot.viewBoard()[i][j];
            switch (value) {
                case 'carrier':
                    console.log(`Value at [${i}][${j}]: ${value}`);
                    const carrierCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    carrierCell.setAttribute("id", "botCarrier");
                    break;
                case 'battleShip':
                    console.log(`Value at [${i}][${j}]: ${value}`);
                    const battleShipCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    battleShipCell.setAttribute("id", "botBattleShip");
                    break
                case 'cruiser':
                    console.log(`Value at [${i}][${j}]: ${value}`);
                    const cruiserCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    cruiserCell.setAttribute("id", "botCruiser");
                    break;
                case 'submarine':
                    console.log(`Value at [${i}][${j}]: ${value}`);
                    const submarineCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    submarineCell.setAttribute("id", "botSubmarine");
                    break;
                case 'destroyer':
                    console.log(`Value at [${i}][${j}]: ${value}`);
                    const destroyerCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    destroyerCell.setAttribute("id", "botDestroyer");
                    break;
            }
        }
    }

}

function allowPlayerToAttack(player, board) {
    const botBoard = document.querySelector('.bBoard .boardGrid')
    console.log(botBoard);
    const botCells = botBoard.querySelectorAll('.box');
    botCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            console.log(`Cell at [${x}][${y}] clicked.`);
            if (player.attackEnemy([x, y], board) === "It's a hit!"){
                cell.innerText = "X"
            }
            else {
                cell.innerText = "*"
            } 
            
        });
    });
}
export { applyDragDrop, allowPlayerToAttack, displayBotShips }

