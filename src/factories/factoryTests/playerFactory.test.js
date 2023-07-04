import Bot from "../botFactory";
import Player from "../playerFactory";
import { correctGameBoard } from "./testData";

const player = new Player;
const bot = new Bot;

const correctPlayer = {
    "board": correctGameBoard
}


test('creates a player object', () => {
    expect(player).toEqual(correctPlayer);
})

test('player makes an attack', () => {
    const attack = player.attackEnemy([0, 1], bot.board);
    expect(attack).toEqual(expect.stringContaining("It's a"))
})