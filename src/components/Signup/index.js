import React,{useState,useContext} from 'react'
import {FirebaseContext} from '../Firebase';
import {Link} from 'react-router-dom'


const Signup = (props) => {

    const firebase = useContext(FirebaseContext);

    console.log(firebase);

    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    const [loginData, setLoginData] = useState(data);

    const [error,setError] = useState('')

    //console.log(loginData);

    const handleChange = e => {
        //console.log("Je suis dans handle change");
        //console.log(e);
        setLoginData({...loginData,[e.target.id]:e.target.value });
    }

    const handleSubmit = e => {
        //console.log("Je suis dans handle submit");
        e.preventDefault();
        const {email,password,pseudo} = loginData;
        firebase.signupUser(email,password)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })
        .then(() => {
            setLoginData({...data});
            props.history.push('/welcome');
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }

    const {pseudo,email,password,confirmPassword} = loginData;

    // si le champ pseudo est vide ou idem pour les autres champs alors ne pas afficher sinon affficher le bouton
    const btn = (pseudo === '' || email === '' || password === '' || password !== confirmPassword) ?
    <button disabled>Inscription</button> : <button>Inscription</button>

    //gestion erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">

                <div className="formBoxLeftSignup">

                </div>

                    <div className="formBoxRight">
                        <div className="formContent">
                            {errorMsg}
                                <h2>Inscription</h2>
                                    <form onSubmit={handleSubmit}>

                                        <div className="inputBox">
                                            <input onChange={handleChange} value={pseudo} type="text" id="pseudo" required autoComplete="off" />
                                            <label htmlFor="pseudo">Pseudo</label>
                                        </div>

                                        <div className="inputBox">
                                            <input onChange={handleChange} value={email} type="email" id="email" required autoComplete="off" />
                                            <label htmlFor="email">Email</label>
                                        </div>

                                        <div className="inputBox">
                                            <input onChange={handleChange} value={password} type="password" id="password" required autoComplete="off" />
                                            <label htmlFor="password">Mot de passe</label>
                                        </div>
                                        
                                        <div className="inputBox">
                                            <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" required autoComplete="off" />
                                            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                                        </div>

                                        {btn}

                                    </form>

                            <div className="linkContainer">
                                <Link className="simpleLink" to="/login">Déjà inscrit ? Connecte toi ici !</Link>
                            </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Signup
