window.addEventListener("load", (event) => {
  const errorMsg = document.getElementById("error-msg");
  let score = 20;

  // generate a random number between 1 and 20
  const randomNumber = Math.floor(Math.random() * 20) + 1;

  const handleGuess = (guess) => {
    if (guess < randomNumber) {
      // too low
    } else if (guess > randomNumber) {
      // too high
    } else {
      // match!
    }
  };

  // handle check button click
  const checkGuessBtn = document.getElementById("check-guess-btn");
  checkGuessBtn.addEventListener("click", () => {
    const guessInput = document.getElementById("guess-input");
    if (guessInput.value) {
      handleGuess(guessInput.value);
    } else {
      errorMsg.classList.remove("hide");
    }
  });
});
