import GameBoard from '../gameBoardFactory'
import { correctGameBoard } from './testData'; 

describe('board creation', () => {
    const battleshipGame = new GameBoard;
    test('correctly creates a game board obj with ships positioned', () => {
        expect(battleshipGame).toEqual(correctGameBoard)
    })
})

describe('game board activities', () => {
    const battleshipGame = new GameBoard;
    const attack = battleshipGame.receiveAttack(0, 1);

    test('attack causes damage to ship', () => {
        expect(battleshipGame.destroyer.damage).toBe(1)
    })

    test('successful attack outputs correct info', () => {
        expect(attack).toBe("It's a hit!")
    })

    const correctMissedAttacks = [[9,9], [8,7]];
    const attack1 = battleshipGame.receiveAttack(9, 9);
    const attack2 = battleshipGame.receiveAttack(8, 7);

    test('stores missed attacks correctly', () => {
        expect(battleshipGame.missedAttacks).toEqual(correctMissedAttacks)
    })

    test('missed attack outputs correct info', () => {
        expect(attack2).toBe("It's a miss!")
    })

    const attack3 = battleshipGame.receiveAttack(0, 10)
    test('recognizes invalid attack coordinates', () => {
        expect(attack3).toBe('invalid attack');
    })

    const attack4 = battleshipGame.receiveAttack(8, 7)
    test('recognizes attack coordinates that were used previously', () => {
        expect(attack4).toBe('invalid attack');
    })

    const attack5 = battleshipGame.receiveAttack(0, 1);
    test('recognizes attack that were previously successful', () => {
        expect(attack5).toBe('invalid attack')
    })

    test('not all ships have sunk', () => {
        expect(battleshipGame.areAllShipsSunk()).toBe(false);
    })
})

describe('sink all ships on the board', () => {
    const battleshipGame = new GameBoard;

    function getAllValidAttacks() {
        const allAttacks = [];
        for (let i = 0; i <= 9; i++){
            for (let j = 0; j <= 9; j++){
                if (correctGameBoard.board[i][j] !== null) {
                    allAttacks.push([i, j])
                }
            }
        } return allAttacks;
    }

    const allAttacks = getAllValidAttacks()
    
    for (let i of allAttacks){
        battleshipGame.receiveAttack(i[0], i[1]);
    }

    test('all ships have sunk', () => {
        expect(battleshipGame.areAllShipsSunk()).toBe(true)
    })
})

