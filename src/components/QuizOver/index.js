import React,{Fragment,useEffect,useState} from 'react';

const QuizOver = React.forwardRef((props,ref) => {

    // console.log(props);

    // console.log(ref);

    const   {   levelNames,
                score,
                maxQuestions,
                quizLevel,
                percent,
                loadLevelQuestions
            } = props;

    const [asked, setAsked] = useState([]);

    //console.log(asked);

    useEffect(() => {
       setAsked(ref.current);
    }, [ref])

    const averageGrade = maxQuestions/2;

    const decision = score >= averageGrade ? (
        <Fragment>
            <div className="stepsBtnContainer">
                {(quizLevel < levelNames.length) ? (
                    <Fragment>
                        <p className="successMsg"> Ou Fô Alors ! Go Difficulté Supérieure ! </p>
                        <button className="btnResult success" onClick={() => loadLevelQuestions(quizLevel)}> Niveau supérieur </button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p className="successMsg"> Ou Fô Alors ! Tu es un expert ! </p>
                        <button className="btnResult gameOver" > Niveau supérieur </button>
                    </Fragment>
                )}
            </div>

            <div className="percentage">
                <div className="progressPercent"> Résumé : {percent}% </div>
                <div className="progressPercent"> Note : {score}/{maxQuestions} </div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="stepsBtnContainer">
                <p className="failureMsg"> C'est inéluctable ! Vous avez échoué ! Vous faites certainement partie des victimes du Snap !</p>
            </div>

            <div className="percentage">
                <div className="progressPercent"> Résumé : {percent}% </div>
                <div className="progressPercent"> Note : {score}/{maxQuestions} </div>
            </div>
        </Fragment>
    )

    const questionAnswer = (score >= averageGrade) ? (
        asked.map(question => {
            return(
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td><button className="btnInfo"> Infos </button></td>
                </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan="3">
                <p style={{textAlign:"center",color:"red"}}> Pas de Réponses </p>
            </td>
        </tr>
    ) 
    
    return (
        <Fragment>

            {decision}

            <hr/>

            <p> Voici les réponses aux questions posées : </p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th> Questions </th>
                            <th> Réponses</th>
                            <th> Infos </th>
                        </tr>
                    </thead>
                    <tbody>
                       {questionAnswer}
                    </tbody>
                </table>

            </div>
        </Fragment>
    )
})

export default React.memo(QuizOver);
