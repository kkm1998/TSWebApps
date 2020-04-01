"use strict";
class TicTacToeGame {
    constructor() {
        this.winner = '';
        this.player = 'X';
        this.computer = 'O';
        this.board = new Array(9);
        this.counterX = 0;
        this.counterO = 0;
        this.turn = 0;
        this.AIenabled = false;
        this.checkIfAIEnabled = document.getElementById("CheckEnabledAI");
        this.startsCharX = document.getElementById("PlayerXStarts");
        this.startsCharO = document.getElementById("PlayerOStarts");
        this.alertBtN = document.getElementById("Alert");
        this.counterOHTML = document.getElementById('LicznikO');
        this.counterXHTML = document.getElementById('LicznikX');
        this.alertBtN.addEventListener("click", () => this.StartGame());
        this.cells = document.querySelectorAll('.cell');
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.CellClicked.bind(this));
        });
    }
    CellClicked(event) {
        const index = event.target.id;
        if (!this.board[index]) {
            this.UpdateCell(index, this.player);
            switch (this.AIenabled) {
                case false:
                    this.ChangePlayer();
                    break;
                case true:
                    this.AIMove();
                    break;
                default:
                    // this.ChangePlayer(event.target)
                    console.log('Error');
            }
            this.RenderBoard();
        }
    }
    // WhoseMove() {
    //     if (this.turn % 2 == 1) {
    //         console.log('MJ')
    //     } else {
    //         console.log('Computer')
    //         this.bestMove()
    //     }
    // }
    AIMove() {
        if (this.turn % 2 == 1) {
            let indexes = [];
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i] === '') {
                    indexes.push(i);
                }
            }
            const random = indexes[Math.floor(Math.random() * indexes.length)];
            this.UpdateCell(random, this.computer);
        }
    }
    CheckIfAIEnabled() {
        this.checkIfAIEnabled.addEventListener('click', () => {
            this.AIenabled = this.AIenabled ? false : true;
            if (this.AIenabled === false) {
                this.checkIfAIEnabled.textContent = 'Czy chcesz grać przeciwko AI';
            }
            else {
                this.checkIfAIEnabled.textContent = 'Czy chcesz grać 1vs1';
            }
            this.counterXHTML.textContent = 'Wynik gracza X: 0';
            this.counterOHTML.textContent = 'Wynik gracza O: 0';
            this.StartGame();
        });
        return this.AIenabled;
    }
    PlayerXStart() {
        this.startsCharX.addEventListener('click', () => {
            this.player = 'X';
            this.counterXHTML.textContent = 'Wynik gracza X: 0';
            this.counterOHTML.textContent = 'Wynik gracza O: 0';
            this.StartGame();
        });
    }
    PlayerOStart() {
        this.startsCharO.addEventListener('click', () => {
            this.player = 'O';
            this.counterXHTML.textContent = 'Wynik gracza X: 0';
            this.counterOHTML.textContent = 'Wynik gracza O: 0';
            this.StartGame();
        });
    }
    EndGame() {
        if (this.CheckIfWinned()) {
            this.alertBtN.style.display = 'block';
            this.alertBtN.textContent = 'Winner: ' + this.winner;
            this.turn = 0;
            switch (this.winner) {
                case 'X':
                    this.counterX++;
                    this.counterXHTML.textContent = 'Wynik gracza X:' + this.counterX;
                    break;
                case 'O':
                    this.counterO++;
                    this.counterOHTML.textContent = 'Wynik gracza O:' + this.counterO;
                    break;
                default:
                    console.log('Error');
            }
        }
        else if (this.CheckIfThereArePlaces()) {
            this.alertBtN.style.display = 'block';
            this.alertBtN.textContent = 'Remis';
        }
    }
    CheckIfThereArePlaces() {
        return this.board.indexOf('') === -1;
    }
    UpdateCell(index, value) {
        this.board[index] = value;
        this.turn++;
        this.EndGame();
    }
    ChangePlayer() {
        this.player = this.player === 'O' ? 'X' : 'O';
    }
    StartGame() {
        console.log(this.player, this.computer);
        this.alertBtN.style.display = 'none';
        // this.player = Math.floor(Math.random() * 10) % 2 ? 'X' : 'O'
        if (this.player === 'O')
            this.computer = 'X';
        else
            this.computer = 'O';
        this.board.fill('');
        this.RenderBoard();
    }
    RenderBoard() {
        this.cells.forEach((cell, index) => {
            cell.innerHTML = this.board[index];
        });
    }
    CheckIfWinned() {
        const board = this.board;
        for (let i = 2; i >= 0; i--) {
            if (this.CheckFormula(board[i * 3], board[i * 3 + 1], board[i * 3 + 2])) {
                this.winner = board[i * 3 + 2];
                return true;
            }
        }
        for (let i = 2; i >= 0; i--) {
            if (this.CheckFormula(board[i], board[i + 3], board[i + 6])) {
                this.winner = board[i + 6];
                return true;
            }
        }
        if (this.CheckFormula(board[0], board[4], board[8])) {
            this.winner = board[8];
            return true;
        }
        if (this.CheckFormula(board[2], board[4], board[6])) {
            this.winner = board[6];
            return true;
        }
    }
    CheckFormula(firstCheckedIndexBoard, secondCheckedIndexBoard, thirdCheckedIndexBoard) {
        return !!firstCheckedIndexBoard && firstCheckedIndexBoard === secondCheckedIndexBoard && secondCheckedIndexBoard === thirdCheckedIndexBoard && firstCheckedIndexBoard === thirdCheckedIndexBoard;
    }
}
const TTC = new TicTacToeGame();
window.addEventListener('load', () => {
    TTC.StartGame();
    TTC.CheckIfAIEnabled();
    TTC.PlayerXStart();
    TTC.PlayerOStart();
});
