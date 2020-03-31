class TicTacToeGame {
    cells: NodeListOf<Element>;
    winner: string = '';
    player: string = ''
    board: Array<string> = new Array(9);
    counterX: any = 0;
    counterO: any = 0;
    AIenabled: Boolean = false
    checkIfAIEnabled: HTMLElement
    alertBtN: HTMLElement;
    counterOHTML: HTMLElement;
    counterXHTML: HTMLElement;
    constructor() {
        this.counterOHTML = document.getElementById('LicznikO') as HTMLElement
        this.counterXHTML = document.getElementById('LicznikX') as HTMLElement
        this.checkIfAIEnabled = document.getElementById("CheckEnabledAI") as HTMLElement
        this.alertBtN = document.getElementById("Alert") as HTMLElement;
        this.alertBtN.addEventListener("click", () => this.StartGame())
        this.cells = document.querySelectorAll('.cell');
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.CellClicked.bind(this))
        })
    }
    CellClicked(event) {
        const index = event.target.id
        if (!this.board[index]) {
            this.UpdateCell(index, this.player);
            
            switch (this.AIenabled) {
                case false:
                    this.ChangePlayer()
                    break;
                case true:
                    this.AIMove()
                    break;
                default:
                    this.ChangePlayer()
            }
            this.EndGame()
            this.RenderBoard()
        }
    }
    CheckIfAIEnabled() {
        this.checkIfAIEnabled.addEventListener('click', () => {
            this.AIenabled = this.AIenabled ? false : true;
            if (this.AIenabled === false) {
                this.checkIfAIEnabled.textContent = 'Czy chcesz grać przeciwko AI'
            } else {
                this.checkIfAIEnabled.textContent = 'Czy chcesz grać 1vs1'
            }
            this.counterXHTML.textContent = 'Wynik gracza X: 0'
            this.counterOHTML.textContent = 'Wynik gracza O: 0'
            this.StartGame()
        })
        return this.AIenabled
    }
    AIMove() {
        let indexOfFirstPosition = this.board.indexOf('')
        this.UpdateCell(indexOfFirstPosition, 'O')
        //this.board[this.counterXHTML] = 'O'
    }
    EndGame() {
        if (this.CheckIfWinned()) {
            this.alertBtN.style.display = 'block'
            
            this.alertBtN.textContent = 'Winner: ' + this.winner
            switch (this.winner) {
                case 'X':
                    this.counterX++             
                    this.counterXHTML.textContent = 'Wynik gracza X:' + this.counterX
                    break;
                case 'O':
                    this.counterO++                 
                    this.counterOHTML.textContent = 'Wynik gracza O:' + this.counterO
                    break;
                default:
                    console.log('Error')
            }

        } else if (this.CheckIfThereArePlaces()) {
            this.alertBtN.style.display = 'block'
            this.alertBtN.textContent = 'Remis'
        }
    }
    CheckIfThereArePlaces() {
        return this.board.indexOf('') === -1
    }
    UpdateCell(index, value) {
        this.board[index] = value
    }
    ChangePlayer() {
        this.player = this.player === 'O' ? 'X' : 'O'
    }
    StartGame() {       
        this.alertBtN.style.display = 'none'
        // this.player = Math.floor(Math.random() * 10) % 2 ? 'X' : 'O'  
        this.player = 'X'
        this.board.fill('')
        this.RenderBoard()
    }
    RenderBoard() {
        this.cells.forEach((cell, index) => {
            cell.innerHTML = this.board[index]
        })
    }
    CheckIfWinned() {
        const board = this.board      
        
        for (let i = 2; i >= 0; i--) {
            if (this.CheckFormula(board[i * 3], board[i * 3 + 1], board[i * 3 + 2])) {
                this.winner = board[i * 3];
                return true
            }
        }    
        for (let i = 2; i >= 0; i--) {
            if (this.CheckFormula(board[i], board[i + 3], board[i + 6])) {
                this.winner = board[i];
                return true
            }
        }     
        if (this.CheckFormula(board[0], board[4], board[8])) {
            this.winner = board[0];
            return true
        }
        if (this.CheckFormula(board[2], board[4], board[6])) {
            this.winner = board[2];
            return true
        }

    }
    CheckFormula(firstCheckedIndexBoard: string, secondCheckedIndexBoard: string, thirdCheckedIndexBoard: string) {
        return !!firstCheckedIndexBoard && firstCheckedIndexBoard === secondCheckedIndexBoard && secondCheckedIndexBoard === thirdCheckedIndexBoard && firstCheckedIndexBoard === thirdCheckedIndexBoard
    }
}
window.addEventListener('load', () => {
    const TTC = new TicTacToeGame()
    TTC.StartGame()
    TTC.CheckIfAIEnabled()
})