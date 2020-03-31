var TicTacToeGame = /** @class */ (function () {
    function TicTacToeGame() {
        var _this = this;
        this.winner = '';
        this.player = '';
        this.board = new Array(9);
        this.counterX = 0;
        this.counterO = 0;
        this.AIenabled = false;
        this.counterOHTML = document.getElementById('LicznikO');
        this.counterXHTML = document.getElementById('LicznikX');
        this.checkIfAIEnabled = document.getElementById("CheckEnabledAI");
        this.alertBtN = document.getElementById("Alert");
        this.alertBtN.addEventListener("click", function () { return _this.StartGame(); });
        this.cells = document.querySelectorAll('.cell');
        this.cells.forEach(function (cell) {
            cell.addEventListener('click', _this.CellClicked.bind(_this));
        });
    }
    TicTacToeGame.prototype.CellClicked = function (event) {
        var index = event.target.id;
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
                    this.ChangePlayer();
            }
            this.EndGame();
            this.RenderBoard();
        }
    };
    TicTacToeGame.prototype.CheckIfAIEnabled = function () {
        var _this = this;
        this.checkIfAIEnabled.addEventListener('click', function () {
            _this.AIenabled = _this.AIenabled ? false : true;
            if (_this.AIenabled === false) {
                _this.checkIfAIEnabled.textContent = 'Czy chcesz grać przeciwko AI';
            }
            else {
                _this.checkIfAIEnabled.textContent = 'Czy chcesz grać 1vs1';
            }
            _this.counterXHTML.textContent = 'Wynik gracza X: 0';
            _this.counterOHTML.textContent = 'Wynik gracza O: 0';
            _this.StartGame();
        });
        return this.AIenabled;
    };
    TicTacToeGame.prototype.AIMove = function () {
        var indexOfFirstPosition = this.board.indexOf('');
        this.UpdateCell(indexOfFirstPosition, 'O');
        //this.board[this.counterXHTML] = 'O'
    };
    TicTacToeGame.prototype.EndGame = function () {
        if (this.CheckIfWinned()) {
            this.alertBtN.style.display = 'block';
            this.alertBtN.textContent = 'Winner: ' + this.winner;
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
    };
    TicTacToeGame.prototype.CheckIfThereArePlaces = function () {
        return this.board.indexOf('') === -1;
    };
    TicTacToeGame.prototype.UpdateCell = function (index, value) {
        this.board[index] = value;
    };
    TicTacToeGame.prototype.ChangePlayer = function () {
        this.player = this.player === 'O' ? 'X' : 'O';
    };
    TicTacToeGame.prototype.StartGame = function () {
        this.alertBtN.style.display = 'none';
        // this.player = Math.floor(Math.random() * 10) % 2 ? 'X' : 'O'  
        this.player = 'X';
        this.board.fill('');
        this.RenderBoard();
    };
    TicTacToeGame.prototype.RenderBoard = function () {
        var _this = this;
        this.cells.forEach(function (cell, index) {
            cell.innerHTML = _this.board[index];
        });
    };
    TicTacToeGame.prototype.CheckIfWinned = function () {
        var board = this.board;
        for (var i = 2; i >= 0; i--) {
            if (this.CheckFormula(board[i * 3], board[i * 3 + 1], board[i * 3 + 2])) {
                this.winner = board[i * 3];
                return true;
            }
        }
        for (var i = 2; i >= 0; i--) {
            if (this.CheckFormula(board[i], board[i + 3], board[i + 6])) {
                this.winner = board[i];
                return true;
            }
        }
        if (this.CheckFormula(board[0], board[4], board[8])) {
            this.winner = board[0];
            return true;
        }
        if (this.CheckFormula(board[2], board[4], board[6])) {
            this.winner = board[2];
            return true;
        }
    };
    TicTacToeGame.prototype.CheckFormula = function (firstCheckedIndexBoard, secondCheckedIndexBoard, thirdCheckedIndexBoard) {
        return !!firstCheckedIndexBoard && firstCheckedIndexBoard === secondCheckedIndexBoard && secondCheckedIndexBoard === thirdCheckedIndexBoard && firstCheckedIndexBoard === thirdCheckedIndexBoard;
    };
    return TicTacToeGame;
}());
window.addEventListener('load', function () {
    var TTC = new TicTacToeGame();
    TTC.StartGame();
    TTC.CheckIfAIEnabled();
});
