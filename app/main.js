window.addEventListener("load", (event) => {
  const init = () => {
    // Score starts at 100
    let score = 100;
    const scoreLabel = document.getElementById("score");
    scoreLabel.innerText = score;

    // High score - use local storage value after winning or 0 initially
    let highScore = localStorage.getItem("highScore") || 0;
    const highScoreLabel = document.getElementById("highscore");
    highScoreLabel.innerText = highScore;

    // generate a random number between 1 and 20
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const errorMsg = document.getElementById("error-msg");

    // focus on guess input on load
    const guessInput = document.getElementById("guess-input");
    guessInput.focus();

    // post win reset styles
    const resetStyles = () => {};
    document.body.classList.remove("win-bg");
    const header = document.getElementById("header");
    header.classList.add("button-hidden");
    const playAgainBtn = document.getElementById("play-again-btn");
    playAgainBtn.classList.add("hide");
    const feedbackMsg = document.getElementById("feedback-message");
    feedbackMsg.innerText = "Start guessing...";

    // logic for handling guess
    const handleGuess = (guess) => {
      if (guess < randomNumber) {
        // too low
        score--;
        scoreLabel.innerText = score;
        feedbackMsg.innerText = "TOO Low";
      } else if (guess > randomNumber) {
        // too high
        score--;
        scoreLabel.innerText = score;
        feedbackMsg.innerText = "Too High";
      } else {
        // match!
        document.body.classList.add("win-bg");
        feedbackMsg.innerText = "Correct Number!";
        //   handle play again button
        header.classList.remove("button-hidden");
        header.classList.add("space-between");
        playAgainBtn.classList.remove("hide");
        playAgainBtn.addEventListener("click", init);

        // add new high score to logcal storage if greatest
        if (score > highScore) {
          localStorage.setItem("highScore", score);
          highScoreLabel.innerText = localStorage.getItem("highScore");
        }
      }
    };

    // handle check button click
    const checkGuessBtn = document.getElementById("check-guess-btn");
    checkGuessBtn.addEventListener("click", () => {
      if (guessInput.value >= 1 && guessInput.value <= 100) {
        handleGuess(guessInput.value);
        guessInput.value = "";
        guessInput.focus();
      } else {
        errorMsg.classList.remove("hide");
      }
    });
  };

  init();
});
