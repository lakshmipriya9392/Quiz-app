import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import questions from '../../assests/gk_question.json'
import isEmpty from '../../utils/is-empty'
import { Button } from '@material-ui/core'
import './Quiz.css'


class Quiz extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion : {},
            previousQuestion : {},
            nextQuestion : {},
            answer : '',
            numberOfQuestions : 0,
            numberOfAnsweredQuestions : 0,
            currentQuestionIndex : 0,
            score : 0,
            correctAnswers : 0,
            wrongAnswers : 0,
            time : {},
            clickedAnswer : 0,
            bgColor : ''
        }
        

    }

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    }
    
displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
    let { currentQuestionIndex } = this.state;
    if(!isEmpty(this.state.questions)) {
        questions = this.state.questions;
        currentQuestion = questions[currentQuestionIndex];
        nextQuestion = questions[currentQuestionIndex + 1];
        previousQuestion = questions[currentQuestionIndex - 1];
        const answer = currentQuestion.answer;
        this.setState({
            currentQuestion,
            nextQuestion,
            previousQuestion,
            answer
        })
    }
}

optionHandler = () => {
    this.handleClick()
    this.handleColor()
}



handleClick  = (e) => {
   if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      
    this.correctAnswer();
   
   }else {
     
        this.wrongAnswer();
       
   }
}

handleColor = (e) => {
    if(e.target.innerHTML === this.state.answer && this.state.clickedAnswer) {
        this.setState({
            bgColor : 'green'
        })
    }else {
        this.setState({
            bgColor : 'red'
        })
    }
}



correctAnswer = () => {
    
    this.setState(prevState => ({
       
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.correctAnswers + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }));
}


wrongAnswer = () => {
 
    this.setState(prevState => ({
     
        score: prevState.score - 1,
       wrongAnswers: prevState.wrongAnswers + 1,
       currentQuestionIndex: prevState.wrongAnswers + 1,
       numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }));
}

        render() {
            const { currentQuestion } = this.state;
            return (
                <Fragment>
                    <Helmet><title>Quiz Page</title></Helmet>
                    <div className = "questions">
                        <h5>{currentQuestion.question}</h5>
                        <div className = "options-container">
                        
                            <p   onClick = {this.optionHandler} className = "option">{currentQuestion.optionA}</p>
                            <p   onClick = {this.optionHandler} className = "option">{currentQuestion.optionB}</p>
                            </div>
                            <div className = "options-container">
                            <p   onClick = {this.optionHandler} className = "option">{currentQuestion.optionC}</p>
                            <p  onClick = {this.optionHandler} className = "option">{currentQuestion.optionD}</p>
                            </div>
                            <div className = "button-container">
                            <Button style = {{float: 'right'}} href = "/play/Category" size = "large" variant="contained" color="secondary">Submit</Button>

                            </div>
                    </div>
                </Fragment>
            );
        }
    
} 

export default Quiz;