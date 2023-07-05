
import { applyDragDrop, allowPlayerToAttack, displayBotShips } from "./eventListeners";
import { createPlayerBoardUI } from "./components/gameboardUI";
import { simulateDragDrop } from "./components/utilities";
import { Bot } from "./factories/botFactory";
import { Player } from "./factories/playerFactory";

// create Player gameboard
createPlayerBoardUI()

// create player object
const p1 = new Player;

// activate event listeners
applyDragDrop(p1.board);
simulateDragDrop();

// start game 
function createBot() {
    const bot = new Bot;
    bot.positionAllShips();
    // helper function to show enemy ships for testing
    displayBotShips(bot)
    allowPlayerToAttack(p1, bot.board)
}



export { createBot }