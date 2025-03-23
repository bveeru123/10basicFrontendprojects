const questions=[
    {
        question:"Which is the largest animal in the world",
        answers:[
            {text:"shark", correct:"false"},
            {text:"Blue Whale", correct:"true"},
            {text:"Elephant", correct:"false"},
            {text:"Girrafe", correct:"false"},
        ]
    },
    {
        
            question:"What is the capital of Germany?",
            answers:[
                {text:"Paris", correct:"false"},
                {text:" Madrid", correct:"false"},
                {text:"Rome", correct:"false"},
                {text:"Berlin", correct:"true"},
            ]
        
    },
    {
        
            question:"Which programming language is known as the mother of all languages?",
            answers:[
                {text:"Assembly", correct:"true"},
                {text:"Python", correct:"false"},
                {text:"Java", correct:"false"},
                {text:"c", correct:"false"},
            ]
        
    },
    {
        question:"What does HTTP stand for?",
        answers:[
            {text:"Hyper Text Transfer Protocol",correct:"true"},
            {text:" High Transfer Text Protocol", correct:"false"},
            {text:"Hyper Transfer Text Protocol", correct:"false"},
            {text:"Hyper Text Transmission Protocol", correct:"false"},
        ]
    }

];
const questionElement=document.getElementById("question");
const answerButtOns=document.getElementById("answer-button");
const nextButtOn=document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButtOn.innerHTML="Next"
    showQuestion()
}
function showQuestion()
{
    resetState()
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtOns.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
        
    });
}

function resetState()
{
    nextButtOn.style.display="none";
    while(answerButtOns.firstChild){
        answerButtOns.removeChild(answerButtOns.firstChild)
    }
}

function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtOns.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }button.disabled=true;
    });
    nextButtOn.style.display="block "
}
function showscore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}`
    nextButtOn.innerHTML="Play Again";
    nextButtOn.style.display="block"
}
function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex  < questions.length){
        showQuestion();
    }
    else{
        showscore();
    }
}
nextButtOn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();