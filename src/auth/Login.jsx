import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    //stati per username, password e messaggio di errore vuoti
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //quando il token scade
  useEffect(() => {
  if (location.state?.sessionExpired) { //controllo se la sessione è scaduta
    setError("⏱️ La sessione è scaduta. Effettua di nuovo l'accesso.");
     window.history.replaceState({}, document.title); //rimuovo lo stato dalla history
  }
}, [location.state]); //passo location come dipendenza

  //funzione per gestire il login
  const handleLogin = (e) => { 
    e.preventDefault(); //previene il comportamento di default del form
    setError(""); //resetto l'errore
    if (username.trim() === "" || password.trim() === "") {
        setError("⚠️Inserisci username e password!"); //se i campi sono vuoti, mostro un messaggio di errore
        return;
    }
    //fake chiamata api con setTimeout
    setTimeout(() => {
      if (username === "user" && password === "password") { //se username e password sono corretti
        //creo un token jwt finto con scadenza tra 1 minuto
        const token = JSON.stringify({
          username,
          exp: Date.now() + 60 * 1000
        }); //creo un oggetto con username e scadenza, poi lo converto in stringa
        sessionStorage.setItem("token", token); //salvo il token 
        navigate("/");
      } else {
        setError("Credenziali non valide");
      }
    }, 800); //simulo il tempo di attase di una chiamata api
  };

  return (
    <div className="container">
        <div className="login-form text-center">
      <h1 className="text-center pb-3">Login</h1>
      <form onSubmit={handleLogin}>
        <label for="username">Nome utente</label>
        <input
          type="text"
          placeholder="Nome utente"
          value={username}
          onChange={e => setUsername(e.target.value)} //aggiorno lo stato quando l'utente scrive
          autoComplete="off" className="input-task" /><br />
          <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)} //aggiorno lo stato password
          autoComplete="off" className="input-task"/><br />
        <button type="submit" className="btn mt-1 mb-4">Accedi</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;