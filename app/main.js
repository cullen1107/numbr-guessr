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
    guessInput.placeholder = "50";
    guessInput.disabled = false;
    guessInput.focus();

    // post win reset styles
    document.body.classList.remove("win-bg");
    const header = document.getElementById("header");
    header.classList.add("button-hidden");
    const playAgainBtn = document.getElementById("play-again-btn");
    playAgainBtn.classList.add("hide");
    const feedbackMsg = document.getElementById("feedback-message");
    feedbackMsg.innerText = "Start guessing";
    const mysteryBox = document.getElementById("mystery-box");
    mysteryBox.innerText = "?";
    const checkGuessBtn = document.getElementById("check-guess-btn");
    checkGuessBtn.disabled = false;

    // logic for handling guess
    const handleGuess = (guess) => {
      feedbackMsg.classList.remove("initial-feedback");
      feedbackMsg.classList.remove("opacity-100");
      feedbackMsg.classList.add("opacity-0");

      const addInText = (text) => {
        setTimeout(() => {
          feedbackMsg.classList.remove("opacity-0");
          feedbackMsg.classList.add("opacity-100");
          feedbackMsg.innerText = text;
        }, 200);
      };

      if (guess < randomNumber) {
        // too low
        score--;
        scoreLabel.innerText = score;
        addInText("Too Low");
      } else if (guess > randomNumber) {
        // too high
        addInText();
        score--;
        scoreLabel.innerText = score;
        addInText("Too High");
      } else {
        // match!
        document.body.classList.add("win-bg");
        addInText("Correct Number!");
        mysteryBox.innerText = guess;
        // disable input and guess button
        guessInput.disabled = true;
        checkGuessBtn.disabled = true;
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
    document.getElementById("guess-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const guess = Number(e.target.elements["guess-input"].value);
      if (guess >= 1 && guess <= 100) {
        guessInput.placeholder = "";
        errorMsg.classList.add("opacity-0");
        handleGuess(guess);
        guessInput.value = "";
        guessInput.focus();
      } else {
        errorMsg.classList.remove("opacity-0");
      }
    });
  };

  init();
});
