import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import questions from "../../assests/gk_question.json";
import isEmpty from "../../utils/is-empty";
import { Button } from "@material-ui/core";
import "./Quiz.css";
import M from 'materialize-css';
import classnames from 'classnames';


class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      previousQuestion: {},
      nextQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0, 
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      time: {},
      previousButtonDisabled: false,
      nextButtonDisabled: false
    };
    this.interval = null
  }

  componentDidMount() {
    const {
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion,
    } = this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer()
  }
  componentWillUnmount () {
    clearInterval(this.interval);
}



displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
  let { currentQuestionIndex } = this.state;   
  if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          
      });
  }     
};

handleNextButtonClick = () => {
  if (this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1
      }), () => {
          this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
  }
};
  
handlePreviousButtonClick = () => {
  if (this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
          this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
  }
};

handleQuitButtonClick = () => {

  if (window.confirm('Are you sure you want to quit?')) {
      this.props.history.push('/');
  }
};


  handleClick = (e) => {
     
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
         this.correctAnswer();
          } else {
           
            this.wrongAnswer();
          }
      
      
    
  };

  correctAnswer = () => {
    M.toast({
        html: 'Correct Answer!',
        classes: 'toast-valid',
        displayLength: 1500
    });
    this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {            
        if (this.state.nextQuestion === undefined) {
            this.endGame();
        } else {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        }
    });
}
wrongAnswer = () => {
  navigator.vibrate(1000);
  M.toast({
      html: 'Wrong Answer!',
      classes: 'toast-invalid',
      displayLength: 1500
  });
  this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
  }), () => {
      if (this.state.nextQuestion === undefined) {
          this.endGame();
      } else {
          this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      }
  });
}

startTimer = () => {
  const countDownTime = Date.now() + 180000;
  this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
          clearInterval(this.interval);
          this.setState({
              time: {
                  minutes: 0,
                  seconds: 0
              }
          }, () => {
              this.endGame();
          });
      } else {
          this.setState({
              time: {
                  minutes,
                  seconds,
                  distance
              }
          });
      }
  }, 1000);
}

handleDisableButton = () => {
  if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
      this.setState({
          previousButtonDisabled: true
      });
  } else {
      this.setState({
          previousButtonDisabled: false
      });
  }

  if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
      this.setState({
          nextButtonDisabled: true
      });
  } else {
      this.setState({
          nextButtonDisabled: false
      });
  }
}

endGame = () => {
  alert('Quiz has eneded!');
  const { state } = this;
  const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints
  };
  setTimeout(() => {
      this.props.history.push('/play/quizSummary', playerStats);
  }, 1000);
}
  render() {
    const { currentQuestion, currentQuestionIndex, time, numberOfQuestions } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Quiz Page</title>
        </Helmet>
        <h1 className = "quiz-title">Quizbox</h1>
        <div className="questions">
        <div className = "timer-container">
        <span className="left" style={{ float: 'left' }}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            <span className={classnames('right valid', {
                                'warning': time.distance <= 120000,
                                'invalid': time.distance < 30000
                            })}
                            style = {{float : 'right'}}>
                                {time.minutes}:{time.seconds}
                            <span  className="mdi mdi-clock-outline mdi-24px"></span></span>
        </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p
              onClick={this.handleClick}
              className="option"
            >
              {currentQuestion.optionA}
            </p>
            <p
              onClick={this.handleClick}
              className="option"
            >
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p
              onClick={this.handleClick}
              className="option"
            >
              {currentQuestion.optionC}
            </p>
            <p
              onClick={this.handleClick}
              className="option"
            >
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <Button
            id = "next-button"
            onClick = {this.handleNextButtonClick}
              style={{ float: "right", marginLeft: '10px', height : '30px', fontSize : 'medium' }}
              className={classnames('', {'disable': this.state.previousButtonDisabled})}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
            <Button
            id = "previous-button"
            className={classnames('', {'disable': this.state.nextButtonDisabled})}
            onClick = {this.handlePreviousButtonClick}
              style={{ float: "right", marginLeft: '10px', height : '30px', fontSize : 'medium' }}
              variant="outlined"
              color="primary"
            >
              Previous
            </Button>
            <Button
            id = "quit-button"
            onClick = {this.handleQuitButtonClick}
              style={{ float: "right", marginLeft: '10px', height : '30px', fontSize : 'medium'}}
              variant="contained"
              color="secondary"
            >
              Quit
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Quiz;
