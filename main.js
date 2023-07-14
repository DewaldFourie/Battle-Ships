/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/gameboardUI.js":
/*!***************************************!*\
  !*** ./src/components/gameboardUI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildMainScreen: () => (/* binding */ buildMainScreen),\n/* harmony export */   createBoardComponent: () => (/* binding */ createBoardComponent),\n/* harmony export */   createPlayerBoardUI: () => (/* binding */ createPlayerBoardUI),\n/* harmony export */   displayGameResults: () => (/* binding */ displayGameResults),\n/* harmony export */   showBotBoard: () => (/* binding */ showBotBoard)\n/* harmony export */ });\n// Function to create the board components in the user interface for each game\n\nfunction createBoardComponent(parentContainer) {\n\n    function createYHeader() {\n        const yHeader = document.createElement('div');\n        yHeader.classList.add('boardYHeader');\n        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];\n        for (let y = 0; y <= 9; y++) {\n            const box = document.createElement('div');\n            box.classList.add('boxHeader');\n            box.innerText = letters[y];\n            yHeader.append(box);\n        }\n        return yHeader;\n    }\n\n    function createXHeader() {\n        const xHeader = document.createElement('div');\n        xHeader.classList.add('boardXHeader');\n        \n        for (let x = 0; x <= 9; x++) {\n            const box = document.createElement('div');\n            box.classList.add('boxHeader');\n            box.innerText = x + 1;\n            xHeader.append(box);\n        }\n        return xHeader;\n    }\n\n    const childContainer = document.createElement('div');\n    childContainer.classList.add('boardContainer');\n\n    const board = document.createElement('div');\n    board.classList.add('boardGrid');\n\n    // create board grids\n    for (let x = 0; x <= 9; x++) {\n        const row = document.createElement('div');\n        row.classList.add('row');\n        for (let y = 0; y <= 9; y++){\n            const box = document.createElement('div');\n            box.classList.add('box');\n            box.dataset.x = x;\n            box.dataset.y = y;\n            row.append(box);\n        }\n        board.append(row)\n    }\n\n    childContainer.append(createXHeader(), createYHeader(), board)\n    parentContainer.append(childContainer)\n}\n\nfunction buildMainScreen() {\n    function showMainScreen() {\n        const introScreen = document.querySelector('.intro');\n        introScreen.style.display = 'none';\n\n        const mainScreen = document.querySelector('.main');\n        mainScreen.style.display = 'flex';\n\n        const pBoard = document.querySelector('.intro .pBoard');\n        console.log(pBoard);\n\n        const playerSide = document.querySelector('.playerSide');\n        playerSide.append(pBoard);\n    }\n\n    function createBotBoardUI() {\n        const botBoard = document.querySelector('.bBoard');\n        createBoardComponent(botBoard);\n    }\n\n    function updateBoardSizes() {\n        const boxSize = document.querySelector(':root');\n        boxSize.style.setProperty('--boxSize', '50px')\n    }\n\n    createBotBoardUI();\n    showMainScreen();\n    updateBoardSizes();\n}\n\nfunction createPlayerBoardUI() {\n    const pBoard = document.querySelector('.pBoard');\n    createBoardComponent(pBoard);\n}\n\nfunction showBotBoard(bot){\n    const botBoard = document.querySelector('.bBoard .boardGrid')\n    for (let i = 0; i < bot.viewBoard().length; i++) {\n        for (let j = 0; j < bot.viewBoard()[i].length; j++) {\n            const value = bot.viewBoard()[i][j];\n            switch (value) {\n                case 'carrier':\n                    const carrierCell = botBoard.querySelector(`[data-x=\"${i}\"][data-y=\"${j}\"]`);\n                    carrierCell.setAttribute(\"id\", \"botCarrier\");\n                    carrierCell.innerText = 'car'\n                    break;\n                case 'battleShip':\n                    const battleShipCell = botBoard.querySelector(`[data-x=\"${i}\"][data-y=\"${j}\"]`);\n                    battleShipCell.setAttribute(\"id\", \"botBattleShip\");\n                    battleShipCell.innerText = 'bat'\n                    break\n                case 'cruiser':\n                    const cruiserCell = botBoard.querySelector(`[data-x=\"${i}\"][data-y=\"${j}\"]`);\n                    cruiserCell.setAttribute(\"id\", \"botCruiser\");\n                    cruiserCell.innerText = 'cru'\n                    break;\n                case 'submarine':\n                    const submarineCell = botBoard.querySelector(`[data-x=\"${i}\"][data-y=\"${j}\"]`);\n                    submarineCell.setAttribute(\"id\", \"botSubmarine\");\n                    submarineCell.innerText = 'sub'\n                    break;\n                case 'destroyer':\n                    const destroyerCell = botBoard.querySelector(`[data-x=\"${i}\"][data-y=\"${j}\"]`);\n                    destroyerCell.setAttribute(\"id\", \"botDestroyer\");\n                    destroyerCell.innerText = 'des'\n                    break;\n            }\n        }\n    }\n}\n\nfunction displayGameResults(turn){\n    const outroElem = document.querySelector(\".outro\");\n    outroElem.style.display = \"flex\"\n    const outroContainer = document.createElement(\"div\")\n    outroContainer.classList.add(\"outroContainer\")\n    const head = document.createElement(\"div\")\n    head.classList.add(\"outroHead\")\n    head.innerText = \"GAME OVER\"\n    const bod = document.createElement(\"div\")\n    bod.classList.add(\"outroBody\")\n    let winText = ''\n    if (turn === 'bot'){\n        winText = \"The Computer won :(\"\n    }\n    else {\n        winText = \"WELL DONE, YOU WIN !!!\"\n    }\n    bod.innerText = winText\n    \n    outroContainer.appendChild(head)\n    outroContainer.appendChild(bod)\n    outroElem.appendChild(outroContainer)\n}\n\n\n\n \n\n//# sourceURL=webpack://battle-ships/./src/components/gameboardUI.js?");

/***/ }),

/***/ "./src/components/utilities.js":
/*!*************************************!*\
  !*** ./src/components/utilities.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRandomNum: () => (/* binding */ getRandomNum),\n/* harmony export */   simulateDragDrop: () => (/* binding */ simulateDragDrop)\n/* harmony export */ });\n\nfunction getRandomNum(min, max) {\n    const num = Math.random() * (max - min + 1) + min;\n    return Math.floor(num);\n}\n\nfunction simulateDragDrop() {\n    const carrier = document.querySelector('#carrier');\n    const carrierElem = document.querySelector('[data-x=\"3\"][data-y=\"5\"]');\n\n    const submarine = document.querySelector('#submarine');\n    const submarineElem = document.querySelector('[data-x=\"6\"][data-y=\"4\"]');\n\n    const battleship = document.querySelector('#battleShip');\n    const battleshipElem = document.querySelector('[data-x=\"2\"][data-y=\"1\"]');\n\n    const destroyer = document.querySelector('#destroyer');\n    const destroyerElem = document.querySelector('[data-x=\"0\"][data-y=\"0\"]');\n\n    const cruiser = document.querySelector('#cruiser');\n    const cruiserElem = document.querySelector('[data-x=\"6\"][data-y=\"9\"]');\n\n    simulations(carrier, carrierElem)\n    simulations(battleship, battleshipElem)\n    simulations(destroyer, destroyerElem)\n    simulations(submarine, submarineElem)\n    simulations(cruiser, cruiserElem)\n\n\n    function simulations(shipElement, targetElement) {\n        // Simulate drag start event\n        const dragStartEvent = new Event('dragstart', { bubbles: true });\n        Object.defineProperty(dragStartEvent, 'dataTransfer', {\n        value: {\n            setData: function() {}\n        }\n        });\n        shipElement.dispatchEvent(dragStartEvent);\n    \n        // Simulate drag enter event\n        const dragEnterEvent = new Event('dragenter', { bubbles: true });\n        targetElement.dispatchEvent(dragEnterEvent);\n    \n        // Simulate drag over event\n        const dragOverEvent = new Event('dragover', { bubbles: true });\n        targetElement.dispatchEvent(dragOverEvent);\n    \n        // Simulate drop event\n        const dropEvent = new Event('drop', { bubbles: true });\n        Object.defineProperty(dropEvent, 'dataTransfer', {\n        value: {\n            getData: function() { return shipElement.id + ',' + shipElement.dataset.length + ',' + shipElement.dataset.rotated; }\n        }\n        });\n        targetElement.dispatchEvent(dropEvent);\n    \n        // Simulate drag end event\n        const dragEndEvent = new Event('dragend', { bubbles: true });\n        shipElement.dispatchEvent(dragEndEvent);\n    }\n}\n\n\n\n//# sourceURL=webpack://battle-ships/./src/components/utilities.js?");

/***/ }),

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyDragDrop: () => (/* binding */ applyDragDrop),\n/* harmony export */   displayBotShips: () => (/* binding */ displayBotShips)\n/* harmony export */ });\n/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboardUI */ \"./src/components/gameboardUI.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\n\n// rotated = vertical\n// not rotated = horizontal\n\n\n// DRAG N DROP\nfunction applyDragDrop(board) {\n    allowRotate()\n\n    function dragStartHandler(event) {\n        console.log(\"dragging\", event.target.id, \"...\")\n        event.dataTransfer.setData(\"text\", `${event.target.id},${event.target.dataset.length}, ${event.target.dataset.rotated}`)\n    }\n\n    function dragOverHandler(event) {\n        event.preventDefault()\n    }\n\n    function dropHandler(event) {\n        function populateNextBox(boxElement, repeat, isRotated) {\n            if (repeat === 0) return;\n            \n            boxElement.classList.add(shipName, \"dropped\")\n            board.positionShip(boxElement.dataset.x, boxElement.dataset.y, shipName)\n            repeat --\n\n            if (isRotated) {\n                const x = Number(boxElement.dataset.x)\n                const nextDiv = document.querySelector(`[data-x=\"${x+1}\"][data-y=\"${boxElement.dataset.y}\"]`)\n                populateNextBox(nextDiv, repeat, isRotated)\n            } else {\n                populateNextBox(boxElement.nextSibling, repeat, isRotated)\n            }\n        }\n\n        function removeFromShipyard(shipName) {\n            const ship = document.querySelector(`#${shipName}`)\n            ship.classList.remove(\"rotatable\")\n            ship.style.display = 'none'\n            ship.setAttribute('draggable', 'false')\n        }\n\n        function isValidDropZone(event, shipLength, isRotated) {\n\n            function getIndexBasedOnShipRotation(event) {\n                if (isRotated) return Number(event.target.dataset.x)\n                return Number(event.target.dataset.y)\n            }\n            \n            function areEmptySlots(boxElement, shipLength, index, isRotated) {\n                if (boxElement.classList.contains(\"dropped\")) return false\n                if (boxElement === null) return false\n\n                if (shipLength === 1) return true\n\n                let nextBoxElement;\n\n                if (isRotated) {\n                    const x = Number(boxElement.dataset.x)\n                    nextBoxElement = document.querySelector(`[data-x=\"${x+1}\"][data-y=\"${boxElement.dataset.y}\"]`)\n                } else {\n                    const y = Number(boxElement.dataset.y)\n                    nextBoxElement = document.querySelector(`[data-x=\"${boxElement.dataset.x}\"][data-y=\"${y+1}\"]`)\n                }\n                shipLength--\n                return areEmptySlots(nextBoxElement, shipLength, index, isRotated)\n            }\n\n            const index = getIndexBasedOnShipRotation(event)\n\n            const validIndices = (index + (shipLength - 1)) <= 9\n            if (!validIndices) return false\n\n            const emptySlots = areEmptySlots(event.target, shipLength, index, isRotated)\n            return emptySlots\n        }\n\n        event.preventDefault()\n        let [shipName, shipLength, isRotated] = event.dataTransfer.getData(\"text\").split(',')\n\n        isRotated =  isRotated === \" false\" ? false : true\n\n        if (isValidDropZone(event, shipLength, isRotated)) {\n            event.target.classList.add(shipName, \"dropped\")\n            populateNextBox(event.target, shipLength, isRotated)\n            removeFromShipyard(shipName)\n            board.numOfShipsReady++\n            toggleResetShipsBtn()\n\n            // if all ships are positioned on the board, then allow user to start the game\n            if (board.numOfShipsReady === 5) {\n                toggleBeginBattleBtn()\n            }\n        }\n        event.target.classList.remove(\"hovered\")\n    }\n\n    function isOccupiedBox(event) {\n        return event.target.classList.contains(\"dropped\")\n    }\n\n    function dragLeaveHandler(event) {\n        event.target.classList.remove(\"hovered\")\n    }\n\n    function dragEnterHandler(event) {\n        if (!isOccupiedBox(event)) {\n            event.target.classList.add(\"hovered\")\n        }\n    }\n\n    // Identify draggable ships\n    const ships = document.querySelectorAll('.ship') \n    const boxes = document.querySelectorAll('.box')\n\n\n    ships.forEach(ship => {\n        ship.addEventListener(\"dragstart\", event => dragStartHandler(event))\n        // ship.addEventListener(\"drag\", event => draggingHandler(event))\n        // ship.addEventListener(\"dragend\", event => dragEndHandler(event))\n    })\n\n    boxes.forEach(box => {\n        box.addEventListener(\"dragenter\", event => dragEnterHandler(event))\n        box.addEventListener(\"dragover\", event => dragOverHandler(event))\n        box.addEventListener(\"dragleave\", event => dragLeaveHandler(event))\n        box.addEventListener(\"drop\", event => dropHandler(event))\n    })\n\n}\n\nfunction allowRotate() {\n    const rotatableShips = document.querySelectorAll('.rotatable')\n\n    rotatableShips.forEach(ship => {\n        ship.addEventListener('click', e => rotateShip(e, e.target.dataset.length))\n    })\n\n\n    function rotateShip(e, shipLength) {\n        \n        if (e.target.dataset.rotated === \"true\") {\n            e.target.style.width = `calc(var(--shipBoxSize) * ${shipLength})`\n            e.target.style.height = \"var(--shipBoxSize)\"\n            e.target.dataset.rotated = \"false\"\n\n        } else {\n            e.target.style.width = \"var(--shipBoxSize)\"\n            e.target.style.height = `calc(var(--shipBoxSize) * ${shipLength})`\n            e.target.dataset.rotated = \"true\"\n        }\n    }\n}\n\nfunction toggleBeginBattleBtn() {\n    const btn = document.querySelector('button.beginBattle')\n    const shipYard = document.querySelector('.shipyard');\n    const introHeading = document.querySelector('.introHeading');\n    introHeading.innerText = 'Ready !! Press Start to Begin.'\n    shipYard.style.display = 'none'\n\n    if (!btn.style.display) {\n        btn.style.display = 'flex'\n        allowGameStart(btn)\n    }\n    else { btn.style.display = 'none'}\n}\n\nfunction toggleResetShipsBtn(){\n    const btn = document.querySelector('button.resetShipyard')\n\n    if (btn.style.display) {\n        btn.style.display = 'flex'\n        resetShips(btn)\n    }\n    else { btn.style.display = 'none'}\n}\n\n\nfunction resetShips(btn) {\n    btn.addEventListener('click', e => {\n        location.reload()\n    })\n}\n\nfunction allowGameStart(btn) {\n    btn.addEventListener('click', e => {\n        (0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__.buildMainScreen)()\n        const bot = (0,_index__WEBPACK_IMPORTED_MODULE_1__.createBot)()\n        // start with players turn\n        allowPlayerAttack(_index__WEBPACK_IMPORTED_MODULE_1__.p1, bot)\n    })\n}\n\nfunction allowTakingTurns(p1, bot, turn, prevTurn){\n    console.log('current turn:', turn);\n\n    function checkIfAllShipsSunk(){\n        const p1Ships = p1.board.areAllShipsSunk();\n        const botShips = bot.board.areAllShipsSunk();\n        return p1Ships || botShips\n    }\n\n    if (checkIfAllShipsSunk() === false) {\n        if (turn === \"p1\"){\n            enableBotBoardEvents();        \n        } else if (turn === \"bot\"){\n            setTimeout(() => allowBotAttack(p1, bot), 200);\n        }\n        \n    } else {\n        setTimeout(() => (0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__.displayGameResults)(prevTurn), 1000);\n    }\n}\n\nfunction switchTurns(p1, bot, previousTurn){\n    if (previousTurn === \"p1\") {\n        disableBotBoardEvents();\n        allowTakingTurns(p1, bot, \"bot\", previousTurn);\n    } else if (previousTurn === \"bot\"){\n        allowTakingTurns(p1, bot, \"p1\", previousTurn);\n    }\n}\n\n// testing function to show where enemy ships is for development\nfunction displayBotShips(bot){\n    (0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__.showBotBoard)(bot);\n}\n\n// function to display ship[s that have sunk \nfunction updateSunkShips(turn, graveYard, sunkShips){\n    const ships = turn.board.getAllShips();\n    console.log (ships);\n    for (let ship of ships){\n        if (ship.sunk && !sunkShips.includes(ship.name)) {\n            const shipElement = document.createElement('div');\n            sunkShips.push(ship.name);\n            shipElement.innerText = ship.name.toUpperCase();\n            graveYard.appendChild(shipElement);\n        }\n    }\n\n    console.log(sunkShips)\n}\n\n\nfunction allowPlayerAttack(p1, bot) {\n    const boxes = document.querySelectorAll('.bBoard .boardGrid .box')\n    const bGraveYard = document.querySelector('.bSunkShips');\n    let botSunkShips = []\n\n    boxes.forEach(box => {\n        // hover\n        box.addEventListener('mouseover', e => {\n            e.target.style.borderColor = 'red';\n            e.target.style.cursor = 'crosshair';\n        })\n\n        // mouse hover leaves\n        box.addEventListener('mouseleave', e => {\n            e.target.style.borderColor = ''\n        })\n\n        // attack is made\n        box.addEventListener('click', e => {\n            console.log(e)\n            const coords = [Number(e.target.dataset.x), Number(e.target.dataset.y)]\n\n            const attackFeedback = p1.attackEnemy(coords, bot.board)\n            console.log(attackFeedback)\n            if (attackFeedback === \"It's a miss!\") {\n                e.target.classList.add('miss')\n            } else if (attackFeedback === \"It's a hit!\") {\n                e.target.classList.add('hit')\n            }\n\n            updateSunkShips(bot, bGraveYard, botSunkShips)\n\n            e.target.classList.add('permanentlyDisabled')\n            switchTurns(p1, bot, 'p1')\n        })\n    })\n}\n\n\nfunction allowBotAttack(p1, bot) {\n    const pGraveYard = document.querySelector('.pSunkShips');\n    let sunkShips = []\n\n    const coordsArr = bot.getCoordinates();\n    const attackFeedback = bot.attackEnemy(coordsArr, p1.board);\n    console.log(attackFeedback);\n    const boxElem = document.querySelector(`[data-x=\"${coordsArr[0]}\"][data-y=\"${coordsArr[1]}\"]`);\n\n    if (attackFeedback === \"invalid attack\"){\n        allowBotAttack(p1, bot)\n    }\n    else {\n        if (attackFeedback === \"It's a miss!\") {\n            boxElem.classList.add(\"miss\")\n        } else if (attackFeedback === \"It's a hit!\") {\n            pGraveYard.innerText = ''\n            boxElem.classList.add('hit')\n            updateSunkShips(p1, pGraveYard, sunkShips);\n        }\n        switchTurns(p1, bot, 'bot');\n    }\n\n}\n\nfunction disableBotBoardEvents() {\n    const boxes = document.querySelectorAll('.bBoard .boardGrid .box');\n    boxes.forEach(box => {\n        if (!box.classList.contains('permanentlyDisabled')) {\n            box.classList.add('disabled');\n        }\n    })\n}\n\nfunction enableBotBoardEvents() {\n    const boxes = document.querySelectorAll('.bBoard .boardGrid .box');\n    boxes.forEach(box => {\n        box.classList.remove('disabled');\n    })\n}\n\n\n\n\n\n\n\n//# sourceURL=webpack://battle-ships/./src/eventListeners.js?");

/***/ }),

/***/ "./src/factories/botFactory.js":
/*!*************************************!*\
  !*** ./src/factories/botFactory.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Bot: () => (/* binding */ Bot)\n/* harmony export */ });\n/* harmony import */ var _gameBoardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoardFactory */ \"./src/factories/gameBoardFactory.js\");\n/* harmony import */ var _components_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/utilities */ \"./src/components/utilities.js\");\n\n\n\nclass Bot {\n    #successfulAttack;\n    #previousAttack;\n    #possibleSmartMoves;\n\n    constructor() {\n        this.board = this.#createBoard()\n        this.#previousAttack = null\n        this.#successfulAttack = false\n        this.#possibleSmartMoves = [[0, 1], [0, -1], [-1, 0], [1, 0]]\n    }\n\n    #createBoard() {\n        const newBoard = new _gameBoardFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n        return newBoard\n    }\n\n    emptyPosition(x, y, gameBoard) {\n        return gameBoard[x][y] === null\n    }\n\n    one(){\n        let data = 12\n    }\n\n    \n    isEmptyPosition(x, y) {\n        const missedPrevAttack = this.board.getMissedAttacks().some(([a, b]) => a === x && b === y);\n        const successfulPrevAttack = this.board.getSuccessfulAttacks().some(([a, b]) => a === x && b === y);\n        return !missedPrevAttack || !successfulPrevAttack \n    }\n\n    getCoordinates() {\n        // pick a random spot within the board\n        // should be a unique coordinate every time\n        // if previous coordinate was a hit, choose an adjacent coordinate\n        // improvement -- generate next coordinate based on available empty slots instead of random x/y coords\n\n        if (this.#successfulAttack) {\n            if (this.#possibleSmartMoves.length > 0) {\n                const positionOffset = this.#possibleSmartMoves.pop()\n                let xCoord = this.#previousAttack[0] + positionOffset[0]\n                let yCoord = this.#previousAttack[1] + positionOffset[1]\n\n                return [xCoord, yCoord]\n            }\n        }\n\n        let xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)\n        let yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)\n\n        while (!this.isEmptyPosition(xCoord, yCoord)) {\n            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)\n            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)\n        }\n\n        return [xCoord, yCoord]\n    }\n\n\n    attackEnemy(coordinatesArr, enemyBoard) {\n        const [x, y] = [...coordinatesArr] \n        const attackFeedback = enemyBoard.receiveAttack(x, y)\n        if (attackFeedback === \"It's a hit!\") {\n            this.#storePreviousAttack(coordinatesArr, true)\n        } else {\n            this.#storePreviousAttack(coordinatesArr, false)\n        }\n        return attackFeedback\n    }\n\n    viewBoard() {\n        return this.board.getBoard()\n    }\n\n    #storePreviousAttack(coordinatesArr, enemyWasHit) {\n        this.#previousAttack = coordinatesArr\n        this.#successfulAttack = enemyWasHit\n    }\n\n    positionAllShips() {\n        const allShips = this.board.getAllShips()\n        allShips.forEach(ship => {\n            const newCoordinatesArr = this.#generateCoordinates(ship)\n            newCoordinatesArr.forEach(coord => this.board.positionShip(coord[0], coord[1], ship.name))\n        })\n    }\n\n    #generateCoordinates(ship) {\n        const coordinatesArr = []\n        const isRotated = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 1) // 0 == false, 1 == true\n            \n        // initiate variables\n        let xCoord = 0;\n        let yCoord = 0;\n            \n        // generate starting coordinates\n        if (isRotated == 1) {\n            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9 - ship.length) // example, if shipLength=5, then choose 0-5 x-coordinates\n            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)\n\n            coordinatesArr.push([xCoord, yCoord])\n\n            for (let i = 1 ; i < ship.length ; i++ ) {\n                coordinatesArr.push([xCoord + i, yCoord])\n            }\n\n        } else { // otherwise, horizontal\n            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)\n            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9 - ship.length)\n\n            coordinatesArr.push([xCoord, yCoord])\n\n            for (let i = 1 ; i < ship.length ; i++ ) {\n                coordinatesArr.push([xCoord, yCoord + i])\n            }\n        }\n\n        // check if coordinates are occupied\n        const isValid = coordinatesArr.every(coord => this.emptyPosition(coord[0], coord[1], this.viewBoard()))\n\n        // return if valid coordinates, otherwise find new ones\n        if (isValid) return coordinatesArr\n        else { return this.#generateCoordinates(ship) }\n    }\n}\n\n\n\n//# sourceURL=webpack://battle-ships/./src/factories/botFactory.js?");

/***/ }),

/***/ "./src/factories/gameBoardFactory.js":
/*!*******************************************!*\
  !*** ./src/factories/gameBoardFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ \"./src/factories/shipFactory.js\");\n\n\nclass GameBoard {\n    constructor(){\n        this.carrier = this.#createShip('carrier', 5)\n        this.battleShip = this.#createShip('battleShip', 4)\n        this.cruiser = this.#createShip('cruiser', 3)\n        this.submarine = this.#createShip('submarine', 3)\n        this.destroyer = this.#createShip('destroyer', 2)\n        this.board = this.#createBoard()\n        this.missedAttacks = []\n        this.successfulAttacks = []\n        this.numOfShipsReady = 0;\n    }\n\n    // Private method to create a new Ship\n    #createShip(name, length) {\n        const ship = new _shipFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, length);\n        return ship;\n    }\n\n    \n    getAllShips(){\n        const ships = [\n            this.carrier,\n            this.battleShip,\n            this.cruiser,\n            this.submarine,\n            this.destroyer\n        ]\n        return ships\n    }\n\n    // Private method to crate a new Board (10 x 10)\n    #createBoard() {\n        let board = [];\n        for (let i = 0; i <= 9; i++){\n            let row = []\n            for (let i = 0; i <= 9; i++){\n                row.push(null)\n            }\n            board.push(row)\n        }\n        return board\n    }\n\n    // position ship at x, y coords\n    positionShip(x, y, shipName) {\n        this.updateBoardArray(Number(x), Number(y), shipName)\n    }\n\n    updateBoardArray(x, y, shipName) {\n        this.board[x][y] = shipName\n    }\n\n    //method returns a copy of the board created in the constructor\n    getBoard(){\n        const boardCopy = [...this.board];\n        return boardCopy;\n    }\n\n    // method returns a copy of the missed attacks array\n    getMissedAttacks(){\n        const missedAttacksCopy = [...this.missedAttacks];\n        return missedAttacksCopy\n    } \n\n    // method returns a copy of the successful attacks array\n    getSuccessfulAttacks(){\n        const successfulAttacksCopy = [...this.successfulAttacks];\n        return successfulAttacksCopy\n    }\n\n    // Private method that stores a missed attack in missedAttack array\n    #storeMissedAttack(x, y){\n        this.missedAttacks.push([x, y]);\n    }\n\n    // Private method that stores a successful attack in the successfulAttack array\n    #storeSuccessfulAttack(x, y){\n        this.successfulAttacks.push([x, y]);\n    }\n\n    //Private method that returns true if all conditions are met to check if attack is valid\n    #isValidAttack(x, y){\n        const uniqueMissedAttack = !this.getMissedAttacks().some(([a, b]) => a === x && b === y);\n        const uniqueSuccessfulAttack = !this.getSuccessfulAttacks().some(([a, b]) => a === x && b === y);\n        const validCoordinates = (x >= 0 && x <= 9) && (y >= 0 && y <= 9);\n\n        return uniqueMissedAttack && uniqueSuccessfulAttack && validCoordinates\n\n    }\n\n    // method to implement an attack on a ship, will be called with a click\n    receiveAttack(x, y) {\n        // check if there is a ship at x, y\n        // if yes, apply damage to this.ship & record successful attack\n        // if not, record the coordinates of the missed attack\n\n            if (this.#isValidAttack(x, y)) {\n                const board = this.getBoard()\n                const ships = {\n                    'carrier': this.carrier,\n                    'battleShip': this.battleShip,\n                    'cruiser': this.cruiser,\n                    'submarine': this.submarine,\n                    'destroyer': this.destroyer\n                }\n                \n                \n                if (board[x][y] !== null) {\n                    ships[board[x][y]].hit();\n                    this.#storeSuccessfulAttack(x, y);\n                    return \"It's a hit!\"\n                }\n                else {\n                    this.#storeMissedAttack(x, y);\n                    return \"It's a miss!\"\n                }\n            \n            } \n            else {\n                return \"invalid attack\";\n            }\n\n    }\n\n    areAllShipsSunk(){\n        const ships = this.getAllShips();\n        for (let ship of ships){\n            if (!ship.sunk){\n                    return false\n            }\n        }\n        return true\n    }\n    \n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://battle-ships/./src/factories/gameBoardFactory.js?");

/***/ }),

/***/ "./src/factories/playerFactory.js":
/*!****************************************!*\
  !*** ./src/factories/playerFactory.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameBoardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoardFactory */ \"./src/factories/gameBoardFactory.js\");\n\n\nclass Player {\n    constructor(){\n        this.board = this.#createBoard();\n    }\n\n    #createBoard(){\n        const newBoard = new _gameBoardFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n        return newBoard\n    }\n\n    attackEnemy(coordinatesArr, enemyBoard){\n        const [x, y] = [...coordinatesArr];\n        const attackFeedback = enemyBoard.receiveAttack(x, y);\n        return attackFeedback;\n    }\n\n    viewBoard() {\n        return this.board.getBoard()\n    }\n}\n\n\n\n//# sourceURL=webpack://battle-ships/./src/factories/playerFactory.js?");

/***/ }),

/***/ "./src/factories/shipFactory.js":
/*!**************************************!*\
  !*** ./src/factories/shipFactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nclass Ship {\n    constructor(name, length){\n        this.name = name;\n        this.length = length;\n        this.damage = 0;\n        this.sunk = false;\n    }\n\n    hit() {\n        this.damage += 1;\n        this.#isSunk();\n        console.log(this.damage)\n    }\n\n    setShipAsSunk() {\n        this.sunk = true\n    }\n\n    #isSunk() {\n        if (this.damage === this.length) {this.setShipAsSunk()};  \n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battle-ships/./src/factories/shipFactory.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createBot: () => (/* binding */ createBot),\n/* harmony export */   p1: () => (/* binding */ p1)\n/* harmony export */ });\n/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListeners */ \"./src/eventListeners.js\");\n/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/gameboardUI */ \"./src/components/gameboardUI.js\");\n/* harmony import */ var _components_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/utilities */ \"./src/components/utilities.js\");\n/* harmony import */ var _factories_botFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/botFactory */ \"./src/factories/botFactory.js\");\n/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factories/playerFactory */ \"./src/factories/playerFactory.js\");\n\n\n\n\n\n\n\n\nfunction createPlayer(){\n    // create player object\n    const p1 = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_4__.Player;\n    return p1\n}\n\n// start game \nfunction createBot() {\n    const bot = new _factories_botFactory__WEBPACK_IMPORTED_MODULE_3__.Bot;\n    bot.positionAllShips();\n    // helper function to show enemy ships for testing\n    (0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__.displayBotShips)(bot);\n    return bot\n}\n\n// create Player gameboard and player object\n(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_1__.createPlayerBoardUI)()\nconst p1 = createPlayer()\nconsole.log(p1.viewBoard());\n// activate event listeners\n(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__.applyDragDrop)(p1.board);\n(0,_components_utilities__WEBPACK_IMPORTED_MODULE_2__.simulateDragDrop)()\n\n\n\n//# sourceURL=webpack://battle-ships/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;