
import {getScore, setScore, getNextQuestion} from "../js/index.js"

export default class question {
    constructor(index, questionText, choices, correctAnswer, category, totalQuestionsNumber) {
        this.index = index;
        this.questionText = questionText;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
        this.category = category;
        this.totalQuestionsNumber = totalQuestionsNumber;
    }

    displayQuestion() {
        const choicesInput = document.querySelector(".choices .row");
        let choiceContainer = "";
        let choicesArr = [...this.choices, this.correctAnswer];
        choicesArr.sort();

        choicesArr.forEach((item) => {
            choiceContainer += `
            <div class="col-lg-6">
                 <button class="btn btn-outline-primary w-75 h-100">${item}</button>
            </div>`
        });

        


        choicesInput.innerHTML = choiceContainer;

        let choicesBtns = choicesInput.querySelectorAll("div button");
        choicesBtns.forEach( btn => {
            btn.addEventListener("click", ()=>{
                this.checkCorrectAnswer(btn);
                choicesBtns.forEach(btn => {
                    btn.disabled = true;
                })
            })
        });


        document.querySelector(".category").innerHTML = this.category;
        document.querySelector(".questions-order").innerHTML = `${this.index + 1} of ${this.totalQuestionsNumber}`
        document.querySelector(".card-title").innerHTML = this.questionText;


        document.querySelector(".score").innerHTML = getScore();

    }

    checkCorrectAnswer(btn){
        let userAnswer = btn.innerHTML;
        if (userAnswer === this.correctAnswer){
            setScore(getScore() + 1);
            btn.classList.add("bg-success","text-white", "border" ,"border-success");
            
        
        } else{
            btn.classList.add("bg-danger","text-white","border" ,"border-danger" );
            
        }


        setTimeout(() => {
            getNextQuestion(this.index+1)
          }, 1000);
       

    }
}