class CricketGame {
  constructor(player1, player2) {
      this.players = [player1, player2];
      this.scores = [0, 0];
      this.currentPlayerIndex = 0;
      this.targetScore = 50;
      this.gameOver = false;
      this.gameHistory = [];
      this.updateScores();
      this.updateTurnIndicator();
      this.updateHistoryTable();
  }

  playTurn() {
      if (this.gameOver) {
          this.displayMessage("Game over. Please start a new game.");
          return;
      }

      const runs = Math.floor(Math.random() * 6) + 1;
      this.scores[this.currentPlayerIndex] += runs;

      this.displayMessage(
          `${this.players[this.currentPlayerIndex]} scored ${runs} runs.`
      );

      if (this.scores[this.currentPlayerIndex] >= this.targetScore) {
          this.gameOver = true;
          this.displayMessage(`${this.players[this.currentPlayerIndex]} wins the game!`);
          this.highlightWinner();
          this.recordGameResult(); 
      } else {
          this.updateScores();
          this.currentPlayerIndex = 1 - this.currentPlayerIndex; 
          this.updateTurnIndicator();
      }
  }

  startNewGame() {
      this.scores = [0, 0];
      this.currentPlayerIndex = 0;
      this.gameOver = false;
      this.displayMessage(
          `New game started between ${this.players[0]} and ${this.players[1]}. Target score: ${this.targetScore}`
      );
      this.updateScores();
      this.removeWinnerHighlight();
      this.updateTurnIndicator();
  }

  updateScores() {
      const scoresElement = document.getElementById('scores');
      scoresElement.textContent = `Scores: ${this.players[0]} - ${this.scores[0]}, ${this.players[1]} - ${this.scores[1]}`;
  }

  highlightWinner() {
      const winnerIndex = this.scores[0] > this.scores[1] ? 0 : 1;
      this.displayMessage(`${this.players[winnerIndex]} is the winner!`);
      this.removeWinnerHighlight();
      document.getElementById(`player${winnerIndex + 1}Btn`).classList.add('winner');
  }

  removeWinnerHighlight() {
      document.getElementById('player1Btn').classList.remove('winner');
      document.getElementById('player2Btn').classList.remove('winner');
  }

  displayMessage(message) {
      const popupMessageElement = document.getElementById('popupMessage');
      popupMessageElement.textContent = message;

      const overlay = document.getElementById('overlay');
      const popup = document.getElementById('popup');

      overlay.style.display = 'block';
      popup.style.display = 'block';
  }

  updateTurnIndicator() {
      const turnIndicatorElement = document.getElementById('turnIndicator');
      turnIndicatorElement.textContent = `Current Turn: ${this.players[this.currentPlayerIndex]}`;
  }

  recordGameResult() {
      const winnerIndex = this.scores[0] > this.scores[1] ? 0 : 1;
      const loserIndex = 1 - winnerIndex;

      const gameResult = {
          winner: this.players[winnerIndex],
          loser: this.players[loserIndex],
          scores: `${this.players[0]} - ${this.scores[0]}, ${this.players[1]} - ${this.scores[1]}`
      };

      this.gameHistory.unshift(gameResult);
      this.gameHistory = this.gameHistory.slice(0, 3);

      this.updateHistoryTable();
  }

  updateHistoryTable() {
      const tableBody = document.querySelector('#historyTable tbody');
      tableBody.innerHTML = '';

      this.gameHistory.forEach((result, index) => {
          const row = tableBody.insertRow();
          const cellGame = row.insertCell(0);
          const cellWinner = row.insertCell(1);
          const cellScore = row.insertCell(2);

          cellGame.textContent = `Game ${index + 1}`;
          cellWinner.textContent = result.winner;
          cellScore.textContent = result.scores;
      });
  }
}

const game = new CricketGame("Player A", "Player B");

document.getElementById('player1Btn').addEventListener('click', () => game.playTurn());
document.getElementById('player2Btn').addEventListener('click', () => game.playTurn());
document.getElementById('resetBtn').addEventListener('click', () => game.startNewGame());

function closePopup() {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popup');

  overlay.style.display = 'none';
  popup.style.display = 'none';
}
