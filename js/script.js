let questions = [
    {
        "questionCategory":
            [
                {
                    "question": "Wer hat HTML erfunden?",
                    "answer": ["Steve Jobs", "Bill Gates", "Tim Berners-Lee", "Linus Torvalds"],
                    "right_answer": 2
                },
                {
                    "question": "Was bedeutet HTML?",
                    "answer": ["Hypertext Markup Look", "Hypertext Mark Language", "Hypertext Markup Language", "Hypertext Mark Look"],
                    "right_answer": 2
                },
                {
                    "question": "Was bedeutet das HTML-Tag < u > ?",
                    "answer": ["Text Kursiv", "Text Unterstrich", "Ein Link", "Text Fett"],
                    "right_answer": 1
                },
                {
                    "question": "Mit welcher Erweiterung wird HTML gespeichert",
                    "answer": [".htnl", ".html", ".htmn", ".htme"],
                    "right_answer": 1
                },
                {
                    "question": "Womit kann HTML-Programm gelesen und gerendert werden",
                    "answer": ["Interpreter", "Compiler", "Server", "Web Browser"],
                    "right_answer": 3
                }
            ],
        "questionLetter": ["A", "B", "C", "D"],
        "questionTitle": ["HTML", "CSS", "JS"]
    },
    {
        "questionCategory": [
            {
                "question": "Wie ändert man die Hintergrundfarbe?",
                "answer": ["backgroundcolor: ...", "back ground color: ...", "back-ground-color: ...", "background-color: ..."],
                "right_answer": 3
            },
            {
                "question": "Wie entfernt man den Strich unter einem Link?",
                "answer": ["text-decoration: none", "text-decoration: no line", "text-decoration: none", "link-decoration: none"],
                "right_answer": 2
            },
            {
                "question": "Was bedeutet CSS?",
                "answer": ["Cascading Style Sheets", "Cool Style Sheet", "Cascade Style Sheets", "Cool Style Sheets"],
                "right_answer": 0
            },
            {
                "question": "Wie ändert man die Schriftart?",
                "answer": ["font: ...", "font-family: ...", "family-font: ...", "family: ..."],
                "right_answer": 1
            },
            {
                "question": "Mit welchem Befehl gibt man die größte Überschrift an?",
                "answer": ["< h2 > ... < /h2 >", "< h0 > ... < /h0 >", "< h3 > ... < /h3 >", "< h1 > ... < /h1 >"],
                "right_answer": 3
            }
        ]
    },
    {
        "questionCategory": [
            {
                "question": "Wie heißt der Erfinder von JavaScript?",
                "answer": ["Bill Gates", "Linus Torvalds", "Steve Jobs", "Brendan Eich"],
                "right_answer": 3
            },
            {
                "question": "Was ist das Ergebnis von typeof new String(123)?",
                "answer": ["string", "number", "object", "undefined"],
                "right_answer": 2
            },
            {
                "question": "Wie erstellt man eine Funktion ?",
                "answer": [" function myFunction(){}", " function:myFunction(){}", " function = myFunction(){}", " myFunction function(){}"],
                "right_answer": 0
            },
            {
                "question": "Was ist true?",
                "answer": ["0 == null", "0 >= null", "0 == undefined", "0 > null"],
                "right_answer": 1
            },
            {
                "question": "Was ist das Ergebnis von 9007199254740992 + 1 ?",
                "answer": ["NaN", "9007199254740993", "Eine Fehlermeldung", "9007199254740992"],
                "right_answer": 3
            }
        ]
    }
];

let questionRound = 0;
let successQuestions = 0;
let counterGameOver = 0;
let categoryNum = 0;

let audioSuccess = new Audio('./audio/success.mp3');
let audioFail = new Audio('./audio/fail.mp3');

function init() {
    renderQuestion();
    document.getElementById('quizMain').style.display = 'flex';
}

function renderQuestion() {
    let questionText = document.getElementById('navContainer');
    questionText.innerHTML = '';

    for (let i = 0; i < questions[0].questionTitle.length; i++) {
        const element = questions[0].questionTitle;

        questionText.innerHTML +=
            `
            <button id="btnQuestion_${i}" onclick="chooseCategory(${i})" class="btnNav">${element[i]}</button>
            `;
    }
}

function renderAnswer() {
    let element = questions[categoryNum].questionCategory;

    document.getElementById('questionsHeader').innerHTML = element[questionRound].question;
    document.getElementById('anserQuestion').innerHTML = `${questionRound + 1} von ${element.length} Fragen`;
    let answer = document.getElementById('anserCard');
    answer.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        answer.innerHTML +=
            `
                <div class="cardBox">
                    <button onclick="chooseAnswer(${i})" id="btnAnswer_${i}" type="button" class="btn, btnAnswer" disabled>
                        <div class="cardLetter" id="cardLetter_${i}">${questions[0].questionLetter[i]}</div>
                        <div class="answer" id="answer_${i}">${element[questionRound].answer[i]}</div>
                    </button>
                </div>
            `;
    }

    toggleSelectButten(4, 'btnAnswer_', false);
}

function chooseCategory(index) {
    categoryNum = index;

    document.getElementById('btnQuestion_' + categoryNum).classList.add('btnNavSelect');
    if (index == 0) { toggleColor(1, 2) };
    if (index == 1) { toggleColor(0, 2) };
    if (index == 2) { toggleColor(0, 1) };
    navLogoShow();
    document.getElementById('buttonHideSecond').disabled = false;
}

function toggleColor(first, second) {
    navBarHide();
    logoButton();
    document.getElementById('categoryName').innerHTML = questions[0].questionTitle[categoryNum];

    document.getElementById(`btnQuestion_${first}`).classList.remove('btnNavSelect');
    document.getElementById(`btnQuestion_${second}`).classList.remove('btnNavSelect');
}

function startQuiz() {
    repeatGame();
    quizAppStart();
    navBarHide();

    document.getElementById('navBarIcon').style.display = 'none';
}

function quizAppStart() {
    quizMainHide();
    document.getElementById('answer').style.display = 'flex';
    renderAnswer();
}

function toggleSelectButten(nr, name, wert) {
    for (let i = 0; i < nr; i++) {
        document.getElementById(`${name}${i}`).disabled = wert;
    }
}

function chooseAnswer(i) {
    counterGameOver++;

    let element = questions[categoryNum].questionCategory;

    if (i == element[questionRound].right_answer) {
        successQuestions++;
        answerTrue(i)
    } else {
        answerFalse(i);
    }
    document.getElementById('buttonHide').disabled = false;

    progressBarUpdate();

    toggleSelectButten(4, 'btnAnswer_', true);

    if (counterGameOver == 5) {
        lastAnswerTimeout();
    }
}

function lastAnswerTimeout() {
    setTimeout(function () { gameOver(); }, 1000);
    buttonHide();
}

function progressBarUpdate() {
    let index = Math.round(((questionRound + 1) / questions[categoryNum].questionCategory.length) * 100);
    document.getElementById('progress-bar').style.width = `${index}%`;
}

function answerTrue(i) {
    document.getElementById('btnAnswer_' + i).style.backgroundColor = '#b2ffb0';
    document.getElementById('cardLetter_' + i).style.backgroundColor = '#3bff35';
    audioSuccess.play();
}

function answerFalse(i) {
    document.getElementById('btnAnswer_' + i).style.backgroundColor = '#ffc1c1';
    document.getElementById('cardLetter_' + i).style.backgroundColor = '#ff2a2a';

    let element = questions[categoryNum].questionCategory[questionRound].right_answer;
    document.getElementById('cardLetter_' + element).style.backgroundColor = '#68ff64';
    audioFail.play();
}

function nextQuestion() {
    questionRound++;
    renderAnswer();
    buttonHide();
    stopAudio();
}

function gameOver() {
    document.getElementById('answer').style.display = 'none';
    document.getElementById('gameOver').style.display = 'flex';

    let element = questions[categoryNum].questionCategory;

    let gameOver = document.getElementById('gameOver');
    gameOver.innerHTML = '';
    gameOver.innerHTML =
        `
        <img src="./img/gameOver.png">
        <h2><font color=#144eff>${questions[0].questionTitle[categoryNum]}</font><br>ABGESCHLOSSEN</h2>
        <h2><font color=#144eff>DEIN ERGEBNISS</font><br>${successQuestions} / ${element.length}</h2>
        <div class="gameCircle"></div>
    `;

    gameReset();
}

function gameReset() {
    questionRound = 0;
    successQuestions = 0;
    counterGameOver = 0;

    document.getElementById('btnQuestion_' + categoryNum).classList.remove('btnNavSelect');
    document.getElementById('btnQuestion_' + categoryNum).style.textDecoration = 'line-through';

    navLogoShow();
    document.getElementById('buttonHideSecond').disabled = true;
}

function repeatGame() {
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('answer').style.display = 'flex';
    document.getElementById('progress-bar').style.width = '0%';
    buttonHide();
}

function logoButton() {
    toggleRegulations('imprint', 'privacy', 'copyright');
    document.getElementById('quizMain').style.display = 'flex';
}

function imprint() {
    regulationShow('imprint');
    toggleRegulations('privacy', 'copyright');
    navBarHide();
    navLogoShow();
}

function privacy() {
    regulationShow('privacy');
    toggleRegulations('imprint', 'copyright');
    navBarHide();
    navLogoShow();
}

function copyright() {
    regulationShow('copyright');
    toggleRegulations('imprint', 'privacy');
    navBarHide();
    navLogoShow();
}

function regulationShow(index) {
    document.getElementById(index).classList.remove('d-none');
}

function toggleRegulations(first, second, third) {
    document.getElementById(first).classList.add('d-none');
    document.getElementById(second).classList.add('d-none');
    if (third == 'copyright') { document.getElementById(third).classList.add('d-none'); }

    quizMainHide();
    document.getElementById('gameOver').style.display = 'none';
}

function navBarButton() {
    logoButton();
    navLogoHide();

    document.getElementById('navHide').style.display = 'flex';
    if (document.body.offsetWidth < 600) {
        document.getElementById('navHide').classList.remove('nav500');
        quizMainHide();
    }
}

function quizMainHide() {
    document.getElementById('quizMain').style.display = 'none';
}

function buttonHide() {
    document.getElementById('buttonHide').disabled = true;
}

function navBarHide() {
    document.getElementById('navHide').style.display = 'none';
}

function navLogoShow() {
    document.getElementById('navBarIcon').style.display = 'flex';
}

function navLogoHide() {
    document.getElementById('navBarIcon').style.display = 'none';
}

function stopAudio() {
    audioSuccess.pause();
    audioSuccess.currentTime = 0;
    audioFail.pause();
    audioFail.currentTime = 0;
}