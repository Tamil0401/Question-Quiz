const questions = [
  {
    q: "Which language runs in browser?",
    o: ["Java", "Python", "C", "JavaScript"],
    a: "JavaScript",
  },
  {
    q: "HTML stands for?",
    o: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Tool",
      "None",
    ],
    a: "Hyper Text Markup Language",
  },
  {
    q: "CSS is used for?",
    o: ["Logic", "Styling", "Database", "Server"],
    a: "Styling",
  },
  {
    q: "Which keyword declares variable?",
    o: ["int", "var", "string", "float"],
    a: "var",
  },
  { q: "JS file extension?", o: [".java", ".js", ".html", ".css"], a: ".js" },
  {
    q: "Which is not a loop?",
    o: ["for", "while", "repeat", "do-while"],
    a: "repeat",
  },
  {
    q: "Which operator checks value & type?",
    o: ["==", "=", "===", "!="],
    a: "===",
  },
  {
    q: "DOM stands for?",
    o: [
      "Document Object Model",
      "Data Object Model",
      "Design Object Model",
      "None",
    ],
    a: "Document Object Model",
  },
  {
    q: "Which method prints output?",
    o: ["console.log()", "print()", "echo()", "write()"],
    a: "console.log()",
  },
  {
    q: "Which is used for comments?",
    o: ["/* */", "//", "**", "##"],
    a: "//",
  },
];

let index = 0;
let answers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

function loadQuestion() {
  questionEl.textContent = `Q${index + 1}. ${questions[index].q}`;
  optionsEl.innerHTML = "";

  questions[index].o.forEach((opt) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <label>
                <input type="radio" name="option" value="${opt}"
                ${answers[index] === opt ? "checked" : ""}>
                ${opt}
            </label>
        `;
    optionsEl.appendChild(li);
  });
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) answers[index] = selected.value;
}

function nextQuestion() {
  saveAnswer();
  if (index < questions.length - 1) {
    index++;
    loadQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (index > 0) {
    index--;
    loadQuestion();
  }
}

function submitExam() {
  saveAnswer();
  document.getElementById("examSection").classList.add("hidden");
  document.getElementById("resultSection").classList.remove("hidden");

  let score = 0;
  let summaryHTML = "";

  questions.forEach((q, i) => {
    const isCorrect = q.a === answers[i];
    if (isCorrect) score++;

    summaryHTML += `
            <p class="${isCorrect ? "correct" : "wrong"}">
                Q${i + 1}. ${q.q}<br>
                Your Answer: ${answers[i] || "Not Answered"}<br>
                Correct Answer: ${q.a}
            </p>
            <hr>
        `;
  });

  document.getElementById(
    "score"
  ).textContent = `Your Score: ${score} / ${questions.length}`;

  document.getElementById("summary").innerHTML = summaryHTML;
}

loadQuestion();
