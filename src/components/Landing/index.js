import React,{useRef,useEffect,useState,Fragment} from 'react';
import {Link} from 'react-router-dom'

const Landing = () => {

    const [btn,setBtn] = useState(false);

    //console.log(btn)

    const refWolverine = useRef(null);

    //console.log(refWolverine);

    useEffect(() => {
        console.log("je suis dans le useEffect ---");
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        },1000)
    },[])

    const setLeftImg = () => {

        //console.log("je suis dans setLeftImg");

        refWolverine.current.classList.add("leftImg");

    }

    const setRightImg = () => {

        //console.log("je suis dans setRightImg");

        refWolverine.current.classList.add("rightImg");

    }

    const clearImg = () => {

        //console.log("je suis dans clear img")
        
        if (refWolverine.current.classList.contains("leftImg")) {

            refWolverine.current.classList.remove("leftImg");

        } else if (refWolverine.current.classList.contains("rightImg")) {

            refWolverine.current.classList.remove("rightImg");

        }

    }

    const displayBtn =  btn && (
        <Fragment>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                <Link className="btn-welcome" to="/signup">Inscription</Link>
            </div>

            <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                <Link className="btn-welcome" to="/login">Connexion</Link>
            </div>
        </Fragment>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    );
}

export default Landing;
