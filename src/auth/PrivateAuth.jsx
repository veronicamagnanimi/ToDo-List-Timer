import { Navigate, Outlet } from "react-router-dom";

const isTokenValid = () => {
  const token = sessionStorage.getItem("token"); //recupero il token da sessionStorage
  if (!token) return false; //se non esiste, restituisco false
  try { //provo a decodificare il token 
    const payload = JSON.parse(token); //leggo direttamente l'oggetto
    return payload.exp > Date.now(); //exp è una proprietà che contiene il timestamp, se è maggiore del tempo attuale, il token è ancora valido
  } catch { //se nel blocco try c'è un errore, restituisco false evitando che l'app si blocchi
    return false; 
  }
};

const PrivateAuth = () => {
    //se il token è valido restituisco il componente figlio, sennò reindirizzo alla pagina di login
    return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateAuth;