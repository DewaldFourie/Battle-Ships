import GameBoard from "./gameBoardFactory";

class Player {
    constructor(){
        this.board = this.#createBoard();
    }

    #createBoard(){
        const newBoard = new GameBoard;
        return newBoard
    }

    attackEnemy(coordinatesArr, enemyBoard){
        const [x, y] = [...coordinatesArr];
        const attackFeedback = enemyBoard.receiveAttack(x, y);
        console.log(attackFeedback);
        return attackFeedback;
    }

    viewBoard() {
        return this.board.getBoard()
    }
}

export { Player }