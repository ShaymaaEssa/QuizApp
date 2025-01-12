//================imports========================
import { getCategoryApi, getQuestionsApi } from "../js/module-api.js";
import question from "../js/question.js"

//================variables======================
export const categoryInput = document.querySelector("#category-select");
export const difficultyInput = document.querySelector("#difficulty");
export const questionsNumInput = document.querySelector("#questions-num")

const scoreDisplayInput = document.querySelector(".score-display")

let score = 0;
let index = 0;

const questionForm = document.querySelector("#questions-form");

let questions = [];

//===============EventListener===================
questionForm.addEventListener("submit", async function(e){
    e.preventDefault();
    questions =await getQuestionsApi(categoryInput.value, difficultyInput.value, questionsNumInput.value);

    questionForm.classList.add("d-none");
    document.querySelector(".questions").classList.remove("d-none")
    getNextQuestion(0);
})


//==============functions========================
getCategoryApi();

export function getScore(){
    return score;
}

export function setScore(value){
    score = value;
}

export function getNextQuestion (index){
    if(index<questions.length){
        let myQuestion = new question(index, questions[index].question, questions[index].incorrect_answers, questions[index].correct_answer, questions[index].category, questions.length);
        myQuestion.displayQuestion();
    }
    else{
        displayScore();
    }

}

function displayScore(){

    document.querySelector(".questions").classList.add("d-none")
    scoreDisplayInput.classList.remove("d-none");

    scoreDisplayInput.querySelector(".category").innerHTML = categoryInput.options[categoryInput.selectedIndex].text;
    scoreDisplayInput.querySelector(".difficulty").innerHTML = difficultyInput.options[difficultyInput.selectedIndex].text ;
    if(score >0){
        scoreDisplayInput.querySelector(".card-title").innerHTML ="Congratulation, you finished the Quiz !";
        scoreDisplayInput.querySelector(".card-title").classList.add("text-success");
    }else{
        scoreDisplayInput.querySelector(".icon").classList.add("d-none");
        scoreDisplayInput.querySelector(".card-title").classList.add("text-danger");
        scoreDisplayInput.querySelector(".card-title").innerHTML ="Sorry, You can try again";

    }
    scoreDisplayInput.querySelector(".questions-order").innerHTML = questionsNumInput.value ;
    scoreDisplayInput.querySelector(".score").innerHTML = score;
    scoreDisplayInput.querySelector(".card-footer").innerHTML = (new Date()).toLocaleDateString('en-US');
    scoreDisplayInput.querySelector(".btn").addEventListener("click", ()=>{
        window.location.reload();
    })
}


