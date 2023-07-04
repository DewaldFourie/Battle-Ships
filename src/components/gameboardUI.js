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

        const pBoard = document.querySelector('.intro .board');

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

export { createBoardComponent, buildMainScreen, createPlayerBoardUI } 