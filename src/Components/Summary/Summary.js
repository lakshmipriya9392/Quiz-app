import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import './Summary.css'
import { Button } from '@material-ui/core'

class QuizSummary extends Component {
    constructor (props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0
        };
    }

    componentDidMount () {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers
            });
        }
    }

    render () {
        const { state } = this.props.location;
        let stats, remark;
        const userScore = this.state.score;

        if (userScore <= 30 ) {
            remark = 'You need more practice!';
        } else if (userScore > 30 && userScore <= 50) {
            remark = 'Better luck next time!';
        } else if (userScore <= 70 && userScore > 50) {
            remark = 'You can do better!';
        } else if (userScore >= 71 && userScore <= 84) {
            remark = 'You did great!';
        } else {
            remark = 'You\'re an absolute genius!';
        }

        if (state !== undefined) {
            stats = (
                <Fragment>
                    <div style={{ textAlign: 'center' }}>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1 className = "summaryTitle">Quiz ended</h1>
                    <div className="container stats">
                        <h4 className = "remark">{remark}</h4>
                        <h2 className = "score">Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of questions: </span>
                        <span className="right">{this.state.numberOfQuestions}</span><br />

                        <span className="stat left">Number of attempted questions: </span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />

                        <span className="stat left">Number of Correct Answers: </span>
                        <span className="right">{this.state.correctAnswers}</span> <br />

                        <span className="stat left">Number of Wrong Answers: </span>
                        <span className="right">{this.state.wrongAnswers}</span><br />
                    </div>
                    <section>
                        <ul className = "buttons">
                            <li>
                                <Button
                                    style={{ float: "center", marginBottom: '10px', height : '30px', fontSize : 'medium'}}
                        href = "/play/quiz"
                        variant="contained"
                        size = "large"
                        color="secondary">
                        Play Again
                        </Button>
                            </li>
                            <li>
                            <Button
                            style={{ float: "center", marginBottom: '10px', height : '30px', fontSize : 'medium'}}
                        href = "/play/category"
                        variant="contained"
                        size = "large"
                        color="secondary">
                        Back to Home
                        </Button>
                            </li>
                        </ul>
                    </section>
                </Fragment>
            );
        } else {
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li>
                        <Button
                        href = "/play/quiz"
                        variant="contained"
                        color="secondary">
                        Take a Quiz
                        </Button>
                        </li>
                        <li>
                        <Button
                        href = "/play/category"
                        variant="contained"
                        color="secondary">
                        Back to Home
                        </Button>
                        </li>
                    </ul>
                </section>
            );
        }
        return (
            <Fragment>
                <Helmet><title>Quiz App - Summary</title></Helmet>
                <div className="quiz-summary">
                    {stats}
                </div>
            </Fragment>
        );
    }
}

export default QuizSummary;