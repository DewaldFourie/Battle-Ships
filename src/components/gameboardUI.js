// Function to create the board components in the user interface for each game

function createBoardComponent(parentContainer) {

    function createYHeader() {
        const yHeader = document.createElement('div');
        yHeader.classList.add('boardYHeader');
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        for (let y = 0; y <= 9; y++) {
            const box = document.createElement('div');
            box.classList.add('boxHeader');
            box.innerText = letters[y];
            yHeader.append(box);
        }
        return yHeader;
    }

    function createXHeader() {
        const xHeader = document.createElement('div');
        xHeader.classList.add('boardXHeader');
        
        for (let x = 0; x <= 9; x++) {
            const box = document.createElement('div');
            box.classList.add('boxHeader');
            box.innerText = x + 1;
            xHeader.append(box);
        }
        return xHeader;
    }

    const childContainer = document.createElement('div');
    childContainer.classList.add('boardContainer');

    const board = document.createElement('div');
    board.classList.add('boardGrid');

    // create board grids
    for (let x = 0; x <= 9; x++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let y = 0; y <= 9; y++){
            const box = document.createElement('div');
            box.classList.add('box');
            box.dataset.x = x;
            box.dataset.y = y;
            row.append(box);
        }
        board.append(row)
    }

    childContainer.append(createXHeader(), createYHeader(), board)
    parentContainer.append(childContainer)
}

function buildMainScreen() {
    function showMainScreen() {
        const introScreen = document.querySelector('.intro');
        introScreen.style.display = 'none';

        const mainScreen = document.querySelector('.main');
        mainScreen.style.display = 'flex';

        const pBoard = document.querySelector('.intro .pBoard');
        console.log(pBoard);

        const playerSide = document.querySelector('.playerSide');
        playerSide.append(pBoard);
    }

    function createBotBoardUI() {
        const botBoard = document.querySelector('.bBoard');
        createBoardComponent(botBoard);
    }

    function updateBoardSizes() {
        const boxSize = document.querySelector(':root');
        boxSize.style.setProperty('--boxSize', '50px')
    }

    createBotBoardUI();
    showMainScreen();
    updateBoardSizes();
}

function createPlayerBoardUI() {
    const pBoard = document.querySelector('.pBoard');
    createBoardComponent(pBoard);
}

function showBotBoard(bot){
    const botBoard = document.querySelector('.bBoard .boardGrid')
    for (let i = 0; i < bot.viewBoard().length; i++) {
        for (let j = 0; j < bot.viewBoard()[i].length; j++) {
            const value = bot.viewBoard()[i][j];
            switch (value) {
                case 'carrier':
                    const carrierCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    carrierCell.setAttribute("id", "botCarrier");
                    carrierCell.innerText = 'car'
                    break;
                case 'battleShip':
                    const battleShipCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    battleShipCell.setAttribute("id", "botBattleShip");
                    battleShipCell.innerText = 'bat'
                    break
                case 'cruiser':
                    const cruiserCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    cruiserCell.setAttribute("id", "botCruiser");
                    cruiserCell.innerText = 'cru'
                    break;
                case 'submarine':
                    const submarineCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    submarineCell.setAttribute("id", "botSubmarine");
                    submarineCell.innerText = 'sub'
                    break;
                case 'destroyer':
                    const destroyerCell = botBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    destroyerCell.setAttribute("id", "botDestroyer");
                    destroyerCell.innerText = 'des'
                    break;
            }
        }
    }
}

function displayGameResults(turn){
    const outroElem = document.querySelector(".outro");
    outroElem.style.display = "flex"
    const outroContainer = document.createElement("div")
    outroContainer.classList.add("outroContainer")
    const head = document.createElement("div")
    head.classList.add("outroHead")
    head.innerText = "GAME OVER"
    const bod = document.createElement("div")
    bod.classList.add("outroBody")
    let winText = ''
    if (turn === 'bot'){
        winText = "The Computer won :("
    }
    else {
        winText = "WELL DONE, YOU WIN !!!"
    }
    bod.innerText = winText
    
    outroContainer.appendChild(head)
    outroContainer.appendChild(bod)
    outroElem.appendChild(outroContainer)
}



export { createBoardComponent, buildMainScreen, createPlayerBoardUI, showBotBoard, displayGameResults } 