import React,{useState} from 'react'

const Signup = () => {

    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmPassowrd:''
    }

    const [loginData, setLoginData] = useState(data);

    //console.log(loginData);

    const handleChange = e => {
        //console.log("Je suis dans handle change");
        //console.log(e);
        setLoginData({...loginData,[e.target.id]:e.target.value });
    }

    const {pseudo,email,password,confirmPassowrd} = loginData;
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">

                <div className="formBoxLeftSignup">

                </div>

                <div className="formBoxRight">
                    <div className="formContent">
                        <form>
                            <h2>Inscription</h2>

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
                                <input onChange={handleChange} value={confirmPassowrd} type="password" id="confirmPassword" required autoComplete="off" />
                                <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
