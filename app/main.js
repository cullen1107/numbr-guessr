window.addEventListener("load", (event) => {
  localStorage.setItem("highScore", 0);

  const init = () => {
    let score = 20;
    const scoreLabel = document.getElementById("score");
    scoreLabel.innerText = score;
    // generate a random number between 1 and 20
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    const errorMsg = document.getElementById("error-msg");
    let highScore = 0;
    const highScoreLabel = document.getElementById("highscore");
    highScoreLabel.innerText = localStorage.getItem("highScore");

    const handleGuess = (guess) => {
      const feedbackMsg = document.getElementById("feedback-message");

      if (guess < randomNumber) {
        // too low
        score--;
        scoreLabel.innerText = score;
        feedbackMsg.innerText = "Too low";
      } else if (guess > randomNumber) {
        // too high
        score--;
        scoreLabel.innerText = score;
        feedbackMsg.innerText = "Too high";
      } else {
        // match!
        feedbackMsg.innerText = "Match!";
        if (score > localStorage.getItem("highScore")) {
          localStorage.setItem("highScore", score);
          highScoreLabel.innerText = localStorage.getItem("highScore");
        }
      }
    };
    // handle check button click
    const checkGuessBtn = document.getElementById("check-guess-btn");
    checkGuessBtn.addEventListener("click", () => {
      const guessInput = document.getElementById("guess-input");
      if (guessInput.value) {
        handleGuess(guessInput.value);
        guessInput.value = "";
        guessInput.focus();
      } else {
        errorMsg.classList.remove("hide");
      }
    });

    //   handle play again button
    const playAgainBtn = document.getElementById("play-again-btn");
    playAgainBtn.addEventListener("click", init);
  };
  init();
});
