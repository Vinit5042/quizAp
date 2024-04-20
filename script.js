const quizQuestions = [
    {
      question: "Name the who discovered Gravity?",
      options: ["Issac Newton", "Albert Einstein", "Aristole", "Thomas Edison"],
      answer: "Issac Newton"
    },
     {
          question: "Who invented Zero (0)?",
          options: ["K.S. Reddy", "M. Ashwani", "Aryabhatta", "R.V. Raman"],
          answer: "Aryabhatta"
      },
      {
          question: "Who wrote the Harry Potter?",
          options: ["Mark Twain", "Jane Austen", "Charles Dickens", "J.K. Rowling"],
          answer: "J.K. Rowling"
      },
      {
          question: "When did India got its independence?",
          options: ["1942", "1947", "1949", "1950"],
          answer: "1947"
      },
      {
          question: "What is the full form of UI?",
          options: ["Unique Identity", "User Interface", "User Identity", "Unique Island"],
          answer: "User Interface"
      }
  ];
  
  // Other variables
  let currentQuestionIndex = 0;
  let score = 0;
  const totalQuestions = quizQuestions.length;
  let timer;
  
  // Functions to handle quiz
  function displayQuestion() {
    // Display question
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    questionElement.textContent = currentQuestion.question;
  
    // Display options
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("button");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(optionElement);
    });
  
    // Start timer
    startTimer();
  }
  
  function checkAnswer(selectedOption) {
    // Check if selected answer is correct
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;
    const answerStatus = document.getElementById("answer-status");
    if (selectedOption === correctAnswer) {
      answerStatus.textContent = "Correct!";
      answerStatus.style.color = "green";
      score++;
    } else {
      answerStatus.textContent = "Incorrect!";
      answerStatus.style.color = "red";
    }
  
    // Move to next question
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
      setTimeout(displayQuestion, 1000); // Transition delay
    } else {
      displayFinalScore();
    }
  }
  
  function displayFinalScore() {
    // Display final score
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>Your Final Score: ${score} out of ${totalQuestions}</h2>`;
  }
  
  // Timer functions
  function startTimer() {
    let timeLeft = 30; 
    timer = setInterval(() => {
      document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timer);
        checkAnswer("");
      }
    }, 1000);
  }
  
  // Progress bar
  function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  
  document.getElementById("next-btn").addEventListener("click", () => {
    clearInterval(timer); // Stop timer when moving to next question
    displayQuestion();
    updateProgressBar();
  });
  
  // Start quiz
  displayQuestion();
  updateProgressBar();