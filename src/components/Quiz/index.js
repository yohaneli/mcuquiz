import React,{Component, Fragment} from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { Questions } from '../Questions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';
import { FiChevronRight } from 'react-icons/fi';

toast.configure();

const initialState = {
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
                    quizEnd:false,
                    percent:null
}

const levelNames = ["debutant","confirme","expert"];


class Quiz extends Component {

    //console.log(props.userData.pseudo);

    constructor(props) {
        super(props)
    
        this.state = initialState;

        this.storedDataRef = React.createRef();

    }
    
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

        } 
    }

    showToastMsg = pseudo => {

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

        this.loadQuestions(levelNames[this.state.quizLevel]);

    }


    nextQuestion = () => {

        //console.log("je suis dans next question");

        if(this.state.idQuestion === this.state.maxQuestions - 1) {
            //fin
            //console.log("Game Over");
            //this.gameOver();
            this.setState({
                quizEnd:true
            })
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

        const {
            maxQuestions,
            storedQuestions,
            idQuestion,
            score,
            quizEnd } = this.state;

        if (storedQuestions !== prevState.storedQuestions && storedQuestions.length) {
            //console.log(this.state.storedQuestions[0].question);
            //console.log(this.state.storedQuestions[0].options);
            this.setState({
                question:storedQuestions[idQuestion].question,
                options:storedQuestions[idQuestion].options
            })
        }

        if((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
            this.setState({
                question:storedQuestions[idQuestion].question,
                options:storedQuestions[idQuestion].options,
                userAnswer:null,
                btnDisabled:true
            })
        }

        if (quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPercent(maxQuestions,score);
            this.gameOver(gradePercent);
        }

        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo);
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

    gameOver = percent => {

        //console.log("je suis dans game over");
        
            if (percent >= 50) {
                this.setState({
                    quizLevel:this.state.quizLevel + 1,
                    percent
                    })
            } else {
                this.setState({
                    percent
                })
            }
    }

    loadLevelQuestions = param => {

        //console.log("je suis dans load level questions");

        this.setState({...initialState,quizLevel:param});

        this.loadQuestions(levelNames[param]);

    }

    render() {

        const {
        quizLevel,
        maxQuestions,
        question,
        options,
        idQuestion,
        btnDisabled,
        userAnswer,
        score,
        quizEnd,
        percent } = this.state;

        //const {pseudo} = this.props.userData;

        const displayOptions = options.map((option,index) => {
            return (
                <p 
                key={index} 
                className={`answerOptions ${userAnswer === option ? "selected" : null}`}
                onClick={() =>this.submitAnswer(option)}
                > <FiChevronRight/>{option} </p>
            )
        })

        return (quizEnd) ? (
            <QuizOver 
            ref={this.storedDataRef}
            levelNames={levelNames}
            score={score}
            maxQuestions={maxQuestions}
            quizLevel={quizLevel}
            percent={percent}
            loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : (

            <Fragment>
                <Levels
                levelNames={levelNames}
                quizLevel={quizLevel}
                />
                <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions}/>
                <h2> {question} </h2>
                    {displayOptions}
                    <button 
                    className="btnSubmit" 
                    disabled={btnDisabled}
                    onClick={this.nextQuestion}
                    > 
                    {idQuestion < maxQuestions - 1 ? "Question Suivante " : " Terminer "}
                    </button>
            </Fragment>
        )
        
    }
}

export default Quiz;
