import Ship from './shipFactory'

class GameBoard {
    constructor(){
        this.carrier = this.#createShip('carrier', 5)
        this.battleShip = this.#createShip('battleShip', 4)
        this.cruiser = this.#createShip('cruiser', 3)
        this.submarine = this.#createShip('submarine', 3)
        this.destroyer = this.#createShip('destroyer', 2)
        this.board = this.#createBoard()
        this.missedAttacks = []
        this.successfulAttacks = []
        this.numOfShipsReady = 0;
    }

    // Private method to create a new Ship
    #createShip(name, length) {
        const ship = new Ship(name, length);
        return ship;
    }

    
    getAllShips(){
        const ships = [
            this.carrier,
            this.battleShip,
            this.cruiser,
            this.submarine,
            this.destroyer
        ]
        return ships
    }

    // Private method to crate a new Board (10 x 10)
    #createBoard() {
        let board = [];
        for (let i = 0; i <= 9; i++){
            let row = []
            for (let i = 0; i <= 9; i++){
                row.push(null)
            }
            board.push(row)
        }
        return board
    }

    // position ship at x, y coords
    positionShip(x, y, shipName) {
        this.updateBoardArray(Number(x), Number(y), shipName)
    }

    updateBoardArray(x, y, shipName) {
        this.board[x][y] = shipName
    }

    //method returns a copy of the board created in the constructor
    getBoard(){
        const boardCopy = [...this.board];
        return boardCopy;
    }

    // method returns a copy of the missed attacks array
    getMissedAttacks(){
        const missedAttacksCopy = [...this.missedAttacks];
        return missedAttacksCopy
    } 

    // method returns a copy of the successful attacks array
    getSuccessfulAttacks(){
        const successfulAttacksCopy = [...this.successfulAttacks];
        return successfulAttacksCopy
    }

    // Private method that stores a missed attack in missedAttack array
    #storeMissedAttack(x, y){
        this.missedAttacks.push([x, y]);
    }

    // Private method that stores a successful attack in the successfulAttack array
    #storeSuccessfulAttack(x, y){
        this.successfulAttacks.push([x, y]);
    }

    //Private method that returns true if all conditions are met to check if attack is valid
    #isValidAttack(x, y){
        const uniqueMissedAttack = !this.getMissedAttacks().some(([a, b]) => a === x && b === y);
        const uniqueSuccessfulAttack = !this.getSuccessfulAttacks().some(([a, b]) => a === x && b === y);
        const validCoordinates = (x >= 0 && x <= 9) && (y >= 0 && y <= 9);

        return uniqueMissedAttack && uniqueSuccessfulAttack && validCoordinates

    }

    // method to implement an attack on a ship, will be called with a click
    receiveAttack(x, y) {
        // check if there is a ship at x, y
        // if yes, apply damage to this.ship & record successful attack
        // if not, record the coordinates of the missed attack

            if (this.#isValidAttack(x, y)) {
                const board = this.getBoard()
                const ships = {
                    'carrier': this.carrier,
                    'battleShip': this.battleShip,
                    'cruiser': this.cruiser,
                    'submarine': this.submarine,
                    'destroyer': this.destroyer
                }
                
                
                if (board[x][y] !== null) {
                    ships[board[x][y]].hit();
                    this.#storeSuccessfulAttack(x, y);
                    return "It's a hit!"
                }
                else {
                    this.#storeMissedAttack(x, y);
                    return "It's a miss!"
                }
            
            } 
            else {
                return "invalid attack";
            }

    }

    areAllShipsSunk(){
        const ships = this.getAllShips();
        for (let ship of ships){
            if (!ship.sunk){
                    return false
            }
        }
        return true
    }
    
}

export default GameBoard