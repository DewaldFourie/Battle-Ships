import Ship from "../shipFactory"

export const correctGameBoard = {
    carrier: new Ship('carrier', 5),
    battleShip: new Ship('battleShip', 4),
    cruiser: new Ship('cruiser', 3),
    submarine: new Ship('submarine', 3),
    destroyer: new Ship('destroyer', 2),
    board: [
        ["destroyer", "destroyer", null, null, "cruiser", null, null, null, null, null],
        [null, null, null, null, "cruiser", null, "submarine", "submarine", "submarine", null],
        [null, null, null, null, "cruiser", null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, "battleShip", "battleShip", "battleShip", "battleShip", null, null, null, null]
    ],
    missedAttacks: [],
    successfulAttacks: [],
}