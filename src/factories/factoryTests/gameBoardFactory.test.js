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
})

