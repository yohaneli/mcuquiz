import React,{Fragment} from 'react'

const ProgressBar = ({idQuestion,maxQuestions}) => {
    //console.log(idQuestion,maxQuestions);

    const getPercent = (totalQuestions,questionId) => {
        return(100/totalQuestions) * questionId;
    }


    const actualQuestion = idQuestion + 1;

    const progressPercent = getPercent(maxQuestions,actualQuestion);

    //console.log(progressPercent);

    return (
        <Fragment>

            <div className="percentage">
                <div className="progressPercent"> {`Question ${actualQuestion}/${maxQuestions}`} </div>
                <div className="progressPercent"> {`Progression : ${progressPercent}%`} </div>
            </div>

            <div className="progressBar">
                <div className="progressBarChange" style={{width:`${progressPercent}%`}}>

                </div>
            </div>

        </Fragment>
    )
}

export default React.memo(ProgressBar);
