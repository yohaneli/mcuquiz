import React,{useState,useContext,useEffect} from 'react'
import {FirebaseContext} from '../Firebase';
import {Link} from 'react-router-dom'

const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [btn, setbtn] = useState(false);
    
    const [error, setError] = useState('');

    useEffect(() => {
        if(password.length > 5 && email !== '') {
            setbtn(true);
        } else if (btn) {
            setbtn(false);
        }
    },[password,email,btn])

    const handleSubmit = e => {
        console.log("je suis dans le handle submit");
        e.preventDefault();
        console.log(email,password);
        firebase.loginUser(email,password)
        .then(user => {
            setEmail('');
            setPassword('');
            props.history.push('/welcome');
        })
        .catch(error => {
            setError(error)
            setEmail('');
            setPassword('');
        })
    }

    return (
            <div className="signUpLoginBox">
                <div className="slContainer">
    
                    <div className="formBoxLeftLogin">
    
                    </div>
    
                        <div className="formBoxRight">
                            <div className="formContent">
                                {error !== '' && <span>{error.message}</span>}
                                    <h2>Connexion</h2>
                                        <form onSubmit={handleSubmit}>
    
                                            <div className="inputBox">
                                                <input onChange={e =>setEmail(e.target.value)} value={email} type="email" required autoComplete="off" />
                                                <label htmlFor="email">Email</label>
                                            </div>
    
                                            <div className="inputBox">
                                                <input onChange={e =>setPassword(e.target.value)} value={password} type="password" required autoComplete="off" />
                                                <label htmlFor="password">Mot de passe</label>
                                            </div>

                                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                                        </form>
    
                                <div className="linkContainer">
                                    <Link className="simpleLink" to="/signup">Nouveau ? Inscris toi ici !</Link>
                                </div>
    
                            </div>
                        </div>
                </div>
            </div>
        
    )
}

export default Login
