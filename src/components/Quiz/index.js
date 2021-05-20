import React,{Component} from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { Questions } from '../Questions';


class Quiz extends Component {
    //console.log(props.userData.pseudo);

    state = {
        levelNames: ["debutant","confirme","expert"],
        quizLevel:0,
        maxQuestions:10,
        storedQuestions:[],
        question:null,
        options:[],
        idQuestion:0,
        btnDisabled:(true),
        userAnswer:null
    }

    loadQuestions = quizz => {
        //console.log("Je suis dans load questions");
        //console.log(quizz);
        const fetchedArrayQuiz = Questions[0].quizz[quizz];
        //console.log(fetchedArrayQuiz);
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);
            //console.log(newArray);
            this.setState({
                storedQuestions:newArray
            })

        } else {
            console.log("Pass assez de questions")
        }
    }

    componentDidMount() {
        //console.log("Je suis dans component did mount");
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            //console.log(this.state.storedQuestions[0].question);
            //console.log(this.state.storedQuestions[0].options);
            this.setState({
                question:this.state.storedQuestions[this.state.idQuestion].question,
                options:this.state.storedQuestions[this.state.idQuestion].options
            })
        }
    }
    
    submitAnswer = selectedAnswer => {
        console.log("je suis dans submit answer");
        this.setState({
            userAnswer:selectedAnswer,
            btnDisabled:false
        })
    }

    render() {

        //const {pseudo} = this.props.userData;

        const displayOptions = this.state.options.map((option,index) => {
            return (
                <p 
                key={index} 
                className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                onClick={() =>this.submitAnswer(option)}
                > {option} </p>
            )
        })
        return (
            <div>
                <Levels/>
                <ProgressBar/>
                <h2> {this.state.question} </h2>
                    {displayOptions}
                    <button className="btnSubmit" disabled={this.state.btnDisabled}> Question suivante </button>
            </div>
        )
    }
}

export default Quiz;
