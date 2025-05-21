import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { useEffect } from "react";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = sessionStorage.getItem("token"); //recupero da sessionStorage
      if (!token) return navigate("/login", { replace: true }); //se non esiste, reindirizzo al login

      try {
        const payload = JSON.parse(token); //leggo l'oggetto
        //controllo se il token è scaduto
        if (payload.exp <= Date.now()) {
          sessionStorage.removeItem("token"); //rimuovo il token scaduto
          navigate("/login", { replace: true, state: { sessionExpired: true }}); //reindirizzo alla pagina di login
        }
      } catch { //se nel blocco try c'è un errore, restituisco false evitando che l'app si blocchi
        sessionStorage.removeItem("token"); 
        navigate("/login", { replace: true });
      }
    };

    //controllo immediato e poi ogni 5 secondi
    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 5000); 

    return () => clearInterval(interval); //pulisco quando il componente viene smontato
  }, [navigate]); //passo navigate come dipendenza

  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;

