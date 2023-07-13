
import { applyDragDrop, displayBotShips } from "./eventListeners";
import { createPlayerBoardUI } from "./components/gameboardUI";
import { simulateDragDrop } from "./components/utilities";
import { Bot } from "./factories/botFactory";
import { Player } from "./factories/playerFactory";


function createPlayer(){
    // create player object
    const p1 = new Player;
    return p1
}

// start game 
function createBot() {
    const bot = new Bot;
    bot.positionAllShips();
    // helper function to show enemy ships for testing
    displayBotShips(bot);
    return bot
}

// create Player gameboard and player object
createPlayerBoardUI()
const p1 = createPlayer()
console.log(p1.viewBoard());
// activate event listeners
applyDragDrop(p1.board);
simulateDragDrop()

export { createBot, p1 }