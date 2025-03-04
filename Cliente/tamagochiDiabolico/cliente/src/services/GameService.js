import { Board } from "../entities/Board.js";
import { Queue } from "../Queue.js";
export class GameService {
    #states = {
        WAITING: 0,
        PLAYING: 1,
        ENDED: 2
    };
    #ui = null;
    #players = [];
    #board = null;
    #queue = null;
    #state = null;
    #parallel = null;
    currentPlayer = null;

    #actionsList = {
        "NEW_PLAYER": this.do_newPlayer.bind(this),
        "BOARD": this.do_newBoard.bind(this),
        "SINGLE_PLAYER": this.do_singlePlayer.bind(this),
    };

    constructor(ui) {
        console.log(this);
        this.#state = this.#states.WAITING;
        this.#board = new Board();
        this.#queue = new Queue();
        this.#parallel = null;
        this.checkScheduler();
        this.#ui = ui;
    }

    setPlayer(player) {
        this.currentPlayer = player;
    }

    checkScheduler() {
        if (!this.#queue.isEmpty()) {
            if (this.#parallel == null) {
                this.#parallel = setInterval(
                    async () => {
                        const action = this.#queue.getMessage();
                        if (action != undefined) {
                            await this.#actionsList[action.type](action.content);
                        } else {
                            this.stopScheduler();
                        }
                    }
                );
            }
        }
    }

    stopScheduler() {
        clearInterval(this.#parallel);
        this.#parallel = null;
    }

    do(data) {
        this.#queue.addMessage(data);
        this.checkScheduler();
    };

    async do_newPlayer(payload) {
        this.#players = payload;
        const boardSize = this.#board.map.length;
        this.#ui.drawPlayers(this.#players, boardSize);
    };

    async do_newBoard(payload) {
        this.#board.build(payload);
        this.#ui.drawBoard(this.#board.map);
    }

    async do_singlePlayer(payload) {
        console.log("Single Player");
        console.log(payload);
        // this.currentPlayer = payload;
    }

}