import React,{Component, Fragment} from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { Questions } from '../Questions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver'

toast.configure();

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
        userAnswer:null,
        score:0,
        showWelcomeMsg:false,
        quizEnd:false
    }

    storedDataRef = React.createRef();

    loadQuestions = quizz => {

        //console.log("Je suis dans load questions");

        //console.log(quizz);

        const fetchedArrayQuiz = Questions[0].quizz[quizz];

        //console.log(fetchedArrayQuiz);

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz;

            //console.log(this.storedDataRef.current);

            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);

            //console.log(newArray);

            this.setState({
                storedQuestions:newArray
            })

        } else {
            console.log("Pass assez de questions")
        }
    }

    showWelcomeMsg = pseudo => {

        if(!this.state.showWelcomeMsg) {

            this.setState({
                showWelcomeMsg:true
            });

            //console.log("je suis dans show welcome message");

            toast.info(` Bienvenue ${pseudo} dans ce quizz sur le MCU et bonne chance ! `, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
        }
    }

    componentDidMount() {

        //console.log("Je suis dans component did mount");

        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);

    }


    nextQuestion = () => {

        //console.log("je suis dans next question");

        if(this.state.idQuestion === this.state.maxQuestions - 1) {
            //fin
            //console.log("Game Over");
            this.gameOver();
        } else {
            this.setState(prevState => ({
                idQuestion:prevState.idQuestion + 1
            }))
        }

        // + 1 dans le score

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

            if (this.state.userAnswer === goodAnswer) {
                this.setState(prevState => ({
                    score:prevState.score + 1
                }))

                toast.success(" Bonne réponse ! GG ! +1 ", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            } else {
                toast.error(' Térrible désillusion, Mauvaise réponse ! ', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
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

        if(this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question:this.state.storedQuestions[this.state.idQuestion].question,
                options:this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer:null,
                btnDisabled:true
            })
        }

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo);
        }
    }
    
    submitAnswer = selectedAnswer => {

        //console.log("je suis dans submit answer");

        this.setState({
            userAnswer:selectedAnswer,
            btnDisabled:false
        })
    }

    getPercent = (maxQuestions,ourScore) => (ourScore/maxQuestions) * 100;

    gameOver = () => {

        //console.log("je suis dans game over");
        
        const gradePercent = this.getPercent(this.state.maxQuestions,this.state.score);

            if (gradePercent >= 50) {
                this.setState({
                    quizLevel:this.state.quizLevel + 1,
                    percent:gradePercent,
                    quizEnd:true
                })
            } else {
                this.setState({
                    percent:gradePercent,
                    quizEnd:true
                })
            }
    }

    loadLevelQuestions = param => {
        //console.log("je suis dans load level questions");
        this.setState({
            
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

        return (this.state.quizEnd) ? (
            <QuizOver 
            ref={this.storedDataRef}
            levelNames={this.state.levelNames}
            score={this.state.score}
            maxQuestions={this.state.maxQuestions}
            quizLevel={this.state.quizLevel}
            percent={this.state.percent}
            loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : (

            <Fragment>
                <Levels/>
                <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions}/>
                <h2> {this.state.question} </h2>
                    {displayOptions}
                    <button 
                    className="btnSubmit" 
                    disabled={this.state.btnDisabled}
                    onClick={this.nextQuestion}
                    > 
                    {this.state.idQuestion < this.state.maxQuestions - 1 ? "Question Suivante " : " Terminer "}
                    </button>
            </Fragment>
        )
        
    }
}

export default Quiz;
