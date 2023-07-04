
import Bot from "../botFactory";
import Player from "../playerFactory";
import { correctGameBoard } from "./testData";

const bot = new Bot;
const player = new Player;

const correctPlayer = {
    "board": correctGameBoard
}

test('creates a bot object', () => {
    expect(bot).toEqual(correctPlayer);
})

test('bot generates valid random attack coordinate', () => {
    const attack = bot.getCoordinates(player.board);
    expect(attack[0] && attack[1]).toBeLessThanOrEqual(9);
    expect(attack[0] && attack[1]).toBeGreaterThanOrEqual(0);
})

test('bot makes a successful attack', () => {
    const coords = bot.getCoordinates(player.board);
    const attack1 = bot.attackEnemy(coords, player.board);
    expect(attack1).toEqual(expect.stringContaining("It's a"))
})

test('bot attacks adjacent coordinate after a successful hit', () => {
    const prevAttack = [2, 4];

    bot.attackEnemy(prevAttack, player.board);

    const nextAttack = bot.getCoordinates(player.board)

    const adjacentCoordinates = [
        [prevAttack[0], prevAttack[1] + 1],  // Right
        [prevAttack[0], prevAttack[1] - 1],  // Left
        [prevAttack[0] + 1, prevAttack[1]],  // Down
        [prevAttack[0] - 1, prevAttack[1]],  // Up 
    ]

    expect(adjacentCoordinates).toContainEqual(nextAttack)
})