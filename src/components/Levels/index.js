import React,{useEffect,useState} from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({levelNames,quizLevel}) => {

    //console.log(levelNames);

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const quizSteps = levelNames.map(level => ({title:level.toUpperCase()}));
        setLevels(quizSteps);
    }, [levelNames]);

    //console.log(levels);

    return (
        <div className="levelsContainer" style={{background:"transparent"}}>
            <Stepper 
                steps={ levels } 
                activeStep={ quizLevel } 
                circleTop={0}
                activeTitleColor={"#d31017"}
                activeColor={"#d31017"}
                completeTitleColor={"#E0E0E0"}
                completeColor={"#E0E0E0"}
                completeBarColor={"black"}
                barStyle={"dashed"}
                />       
        </div>
    )
}

export default React.memo(Levels);
