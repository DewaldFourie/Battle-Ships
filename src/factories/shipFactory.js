
class Ship {
    constructor(name, length){
        this.name = name;
        this.length = length;
        this.damage = 0;
        this.sunk = false;
    }

    hit() {
        this.damage += 1;
        this.#isSunk();
        console.log(this.damage)
    }

    #setShipAsSunk() {
        this.sunk = true
    }

    #isSunk() {
        if (this.damage === this.length) {this.#setShipAsSunk()};  
    }

}

export default Ship