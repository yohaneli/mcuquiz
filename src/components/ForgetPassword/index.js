import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../Firebase';



const ForgetPassword = props => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState("");

    const [success, setSuccess] = useState(null);

    const [error, setError] = useState(null);

    //console.log(email);

    const handleSubmit = e => {
        console.log('je suis dans handle submit');
        e.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            setError(null);
            setSuccess(`Vérifiez votre adresse mail : ${email} pour changer votre mot de passe`);
            setEmail("");
            setTimeout(() => {
                props.history.push('/login');
            },3000)
        })
        .catch(error => {
            setError(error);
            setEmail("");
        })

    }

    const disabled = email === "";

    return (
        <div className="signUpLoginBox">
                <div className="slContainer">
    
                    <div className="formBoxLeftForget">
    
                    </div>
    
                        <div className="formBoxRight">
                            <div className="formContent">
                                {success && <span style={{border:"1px solid green",background:"green",color:"#ffffff"}}>{success}</span>}
                                {error && <span>{error.message}</span>}    
                                    <h2>Mot de passe oublié ?</h2>
                                        <form onSubmit={handleSubmit}>
    
                                            <div className="inputBox">
                                                <input onChange={e =>setEmail(e.target.value)} value={email} type="email" required autoComplete="off" />
                                                <label htmlFor="email">Email</label>
                                            </div>

                                            <button disabled={disabled}>Récupérer</button>
    
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

export default ForgetPassword
