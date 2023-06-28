import Ship from './shipFactory'

class GameBoard {
    constructor(){
        this.carrier = this.#createShip('carrier', 5)
        this.battleShip = this.#createShip('battleShip', 4)
        this.cruiser = this.#createShip('cruiser', 3)
        this.submarine = this.#createShip('submarine', 3)
        this.destroyer = this.#createShip('destroyer', 2)
        this.board = this.#positionShips(this.#createBoard())
        this.missedAttacks = []
        this.successfulAttacks = []
    }

    // Private method to create a new Ship
    #createShip(name, length) {
        const ship = new Ship(name, length);
        return ship;
    }

    // Private method to get all ships created in constructor
    #getAllShips(){
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

    // Private method to create the ships position for the game board
    #positionShips(gameBoard){
        const board = gameBoard

        function placeOnBoard(position, ship, board) {
            let [x, y, direction] = [...position];
            let shipLength = ship.length

            while (shipLength > 0) {
                updateBoardArray(x, y, ship.name, board);
                shipLength--

                switch(direction) {
                    case ('north'):
                        x--
                        break;
                    case ('south'):
                        x++
                        break;
                    case ('east'):
                        y++
                        break;
                    case ('west'):
                        y--
                        break;
                }
            }
        }

        // function to update the board coordinates with the ship name that is placed there.
        function updateBoardArray(x, y, shipName, board){
            board[x][y] = shipName;
        }

        const ships = this.#getAllShips()

        for (let ship of ships){
            const position = this.#getPositioning(ship.name);
            placeOnBoard(position, ship, board)
        }

        return board
    }

    // Private method to set the positioning of the ships
    #getPositioning(shipName) {
        switch(shipName){
            case ('carrier'):
                return [8, 3, 'north']
            case ('battleShip'):
                return [9, 5, 'west']
            case ('cruiser'):
                return [0, 4, 'south']
            case ('submarine'):
                return [1, 8, 'west']
            case ('destroyer'):
                return [0, 0, 'east']
        }
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
        const validCoordinates = (x >= 0 && x <= 9) && (y >= 0 && y <= 9);
        
        return validCoordinates
    }

    // method to implement an attack on a ship, will be called with a click
    receiveAttack(x, y) {
        // check if there is a ship at x, y
        // if yes, apply damage to this.ship & record successful attack
        // if not, record the coordinates of the missed attack
        if (this.#isValidAttack(x,y)) {
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

}

export default GameBoard